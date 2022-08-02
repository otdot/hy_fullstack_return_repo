const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();
const middleware = require("../utils/middleware");

blogRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.json(blog);
});

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).end();
  }

  const decodedToken = req.user;

  if (!decodedToken || !decodedToken.id) {
    return res.status(400).send({ error: "token invalid or missing" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: 0,
    user: user.id,
  });

  let savedBlog = await blog.save();
  user.blogs = user.blogs.concat(blog);
  await user.save();
  res.status(200).send(savedBlog);
});

blogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const decodedUser = req.user;

  console.log("blog.id: ", blog.user.toString());
  console.log("decodedUser.id: ", decodedUser.id);

  if (!(blog.user.toString() === decodedUser.id.toString())) {
    return res
      .status(400)
      .send({ error: "user has no permission to remove this blog" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
  res.status(200).end();
});

module.exports = blogRouter;
