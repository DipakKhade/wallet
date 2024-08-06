'use client';
import { useEffect, useState } from "react";

export default function DashboardHeader({ userName }: { userName: string }) {
  const [zone, setZone] = useState<string>("");
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours() as number;
    
    if (hour <= 12) {
      setZone("Good Morning");
      //@ts-ignore
    } else if (12 < hour < 18) {
      setZone("Good Afternoon");
    } else if(hour >= 18){
      setZone("Good Afternoon");
    }
  }, []);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          <div className="h-20 w-full rounded-xl p-4 bg-gray-100 dark:bg-neutral-800">
            <span className="text-3xl">
              {zone} <span className="text-blue-500">{userName}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
