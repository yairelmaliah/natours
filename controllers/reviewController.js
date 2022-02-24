const factory = require('./handlerFactory');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
// exports.deleteReview = factory.deleteOne(Review);

exports.deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  const review = await Review.findById(reviewId);

  if (!review) return next(new AppError('There is no such review', 404));

  if (review.user._id.toString() !== userId)
    return next(new AppError('You can only delete your own tweets', 401));

  await Review.findByIdAndDelete(reviewId);

  res.status(204).json({ status: 'success', data: null });
};
