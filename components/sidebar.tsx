"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const SideBar = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground px-1 lg:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SideBarGroup = ({
  label,
  children,
  className,
}: {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " p-1 flex flex-col gap-1 border-b last:border-none lg:border-none",
        className
      )}
    >
      {label && (
        <Label className="hidden lg:block lg:text-xs lg:font-medium">
          {label}
        </Label>
      )}
      {children}
    </div>
  );
};

export const SideBarLink = ({
  type = "link",
  href,
  isActive,
  children,
  className,
  title,
  icon,
}: {
  type?: "link" | "sublink";
  href: string;
  icon: JSX.Element;
  title: string;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center px-2 py-1.5 rounded-md",
              isActive
                ? type == "link"
                  ? "bg-accent text-accent-foreground"
                  : "text-primary"
                : type == "link"
                ? "hover:bg-accent hover:text-accent-foreground"
                : "hover:text-primary",
              className
            )}
          >
            {icon && icon}
            <span className="text-base font-normal hidden lg:inline">
              {title}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent align="center" side="right" className="lg:hidden">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SideBarDropDownWrapperContext = createContext<{
  open: boolean;
  handleToggle: () => void;
}>({
  open: false,
  handleToggle() {},
});

export const SideBarDropDown = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <SideBarDropDownWrapperContext.Provider value={{ open, handleToggle }}>
      {children}
    </SideBarDropDownWrapperContext.Provider>
  );
};

export const SideBarDropDownTrigger = ({
  name,
  children,
  className,
  isActive,
  asChild,
}: {
  name: string;
  children?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  asChild?: boolean;
}) => {
  const { open, handleToggle } = useContext(SideBarDropDownWrapperContext);
  return (
    <div
      className={cn(
        "flex items-center px-2 py-1.5 rounded-md ",
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={handleToggle}
    >
      {asChild ? (
        children
      ) : (
        <span className="text-base font-normal">{children ?? name}</span>
      )}
      <ChevronDown
        className={cn(
          "flex flex-shrink-0 ml-auto w-4 h-4 transition duration-200",
          open ? "rotate-180" : ""
        )}
      />
    </div>
  );
};

export const SideBarDropDownContent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { open } = useContext(SideBarDropDownWrapperContext);
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] ease-out duration-300 ",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </div>
  );
};
