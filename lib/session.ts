"use server";

import { cookies } from "next/headers";

async function getSession() {
  const token = cookies().get("authtoken");
  if (!token) return null;
  return token.value;
}

export { getSession };
