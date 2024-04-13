import { getBlogById } from "@/service/api/blog";
import { notFound } from "next/navigation";
import React from "react";
import { getAllTag } from "@/service/api/tag";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import BlogForm1 from "../../blog-form";

type EditBlogPageProps = {
  params: { id: string };
};

const EditBlogPage = async ({ params: { id } }: EditBlogPageProps) => {
  const [blog, currentUser, tags, authors] = await Promise.all([
    getBlogById(id),
    getCurrentUser(),
    getAllTag(),
    getAllAuthor(),
  ]);

  if (!blog) notFound();
  return (
    <BlogForm1
      currentUser={currentUser!}
      tags={tags}
      authors={authors}
      type="edit"
      blog={blog}
    />
  );
};

export default EditBlogPage;
