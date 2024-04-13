"use server";
import { FetchHttpError, errorHandler, http } from "../http";
import { cookies } from "next/headers";
import { cookiesServer } from "../cookieSession";
import {
  CreateUserType,
  EditProfile,
  EditUserType,
  User,
} from "@/schemas/user";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  try {
    const res = await http.get<User>("/users/me", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return res.data;
  } catch (error: any) {
    return undefined;
  }
}

export const getAllUser = async () => {
  try {
    const res = await http.get<User[]>("/users", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export const createUser = async (data: CreateUserType) => {
  try {
    const res = await http.post<{ message: string }>("/users", data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/users");
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

export const getUserById = async (id: string) => {
  try {
    const res = await http.get<User>("/users/" + id, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};

export const editUserById = async (id: string, data: EditUserType) => {
  try {
    const res = await http.patch<{ message: string }>("/users/" + id, data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/manager/users");
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

export const getAllAuthor = async () => {
  try {
    const { data } = await http.get<User[]>("/users/authors", {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const editProfile = async (data: EditProfile) => {
  try {
    const res = await http.patch<{ message: string }>("/users", data, {
      headers: {
        Cookie: cookiesServer(cookies().getAll()),
      },
    });
    revalidatePath("/account/profile");
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
