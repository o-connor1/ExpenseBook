const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    const token = signToken(newUser._id);
    const options = {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
      path: "/",
    };
    return res.status(201).cookie("token", token, options).json({
      status: "success",
      message: "Successfully Registered!",
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error in signup", 500));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(
      new AppError(`Account doesn't exist! Please signup first!`, 400)
    );
  }
  const correct = user.correctPassword(password);
  if (!correct) {
    return next(new AppError("Password is incorrect. Please try again!", 401));
  }
  const token = signToken(user._id);
  const options = {
    httpOnly: false,
    maxAge: 1000 * 60 * 30,
    path: "/",
  };
  return res
    .status(200)
    .cookie("token", token, options)
    .json({ status: "success", message: "login successfully!" });
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("You need to signup first!", 404));
  }
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Click on the given link to reset your password:${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 12 minutes)",
      message: message,
    });
    return res.status(200).json({
      status: "success",
      message: "Token sent to email successfully",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email. Please try again later!",
        500
      )
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Token is invalid or expired!", 400));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  const token = signToken(user._id);
  return res.status(200).cookie(token).json({
    status: "success",
    message: "Reset token sent successfully!",
  });
};

exports.isLogin = async (req, res, next) => {
  let token;
  let bearerToken = req.cookies;
  // console.log(bearerToken);
  if (!bearerToken)
    return next(
      new AppError("Your token has expired.Please login again!", 400)
    );
  // bearerToken = bearerToken.split(" ");
  // if (bearerToken[0] !== "Bearer") {
  //   return next(
  //     new AppError(
  //       "Your token has expired or does no longer exist.Please login again!",
  //       400
  //     )
  //   );
  // }
  token = bearerToken.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError(
  //       "User has recently changed password. Please login again!",
  //       401
  //     )
  //   );
  // }
  req.user = currentUser;
  return next();
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "Logout Successfully!",
  });
};
