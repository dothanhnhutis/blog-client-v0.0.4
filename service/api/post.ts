"use server";
import { generateQuery } from "@/lib/utils";
import { Post, PostFormPayload, PostQuery } from "@/schemas/post";
import { revalidatePath } from "next/cache";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import { cookies } from "next/headers";

type QueryPostType = {
  tag?: string;
  page?: string;
  slug?: string;
};

export const queryPost = async (props: QueryPostType) => {
  try {
    const { data } = await http.get<PostQuery>(
      "/posts/query" + generateQuery(props)
    );
    return data;
  } catch (error: any) {
    return {
      posts: [],
      metadata: {
        hasNextPage: false,
        totalPage: 0,
      },
    };
  }
};

export const getPostById = async (id: string) => {
  try {
    const { data } = await http.get<Post>("/posts/" + id);
    return data;
  } catch (error: any) {
    return undefined;
  }
};

export const getAllPost = async () => {
  try {
    const allCookies = cookies().getAll();

    const { data } = await http.get<Post[]>("/posts", {
      headers: {
        Cookie: cookiesServer(allCookies),
      },
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export const editPost = async (id: string, data: Partial<PostFormPayload>) => {
  try {
    const allCookies = cookies().getAll();
    const res = await http.patch<{ message: string }>("/posts/" + id, data, {
      headers: {
        Cookie: cookiesServer(allCookies),
      },
    });
    revalidatePath("/manager/posts");
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

export const createPost = async (data: PostFormPayload) => {
  try {
    const allCookies = cookies().getAll();
    const res = await http.post<{ message: string }>("/posts", data, {
      headers: {
        Cookie: cookiesServer(allCookies),
      },
    });
    revalidatePath("/manager/posts");
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
