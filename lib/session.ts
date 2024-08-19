"use server";

import { cookies } from "next/headers";

async function getSession() {
  const token = cookies().get("auth-token");
  if (!token) return null;
  return token.value;
}

export { getSession };
