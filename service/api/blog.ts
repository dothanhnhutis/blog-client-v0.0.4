"use server";
import { generateQuery } from "@/lib/utils";
import { Blog, BlogFormType, BlogQuery } from "@/schemas/blog";
import { revalidatePath } from "next/cache";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import { cookies } from "next/headers";

type QueryBlogType = {
  tag?: string;
  page?: string;
  slug?: string;
};

export const queryBlog = async (props: QueryBlogType) => {
  try {
    const { data } = await http.get<BlogQuery>(
      "/blogs/query" + generateQuery(props),
      {
        headers: {
          Cookie: cookiesServer(cookies().getAll()),
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      blogs: [],
      metadata: {
        hasNextPage: false,
        totalPage: 0,
      },
    };
  }
};

export const getBlogById = async (id: string) => {
  try {
    const { data } = await http.get<Blog>("/blogs/" + id, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};

export const getAllBlog = async () => {
  try {
    const { data } = await http.get<Blog[]>("/blogs", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export const editBlog = async (id: string, data: Partial<BlogFormType>) => {
  try {
    const res = await http.patch<{ message: string }>("/blogs/" + id, data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/blogs");
    return {
      statusCode: res.status,
      message: res.data.message,
    };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.serialize().statusCode,
        message: error.serialize().message,
      };
    } else {
      console.log(error);
      return {
        message: "unknown",
        statusCode: 500,
      };
    }
  }
};

export const createBlog = async (data: BlogFormType) => {
  try {
    const res = await http.post<{ message: string }>("/blogs", data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/blogs");
    return {
      statusCode: res.status,
      message: res.data.message,
    };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.serialize().statusCode,
        message: error.serialize().message,
      };
    } else {
      console.log(error);
      return {
        message: "unknown",
        statusCode: 500,
      };
    }
  }
};
