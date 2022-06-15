const bcrypt = require('bcrypt');
const User = require('../models/auth');
const {
  GeneralError,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
  Conflict,
} = require('../utils/errors');
const { validateUser, validateLoginUser } = require('../validations/auth');

/**
 * @description Sign up a new user
 * @route       POST /api/users/registerUser
 * @access      Public
 * @return     {Object} of user data
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = validateUser(req.body);
  if (error) throw new UnprocessableEntity(error.details[0].message);

  const isUserExist = await User.findOne({ email });
  if (isUserExist) throw new Conflict('User already exist');

  const salt = await bcrypt.genSalt(10);
  const user = new User({
    name: name,
    email: email,
  });
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: user.generateAuthToken(),
  });
};

/**
 * @description Log in a user
 * @route       POST /api/users/loginUser
 * @access      Public
 * @return     {Object}
 */
const loginUser = async (req, res) => {
  console.log(req.body);
  const { error } = validateLoginUser(req.body);
  if (error) throw new UnprocessableEntity(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFound('Invalid email');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Unauthorized('Invalid password');

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: user.generateAuthToken(),
  });
};

/**
 * @description Get all users
 * @route       GET /api/users/
 * @access      Private
 * @return     {Array} users
 */
const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};

/**
 * @description Make user admin
 * @route       POST /api/users/makeAdmin
 * @access      Private, Admin
 * @return     {Object}
 */
const makeAdmin = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.role = 'admin';
  await user.save();
  return res.json({
    message: 'User made admin successfully',
    user,
  });
};

module.exports = {
  makeAdmin,
  registerUser,
  loginUser,
  getUsers,
};
