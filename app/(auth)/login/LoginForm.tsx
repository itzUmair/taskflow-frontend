"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" })
    .email(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" })
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

  const { toast } = useToast();

  async function onsubmit(values: z.infer<typeof formSchema>) {
    const response = await SignIn(values);
    if (!response) return;
    if (!response.success) {
      if (response.data.cause === "auth") {
        form.setError("email", {
          type: "custom",
          message: response.data.message,
        });
        form.setError("password", {
          type: "custom",
          message: response.data.message,
        });
      } else {
        toast({
          title: "An error occured",
          description: response.data.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className=" font-bold text-xl">Login</CardTitle>
        <CardDescription>
          Login to continue managing your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@example.com"
                      maxLength={100}
                    />
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
                  <div className="flex gap-x-2 relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={isShowPassword ? "text" : "password"}
                        placeholder="********"
                        maxLength={100}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 right-4"
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
      <CardFooter>
        <p className="text-center w-full">
          Don&apos;t an account?&nbsp;
          <Link href="/signup" className="underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
