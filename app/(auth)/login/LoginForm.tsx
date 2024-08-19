"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignIn } from "./_actions";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" })
    .email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password is too long" }),
});

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onsubmit(values: z.infer<typeof formSchema>) {
    const response = await SignIn(values);
    console.log(response);
  }

  return (
    <Card className="w-[500px] mx-auto mt-8 md:mt-16">
      <CardHeader>
        <CardTitle className=" font-bold text-xl">Login</CardTitle>
        <CardDescription>
          Login to continue managing your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex gap-x-2">
                    <FormControl>
                      <Input
                        {...field}
                        type={isShowPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setIsShowPassword((prevState) => !prevState)
                      }
                    >
                      {isShowPassword ? (
                        <EyeOpenIcon width={25} height={25} />
                      ) : (
                        <EyeClosedIcon width={25} height={25} />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
