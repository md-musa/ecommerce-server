const bcrypt = require('bcrypt');
const User = require('../models/auth');
const {
  NotFound,
  Unauthorized,
  UnprocessableEntity,
  Conflict,
} = require('../utils/errors');
const { validateUser, validateLoginUser } = require('../validations/auth');

/**
 * @description Sign up a new user
 * @route       POST /api/users/register
 * @access      Public
 * @return     {Object} of user data
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = validateUser(req.body);
  if (error) throw new UnprocessableEntity(error.details[0].message);

  const userExist = await User.findOne({ email });
  if (userExist) throw new Conflict('User already exist');

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
 * @route       POST /api/users/login
 * @access      Public
 * @return     {Object} of user data
 */
const loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) throw new UnprocessableEntity(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFound('Invalid email');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Unauthorized('Invalid password');

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
 * @access      Admin
 * @return     {Array} users
 */
const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};

/**
 * @description Make admin
 * @route       POST /api/users/makeAdmin
 * @access      Super Admin
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
