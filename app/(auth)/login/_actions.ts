"use server";

import { signIn } from "@/auth";
import { AxiosError } from "axios";

export async function SignIn(values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    await signIn("credentials", values);
    return { success: true };
  } catch (error) {
    return { success: false, message: "some error" };
  }
}
