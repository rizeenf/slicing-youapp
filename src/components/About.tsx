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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const GenderSchema = z.enum(["male", "female"]);
const AboutSchema = z.object({
  displayName: z
    .string()
    .min(3, { message: "Display name must be at least 3 characters" }),
  gender: GenderSchema,
  birthday: z.date(),
  height: z.number().min(2, { message: "Please specify your height" }),
  weight: z.number().min(1, { message: "Please specify your weight" }),
});

type TAboutSchema = z.infer<typeof AboutSchema>;

const About = () => {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAboutSchema>({
    resolver: zodResolver(AboutSchema),
  });

  const handleSave = ({
    displayName,
    birthday,
    gender,
    height,
    weight,
  }: TAboutSchema) => {
    console.log({ displayName, height, weight });
    setIsAboutOpen((prev) => !prev);
  };

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
          ) : null}
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
                <form
                  onSubmit={handleSubmit(handleSave)}
                  className="w-full flex flex-col gap-3 text-sm font-medium"
                >
                  <div className="flex items-center">
                    <label
                      htmlFor="name"
                      className="text-muted-foreground w-1/3"
                    >
                      Display name:
                    </label>
                    <div className="flex flex-col w-2/3">
                      <input
                        type="text"
                        id="name"
                        className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                        placeholder="Enter name"
                        {...register("displayName")}
                      />
                      {errors?.gender && (
                        <span className="text-xs text-gray-500">
                          {errors.gender.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="gender"
                      className="text-muted-foreground w-1/3"
                    >
                      Gender:
                    </label>
                    <div className="flex flex-col w-2/3">
                      <Select>
                        <SelectTrigger
                          dir="rtl"
                          className=" bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 !text-right border border-gray-600 !appearance-none placeholder:text-right "
                        >
                          <SelectValue
                            className="text-white !text-opacity-40"
                            placeholder="Select Gender"
                            // {...register("gender")}
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
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors?.gender && (
                        <span className="text-xs text-gray-500">
                          {errors.gender.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Birthday:
                    </label>
                    <div className="flex flex-col w-2/3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className=" bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 text-right border border-gray-600">
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
                            selected={date}
                            onSelect={setDate}
                            mode="single"
                            initialFocus
                            {...register("birthday")}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors?.birthday && (
                        <span className="text-xs text-gray-500">
                          {errors.birthday.message}
                        </span>
                      )}
                    </div>

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
                    <div className="flex flex-col w-2/3">
                      <input
                        type="number"
                        className=" bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                        placeholder="Add height"
                        {...register("height", { valueAsNumber: true })}
                      />
                      {errors?.height && (
                        <span className="text-xs text-gray-500">
                          {errors.height.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="text-muted-foreground w-1/3">
                      Weight:
                    </label>
                    <div className="flex flex-col w-2/3">
                      <input
                        type="number"
                        className="bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                        placeholder="Add weight"
                        {...register("weight", { valueAsNumber: true })}
                      />
                      {errors?.weight && (
                        <span className="text-xs text-gray-500">
                          {errors.weight.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-xs !m-0 !p-0 gold text-transparent bg-clip-text"
                    type="submit"
                  >
                    Save & Update
                  </button>
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
