import React from "react";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import { getAllTag } from "@/service/api/tag";
import { NewPostForm } from "../test-form";

const CreatePostPage = async () => {
  const [authors, currentUser, tags] = await Promise.all([
    getAllAuthor(),
    getCurrentUser(),
    getAllTag(),
  ]);

  return (
    <>
      <NewPostForm authors={authors} currentUser={currentUser!} tags={tags} />
    </>
  );
};

export default CreatePostPage;
