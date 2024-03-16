import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  street: String,
  postalcode: String,
  city: String,
  country: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);