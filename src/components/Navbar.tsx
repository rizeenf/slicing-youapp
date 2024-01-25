"use client";
import { ChevronLeft, Diamond, Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TSession } from "@/types/Session";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };
  const profile: TSession | null = session?.user as TSession;

  return (
    <div className="flex flex-row justify-between items-center min-w-[300px] max-w-[500px]">
      <div className="flex flex-row gap-1 items-center">
        <Link href={"/"} className="flex flex-row gap-1 items-center">
          <ChevronLeft size={24} />
          <span className="font-back">Back</span>
        </Link>
      </div>

      {status == "loading" ? (
        <div className=" flex justify-center items-center h-40 w-full ">
          <Loader2 className="w-5 h-5 animate-spin mr-1 opacity-40" />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <span className="font-back">
            {status == "authenticated" ? profile?.data?.name : "Not logged in"}
          </span>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row gap-[2px] mr-2 py-2">
            <Diamond size={6} fill="#fff" />
            <Diamond size={6} fill="#fff" />
            <Diamond size={6} fill="#fff" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-gray-800 flex text-white "
        >
          <DropdownMenuItem onClick={handleLogout} className="w-full">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
