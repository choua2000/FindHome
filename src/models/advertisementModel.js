import { link } from "fs";
import mongoose, { mongo } from "mongoose";
const {Schema} = mongoose;
const advertisementSchema = new Schema({
name: String,
detail: [{
    link: String,
    image:String,
    showStatus:{
        type: Boolean,
        default:true
    }
}],
startDate: Date,
endDate: Date,
index: Number,
showStatus: {
    type:Boolean,
    default:true
},
},{timestamps:true});
const advertisement = mongoose.model("advertisement", advertisementSchema)
export default advertisement;