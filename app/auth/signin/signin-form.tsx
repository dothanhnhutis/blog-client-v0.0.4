"use client";
import { z } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { CardWrapper } from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SignInResType, siginSchema } from "@/schemas/auth";
import FormError from "../form-error";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FetchHttpError, http } from "@/service/http";

const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const [form, setForm] = useState<z.infer<typeof siginSchema>>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError(undefined);
  }, [form]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      try {
        await http.post<SignInResType>("/api/auth/signin", form, {
          baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
        });
        router.push(DEFAULT_LOGIN_REDIRECT);
      } catch (error) {
        if (error instanceof FetchHttpError) {
          setError(error.message);
        } else {
          console.log(error);
        }
      }
    });
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <CardWrapper
      headerLaybel="Sign In"
      headerDescription="Enter your email and password below to sign in your account"
    >
      <form className="flex flex-col gap-y-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            className="focus-visible:ring-transparent"
            value={form.email}
            onChange={handleOnchange}
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div
            className={cn(
              "flex h-10 px-3 py-1 border rounded-md overflow-hidden gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              disabled={isPending}
              value={form.password}
              onChange={handleOnchange}
              type={isHiddenPassword ? "password" : "text"}
              className="flex-grow outline-none bg-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="********"
            />
            <button
              disabled={isPending}
              type="button"
              className="disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsHiddenPassword((prev) => !prev)}
            >
              {isHiddenPassword ? (
                <PiEyeClosedBold size={20} />
              ) : (
                <PiEyeBold size={20} />
              )}
            </button>
          </div>
        </div>
        <FormError message={error} />
        <Button
          disabled={isPending || !siginSchema.safeParse(form).success}
          variant="default"
          type="submit"
        >
          {isPending ? (
            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </CardWrapper>
  );
};

export default SignInForm;
