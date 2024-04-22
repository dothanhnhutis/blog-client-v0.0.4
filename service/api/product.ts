"use server";
import { generateQuery } from "@/lib/utils";
import { Product, ProductFormPayload, ProductQuery } from "@/schemas/product";
import { revalidatePath } from "next/cache";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import { cookies } from "next/headers";

type QueryProductType = {
  category?: string;
  page?: string;
  slug?: string;
};

export const getProductByIdOrSlug = async (slug: string) => {
  try {
    const { data } = await http.get<Product | null>("/products/" + slug, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const { data } = await http.get<Product[]>("/products", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const queryProduct = async (props: QueryProductType) => {
  try {
    const { data } = await http.get<ProductQuery>(
      "/products/query" + generateQuery(props),
      {
        headers: {
          Cookie: cookiesServer(cookies().getAll()),
        },
      }
    );
    return data;
  } catch (error) {
    return {
      products: [],
      metadata: {
        hasNextPage: false,
        totalPage: 0,
      },
    };
  }
};

export const createProduct = async (data: ProductFormPayload) => {
  try {
    const res = await http.post<{ message: string }>("/products", data, {
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

export const editProduct = async (id: string, data: ProductFormPayload) => {
  try {
    const res = await http.patch<{ message: string }>("/products/" + id, data, {
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
