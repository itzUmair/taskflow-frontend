"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function SignIn(values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; data?: any }> {
  try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/signin", {
      ...values,
    });
    cookies().set("auth-token", res.data.token);
    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        data: { cause: "auth", message: error.response?.data.message },
      };
    }
    return {
      success: false,
      data: {
        cuase: "server",
        message: "Something went wrong! Please try again later",
      },
    };
  }
}
