require('dotenv').config();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// signup route
router.post('/signup', upload.single('avatar'), async (req, res) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;
  const user = {
    username: username,
    email: email,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  try {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatar.secure_url,
    });
    res.status(201).json({
      accessToken: accessToken,
      user: newUser,
    });
    console.log('after');
  } catch (error) {
    res.status(400).send(error);
  }
  //   res.status(200).send(req.body);
});

// login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      res.status(400).send('Cannot find user');
      return;
    }
    const authentication = await bcrypt.compare(password, user.password);

    if (!authentication) {
      res.json({ error: 'You are not authenticated' });
      return;
    }
    const loginUser = {
      username: username,
      password: user.password,
    };

    const accessToken = jwt.sign(loginUser, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      accessToken: accessToken,
      user: user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
