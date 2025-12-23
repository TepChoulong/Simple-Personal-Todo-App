import React from "react";
import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="mx-auto w-fit">
      <UserProfile />
    </div>
  );
};

export default page;
