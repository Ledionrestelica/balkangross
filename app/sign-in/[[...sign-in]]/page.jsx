import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="w-full min-h-[100vh] gap-4 flex flex-col justify-center items-center">
      <SignIn />
      <div className="flex flex-col justify-between items-center">
        <Link href="/request-account">
          <div className="w-max px-3 flex items-center h-[43px] text-[14px] bg-primary  rounded-[8px] cursor-pointer">
            Request Account
          </div>
        </Link>
      </div>
    </div>
  );
}
