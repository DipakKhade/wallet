"use client";
import { DashboardComponent } from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const [loading, SetLoading] = useState<boolean>(false);
  const [bank, SetBank] = useState<string>("");
  const session = useSession();
  const { register, handleSubmit } = useForm();

  async function onramp(data: any) {
    console.log(data, bank);
    SetLoading(true);
    try {
      const r = await fetch(`/api/v1/onramp`, {
        method: "POST",
        body: JSON.stringify({
          amount: data.amount,
          bankname: bank,
        }),
      });

      const res = await r.json();
      if (res.success) {
        toast.success(`INR ${res.onramp_amount} added to wallet`);
        SetLoading(false);
      }
      if (!res.success) {
        toast.warning("try again");
        SetLoading(false);
      }
    } catch (e) {
      toast.error("some error occured");
      SetLoading(false);
    }
  }

  return (
    <>
      <DashboardComponent
        profileImage={(session.data?.user?.image as string) || ""}
        userName={(session.data?.user?.name as string) || ""}
      >
        <div className="md:pl-60">
        <p className="text-xl font-medium">Add Amount to wallet</p>
          <div className="flex">
            <div className="justify-center p-4">
              <Card className="w-96 h-[300px] space-y-3 p-3">
                  <form onSubmit={handleSubmit(onramp)}>
                  <div className="space-y-2">
                    <label htmlFor="amount">Amount</label>
                    <Input
                      {...register("amount")}
                      type="number"
                      placeholder="amount"
                    />

                    <label htmlFor="bank">Select Provider</label>
                    <Select onValueChange={(value) => SetBank(value)}>
                      <SelectTrigger className="w-80">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent {...register("bank")}>
                        <SelectGroup>
                          <SelectLabel>Bank</SelectLabel>
                          <SelectItem value="hdfc">HDFC</SelectItem>
                          <SelectItem value="axis">Axis</SelectItem>
                          <SelectItem value="union">Union</SelectItem>
                          <SelectItem value="state">state</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="w-full flex align-middle justify-center">
                    <Button>
                      {loading ? (
                        <div role="status" className="p-1 space-x-3">
                          <svg
                            aria-hidden="true"
                            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Add money"
                      )}
                    </Button>
                    </div>
                  </div>
                </form>
              </Card>
            <PreviousOnramps />
            </div>
          </div>
        </div>
      </DashboardComponent>
    </>
  );
}

export function PreviousOnramps() {
  const [PreviousOnramps, SetPreviousOnramps] = useState();
  const [loading , SetLoading] = useState<boolean>(false)
  useEffect(() => {
    (async () => {
      SetLoading(true)
      const r = await fetch("/api/v1/onramp", {
        method: "GET",
      });

      const response = await r.json();
      SetPreviousOnramps(response);
      SetLoading(false)
    })();
  }, []);

  return (
    <>
      <main className="">
        <p className="text-xl font-medium">Previous Transactios</p>
        <Card className="w-[560px] h-auto p-4">
          <div className="flex">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Index
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time Stamp
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bank Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { loading ? <span> loading... </span> :PreviousOnramps &&
                    //@ts-ignore
                    PreviousOnramps["Onramps"]["onramps"].map(
                      (r: any, index: number) => (
                        <React.Fragment key={index}>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {index}
                            </th>
                            <td className="px-6 py-4">{r.timestamp}</td>
                            <td className="px-6 py-4">{r.banckName}</td>
                            <td className="px-6 py-4">INR {r.onrampAmount}</td>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
