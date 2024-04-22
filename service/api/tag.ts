"use server";
import { FetchHttpError, errorHandler, http } from "../http";
import { cookies } from "next/headers";
import { cookiesServer } from "../cookieSession";
import { MutationTagResponse, Tag } from "@/schemas/tag";
import { revalidatePath } from "next/cache";

export const getAllTag = async () => {
  try {
    const { data } = await http.get<Tag[]>("/tags", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error: any) {
    return [];
  }
};

export const editTag = async (
  id: string,
  data: { name: string; slug: string }
) => {
  try {
    const res = await http.patch<MutationTagResponse>("/tags/" + id, data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
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
      return {
        message: "unknown",
        statusCode: 500,
      };
    }
  }
};

export const createTag = async (data: { name: string; slug: string }) => {
  try {
    const res = await http.post<{ message: string }>("/tags", data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/posts");
    return {
      statusCode: res.status,
      message: res.data.message,
    };
  } catch (error) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.serialize().statusCode,
        message: error.serialize().message,
      };
    } else {
      return {
        message: "unknown",
        statusCode: 500,
      };
    }
  }
};

export const deleteTag = async (id: string) => {
  try {
    const res = await http.delete<{ message: string }>("/tags/" + id, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/posts");
    return {
      statusCode: res.status,
      message: res.data.message,
    };
  } catch (error) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.serialize().statusCode,
        message: error.serialize().message,
      };
    } else {
      return {
        message: "unknown",
        statusCode: 500,
      };
    }
  }
};
