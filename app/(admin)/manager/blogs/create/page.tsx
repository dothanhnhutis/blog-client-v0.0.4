import React from "react";
import Image from "next/image";
import { getAllAuthor, getCurrentUser } from "@/service/api/user";
import { getAllTag } from "@/service/api/tag";
import BlogForm1 from "../blog-form";
import { ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import DatePicker from "@/components/date-picker";
import { NewPostForm } from "./test-form";

const CreateBlogPage = async () => {
  const [authors, currentUser, tags] = await Promise.all([
    getAllAuthor(),
    getCurrentUser(),
    getAllTag(),
  ]);

  return (
    <>
      <NewPostForm authors={authors} currentUser={currentUser!} tags={tags} />

      {/* <BlogForm1
        authors={authors}
        currentUser={currentUser!}
        tags={tags}
        type="create"
      /> */}
    </>
  );
};

export default CreateBlogPage;
