import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema(
  {
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    images: {
      type: Array,
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: {
      type: Array,
      default: []
    },
    interestedList: {
      type: Array,
      default: []
    },
    itineraryRoute: {
      type: String,
      default: ''
    },
    itineraryDates: {
      // type: Array,
      // default: []
      type: String,
      default: ''
    },
    itineraryPrice: {
      type: Number,
      default: 0
    },
    totalSpots: {
      type: Number,
      default: 0
    },
    bookedSpots: {
      type: Number,
      default: 0
    },
    itineraryPreferences: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const Host = mongoose.model('Host', HostSchema);
export default Host;
