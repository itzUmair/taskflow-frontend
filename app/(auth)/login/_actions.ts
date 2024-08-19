"use server";

import { signIn } from "@/auth";
import { AxiosError } from "axios";
import { AuthError } from "next-auth";

export async function SignIn(values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    await signIn("credentials", values);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: error as any };
  }
}

// TODO: add custom authentication rather than next auth
