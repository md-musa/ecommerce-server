const bcrypt = require('bcrypt');
const { validateUser, validateLoginUser } = require('../validations/auth');
const User = require('../models/auth');

/**
 * @description: Sign up a new user
 * @route POST /api/auth/registerUser
 * @access Public
 */
const registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    name, username, email, password,
  } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) return res.status(400).send('User already registered');

    const salt = await bcrypt.genSalt(10);
    const user = new User({
      name, username, email, password,
    });
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateAuthToken(),
    });
  } catch (err) {
    console.log(`Error ==> ${err}`);
    return res.status(400).send(err);
  }
};

/**
 * @description: Sign in a user
 * @route GET /api/auth/loginUser
 * @access Public
 */

const loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('Invalid email or password');

  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).send('Invalid password');

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateAuthToken(),
    });
  } catch (err) {
    console.log(`Error ==> ${err}`);
    return res.status(400).send(err);
  }
};

module.exports = { registerUser, loginUser };
