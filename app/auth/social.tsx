"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BsGithub } from "react-icons/bs";
import { SiGoogle } from "react-icons/si";

const Social = () => {
  const onClick = () => {};
  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" onClick={() => onClick()}>
          <BsGithub className="mr-2 h-5 w-5" /> Github
        </Button>
        <Button type="button" variant="outline" onClick={() => onClick()}>
          <SiGoogle className="mr-2 h-5 w-5" />
          Google
        </Button>
      </div>
    </div>
  );
};

export default Social;
