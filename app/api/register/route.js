import {User} from "../../models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json()
    await mongoose.connect(process.env.MONGODB_URI)
   const respo = await User.create(body)
  return NextResponse.json({result:respo,message:"user created",ok:true},{status:201})
}

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI)  
  const respo = await User.find()
  
  return NextResponse.json({result:respo,message:"User Geted",ok:true},{status:200})
  } catch (error) {
    console.log(error);
  }finally{
    mongoose.disconnect()
  }

}


