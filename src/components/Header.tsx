"use client";
import { PrimaryButton } from "./Buttons";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();

  return (
    <>
      <nav className="flex justify-between border border-gray-500 h-16 p-2">
        <div>pay-wallet</div>
        <div>
          {session.data?.user ? (
            <PrimaryButton onClick={() => signOut()}>sign out</PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => signIn("google")}>
              sign in
            </PrimaryButton>
          )}
        </div>
      </nav>
    </>
  );
}
