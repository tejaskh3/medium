import axios from "axios";
import { useEffect, useState } from "react";

interface Blogs {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  thumbnail: string;
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    axios
      .get("https://medium.dgandhrav.workers.dev/api/v1/blog/bulk", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setBlogs(response.data.allBlogs);
        setLoading(false);
      });
  }, []);
  return {
    blogs,
    loading,
  };
};
