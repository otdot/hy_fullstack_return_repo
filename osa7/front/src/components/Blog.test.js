import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blogs";

describe("blog tests", () => {
  test("renders title but not url", () => {
    const blog = {
      title: "testing from testing with react-testing-library",
      author: "otto",
      url: "www.url.com",
      likes: 0,
    };

    const { container } = render(<Blog blog={blog} />);

    const blogDiv = container.querySelector(".blog");
    const element = screen.getByText(
      "title: testing from testing with react-testing-library"
    );

    expect(element).toBeDefined();

    expect(blogDiv).not.toHaveTextContent("url: www.url.com");
  });

  test("renders likes and url after click", async () => {
    const blog = {
      title: "testing from testing with react-testing-library",
      author: "otto",
      url: "www.url.com",
      likes: 0,
    };
    const mockHandler = jest.fn();

    render(<Blog blog={blog} handleClick={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("more");
    await user.click(button);

    const moreDiv = screen.getByText("author: otto, url: www.url.com", {
      exact: false,
    });

    expect(moreDiv).toBeDefined();
  });

  test("like button gets called twice", async () => {
    const blog = {
      title: "testing from testing with react-testing-library",
      author: "otto",
      url: "www.url.com",
      likes: 0,
    };

    const mockHandler = jest.fn();
    render(<More blog={blog} handleLike={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("posting a blog gets called with right data", () => {});
});
