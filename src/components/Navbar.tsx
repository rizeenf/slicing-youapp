"use client";
import { TSession } from "@/app/profile/page";
import { ChevronLeft, Diamond } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "loading") {
    return null;
  }

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };
  const profile: TSession | null = session?.user as TSession;

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-1 items-center">
        <Link href={"/"} className="flex flex-row gap-1 items-center">
          <ChevronLeft size={24} />
          <span className="font-back">Back</span>
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center">
        <span className="font-back">
          {status == "authenticated" ? profile?.data?.name : "Not logged in"}
        </span>
      </div>
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
