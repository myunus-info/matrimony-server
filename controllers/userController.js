const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.updateMe = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    gender,
    photo,
    phone,
    profileFor,
    NID,
    weight,
    height,
    religion,
    sect,
    maritalStatus,
    aboutYourself,
  } = req.body;
  console.log(name);

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError(401, 'There is no user with this email'));
  }

  (user.name = name),
    (user.email = email),
    (user.password = password),
    // (user.confirmPassword = confirmPassword),
    (user.gender = gender),
    (user.photo = photo[0].name),
    (user.phone = phone),
    (user.profileFor = profileFor),
    (user.NID = NID),
    (user.weight = weight),
    (user.height = height),
    (user.religion = religion),
    (user.sect = sect),
    (user.maritalStatus = maritalStatus),
    (user.aboutYourself = aboutYourself);

  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: {
      updatedUser,
    },
  });
});
