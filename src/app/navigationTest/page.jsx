"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

/*
using replace instead of push for the router will not save the url into browser stack history

*/
const NavigationTest = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  console.log("====================================");
  console.log(q);
  console.log("====================================");
  const handleOnClick = () => {
    console.log("====================================");
    console.log(pathname);
    console.log("====================================");
    router.replace("/");
  };
  return (
    <div>
      <Link href={"/"} prefetch={false}>
        ClickHere
      </Link>
      <button onClick={handleOnClick}>Write And Redirect</button>
    </div>
  );
};

export default NavigationTest;
