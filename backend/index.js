import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import postRoutes from './routes/posts.routes.js';
import hostRoutes from './routes/host.routes.js';
import { register } from './controllers/auth.controller.js';
import { createPost } from './controllers/posts.controller.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';
import fetch from 'node-fetch';
import { addGenImages, addRefImage } from './controllers/image.controller.js';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + process.env.DAILY_API_KEY
};

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
// app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', register);
app.post('/posts', upload.single('picture'), createPost);
app.post('/user/ref_img', upload.single('picture'), addRefImage);
app.post('/user/gen_imgs', upload.array('pictures'), addGenImages);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/host', hostRoutes);

const getRoom = async (room) => {
  try {
    const res = await fetch(`https://api.daily.co/v1/rooms/${room}`, {
      method: 'GET',
      headers
    });
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    return console.error('error:' + err);
  }
};

const createRoom = async (room) => {
  try {
    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: room,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: true,
          start_audio_off: false,
          lang: 'en'
        }
      })
    });
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    return console.log('error:' + err);
  }
};

app.get('/video-call/:id', async function (req, res) {
  const roomId = req.params.id;

  console.log(roomId);

  const room = await getRoom(roomId);
  console.log(room);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});

app.use('/', (req, res) => {
  res.send('Welcome to the API');
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
