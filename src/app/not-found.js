import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>The Page You Were Looking For Is Not Found</p>
      <Link href={"/"}>Return Home</Link>
    </div>
  );
};

export default NotFound;
