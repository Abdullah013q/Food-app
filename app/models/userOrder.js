import {model, models, Schema} from "mongoose";

const userOrderSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  street: String,
  postalcode: String,
  city: String,
  country: String,
  cartProducts: Object,
}, {timestamps: true});

export const userOrder = models?.userOrder || model('userOrder', userOrderSchema);