import { auth } from '@clerk/nextjs'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { UserDetail } from '../../models/userDetail'



export async function POST(req) {
    const {userId} = auth()
    const body = await req.json()
    const uri= `${process.env.MONGODB_URI}${userId}`
  try {
    await mongoose.connect(uri)
    if( !'email' in await UserDetail.find((item)=> item.email) ){
      const resp = await UserDetail.create(body)
    }
    const respo = await UserDetail.updateMany(body)
    return NextResponse.json({result:respo,message:"user created",ok:true},{status:201})
    
  } catch (error) {
    console.log(error);
  }finally{
    mongoose.disconnect()
  }
  
  return NextResponse.json({ok:true},{status:201})

}

export async function GET(req) {
  const {userId} = auth()
  const uri= `${process.env.MONGODB_URI}${userId}`
  try {
  await mongoose.connect(uri)
  const respo = await UserDetail.find()
  return NextResponse.json({result:respo,message:"user Geted",ok:true},{status:200})
} catch (error) {
  console.log(error);
}
return NextResponse.json({message:"user Geted",ok:true},{status:200})
   
}


// export async function PUT(req) {
//   const {userId} = auth()
//       console.log(req.params);
//   const body = await req.json()
//   const email = body.email;
//   const uri= `${process.env.MONGODB_URI}/foodOrdering`
//   try {
//     await mongoose.connect(uri)
//     if('email' in body){
//       const respo = await UserDetail.findOneAndUpdate({email},body)
//       respo.name = body.name;
//       respo.city = body.city;
//       respo.phoneNumber = body.phoneNumber;
//       respo.postalcode = body.postalcode;
//       respo.street = body.street;
//       respo.country = body.country;
//       await respo.save()
//       return NextResponse.json({result:respo,message:"user updated",ok:true},{status:201})
//     }
    
//   } catch (error) {
//     console.log(error);
//   }finally{
//     mongoose.disconnect()
//   }
// }
























// import { MongoClient } from 'mongodb';

// export async function POST(req) {
//   const body = await req.json()
//   const {userId}=auth()
//   const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// try {
//   const database = client.db(`${userId}`);
//   const userInventry = database.collection('inventry');
  
//   const inventry = await userInventry.insertOne(body);
//   console.log(inventry);
// } finally {
//   // Ensures that the client will close when you finish/error
//   await client.close();
// }
 



//   return NextResponse.json({id:userId, message: "create user DB" }, { status: 201 } )
// }