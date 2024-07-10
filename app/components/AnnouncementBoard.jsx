import Link from "next/link";

const AnnouncementBoard = ({ text, link }) => {
  return (
    <div className="w-full bg-primary py-[12px] px-4">
      <div className="container mx-auto max-w-[1240px] flex gap-[20px]">
        <div className="text-[#060606] font-normal text-[14px]">{text}</div>
        <Link
          className="text-[#060606] font-medium text-[14px] hover:underline "
          href={`/${link}`}
        >
          Learn More &gt;
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBoard;
