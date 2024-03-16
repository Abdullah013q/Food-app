import { auth } from '@clerk/nextjs'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order } from '../../models/orders';


// export async function POST(req) {
//     const {userId} = auth()
//     // const userEmail = user.emailAddresses;
//     try {
        


//     const uri = `${process.env.MONGODB_URI}${userId}`;
//     const {
//         name, city, postalcode, country, email, street, phoneNumber, cartProducts
//     } = await req.json();
//     await mongoose.connect(uri);
//     const orderDoc = await Order.create({
//         name, city, postalcode, country, email, street, phoneNumber,
//         cartProducts,
//     })
// } catch (error) {
//     console.log(error);
// }finally{
//     mongoose.disconnect()
// }

//     return NextResponse.json( { status: 201 })

// }

export async function GET(req) {
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    try {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    await mongoose.connect(uri)
    const respo = await Order.findById(_id)

    return NextResponse.json(respo, { message: "Order Geted", ok: true }, { status: 200 })
} catch (error) {
    console.log(error);
}
return Response.json( { status: 200 })

}

export async function PUT(req) {
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const {paid }= await req.json()

    await mongoose.connect(uri)
    const respo = await Order.findByIdAndUpdate(_id,{paid})
    return NextResponse.json(respo, { status: 201 })
}
