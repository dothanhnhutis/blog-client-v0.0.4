import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";
import { isEmpty } from "lodash";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();
export const generateSlug = (name: string) => {
  return slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g, locale: "vi" });
  // return slugger.slug(
  //   slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g, locale: "vi" })
  // );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function awaitCustom(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateQuery(query: Record<string, string>) {
  return isEmpty(query) ? "" : "?" + new URLSearchParams(query).toString();
}

export const getAspectRatio = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = document.createElement("img");
    img.src = url;
    img.onload = function (event) {
      resolve(img.width / img.height);
    };
    img.onerror = () => {
      reject("There was some problem with the image.");
    };
  });
};

export const getData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject("There was some problem with the image.");
    };
  });
};
