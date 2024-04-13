"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type ContactType = {
  name: string;
  phone: string;
  email: string;
  productName: string;
  description: string;
};

export const ContactForm = () => {
  const [form, setForm] = useState<ContactType>({
    name: "",
    phone: "",
    email: "",
    productName: "",
    description: "",
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name">Tên khách hàng</Label>
        <Input
          placeholder="Tên khách hàng"
          onChange={handleOnchange}
          type="text"
          name="name"
          id="name"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Email"
          onChange={handleOnchange}
          type="email"
          name="email"
          id="email"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div>
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input
          placeholder="Số điện thoại"
          onChange={handleOnchange}
          name="phone"
          id="phone"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div>
        <Label htmlFor="productName">Sản phẩm quan tâm</Label>
        <Input
          placeholder="Sản phẩm quan tâm"
          onChange={handleOnchange}
          name="productName"
          id="productName"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="description">Nội dung</Label>
        <Textarea
          name="description"
          onChange={handleOnchange}
          id="description"
          className="focus-visible:ring-transparent h-[150px]"
          placeholder="Nội dung yêu cầu"
        />
      </div>
      <div className="col-span-2">
        <Button variant="default" className="w-full">
          Gửi yêu cầu
        </Button>
      </div>
    </form>
  );
};
