import mongoose from "mongoose";
const { Schema } = mongoose;
const favoriteSchema = new Schema({
    apartment:{
        type: mongoose.Schema.Types.ObjectId,
        default:"apartment"
    },
    home:{
        type: mongoose.Schema.Types.ObjectId,
        default:"home"
    },
},{timestamps:true})
const favorite = mongoose.model("favorite", favoriteSchema)
export default favorite;