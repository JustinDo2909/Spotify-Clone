"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { getAccessToken, getNewReleases } from "@/api/utils";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import logo from "@/public/images/logoo.png";
import Image from "next/image";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const [token, setToken] = useState<string | null>(null); // State for access token
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await getAccessToken();
      console.log(response);
      setToken(response); // Store the token in state
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    handleLogin(); // Call handleLogin on component mount
  }, []);

  if (!token) {
    // If token is not available, show loading or placeholder UI
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <div
      className={twMerge(
        `
        h-fit bg-gradient-to-b from-emerald-800 p-6 `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex justify-between items-center gap-x-4 ">
          
            <SignedOut>
              <div className="bg-transparent text-black bg-white py-2 px-6 rounded-full hover:bg-opacity-80 font-medium ">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="rounded-full py-2 px-3 justify-center items-center">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
