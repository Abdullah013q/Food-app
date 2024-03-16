import { NextResponse } from 'next/server'
import { Category } from '../../models/categorySchmea'
import mongoose from 'mongoose'

export async function POST(req) {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const { name } = await req.json()
    await mongoose.connect(uri)
    const respo = await Category.create({ name })
    return NextResponse.json(respo, { message: "category created" }, { status: 201 })
}

export async function PUT(req) {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const { _id, name } = await req.json()
    await mongoose.connect(uri)
    const respo = await Category.findByIdAndUpdate({ _id: _id }, { name })
    return NextResponse.json(respo, { message: "category Updated" }, { status: 200 })
}


export async function GET(req) {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    await mongoose.connect(uri)
    const respo = await Category.find()
    return NextResponse.json(respo, { message: "category Geted", ok: true }, { status: 200 })

}

export async function DELETE(req) {
    const uri = `${process.env.MONGODB_URI}${'foodOrdering'}`
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await mongoose.connect(uri)
    await Category.findByIdAndDelete({ _id: _id })
    return NextResponse.json({ message: "category Deleted", ok: true }, { status: 200 })

}
