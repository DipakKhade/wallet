import db from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {to, amount } = await req.json()
    const session = await getServerSession()

    if(!session?.user){
        return NextResponse.json({
            message:"unauthorised user"
        })
    }

  try{
    const sender = await db.user.findFirst({
        where:{
            email:session.user?.email as string
        }
    })
    const senderAccount= await db.userAccount.findFirst({
        where:{
            userid:sender?.id
        }
    })
    console.log(typeof senderAccount?.balance,typeof Number(amount))
    if(Number(senderAccount?.balance) <= Number(amount)){
        return NextResponse.json({
            "message":"insufficient funds"
        })
    }
    const transferFunds = await db.$transaction(async tx=>{

        const sender_account = await tx.userAccount.update({
            where:{
                userid:sender?.id
            },
            data:{
               balance:{
                decrement:Number(amount)
               }
            }
        })
        const resceiver_account = await tx.userAccount.update({
            where:{
                id:to
            },
            data:{
                balance:{
                    increment:Number(amount)
                }
            }
        })
    })



    return NextResponse.json({
        message:"transfer successful"
    })


  }catch(e){
    return NextResponse.json({
        message:"transfer failed"
    })
  }


}