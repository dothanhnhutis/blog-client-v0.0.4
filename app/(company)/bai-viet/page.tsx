import { queryBlog } from "@/service/api/blog";
import { getAllTag } from "@/service/api/tag";
import React from "react";
import Image from "next/image";

import Tags from "./tags";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import PaginationH from "./pagination";
import { vi } from "date-fns/locale";

export const dynamic = "force-dymanic";
export const dymanicParams = true;
export const revalidate = 0;

type BlogListPageProps = {
  searchParams: {
    tag?: string;
    page?: string;
  };
};

const BlogListPage = async ({ searchParams }: BlogListPageProps) => {
  const { blogs, metadata } = await queryBlog(searchParams);
  const tags = await getAllTag();

  return (
    <div className="lg:mx-auto lg:max-w-screen-xl">
      <div className="mt-2 mx-auto">
        <h1 className="text-xl font-semibold text-center">Bài Viết</h1>
      </div>
      <div className="mb-10">
        <Tags tags={tags} />
        {blogs.length == 0 ? (
          <p className="text-center h-[500px]">
            Không tìm thấy bài viết nào khớp với lựa chọn của bạn.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/bai-viet/${blog.slug}`}
                  className="rounded-lg overflow-hidden bg-accent"
                >
                  <AspectRatio ratio={16 / 9} className="max-h-[250px]">
                    <Image
                      src={blog.thumnail}
                      alt="thumnail"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Badge>
                        <p className="line-clamp-1">{blog.tag.name}</p>
                      </Badge>
                      <p className="text-sm line-clamp-1">
                        {format(new Date(blog.publishAt), "PP", { locale: vi })}
                      </p>
                    </div>
                    <h4 className="font-bold text-lg line-clamp-2 hover:text-primary">
                      {blog.title}
                    </h4>
                    <p className="line-clamp-2 text-sm">{blog.shortContent}</p>
                  </div>
                </Link>
              ))}
            </div>
            {metadata.totalPage > 1 && (
              <PaginationH
                {...searchParams}
                currentPage={parseInt(searchParams.page ?? "1")}
                hasPrevPage={parseInt(searchParams.page ?? "1") > 1}
                {...metadata}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
