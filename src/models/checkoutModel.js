import mongoose from "mongoose";
const {Schema} = mongoose;
const checkoutSchema = new Schema({
staff:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
},
booking: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "booking"
},
staffCommission:{
    type:Number,
    default:0
},
slipCheckout:{
    type:String
}
// createdAt: {
//     type: Date,
//     default: Date.now()
// },
// updatedAt: {
//     type: Date,
//     default:Date.now()
// },
// createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     default:"user"
// },
// updatedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     default:"user"
// }
},{timestamps:true})
const checkout = mongoose.model("chectout", checkoutSchema)
export default checkout