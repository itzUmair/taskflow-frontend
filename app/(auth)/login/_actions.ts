"use server";

import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignIn(values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; data?: any } | undefined> {
  let redirectPath = null;
  try {
    const res = await axios.post("/auth/signin", {
      ...values,
    });
    const secondsIn7Days = 7 * 24 * 60 * 60;
    cookies().set("authtoken", res.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: secondsIn7Days,
    });
    redirectPath = "/dashboard";
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
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}
