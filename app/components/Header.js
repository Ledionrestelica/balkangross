import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="bg-secondary border-b relative border-[#E6E6E6] overflow-hidden px-4">
      <div className="absolute top-2 right-2">
        <UserButton />
      </div>
      <div className="hidden md:flex absolute top-[-100px]  gap-4 h-[400px] right-[150px] rotate-12">
        <div className="bg-[#D9D9D9] z-0 w-6 h-[400px]"></div>
        <div className="bg-[#EAEAEA] z-0 w-6 h-[400px]"></div>
        <div className="bg-[#F0F0F0] z-0 w-6 h-[400px]"></div>
      </div>
      <div className="container z-10 mx-auto max-w-[1240px] py-[56px]">
        <div className="flex gap-4  items-center">
          <Link href="/">
            <Image src="/logo-2.png" alt="logo" width={400} height={250} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
