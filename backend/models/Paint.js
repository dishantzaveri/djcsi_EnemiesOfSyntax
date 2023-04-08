import mongoose from 'mongoose';

const PaintSchema = new mongoose.Schema(
  {
    source: {
      // ASIAN, BERGER
      type: String
    },
    paintUrl: {
      type: String
    },
    sourceSku: {
      type: String
    },
    paintTitle: {
      type: String
    },
    paintColor: {
      type: String
    },
    paintColorCategory: {
      type: String
    }
  },
  { timestamps: true }
);

const Paint = mongoose.model('Paint', PaintSchema);
export default Paint;
