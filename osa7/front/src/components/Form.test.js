import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

describe("<Form/> component test", () => {
  test("Form gets posted with right data", async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();

    render(<Form addBlog={mockHandler} user={{ name: "oddo" }} />);

    const titleInput = screen.getByPlaceholderText("title");
    const urlInput = screen.getByPlaceholderText("url");
    const button = screen.getByText("add blog");

    await user.type(titleInput, "react-testing-library title");
    await user.type(urlInput, "react-testing-library url");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe(
      "react-testing-library title"
    );
    expect(mockHandler.mock.calls[0][0].url).toBe("react-testing-library url");
  });
});
