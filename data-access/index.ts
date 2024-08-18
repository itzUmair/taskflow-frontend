import axios from "axios";

export const getAuthToken = async (email: string, password: string) => {
  try {
    const resp = await axios.post("http://localhost:8080/api/v1/auth/signin", {
      email,
      password,
    });
    return resp.data.user;
  } catch (error) {
    return null;
  }
};
