import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-secondary border-b relative border-[#E6E6E6] overflow-hidden px-4">
      <div className="absolute top-[-100px] flex gap-4 h-[400px] right-[150px] rotate-12">
        <div className="bg-[#D9D9D9] z-0 w-6 h-[400px]"></div>
        <div className="bg-[#EAEAEA] z-0 w-6 h-[400px]"></div>
        <div className="bg-[#F0F0F0] z-0 w-6 h-[400px]"></div>
      </div>
      <div className="container z-10 mx-auto max-w-[1240px] py-[56px]">
        <div className="flex gap-4  items-center">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <p className="text-black font-normal text-[28px]">
            Balkangross Ab Shop
          </p>
        </div>
        <p className="text-[20px] font-normal text-[#8F8F8F] mt-[12px]">
          Short description of the shop here.
        </p>
      </div>
    </div>
  );
};

export default Header;
