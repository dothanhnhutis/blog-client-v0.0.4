import React from "react";
import { BlogForm } from "../blog-form";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import { getAllTag } from "@/service/api/tag";
import BlogForm1 from "../blog-form";

const CreateBlogPage = async () => {
  const [authors, currentUser, tags] = await Promise.all([
    getAllAuthor(),
    getCurrentUser(),
    getAllTag(),
  ]);

  return (
    <BlogForm1
      authors={authors}
      currentUser={currentUser!}
      tags={tags}
      type="create"
    />
  );
};

export default CreateBlogPage;
