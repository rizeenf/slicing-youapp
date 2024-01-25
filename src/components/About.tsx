"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { Loader2, PencilLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AboutSchema, TAboutSchema } from "@/lib/user-details-schema";
import { TSession } from "@/types/Session";

const About = () => {
  const router = useRouter();
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isPending, setPending] = useState<boolean>(false);
  const { data: session, status, update } = useSession();
  const [isTransitionStarted, startTransition] = useTransition();

  let profile: TSession | null = session?.user as TSession;

  const isMutating = isPending || isTransitionStarted;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
    const data = JSON.stringify({
      name: displayName,
      birthday: date && format(date, "MM dd yyyy"),
      height,
      weight,
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

        if (res.status == 201 || res.status == 200) {
          setPending(true);
          await update({
            ...session,
            user: {
              ...session?.user,
              data: res.data,
            },
          });

          startTransition(() => {
            router.push("/profile");
            toast("Saved");
          });
        }
      } catch (error) {
        toast("Error while saving, please try again");

        if (error instanceof AxiosError) {
          throw new Error(
            `${error.code}: Something went wrong ${error.message}`
          );
        }
        throw new Error("Something went wrong");
      } finally {
        setPending(false);
        router.refresh();
      }
    };

    fetchdata();

    setIsAboutOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "relative mt-5 min-w-[300px] max-w-[500px] h-52 min-h-full rounded-lg overflow-hidden object-cover bg-[#0E191F] transition-all duration-500",
        {
          "h-[40rem] min-h-fit": !isAboutOpen,
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
        {status === "loading" || isMutating ? (
          <div className=" flex justify-center items-center h-40 w-full ">
            <Loader2 className="w-5 h-5 animate-spin mr-1 opacity-40" />
          </div>
        ) : (
          <div className="flex flex-row justify-between mx-5">
            {isAboutOpen ? (
              profile?.data?.name ? (
                <div className="text-sm flex flex-col gap-3 ">
                  <div>
                    <span className="text-muted-foreground">
                      Birthday :{" "}
                      <span className="font font-medium text-white">
                        {format(profile?.data?.birthday, "dd / MM / yyyy")} /
                        (Age{" "}
                        {2024 -
                          parseInt(format(profile?.data?.birthday, "yyyy"))}
                        )
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Horoscope :{" "}
                      <span className="font font-medium text-white">
                        {profile?.data?.horoscope}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Zodiac :{" "}
                      <span className="font font-medium text-white">
                        {profile?.data?.zodiac}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Height :{" "}
                      <span className="font font-medium text-white">
                        {profile?.data?.height} cm
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Weight :{" "}
                      <span className="font font-medium text-white">
                        {profile?.data?.weight} kg
                      </span>
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground mr-10">
                  Add in your your to help others know you better know you
                  better know you better
                </span>
              )
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
                <div className="grid gap-1 my-10 relative">
                  <form
                    onSubmit={handleSubmit(handleSave)}
                    className="w-full flex flex-col gap-3 text-sm font-medium"
                  >
                    <button
                      className="text-xs absolute -top-32 right-1 !m-0 !p-0 gold text-transparent bg-clip-text"
                      type="submit"
                    >
                      Save & Update
                    </button>
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
                          className="bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                          placeholder={profile?.data?.username ?? "Enter name"}
                          {...register("displayName")}
                        />
                        {errors?.displayName && (
                          <span className="text-xs text-gray-500">
                            {errors.displayName.message}
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
                        <select
                          dir="rtl"
                          {...register("gender")}
                          className="bg-gray-800 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 !text-right border border-gray-600 !appearance-none placeholder:text-right"
                        >
                          <option
                            defaultValue={""}
                            className="text-gray-700 !text-opacity-40 placeholder:text-white placeholder:text-opacity-40"
                          >
                            Gender
                          </option>
                          <option
                            value="male"
                            className="bg-gray-800 border-none outline-none text-white !text-opacity-90 bg-opacity-5 !rounded-lg px-5 !py-3"
                          >
                            Male
                          </option>
                          <option
                            value="female"
                            className="bg-gray-800 border-none outline-none text-white !text-opacity-90 bg-opacity-5 !rounded-lg px-5 !py-3"
                          >
                            Female
                          </option>
                        </select>
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
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-end font-normal bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 text-right border border-gray-600 ",
                                !date && "text-muted-foreground"
                              )}
                            >
                              {date ? (
                                format(date, "dd MM yyyy")
                              ) : (
                                <span>
                                  {profile?.data?.birthday ?? "DD MM YYYY"}
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className=" w-auto p-0 bg-color text-white px-2"
                            {...register("birthday")}
                          >
                            <Calendar
                              mode="single"
                              captionLayout="dropdown-buttons"
                              //@ts-expect-error
                              selected={profile?.data?.birthday ?? date}
                              onSelect={setDate}
                              fromYear={1960}
                              toYear={2024}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors?.birthday && (
                          <span className="text-xs text-gray-500">
                            {errors.birthday.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="text-muted-foreground w-1/3">
                        Horoscope:
                      </label>
                      <input
                        type="text"
                        className="w-2/3 bg-white bg-opacity-5 !rounded-lg px-5 py-3 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600"
                        disabled
                        placeholder={profile?.data?.horoscope ?? "--"}
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
                        placeholder={profile?.data?.zodiac ?? "--"}
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="text-muted-foreground w-1/3">
                        Height:
                      </label>
                      <div className="flex flex-col w-2/3">
                        <div className="bg-white bg-opacity-5 !rounded-lg px-5 py-1 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600 flex flex-row items-center">
                          <input
                            type="number"
                            className="bg-white bg-opacity-0 w-full h-full rounded-md py-2 outline-none appearance-none text-right"
                            placeholder="Add height"
                            {...register("height", { valueAsNumber: true })}
                          />
                          {getValues("height") >= 0 ? (
                            <span className="text-xs">cm</span>
                          ) : null}
                        </div>

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
                        <div className="bg-white bg-opacity-5 !rounded-lg px-5 py-1 placeholder:text-sm ring-gray-500 placeholder:text-white placeholder:text-opacity-40 text-right border border-gray-600 flex flex-row items-center">
                          <input
                            type="number"
                            className="bg-white bg-opacity-0 w-full h-full rounded-md py-2 outline-none appearance-none text-right"
                            placeholder="Add weight"
                            {...register("weight", { valueAsNumber: true })}
                          />
                          {getValues("weight") >= 0 ? (
                            <span className="text-xs">kg</span>
                          ) : null}
                        </div>

                        {errors?.weight && (
                          <span className="text-xs text-gray-500">
                            {errors.weight.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default About;
