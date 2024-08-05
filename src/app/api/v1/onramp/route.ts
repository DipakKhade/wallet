import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req:NextRequest){
    let {amount , bankname}=await  req.json()
    const session =await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json({
            success:false,
            message:"you are not logged in"
        })
    }
        const user = await db.user.findFirst({
            where:{
                email : session?.user?.email as string
            },
        })

        await db.$transaction(async tx=>{
            const user_account =await db.userAccount.update({
                where:{
                    userid:user?.id
                },
                data:{
                    balance:{
                        increment:Number(amount)
                    }
                }
                
            })

            await db.onRamps.create({
                data:{
                    banckName:bankname,
                    onrampAmount:Number(amount),
                    accountid:user_account.id
                }
            })
        })
        
    
    return NextResponse.json({
        success:true,
        onramp_amount:amount
    })

}


export async function GET(req:NextRequest){
    const session = await getServerSession(authOptions)

    try{
        const user= await db.user.findFirst({
            where:{
                email:session?.user?.email as string
            }
        })

        const Onramps= await db.userAccount.findFirst({
            where:{
                userid:user?.id
            },

            select:{
                onramps:true
            }
        })

        return NextResponse.json({
            Onramps
        })
    }catch(e){
        NextResponse.json({
            success:false
        })
    }

}