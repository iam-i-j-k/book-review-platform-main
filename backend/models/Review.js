import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: Number,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review
