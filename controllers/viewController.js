const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/apiFeatures');

exports.getOverview = catchAsync(async (req, res) => {
  // 1. Get tour data from collection
  const tours = await Tour.find();

  // 2. Build template

  // 3. Render that template using tour date from 1.

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get the date for the requested tour, includins reviews and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  // 2. Build temple

  // 3. Render template using the data from 1.
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
