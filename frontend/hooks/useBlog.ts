import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  thumbnail: string;
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`https://medium.dgandhrav.workers.dev/api/v1/blog/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setBlog(response.data.msg);
        setLoading(false);
      });
  }, [id]);
  return {
    blog,
    loading,
  };
};
