import React from "react";

import { SignIn } from "@clerk/nextjs";

const Signin = () => {
  return (
    <div className="w-fit mx-auto mt-24">
      <SignIn />
    </div>
  );
};

export default Signin;
