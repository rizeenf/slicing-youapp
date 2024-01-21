import About from "@/components/About";
import WidthWrapper from "@/components/WidthWrapper";
import { ChevronLeft, Diamond, PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const profile = false;

  return (
    <div className="py-12 w-full animate-in duration-500 fade-in-5">
      <WidthWrapper>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <Link href={"/"} className="flex flex-row gap-1 items-center">
              <ChevronLeft size={24} />
              <span className="font-back">Back</span>
            </Link>
          </div>

          <div className="flex flex-row items-center justify-center">
            <span className="font-back">@johndoe</span>
          </div>

          <div className="flex flex-row gap-[2px] mr-2">
            <Diamond size={6} fill="#fff" />
            <Diamond size={6} fill="#fff" />
            <Diamond size={6} fill="#fff" />
          </div>
        </div>
        <div className="relative mt-5 min-w-[300px] max-w-[500px] rounded-lg aspect-video overflow-hidden object-cover">
          {profile ? (
            <Image src={"/no-image.jpg"} alt="Profile Image" fill />
          ) : (
            <div
              aria-hidden="true"
              className="bg-[#162329] min-w-[400px] max-w-[500px] h-full aspect-video"
            />
          )}
          <PencilLine size={18} className="absolute right-3 top-3 text-white" />
          <div className="absolute inset-x-2 bottom-2">
            <h2 className="font-back text-base">@johndoe,</h2>
          </div>
        </div>

        <About />

        <div className="relative mt-5 min-w-[300px] max-w-[500px] rounded-lg h-40 overflow-hidden object-cover bg-[#0E191F]">
          <div className="flex flex-row justify-between items-center ml-5 m-3">
            <h3 className="font-back">Interest</h3>
            <Link href={"/interests"}>
              <PencilLine size={18} className=" text-white" />
            </Link>
          </div>
          <div className="flex flex-row justify-between mx-5 m-3 mr-10">
            <span className="text-muted-foreground">
              Add in your your to find better match find better match find
              better match
            </span>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Profile;
