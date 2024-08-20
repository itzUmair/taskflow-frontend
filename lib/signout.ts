"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function SignOut() {
  cookies().set("authtoken", "", { expires: 0 });
  redirect("/");
}

export default SignOut;
