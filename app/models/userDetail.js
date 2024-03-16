import { auth } from "@clerk/nextjs";
import mongoose, { Schema } from "mongoose";

const userDetailSchmea = new Schema({
    userid: String,
    name: String,
    email: String,
    phoneNumber: String,
    city: String,
    postalcode: String,
    street: String,
    country: String,
}, { timestamps: true })

export const UserDetail = mongoose.models.UserDetail || mongoose.model('UserDetail', userDetailSchmea) 