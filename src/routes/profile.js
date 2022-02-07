require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth");
const sequelize = require("../config/database");

// Getting all information for user
router.get("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    try {
      
     } catch {
      
    }
  });
});

// router.post("/user/:id/posts", verifyToken, async (req, res) => {
//   jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
//     if (err) {
//       res.sendStatus(403);
//       return;
//     }
//     try {
//       const { title, destination, description } = req.body;
//       const image_url = await cloudinary.uploader.upload(req.file.path);
//       const current_user = await User.findOne({
//         where: { user_id: req.params.id },
//       });
//       const new_post = await current_user.addPosts({
//         title,
//         destination,
//         description,
//         image_url,
//       });
//       res.status(201).json(new_post);
//     } catch (err) {
//       res.status(400).send(error);
//     }
//   });
// });

module.exports = router;
