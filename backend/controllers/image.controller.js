import Image from '../models/Image.js';

export const addRefImage = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log('image.controller/register', { email, password, body: req.body });

    const newUser = new Image({
      userId,
      ref_img: req.file.filename
    });
    const savedImage = await newUser.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addGenImages = async (req, res) => {
  try {
    const { imageId, tag } = req.body;

    const gen_img = [];

    req.files.forEach((element) => {
      gem_img.push(element.filename);
    });

    const getImage = await Image.updateOne({ _id: imageId }, { $push: { tag, gen_img } });
    console.log(getImage);
    res.status(200).json(getImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const { userId } = req.body;
    const images = await Image.findOne({ userId });

    res.status(200).json(images);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
