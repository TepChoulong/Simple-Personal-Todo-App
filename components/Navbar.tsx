import { Button } from "./ui/button";

import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-primary p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full"></div>
          <h1 className="text-lg font-bold">Simple Personal Todo</h1>
        </div>
        <div className="flex items-center">
          <div className="space-x-3">
            <Button variant={"ghost"} className="border-2" asChild>
              <Link href="/sign-up">Get stared</Link>
            </Button>
            <Button variant={"ghost"} className="border-2" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
