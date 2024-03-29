import About from "@/components/About";
import Interest from "@/components/Interest";
import Navbar from "@/components/Navbar";
import WidthWrapper from "@/components/WidthWrapper";
import { TSession } from "@/types/Session";
import { authOptions } from "@/utils/nextAuthOptions";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  const profile: TSession | null = session?.user as TSession;

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="py-12 w-full animate-in duration-500 fade-in-5">
      <div className="flex flex-col justify-center items-center self-center">
        <WidthWrapper className="min-w-[300px] max-w-[500px]">
          <Navbar />
          <div className="relative mt-5  rounded-lg aspect-video overflow-hidden object-cover">
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
                      2024 - parseInt(format(profile?.data?.birthday, "yyyy"))
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
    </div>
  );
};

export default Profile;
