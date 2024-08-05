"use client";
import React, { ReactNode, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TbTransfer } from "react-icons/tb";
import { TbTransactionDollar } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";
import { HiMiniWallet } from "react-icons/hi2";
import DashboardHeader from "./DashboardHeader";
import Image from "next/image";

export function DashboardComponent({
  children,
  profileImage,
  userName,
}: {
  children: ReactNode;
  profileImage: string;
  userName: string;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add to Wallet",
      href: "/addtowallet",
      icon: (
        <HiMiniWallet className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Transfer",
      href: "/transfer",
      icon: (
        <TbTransfer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Transactiosn",
      href: "/transactiosn",
      icon: (
        <TbTransactionDollar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
   
  ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open && <Logo userName={userName} profileImage={profileImage} />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userName,
                href: "#",
                icon: (
                  <img
                    src={profileImage}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = ({
  userName,
  profileImage,
}: {
  userName: string;
  profileImage: string;
}) => {
  return (
    <Link
      href="/profile"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <LogoIcon image={profileImage} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {userName}
      </motion.span>
    </Link>
  );
};

export const LogoIcon = ({ image }: { image: string }) => {
  return (
    <span>
      <img src={image} width="26" height="26" alt="" className="rounded-full" />
    </span>
  );
};
