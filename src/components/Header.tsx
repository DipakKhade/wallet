"use client";
import { PrimaryButton } from "./Buttons";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { userInfoAtom } from "@/store/atoms/session";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function Header() {
  const session = useSession();
  const [userdata , setUserdata] = useRecoilState(userInfoAtom)

  useState(()=>{
   (()=>{
    if(session.data?.user){
      setUserdata({
        name:session?.data.user.name ||"",
        profileImage : session.data.user?.image || ""
    
      })
    }
   })();

   return ()=>{
    setUserdata({
      name:'',
      profileImage:''
    })
   }
  },[])
  
 
  return (
    <>
      <nav className="flex justify-between border border-gray-500 h-16 p-2">
        <div className="text-2xl font-semibold">pay-wallet</div>
        <div>
          {session.data?.user ? (
             <div className="flex space-x-3">
            <PrimaryButton onClick={() => signOut()}>sign out</PrimaryButton>
             <AvatarDemo profileImage={session.data?.user?.image as string}/> 
            </div>
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


function AvatarDemo({profileImage}:{profileImage:string}) {
  return (
    <Avatar>
      <AvatarImage src={profileImage} alt="img" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
