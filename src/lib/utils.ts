import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// @ts-ignore
export const fetcher = (...args) => {
  console.log(args);
  // @ts-ignore
  return fetch(...args).then((res) => res.json());
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    // @ts-ignore
    const found = parts.pop().split(";").shift();
    return found;
  }
  return undefined;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const convertDateUTC = (date: string) => {
  const rawDate = new Date(date);
  return Date.UTC(
    rawDate.getFullYear(),
    rawDate.getMonth(),
    rawDate.getDate(),
    rawDate.getHours(),
    rawDate.getMinutes(),
    rawDate.getSeconds(),
    rawDate.getMilliseconds(),
  );
};
