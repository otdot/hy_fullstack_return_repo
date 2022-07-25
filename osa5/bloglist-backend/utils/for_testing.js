const Blog = require("../models/blog");

const blogs = [
  { title: "otto", likes: 10 },
  { title: "otto", likes: 10 },
  { title: "otto", likes: 10 },
  { title: "janne", likes: 11 },
  { title: "naby", likes: 12 },
  { title: "olivia", likes: 13 },
  { title: "karoliina", likes: 14 },
  { title: "miikka", likes: 15 },
  { title: "miikka", likes: 15 },
  { title: "miikka", likes: 15 },
];

const testBlogs = [
  {
    title: "title1",
    author: "author1",
    url: "url1",
    likes: 1,
    user: "62d07d0c3cfd8fc02d6dbb21",
  },
  {
    title: "title2",
    author: "author2",
    url: "url2",
    likes: 2,
    user: "62d07d0c3cfd8fc02d6dbb21",
  },
];

const reverse = (str) => {
  return str.split("").reverse().join("");
};

const average = (arr) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return arr.reduce(reducer, 0) / arr.length;
};

const sumOfLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
        if (!blog.likes) return 0;
        return sum + blog.likes;
      }, 0);
};

const mostX = (blogs, x) => {
  return blogs.find(
    (blog) =>
      blog[x] ===
      blogs
        .map((blog) => blog[x])
        .reduce((prev, curr) => Math.max(prev, curr), -Infinity)
  );
};

const combineBlogs = (blogs) => {
  return Object.values(
    blogs.reduce((combined, blog) => {
      if (!combined[blog.title]) {
        combined[blog.title] = {
          title: blog.title,
          likes: blog.likes,
          blogAmount: 1,
        };
      } else
        combined[blog.title] = {
          title: blog.title,
          likes: combined[blog.title].likes + blog.likes,
          blogAmount: combined[blog.title].blogAmount + 1,
        };
      return combined;
    }, {})
  );
};

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  blogs,
  testBlogs,
  getBlogs,
  reverse,
  average,
  sumOfLikes,
  mostX,
  combineBlogs,
};
