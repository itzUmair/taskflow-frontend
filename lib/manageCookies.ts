import { cookies } from "next/headers";

export function getUserData() {
  const encodedUserData = cookies().get("user")?.value;

  if (!encodedUserData) return;

  const decodedUserData = decodeURIComponent(encodedUserData);
  const userObject = JSON.parse(decodedUserData);
  return userObject;
}
