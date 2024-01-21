"use client";
import WidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username or email must be at least 6 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type TUserSchema = z.infer<typeof UserSchema>;

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserSchema>({
    resolver: zodResolver(UserSchema),
  });

  const handleLogin = ({ username, password }: TUserSchema) => {
    // TODO LOGIN WITH API
    console.log({ username, password });

    router.push("/profile");
  };

  return (
    <div className="py-12 w-full">
      <WidthWrapper className="px-0 max-w-[450px]">
        <div className="flex flex-row gap-1 items-center">
          <Link href={"/"} className="flex flex-row gap-1 items-center">
            <ChevronLeft size={24} />
            <span className="font-back">Back</span>
          </Link>
        </div>
        <div className="my-5 mx-10 mt-20">
          <h1 className="font-back text-2xl">Login</h1>
        </div>
        <div className="mx-auto px-4 w-full">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="grid gap-2 animate-in duration-500 fade-in-5">
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-3 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40"
                  )}
                  placeholder="Enter Username/Email"
                  {...register("username")}
                />
                {errors?.username && (
                  <span className="text-xs text-gray-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-3 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40 "
                  )}
                  placeholder="Enter Password"
                  type="password"
                  {...register("password")}
                />
                {errors?.password && (
                  <span className="text-xs text-gray-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1 py-4">
                <Button
                  type="submit"
                  variant={"default"}
                  size={"lg"}
                  className="text-base font-bold bg-button rounded-lg shadow-xl shadow-gray-600"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>

          <div className="flex justify-center items-center mt-10">
            <span className="text-sm">
              No account?{" "}
              <Link
                href={"/register"}
                className="!underline decoration-inherit underline-offset-[3px]"
              >
                <span className="gold text-transparent bg-clip-text">
                  Register here
                </span>
              </Link>
            </span>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Login;
