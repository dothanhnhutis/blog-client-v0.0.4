"use client";
import React, { useTransition } from "react";
import z from "zod";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateUserType } from "@/schemas/user";
import { createUser } from "@/service/api/user";

const CreateUserPage = () => {
  const router = useRouter();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [form, setForm] = React.useState<CreateUserType>({
    email: "",
    password: "",
    isActive: true,
    role: "CUSTOMER",
    name: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await createUser(form);
      if (res.statusCode == 201) {
        toast.success(res.message);
        router.push("/manager/users");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="bg-background p-4 rounded-lg">
      <button
        type="button"
        onClick={() => {
          toast.custom((t) => (
            <div>
              <h1>Custom toast</h1>
              <button onClick={() => toast.dismiss(t)}>Dismiss</button>
            </div>
          ));
        }}
      ></button>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 md:grid-flow-col gap-4">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            onChange={handleOnChange}
            value={form.email}
            id="email"
            name="email"
            type="email"
            className="focus-visible:ring-transparent"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="flex h-10 w-full rounded-md border border-input bg-background overflow-hidden text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <input
              disabled={isPending}
              onChange={handleOnChange}
              value={form.password}
              type={isHiddenPassword ? "password" : "text"}
              className="flex-grow outline-none bg-transparent placeholder:text-muted-foreground px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              placeholder="Password"
              name="password"
            />
            <button
              disabled={isPending}
              className="flex flex-shrink-0 items-center px-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              tabIndex={-1}
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
        <div className="flex flex-col justify-center">
          <p className="font-medium text-sm">Your password must include:</p>
          <p
            className={cn(
              "inline-flex space-x-2 items-center text-gray-500",
              !z.string().min(8).max(40).safeParse(form.password).success
                ? ""
                : "text-green-400"
            )}
          >
            <AiOutlineCheck size={16} />
            <span className="font-medium text-xs">8 to 40 characters</span>
          </p>
          <p
            className={cn(
              "inline-flex space-x-2 items-center text-gray-500",
              !z
                .string()
                .regex(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
                )
                .safeParse(form.password).success
                ? ""
                : "text-green-400"
            )}
          >
            <AiOutlineCheck size={16} />
            <span className="font-medium text-xs">
              Letters, numbers and special characters
            </span>
          </p>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            disabled={isPending}
            onChange={handleOnChange}
            value={form.name}
            id="name"
            name="name"
            className="focus-visible:ring-transparent "
            placeholder="User name"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Role</Label>
          <Select
            disabled={isPending}
            onValueChange={(v) =>
              setForm((prev) => ({
                ...prev,
                role: v as CreateUserType["role"],
              }))
            }
            defaultValue={form.role}
          >
            <SelectTrigger className="focus-visible:ring-transparent">
              <SelectValue placeholder="Select a role to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MANAGER">MANAGER</SelectItem>
              <SelectItem value="WRITER">WRITTER</SelectItem>
              <SelectItem value="CUSTOMER">WRITTER</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex  justify-between space-y-1.5">
          <div>
            <Label htmlFor="status">Active</Label>
            <p className="text-xs font-light text-muted-foreground mt-1">
              Do you want the account to be active immediately after creation?
            </p>
          </div>

          <Switch
            disabled={isPending}
            id="status"
            checked={form.isActive}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, isActive: checked }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-end mt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={
            isPending ||
            form.email.length == 0 ||
            form.name.length == 0 ||
            !z
              .string()
              .min(8)
              .max(40)
              .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
              )
              .safeParse(form.password).success
          }
        >
          {isPending ? (
            <Loader2 className=" h-4 w-4 mx-3.5 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </div>

      {/* <div className="h-[2000px]">sdas</div> */}
    </form>
  );
};

export default CreateUserPage;
