"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

export const fetchData = async (
  endpoint: string,
  method: string = "GET",
  body?: Record<string, unknown>
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "x-authentication-token": AUTH_TOKEN ?? "",
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BACKEND_URL}/api/${endpoint}`, options);
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
