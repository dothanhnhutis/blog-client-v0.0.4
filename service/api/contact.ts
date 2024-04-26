"use server";
import { cookies } from "next/headers";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import { CreateContact } from "@/schemas/contact";

export const createContact = async (data: CreateContact) => {
  try {
    const res = await http.post<{ message: string }>("/contacts/", data);
    return {
      statusCode: res.status,
      message: res.data.message,
    };
  } catch (error: any) {
    console.log(error.code);
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
