"use client";
import WidthWrapper from "@/components/WidthWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UserRegisterSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    cpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password should match",
    path: ["cpassword"],
  });
type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const handleRegister = ({
    username,
    password,
    email,
  }: TUserRegisterSchema) => {
    const data = JSON.stringify({
      email,
      username,
      password,
    });

    let axiosConfig = {
      method: "POST",
      url: "https://techtest.youapp.ai/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const fetch = async () => {
      try {
        const res = await axios.request(axiosConfig);

        if (res.data.statusCode == 400)
          toast("Password must be at least 8 characters");

        if (res.data.message == "User already exists")
          toast("Username or email already exists. Please sign in instead");

        if (res.data.message == "User has been created successfully") {
          toast("Register successfully");
          router.push("/login");
        }

        console.log({ res });
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            `${error.code}: Something went wrong ${error.message}`
          );
        }
        throw new Error("Something went wrong");
      }
    };

    fetch();
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
          <h1 className="font-back text-2xl">Register</h1>
        </div>
        <div className="mx-auto px-4 w-full">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="grid gap-2 animate-in duration-500 fade-in-5">
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40"
                  )}
                  placeholder="Enter Email"
                  {...register("email")}
                />
                {errors?.email && (
                  <span className="text-xs text-gray-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40"
                  )}
                  placeholder="Create Username"
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
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40 "
                  )}
                  placeholder="Create Password"
                  type="password"
                  {...register("password")}
                />
                {errors?.password && (
                  <span className="text-xs text-gray-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40 "
                  )}
                  placeholder="Confirm Password"
                  type="password"
                  {...register("cpassword")}
                />
                {errors?.cpassword && (
                  <span className="text-xs text-gray-500">
                    {errors.cpassword.message}
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
                  Register
                </Button>
              </div>
            </div>
          </form>

          <div className="flex justify-center items-center mt-10">
            <span className="text-sm">
              Have an account?{" "}
              <Link
                href={"/login"}
                className="!underline decoration-inherit underline-offset-[3px]"
              >
                <span className="gold text-transparent bg-clip-text">
                  Login here
                </span>
              </Link>
            </span>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Register;
