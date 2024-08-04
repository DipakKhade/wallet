'use client';
import { PrimaryButton } from "./Buttons";
import { signIn } from "next-auth/react";

export default function Header() {
  return (
    <>
      <nav className="flex justify-between border border-gray-500 h-16 p-2">
        <div>pay-wallet</div>
        <div>
          <PrimaryButton onClick={()=>signIn("google")}>sign in</PrimaryButton>
        </div>
      </nav>
    </>
  );
}
