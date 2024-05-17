import mongoose from'mongoose';
import dotenv from'dotenv';
dotenv.config()
const URL = process.env.MONGODB_URL
const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        .then(() =>{
            console.log("Connected DB Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}
// module.exports = connectDB;
export default connectDB