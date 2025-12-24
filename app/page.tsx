import Navbar from "@/components/Navbar";

import { Button } from "../components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-accent h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center space-y-12 mt-24">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-5xl font-bold w-[25vw] text-center leading-14">
            Organize your work. Own your time.
          </h1>
          <p className="w-[40vw] text-center tracking-wider leading-7">
            This to-do app helps students quickly add tasks, plan for later, and
            stay organized with ease. Simple, clean, and stress-free—so you can
            focus on getting things done.
          </p>
          <Button className="font-semibold">Plan Now For Free </Button>
        </div>
        <Image src="/todo_board.png" alt="Hero" width={600} height={600} />
      </div>
    </div>
  );
}
