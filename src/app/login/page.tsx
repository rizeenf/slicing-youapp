"use client";

import { signIn } from "next-auth/react";

import WidthWrapper from "@/components/WidthWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { TUserSchema, UserSchema } from "@/lib/user-login-schema";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserSchema>({
    resolver: zodResolver(UserSchema),
  });

  const handleLogin = async ({ username, password }: TUserSchema) => {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        email: username.includes("@") ? username : "",
        username: username.includes("@") ? "" : username,
        password,

        redirect: false,
      });

      if (result?.error) {
        toast("User not found", {
          action: {
            label: "Close",
            onClick: () => console.log(),
          },
        });
      } else {
        toast("Logged in successfully", {
          action: {
            label: "Close",
            onClick: () => console.log(),
          },
        });
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                  type="submit"
                  variant={"default"}
                  size={"lg"}
                  className="text-base font-bold bg-button rounded-lg shadow-xl shadow-gray-600"
                >
                  {isLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : null}
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
