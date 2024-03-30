// import React from "react";
import { useBlog } from "../../hooks/useBlog";
import { useParams } from "react-router-dom";
import { FullBlog } from "../../components/FullBlog";
import { Appbar } from "../../components/Appbar";
import { Skeleton } from "../../components/Skeleton";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Appbar />
        <Skeleton />
      </div>
    );
  }

  if (!blog) {
    // Handle the case where blog is null
    return (
      <div>
        <Appbar />
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <FullBlog
        title={blog.title}
        authorName={blog.authorName}
        content={blog.content}
        thumbnail={blog.thumbnail}
        publishedDate={blog.publishedDate}
      />
    </div>
  );
};
