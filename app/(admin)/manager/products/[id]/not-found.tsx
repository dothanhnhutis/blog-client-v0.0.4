import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPost = () => {
  return (
    <>
      <div className="sticky top-[73px] w-full backdrop-saturate-[1.8] backdrop-blur bg-background/50 z-50">
        <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden ">
          <Link
            href="/manager/products"
            className="text-sm inline-flex items-center justify-center hover:bg-muted p-1 rounded-md"
          >
            <ChevronLeftIcon className="size-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-2 my-2">
              <h2 className="lg:text-xl font-bold text-lg">Edit Product</h2>
            </div>
          </div>
        </div>
      </div>
      <div>Not Found</div>
    </>
  );
};

export default NotFoundPost;
