"use server";
import { Category, MutationCategoryResponse } from "@/schemas/category";
import { revalidatePath } from "next/cache";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import { cookies } from "next/headers";

export const getAllCategory = async () => {
  try {
    const { data } = await http.get<Category[]>("/categories", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const editCategory = async (
  id: string,
  data: { name: string; slug: string }
) => {
  try {
    const res = await http.patch<{ message: string }>(
      "/categories/" + id,
      data,
      {
        headers: {
          Cookie: cookiesServer(cookies().getAll()),
        },
      }
    );
    revalidatePath("/manager/products");
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

export const createCategory = async (data: { name: string; slug: string }) => {
  try {
    const res = await http.post<MutationCategoryResponse>("/categories", data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/products");
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

export const deleteCategory = async (id: string) => {
  try {
    const res = await http.delete<MutationCategoryResponse>(
      "/categories/" + id,
      {
        headers: {
          Cookie: cookiesServer(cookies().getAll()),
        },
      }
    );
    revalidatePath("/manager/products");
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
