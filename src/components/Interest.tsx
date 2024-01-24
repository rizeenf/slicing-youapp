"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TSession } from "@/app/profile/page";
import { PencilLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Interest = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      const profile: TSession = session.user as TSession;
      setInterests(profile?.data?.interests || []);
    }
  }, [session]);

  const handleClick = () => {
    router.refresh();
    router.push("/interests");
  };

  return (
    <div className="relative mt-5 min-w-[300px] max-w-[500px] rounded-lg h-40 overflow-hidden object-cover bg-[#0E191F]">
      <div className="flex flex-row justify-between items-center ml-5 m-3">
        <h3 className="font-back">Interest</h3>
        <button onClick={handleClick}>
          <PencilLine size={18} className=" text-white" />
        </button>
      </div>
      <div className="flex flex-row gap-3 flex-wrap mx-5 m-3 mr-10">
        {interests ? (
          interests.map((item) => (
            <div key={item} className=" flex justify-start items-start">
              <div className="bg-gray-800 p-2 px-4 gap-2 rounded-2xl items-center text-xs font-semibold">
                <span>{item}</span>
              </div>
            </div>
          ))
        ) : (
          <span className="text-muted-foreground">
            Add in your your to find better match find better match find better
            match
          </span>
        )}
      </div>
    </div>
  );
};

export default Interest;
