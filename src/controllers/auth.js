const bcrypt = require('bcrypt');
const User = require('../models/auth');
const { validateUser, validateLoginUser } = require('../validations/auth');

/**
 * @description Sign up a new user
 * @route       POST /api/users/registerUser
 * @access      Public
 * @return     {Object} of user data
 */
const registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  console.log(req.body);

  const isUserExist = await User.findOne({ email });
  if (isUserExist)
    return res.status(409).send({ message: 'User already registered' });

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
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid email or password');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).send('Invalid password');

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
  const { userId } = req.body;

  const user = await User.findById(userId);
  user.role = 'admin';
  await user.save();
  return res.send({
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
