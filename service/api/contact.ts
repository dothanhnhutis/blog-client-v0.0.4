"use server";
import { cookies } from "next/headers";
import { FetchHttpError, http } from "../http";
import { cookiesServer } from "../cookieSession";
import {
  Contact,
  CreateContact,
  EditContact,
  QueryContact,
} from "@/schemas/contact";
import { generateQuery } from "@/lib/utils";

export const createContact = async (data: CreateContact) => {
  try {
    const res = await http.post<{ message: string }>("/contacts", data);
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

export const getContact = async (data?: QueryContact) => {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<Contact[]>("/contacts/" + generateQuery(data), {
      headers: {
        Cookie: cookiesServer(allCookies),
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.code);
    return [];
  }
};

export const editContact = async (id: string, data: EditContact) => {
  const allCookies = cookies().getAll();
  try {
    const res = await http.patch<{ message: string }>("/contacts/" + id, data, {
      headers: {
        Cookie: cookiesServer(allCookies),
      },
    });
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
