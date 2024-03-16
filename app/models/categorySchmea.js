import mongoose, { Schema } from "mongoose";

const CategorySchmea = new Schema({
    name:{type:String, required:true}
},{timestamps:true})

export const Category = mongoose.models.Categories || mongoose.model("Categories" , CategorySchmea)