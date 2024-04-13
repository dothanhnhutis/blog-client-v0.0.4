import { SignInDataType, SignInResType } from "@/schemas/auth";
import { FetchHttpError, http } from "@/service/http";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignInDataType;
    const { data, headers } = await http.post<SignInResType>(
      "/auth/signin",
      body
    );
    return Response.json(
      { message: data.message },
      {
        status: 200,
        headers: { "Set-Cookie": headers.get("set-cookie") || "" },
      }
    );
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return Response.json(error.serialize(), {
        status: error.serialize().statusCode,
      });
    }

    return Response.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
