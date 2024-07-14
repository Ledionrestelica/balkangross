import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center flex-col gap-4 text-lg font-semibold">
      Thank you for your purchase!
      <div
        className="px-4 py-2 bg-primary rounded-lg text-black
      "
      >
        <Link href="/">Back to home </Link>
      </div>
    </div>
  );
};

export default page;
