"use client";
import WidthWrapper from "@/components/WidthWrapper";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

const Interest = () => {
  const [inputInterest, setInputInterest] = useState<string>("");
  const [listInterest, setListInterest] = useState<string[]>([]);

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
