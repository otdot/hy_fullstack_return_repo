const listHelper = require("./list_helper");
const supertest = require("supertest");
const {
  blogs,
  testBlogs,
  getBlogs,
  sumOfLikes,
  mostX,
  combineBlogs,
} = require("../utils/for_testing");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imphbm5lIiwiaWQiOiI2MmQwN2QwYzNjZmQ4ZmMwMmQ2ZGJiMjEiLCJpYXQiOjE2NTc4OTUyMDYsImV4cCI6MTY1Nzg5ODgwNn0.Htq0QpyLAdgCaAM40bXzqU2m6hTYxq6KSLlenmxN6MQ";

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = testBlogs.map((blog) => new Blog(blog));
  const savedBlogs = blogs.map((blog) => blog.save());
  await Promise.all(savedBlogs);
});

test("dummy returns 1", () => {
  const blogs = [];

  const result = listHelper(blogs);

  expect(result).toBe(1);
});

describe("sum of likes", () => {
  const blogs = [{}, {}, {}, {}];

  console.log("blogs length", blogs.length);

  test("list has 1 blog with 5 likes", () => {
    const result = sumOfLikes(blogs);
    expect(result).toBe(0);
  });
});

describe("a blog with most likes", () => {
  test("arr has 6 blogs", () => {
    const result = mostX(blogs, "likes");
    expect(result).toEqual({ title: "miikka", likes: 15 });
  });
});

describe("most blogs by a person", () => {
  test("an array with max 4 blogs by same person", () => {
    const result = mostX(combineBlogs(blogs), "blogAmount");
    expect(result).toEqual({ title: "otto", likes: 30, blogAmount: 3 });
  });
});

describe("most likes combined in all blogs by a person", () => {
  test("an array with max 45 likes combined by a person", () => {
    const result = mostX(combineBlogs(blogs), "likes");
    expect(result).toEqual({ title: "miikka", likes: 45, blogAmount: 3 });
  });
});

test("DB has 2 blogs", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogs.body).toHaveLength(testBlogs.length);
});

test("content has id-key", async () => {
  let blogs = await Blog.find({});
  blogs = blogs.map((blog) => blog.toJSON());
  expect(blogs[0].id).toBeDefined();
});

test("posting to database", async () => {
  const blogObject = {
    title: "test object",
    author: "janne",
    url: "i hope ur fine",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(blogObject)
    .set("authorization", token)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body).toHaveLength(testBlogs.length + 1);

  const titles = blogs.body.map((blog) => blog.title);
  expect(titles).toContain("test object");
});

test("posting without likes column", async () => {
  const blogObject = {
    title: "test without likes",
    author: "otto",
    url: "lets take care of ourselves",
  };

  await api
    .post("/api/blogs")
    .send(blogObject)
    .set("authorization", token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("posting without url or title", async () => {
  const blogObject = {
    title: "",
    author: "otto",
  };

  await api
    .post("/api/blogs")
    .send(blogObject)
    .set("authorization", token)
    .expect(400);
});

test("removing a blog", async () => {
  const blogsAtStart = await getBlogs();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("authorization", token)
    .expect(204);

  const blogsAtEnd = await getBlogs();

  expect(blogsAtEnd).toHaveLength(testBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("updating a blog", async () => {
  const blogsAtStart = await getBlogs();
  const blogToUpdate = blogsAtStart[0];

  const newBlog = {
    likes: 1000,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

  const blogsAtEnd = await getBlogs();

  const allLikes = blogsAtEnd.map((b) => b.likes);

  expect(allLikes).toContain(newBlog.likes);
});

test("posting without token", async () => {
  const blogObject = {
    title: "test object",
    author: "janne",
    url: "i hope ur fine",
    likes: 10,
  };

  await api.post("/api/blogs").send(blogObject).expect(400);

  const blogsAtEnd = await getBlogs();

  expect(blogsAtEnd).toHaveLength(testBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
