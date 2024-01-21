"use client";
import WidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Register = () => {
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
          <form>
            <div className="grid gap-2 animate-in duration-500 fade-in-5">
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40"
                  )}
                  placeholder="Enter Email"
                />
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40"
                  )}
                  placeholder="Create Username"
                />
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40 "
                  )}
                  placeholder="Create Password"
                  type="password"
                />
              </div>
              <div className="grid gap-1 py-1">
                <input
                  className={cn(
                    "bg-white bg-opacity-5 rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-white placeholder:text-opacity-40 "
                  )}
                  placeholder="Confirm Password"
                  type="password"
                />
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
