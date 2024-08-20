"use server";

import { AxiosError } from "axios";
import axios from "@/lib/axios";

export async function Signup(values: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    await axios.post("/auth/signup", {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      password: values.password,
    });
    return {
      success: true,
      data: { message: "Account created successfully! Try Loging in" },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return {
          success: false,
          data: { cause: "auth", message: error.response.data.message },
        };
      }
      if (error.response?.status === 401) {
        return {
          success: false,
          data: { cause: "auth", message: error.response.data.message },
        };
      } else {
        console.log(error);
        return {
          success: false,
          data: {
            cause: "server",
            message: "Something went wrong! Please try again later",
          },
        };
      }
    }
    return {
      success: false,
      data: {
        cause: "server",
        message: "Something went wrong! Please try again later",
      },
    };
  }
}
