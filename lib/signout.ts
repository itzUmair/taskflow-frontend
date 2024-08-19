"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function SignOut() {
  cookies().set("auth-token", "", { expires: 0 });
  redirect("/");
}

export default SignOut;
