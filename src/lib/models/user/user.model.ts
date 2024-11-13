import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  phone: {
    type: String,
  },
  totalPurchaseAmount: {
    type: Number,
    default: 0,
  },
  postCode: {
    type: String,
  },
  address: {
    type: String,
  },
  addressDetail: {
    type: String,
  },
  orderInProgress: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Item',
  },
  orderComplete: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PrepareShipping',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
