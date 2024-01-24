"use client";
import WidthWrapper from "@/components/WidthWrapper";
import axios, { AxiosError } from "axios";
import { ChevronLeft, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { TSession } from "../profile/page";

const Interest = () => {
  const router = useRouter();

  const [inputInterest, setInputInterest] = useState<string>("");
  const [listInterest, setListInterest] = useState<string[]>([]);
  const { data: session, status } = useSession();

  const profile: TSession | null = session?.user as TSession;

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    setListInterest(profile?.data?.interests);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputInterest(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputInterest.trim() !== "") {
      e.preventDefault();
      setListInterest([...listInterest, inputInterest.trim()]);
      setInputInterest("");
    }
  };

  const handleTagClick = (clickedTag: string) => {
    setListInterest(listInterest.filter((tag) => tag !== clickedTag));
  };

  const handleSave = () => {
    const data = JSON.stringify({
      interests: listInterest,
    });

    let axiosConfig = {
      method: "PUT",
      url: "https://techtest.youapp.ai/api/updateProfile",
      headers: {
        "Content-Type": "application/json",
        //@ts-expect-error
        "x-access-token": session?.accessToken,
      },
      data: data,
    };

    const fetchdata = async () => {
      try {
        const res = await axios.request(axiosConfig);

        if (res.status !== 201 && res.status !== 200) {
          toast("Error while saving, please try again");
        } else {
          router.refresh();
          toast("Saved");
          router.push("/profile");
        }
      } catch (error) {
        toast("Error while saving, please try again");
        if (error instanceof AxiosError) {
          throw new Error(
            `${error.code}: Something went wrong ${error.message}`
          );
        }
        throw new Error("Something went wrong");
      }
    };

    fetchdata();
  };

  return (
    <div className="py-12 w-full animate-in duration-500 fade-in-5">
      <div className="flex flex-row justify-between items-center px-2">
        <div className="flex flex-row gap-1 items-center">
          <Link href={"/"} className="flex flex-row gap-1 items-center">
            <ChevronLeft size={24} />
            <span className="font-back">Back</span>
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center px-3">
          <button
            onClick={handleSave}
            className="text-sm font-semibold bg-gradient-to-tl from-blue-400 to-blue-100 text-transparent bg-clip-text "
          >
            Save
          </button>
        </div>
      </div>
      <WidthWrapper className="px-5">
        <div className="relative mt-5 min-w-[300px] max-w-[500px] rounded-lg overflow-hidden object-cover">
          <div className="flex flex-col gap-3 mx-4 my-10 mt-14">
            <h3 className="font-back gold bg-clip-text text-transparent">
              Tell everyone about yourself
            </h3>
            <h2 className="text-xl font-bold ">What interest you?</h2>
          </div>

          {/* INPUT INTEREST */}
          <div className="w-full bg-white bg-opacity-5 !rounded-lg px-5 py-2 text-sm ring-gray-500 border border-gray-600 flex flex-row flex-wrap">
            {listInterest ? (
              <div className="flex flex-row flex-wrap gap-2">
                {listInterest.map((tag) => (
                  <div
                    key={tag}
                    className="flex flex-row bg-gray-700 p-2 px-2 pr-1 gap-2 rounded-md items-center text-xs font-semibold"
                  >
                    <span>{tag}</span>
                    <X
                      size={16}
                      onClick={() => handleTagClick(tag)}
                      className=" cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <input
              type="text"
              value={inputInterest}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className=" w-full bg-transparent outline-none border-none py-2"
            />
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Interest;
