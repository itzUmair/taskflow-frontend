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
    const secondsIn7Days = 7 * 24 * 60 * 60;
    cookies().set("authtoken", res.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: secondsIn7Days,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
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
