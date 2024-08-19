"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Signup } from "./_action";

const formSchema = z.object({
  fname: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name is too long" }),
  lname: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name is too long" }),
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

function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const router = useRouter();

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await Signup(values);
    if (response.success) {
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push("/login");
    }
    if (!response.success) {
      if (response.data.cause === "auth") {
        form.setError("email", {
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
  };

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className=" font-bold text-xl">Register</CardTitle>
        <CardDescription>Fill the form to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-y-2"
          >
            <div className="flex flex-col md:flex-row gap-x-2">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" maxLength={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Doe" maxLength={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full">
          Already have an account?&nbsp;
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
