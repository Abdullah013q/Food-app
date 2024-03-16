import mongoose, { Schema } from "mongoose";

const extraPriceSchmea = new Schema({
    name: String,
    price: Number,
})

const menuItemSchmea = new Schema({
    menuName: String,
    menuPrice: Number,
    category: { type: mongoose.Types.ObjectId },
    menuDisc: String,
    sizes: { type: [extraPriceSchmea] },
    ingredientPrices: { type: [extraPriceSchmea] },

}, { timestamps: true })

export const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchmea)