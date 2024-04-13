import React from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ChevronRightIcon,
  EyeIcon,
  UserIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getBlogById } from "@/service/api/blog";

type BlogDetailPageProps = {
  params: { slug: string };
};
export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const blog = await getBlogById(params.slug);
    if (!blog || !blog.isActive)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    return {
      title: blog.title,
      description: blog.contentText,
      alternates: {
        canonical: `/bai-viet/${blog.slug}`,
        // languages: {
        //   "en-US": `/en-US/bai-viet/${blog.slug}`,
        //   "de-DE": `/de-DE/bai-viet/${blog.slug}`,
        // },
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const blog = await getBlogById(params.slug);
  if (!blog || !blog.isActive) return notFound();
  return (
    <div className="mx-auto xl:max-w-screen-xl px-2">
      <nav className="py-5">
        <p className="text-base align-middle">
          <Link
            href="/"
            prefetch
            className="inline hover:text-primary font-medium"
          >
            Trang chủ
          </Link>
          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <Link
            href="/bai-viet"
            prefetch
            className="inline hover:text-primary font-medium"
          >
            Bài viết
          </Link>
          {/* <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <Link
            href={`/bai-viet/${blogs[0].tag.slug}`}
            prefetch
            className="inline hover:text-primary font-medium"
          >
            {blogs[0].tag.name}
          </Link> */}
          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <span className="font-normal">{blog.title}</span>
        </p>
      </nav>
      <h1 className="text-primary font-bold text-3xl mb-4">{blog.title}</h1>
      <div className="flex justify-between items-center border-t border-b border-dashed py-2 mb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">
            {format(new Date(blog.publishAt), "dd/MM/yyyy")}
          </span>
          <UserIcon className="w-5 h-5" />
          <span className="text-sm">{blog.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          <span className="text-sm">10000</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.contentHTML }} />

      <p className="text-base text-black-100 mb-3 mt-32">
        <strong className="font-bold">
          CÔNG TY TNHH MTV TM SẢN XUẤT I.C.H
        </strong>
      </p>
      <p className="text-base text-black-100 mb-3">
        Văn phòng & Nhà máy: 159 Nguyễn Đình Chiễu, Khóm 3, Phường 4, Sóc Trăng.
      </p>
      <p className="text-base text-black-100 mb-3">Hotline: 094.854.8844</p>
      <p className="text-base text-black-100 mb-3">
        Email: ichcosmetic@gmail.com
      </p>
    </div>
  );
};

export default BlogDetailPage;
