import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    userName: String,
    phoneNumber: String,
    password: String,
    email: String,
    role:{
        type: String,
        enum:["ADMIN","STAFF","CUSTOMER"],
        default: "CUSTOMER"
    },
    address:{
        village: String,
        district: String,
        province: String
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    // },
    // updatedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    // }
},{timestamps:true});

const user = mongoose.model('user', userSchema);
export default user;