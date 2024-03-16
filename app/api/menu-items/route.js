import { NextResponse } from 'next/server'
import { MenuItem } from '../../models/menuItem'
import mongoose from 'mongoose'

export async function POST(req) {
    try {
        

    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const body = await req.json()
    await mongoose.connect(uri)
    const respo = await MenuItem.create(body)
    return NextResponse.json(respo, { status: 201 })
} catch (error) {
    console.log(error);
}finally{
    mongoose.disconnect()
}
return NextResponse.json({ok: true }, { status: 201 })
}

export async function PUT(req) {
    try{  
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const {_id,...data }= await req.json()
    await mongoose.connect(uri)
    const respo = await MenuItem.findByIdAndUpdate(_id, data)
    return NextResponse.json(respo, { status: 201 })
} catch (error) {
    console.log(error);
}finally{
    mongoose.disconnect()
}
return NextResponse.json({ok: true }, { status: 201 })
}

export async function GET() {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    // try {
    await mongoose.connect(uri)
    const respo = await MenuItem.find()

    return NextResponse.json(respo, { message: "Menu Items Geted", ok: true }, { status: 200 })

}

export async function DELETE(req) {
    try{  
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    console.log(_id);
    await mongoose.connect(uri)
    const respo = await MenuItem.findOneAndDelete({_id})
    return NextResponse.json({ message: "MenuItem Deleted", ok: true }, { status: 200 })
} catch (error) {
    console.log(error);
}finally{
    mongoose.disconnect()
}
return NextResponse.json( {ok: true },{ status: 200 })

}

