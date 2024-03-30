import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const CreateBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    authorName: "",
    title: "",
    content: "",
    thumbnail: "",
    publishedDate: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    axios
      .post(
        "https://backend.sagarsinghbisht248.workers.dev/api/v1/blog/create",
        input,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Blog created successfully:", response.data);
        navigate("/blogs");
        // You can add logic to handle successful creation
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
        // You can add logic to handle errors
      });
  }

  return (
    <div>
      <Appbar />
      <div className="flex items-center justify-center mt-3">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-10 rounded-lg shadow-2xl w-8/12 "
        >
          <div className="mb-4">
            <label
              htmlFor="authorName"
              className="block text-lg font-medium text-gray-700 dark:text-black "
            >
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              placeholder="Enter Author Name"
              value={input.authorName}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 dark:text-black"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              value={input.title}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 dark:text-black"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Enter Content"
              value={input.content}
              onChange={handleChange}
              className="mt-1 p-5 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-lg font-medium text-gray-700 dark:text-black"
            >
              Thumbnail URL
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              placeholder="Give Image URL"
              value={input.thumbnail}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishedDate"
              className="block text-lg font-medium text-gray-700 dark:text-black"
            >
              Published Date
            </label>
            <input
              type="text"
              id="publishedDate"
              name="publishedDate"
              placeholder="Enter Date(Feb 24, 2024)"
              value={input.publishedDate}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-lg px-6 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
