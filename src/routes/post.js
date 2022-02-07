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
const verifyToken = require("./auth");
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
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            attributes: ["user_id", "username", "avatar"],
          },
          {
            model: Comment,
            attributes: ["id", "comment"],
            include: {
              model: User,
              attributes: ["user_id", "username", "avatar"],
            },
          },
          {
            model: Tag,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Like,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: User,
              attributes: ["username", "avatar"],
            },
          },
        ],
      });
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
});

// Get one post details
router.get("/:id", (req, res) => {
  sequelize
    .sync({ alter: true })
    .then(() => {
      return Post.findOne({
        where: {
          post_id: req.params.id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            attributes: ["user_id", "username", "avatar"],
          },
          {
            model: Comment,
            attributes: ["id", "comment"],
            include: {
              model: User,
              // as: 'giver',
              attributes: ["user_id", "username", "avatar"],
            },
          },
          {
            model: Tag,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Like,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: User,
              attributes: ["username", "avatar"],
            },
          },
        ],
      });
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.send(err);
    });
});

router.post("/:id", async (req, res) => {
  try {
    const { comment, user_id, username } = req.body;
    await sequelize.sync({ alter: true });
    const newComment = await Post.create({
      comment,
      user_id,
      username,
    });

    const updatedComments = Comment.findAll({
      where: {
        post_id: req.params,
      },
    });

    res.status(200).json({
      newComment,
      updatedComments,
    });
  } catch (error) {
    res.status(400).send(error);
  }
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

module.exports = router;
