"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const About = () => {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div
      className={cn(
        "relative mt-5 min-w-[300px] max-w-[500px] h-40 min-h-full rounded-lg overflow-hidden object-cover bg-[#0E191F] transition-all duration-500",
        {
          "h-[38rem] min-h-fit": !isAboutOpen,
        }
      )}
    >
      <>
        <div className="flex flex-row justify-between items-center ml-5 m-3">
          <h3 className="font-back">About</h3>

          {isAboutOpen ? (
            <PencilLine
              size={18}
              className=" text-white cursor-pointer"
              onClick={() => setIsAboutOpen((prev) => !prev)}
            />
          ) : (
            <button
              className="text-xs !m-0 !p-0 gold text-transparent bg-clip-text"
              onClick={() => setIsAboutOpen((prev) => !prev)}
            >
              Save & Update
            </button>
          )}
        </div>
        <div className="flex flex-row justify-between mx-5 m-3">
          {isAboutOpen ? (
            <span className="text-muted-foreground mr-10">
              Add in your your to help others know you better know you better
              know you better
            </span>
          ) : (
            <div className="w-full flex flex-col ">
              <div className="flex flex-row items-center">
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-row justify-center items-center gap-3"
                >
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="image h-[4.5rem] bg-gray-800 rounded-3xl aspect-square flex items-center justify-center self-center">
                    <span className="font-extralight text-5xl m-0 p-0 gold block text-transparent bg-clip-text">
                      +
                    </span>
                  </div>
                  <span className="text-sm">Add image</span>
                </label>
              </div>
              <div className="grid gap-1 my-10">
                <form className="w-full flex flex-col gap-3 text-sm font-medium">
                  <div className="flex items-center">
                    <label
                      htmlFor="name"
                      className="text-muted-foreground w-1/3"
                    >
                      Display name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="gender"
                      className="text-muted-foreground w-1/3"
                    >
                      Gender:
                    </label>
                    <Select>
                      <SelectTrigger
                        dir="rtl"
                        className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 !text-right border border-gray-600 !appearance-none placeholder:text-right "
                      >
                        <SelectValue
                          className="text-white !text-opacity-40"
                          placeholder="Select Gender"
                        />
                      </SelectTrigger>
                      <SelectContent
                        dir="rtl"
                        position="popper"
                        sideOffset={5}
                        align="end"
                        className={
                          "bg-gray-800 border-none text-white outline-none"
                        }
                      >
                        <SelectItem value="male" className=" ">
                          Male
                        </SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Birthday:
                    </label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 text-right border border-gray-600">
                          {date ? (
                            format(date, "dd MM yyyy")
                          ) : (
                            <span className="text-gray-500">DD MM YYYY</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-color text-white px-2">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={2020}
                          selected={date}
                          onSelect={setDate}
                          mode="single"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {/* <input
                      type="text"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      placeholder="DD MM YYYY"
                    /> */}
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Horoscope:
                    </label>
                    <input
                      type="text"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      disabled
                      placeholder="--"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Zodiac:
                    </label>
                    <input
                      type="text"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      disabled
                      placeholder="--"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Height:
                    </label>
                    <input
                      type="text"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      placeholder="Add height"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Weight:
                    </label>
                    <input
                      type="text"
                      className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                      placeholder="Add weight"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default About;
