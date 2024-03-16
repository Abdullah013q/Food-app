import {model, models, Schema} from "mongoose";

const OrderHistorySchema = new Schema({
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

export const OrderHistory = models?.Order || model('OrderHistory', OrderHistorySchema);