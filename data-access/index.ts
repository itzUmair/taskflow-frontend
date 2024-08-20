import { User } from "@/types";
import axios from "@/lib/axios";

export const getAuthToken = async (email: string, password: string) => {
  try {
    const resp = await axios.post("/auth/signin", {
      email,
      password,
    });
    return resp.data.user;
  } catch (error) {
    return null;
  }
};

export const getUserDataByToken = async (
  token: string
): Promise<User | null> => {
  try {
    const resp = await axios.get(`/users/${token}`);
    return resp.data.user as User;
  } catch (error) {
    return null;
  }
};
