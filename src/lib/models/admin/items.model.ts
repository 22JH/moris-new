import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String],
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
