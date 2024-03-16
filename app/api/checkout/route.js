
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Order } from '../../models/orders';
import { MenuItem } from '../../models/menuItem';
// const stripe = require('stripe')(process.env.STRIPE_SK);






export async function POST(req) {

    try {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`;
    const {
        name, city, postalcode, country, email, street, phoneNumber, cartProducts
    } = await req.json();
    await mongoose.connect(uri);
    const orderDoc = await Order.create({
        name, city, postalcode, country, email, street, phoneNumber,
        cartProducts,
    })
} catch (error) {
 console.log(error);       
}finally{
    mongoose.disconnect()
}




    // const stripeLineItems = []
    // for (const cartProduct of cartProducts) {
    //      const productInfo = await MenuItem.findById(cartProduct._id);
    //      let productPrice = productInfo.menuPrice;
    //      if(cartProduct.size){
    //        const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
    //         productPrice += size.price;

    //     }
    //     if(cartProduct.extras.length > 0){
    //         for(const extras of cartProduct.extras){
    //             const extra = productInfo.ingredientPrices.find(extra => extra._id.toString() === extras._id.toString());
    //             productPrice += extra.price;
    //         }

    //     }

    //     const productName = cartProduct.menuName;

    //     stripeLineItems.push({
    //         quantity:1,
    //         price_data:{
    //             currency: 'PKR',
    //             product_data:{
    //                 name: productName,
    //             },
    //             unit_amount: productPrice,
    //         }
    //     })

    // }

    // console.log({stripeLineItems});

    //     const stripeSesson = await stripe.checkout.sessions.create({
    //         line_ietms:stripeLineItems,
    //         mode:'payment',
    //         customer_email: email,
    //         success_url: process.env.SUCCESS_URL + 'cart?success=1',
    //         cancel_url:process.env.SUCCESS_URL + 'cart?cancel=1',
    //         metadata:{orderId:orderDoc._id},
    //         shipping_option:[{
    //             shipping_rate_data:{
    //                 display_name: 'Delivery fee',
    //                 type: 'fixed_amount',
    //                 fixed_amount:{amount: 500 , currency: 'USD'}
    //             }
    //         }]
    //     })

    return NextResponse.json( { status: 201 })

}


export async function GET() {
    try {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
        await mongoose.connect(uri)
        const respo = await Order.find()
        
        return NextResponse.json(respo, { message: "Menu Items Geted", ok: true }, { status: 200 })
    } catch (error) {
        console.log(error);
    }
    
    return Response.json( { status: 200 })

}




