import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="w-full min-h-[100vh] gap-4 flex flex-col justify-center items-center">
      <SignIn />
      <div className="flex flex-col justify-between items-center">
        <div>Request an account</div>
        <Link href="/request-account">here</Link>
      </div>
    </div>
  );
}
