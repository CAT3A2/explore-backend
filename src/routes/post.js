require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./auth");
const sequelize = require("../config/database");

// Getting all posts

// Getting all users posts for home page
router.get("/", (req, res) => {
  sequelize
    .sync({ alter: true })
    .then(() => {
      // Fetch all models associated with User and their nested associations (recursively)
      //   return User.findAll({ include: { all: true, nested: true } });
      return Post.findAll({
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: User,
          },
          {
            model: Comment,
            include: {
              model: User,
            },
          },
          {
            model: Tag,
            attributes: ["name"],
          },
        ],
      });
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
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

// router.get("user/:id/posts", verifyToken, async (req, res) => {
//   jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
//     if (err) {
//       res.sendStatus(403);
//       return;
//     }
//     try {
//       const posts = await Post.findAll({
//         where: { user_id: req.params.id },
//         include: { all: true, nested: true },
//       });
//       res.status(201).json(posts);
//     } catch (err) {
//       res.status(400).send(error);
//     }
//   });
// });

// router.post("/posts/:id", verifyToken, async (req, res) => {
//   jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
//     if (err) {
//       res.sendStatus(403);
//       return;
//     }
//     const current_post = await Post.findOne({
//       where: { post_id: req.params.id },
//     });
//   });
// });

module.exports = router;
