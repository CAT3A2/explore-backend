require('dotenv').config();

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// signup route
router.post('/auth/signup', async (req, res) => {
  const { username, email, avatar, password } = req.body;
  const user = {
    username: username,
    email: email,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatar,
    });
    res.status(201).json({
      accessToken: accessToken,
      id: newUser.user_id,
      user: newUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.export = router