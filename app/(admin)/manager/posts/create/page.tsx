import React from "react";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import { getAllTag } from "@/service/api/tag";
import { PostForm } from "../post-form";

const CreatePostPage = async () => {
  const authors = await getAllAuthor();
  const currentUser = await getCurrentUser();
  const tags = await getAllTag();

  return <PostForm authors={authors} currentUser={currentUser!} tags={tags} />;
};

export default CreatePostPage;
