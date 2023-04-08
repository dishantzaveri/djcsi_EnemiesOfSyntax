import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ref_img: {
      type: String
    },
    gen_img: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', ImageSchema);
export default Image;
