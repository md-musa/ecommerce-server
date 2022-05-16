const User = require('../models/auth');
const { validateUser, validateSignInUser } = require('../validations/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { error } = validateUser(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered');

  try {
    user = new User({ name, username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err) {
    console.log(`Error ==> ${err}`);
    return res.status(400).send(err);
  }
};

const signIn = async (req, res) => {
  const { error } = validateSignInUser(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  try {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (err) {
    console.log(`Error ==> ${err}`);
    return res.status(400).send(err);
  }
};

module.exports = { signup, signIn };
