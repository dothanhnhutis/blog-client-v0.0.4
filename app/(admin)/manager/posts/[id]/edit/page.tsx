import { getPostById } from "@/service/api/post";
import { notFound } from "next/navigation";
import React from "react";
import { getAllTag } from "@/service/api/tag";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import { PostForm } from "../../post-form";
import { omit } from "lodash";

type EditPostPageProps = {
  params: { id: string };
};

const EditPostPage = async ({ params: { id } }: EditPostPageProps) => {
  const post = await getPostById(id);
  const currentUser = await getCurrentUser();
  const tags = await getAllTag();
  const authors = await getAllAuthor();

  if (!post) notFound();
  return (
    <PostForm
      authors={authors}
      currentUser={currentUser!}
      tags={tags}
      post={omit(post, ["createdAt", "updatedAt", "author", "tag"])}
    />
  );
};

export default EditPostPage;
