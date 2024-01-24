import About from "@/components/About";
import Interest from "@/components/Interest";
import Navbar from "@/components/Navbar";
import WidthWrapper from "@/components/WidthWrapper";
import { authOptions } from "@/utils/nextAuthOptions";
import { format } from "date-fns";
import { PencilLine } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

interface UserData {
  email: string;
  username: string;
  name: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
}

export type TSession = {
  accessToken?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  message?: string | null | undefined;
  data: UserData;
};

const Profile = async () => {
  const session = await getServerSession(authOptions);

  const profile: TSession | null = session?.user as TSession;

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="py-12 w-full animate-in duration-500 fade-in-5">
      <WidthWrapper>
        <Navbar />
        <div className="relative mt-5 min-w-[300px] max-w-[500px] rounded-lg aspect-video overflow-hidden object-cover">
          {profile ? (
            <Image
              src={"/no-image.jpg"}
              alt="Profile Image"
              fill
              className="opacity-5 object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-[#162329] min-w-[400px] max-w-[500px] h-full aspect-video"
            />
          )}
          <div className="absolute inset-x-2 bottom-2">
            <h2 className="font-back text-base">
              {profile?.data?.name
                ? `@${profile?.data?.username}, ${
                    parseInt(format(new Date(), "yyyy")) -
                    parseInt(format(profile?.data?.birthday, "yyyy"))
                  }`
                : "@username,"}
            </h2>
            <div className="flex flex-row gap-2">
              <div className="bg-gray-800 p-2 px-4 mt-2 rounded-2xl ">
                <h2 className="font-back text-xs ">
                  {profile?.data?.name ? `${profile?.data?.horoscope}` : null}
                </h2>
              </div>
              <div className="bg-gray-800 p-2 px-4 mt-2 rounded-2xl ">
                <h2 className="font-back text-xs ">
                  {profile?.data?.name ? `${profile?.data?.zodiac}` : null}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <About />

        <Interest />
      </WidthWrapper>
    </div>
  );
};

export default Profile;
