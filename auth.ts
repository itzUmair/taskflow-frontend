import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

class CustomError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return axios
          .post("http://localhost:8080/api/v1/auth/signin", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            const user = response.data.user;
            cookies().set("user", JSON.stringify(user), { httpOnly: true });
            return user;
          })
          .catch((error) => {
            throw new CustomError("Authentication error");
          });
      },
    }),
  ],
});
