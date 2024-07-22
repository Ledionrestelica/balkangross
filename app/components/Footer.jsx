import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col gap-[105px]">
      <div className="w-full  flex gap-4 px-4 min-h-[500px] pt-[61px]">
        <div className="flex-1 border-r-2 border-[#6F6F6F] border-opacity-15 ">
          <div className="w-[80%] font-light text-[#242424]">
            This is a demo store by Alius. All images and video content courtesy
            of Shutterstock and Pexels, and are not for re-use on other stores.
          </div>
        </div>
        <div className="flex-1 ml-[60px] flex flex-col ">
          <div className="text-[#0F172A] font-light">All departaments</div>
          <ul className="text-[#6F6F6F] flex flex-col font-light mt-[25px] gap-[16px]">
            <li>Fruits and vegetables</li>
            <li>Meat</li>
            <li>Cheese</li>
            <li>Dry food</li>
          </ul>
        </div>
        <div className="flex-1 text-[#0F172A] font-light">
          <div className="text-[#0F172A] font-light">Help & Support</div>
          <ul className="text-[#6F6F6F] flex flex-col font-light mt-[25px] gap-[16px]">
            <li>Costumer Service</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Returns Info</li>
          </ul>
        </div>
        <div className="w-[50px]"></div>
      </div>
      <div className="flex py-[32px] border-t-2 border-[#6F6F6F] border-opacity-15 text-[#6F6F6F] font-light justify-between">
        <div>Balkan Gross</div>
        <div className="flex gap-[51px] ">
          <div>Privacy Policy</div>
          <div>Terms of use</div>
        </div>
        <div className="flex justify-between items-center">
          <Image
            src="/mastercard.png"
            alt="mastercard"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
