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
router.get("/:id/posts", verifyToken, async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    const current_user = await User.findOne({
      where: {
        user_id: parseInt(req.params.id),
      },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      include: [
        {
          model: Post,
          attributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
          include: {
            model: Comment,
            attributes: ["comment"],
            include: {
              model: User,
              attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            },
          },
        },
        {
          model: Post,
          include: {
            model: Like,
            attributes: ["id"],
            include: {
              model: User,
              attributes: ["username", "avatar", "email"],
            },
          },
        },
        {
          model: Post,
          include: {
            model: Tag,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        },
        {
          association: "Followees",
          attributes: ["user_id", "username", "email", "password"],
          through: {
            attributes: [],
          },
        },
        {
          association: "Followers",
          attributes: ["user_id", "username", "email", "password"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(200).json(current_user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/:id/posts", verifyToken, async (req, res) => {});

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
