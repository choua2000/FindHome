import mongoose from "mongoose";
const {Schema} = mongoose
const homeSchema = new Schema({
    title: String,
    descriptiion: String,
    address:{
        village:String,
        district:String,
        provice:String
    },
    image:[String],
    price:{
        type:Number,
        default:0
    },
    priceBooking:{
        type:Number,
        default:0
    },
    houseStory:{
        type:Number,
        default:1
    },
    convenience: [String],
    otherService: [String],
    views:{
        type:Number,
        default:0
    },
    homeStatus:{
        type:Boolean,
        default:true
    }
    // createdAt: {
    //     type:Date,
    //     default: Date.now
    // },
    // updatedAt:{
    //     type: Date,
    //     default: Date.now
    // },
    // createdBy: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     default:"user"
    // },
    // updateBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: "user"
    // }
},{timestamps: true})
const home = mongoose.model("home", homeSchema);
export default home;