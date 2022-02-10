require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");

const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const upload = require("../utils/multer");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth");
const sequelize = require("../config/database");

// Getting all information for user
router.get("/:id/posts", async (req, res) => {
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
          attributes: ["user_id", "username", "email"],
          through: {
            attributes: [],
          },
        },
        {
          association: "Followers",
          attributes: ["user_id", "username", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(200).json(current_user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// user create a new post
router.post(
  "/:id/posts",
  verifyToken,
  upload.single("image_url"),
  async (req, res) => {
    try {
      await sequelize.sync({ alter: true });
      const { title, destination, description, tags } = req.body;
      const image_url = await cloudinary.uploader.upload(req.file.path);
      const current_user = await User.findOne({
        where: { user_id: parseInt(req.params.id) },
      });

      const newPost = await Post.create({
        title,
        destination,
        description,
        image_url: image_url.secure_url,
      });

      tags.forEach((tag) => {
        const existTag = Tag.findOne({
          where: {
            name: tag,
          },
        });
        if (!existTag) {
          Tag.create({
            name: tag,
          }).then((newTag) => {
            newPost.addTag(newTag);
          });
        }

        newPost.addTag(existTag.name);
      });

      await current_user.addPost(newPost);

      res.status(201).send(newPost);
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
  }

);

// user update post
router.put(
  "/:id/posts/:post_id",
  verifyToken,
  upload.single("image_url"),
  async (req, res) => {
    try {
      await sequelize.sync({ alter: true });
      const { id, post_id } = req.params;
      const { title, destination, description } = req.body;
      const image_url = await cloudinary.uploader.upload(req.file.path);
      const updatedPost = await Post.update(
        {
          user_id: id,
          title,
          destination,
          description,
          image_url: image_url.secure_url,
        },
        {
          where: {
            post_id: post_id,
          },
        }
      );

      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

//user delete a post
router.delete(
  "/:id/posts/:post_id",
  verifyToken,
  upload.single("image_url"),
  async (req, res) => {
    try {
      await sequelize.sync({ alter: true });
      const { id, post_id } = req.params;
      await Post.destroy({
        where: {
          post_id: post_id,
        },
      });
      const updatedPosts = await Post.findAll({
        where: {
          user_id: id,
        },
      });
      res.status(200).send({
        message: "selected post has been deleted",
        updatedPosts: updatedPosts,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// user add followee

router.post("/:id/follow", verifyToken, async (req, res) => {
  try {
    await sequelize.sync({alter: true})
    const currentUser = await User.findOne
  } catch {}
});

module.exports = router;
