require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");

const upload = require("../utils/multer");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/auth");
const sequelize = require("../config/database");

// Getting all searched posts
router.get("/", async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    const query = req.query.search;

    const foundPosts = await Post.findAll({
      where: {
        destination: query,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Comment,
          attributes: ["comment"],
        },
        {
          model: User,
          attributes: ["username", "email", "avatar"],
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
          attributes: ["giver_id", "post_id"],
        },
      ],
    });

    const foundFromTags = await Tag.findAll({
      where: {
        name: query,
      },
      include: [
        {
          model: Post,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Comment,
              attributes: ["comment"],
            },
            {
              model: User,
              attributes: ["username", "email", "avatar"],
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
              attributes: ["giver_id", "post_id"],
            },
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });

    let tagPosts = foundFromTags[0].posts;

    // return all posts contain the searching query from either tags or destination
    const ids = new Set(foundPosts.map((d) => d.post_id));
    console.log(ids);
    let returnPosts = [
      ...foundPosts,
      ...tagPosts.filter((d) => !ids.has(d.post_id)),
    ];

    res.status(200).send(returnPosts);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// Getting all users posts for home page
router.get("/all", (req, res) => {
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

router.post("/:id/comment", verifyToken, async (req, res) => {
  try {
    const { comment, user_id } = req.body;
    await sequelize.sync({ alter: true });
    const newComment = await Comment.create({
      comment,
      user_id,
      post_id: req.params.id,
    });

    const updatedComments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    res.status(200).json({
      newComment,
      updatedComments,
    });
  } catch (error) {
    res.status(400).send({ error: error.messages });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const { user_id } = req.body;
    await sequelize.sync({ alter: true });
    await Like.create({
      giver_id: user_id,
      post_id: parseInt(req.params.id),
    });
    const allLikes = await Like.findAll({
      where: {
        post_id: parseInt(req.params.id),
      },
    });
    res.status(200).send(allLikes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
