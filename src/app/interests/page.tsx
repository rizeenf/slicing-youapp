import WidthWrapper from "@/components/WidthWrapper";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const Interest = () => {
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
          <button className="text-sm font-semibold bg-gradient-to-tl from-blue-400 to-blue-100 text-transparent bg-clip-text ">
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
          <div>
            <textarea
              rows={2}
              className="w-full bg-white bg-opacity-5 rounded-lg px-5 py-3 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-gray-600 border-none outline-none "
              value={<span> Wkkwkw</span>}
            >
              <div className="flex flex-wrap flex-row gap-1 w-full px-5">
                <div className="input">
                  <span>Music</span>
                  <X />
                </div>
              </div>
            </textarea>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Interest;
