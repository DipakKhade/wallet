'use client';
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({children}:{children:ReactNode}){
    return <SessionProvider>
        <RecoilRoot>
        {children}
        </RecoilRoot>
    </SessionProvider>
}