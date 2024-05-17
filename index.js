import express from'express';
import cors from'cors';
import dotenv from'dotenv'
import bodyParser from'body-parser';
import connectDB from'./src/config/database.js';
import router from './src/routes/index.routes.js'
dotenv.config();


const app = express();
connectDB()
app.use(cors())
// app.use(bodyParser.json({extended:false, limit:'500bm'}))
// app.use(bodyParser.urlencoded({extended:false, limit:'500bm', parameterLimit:500000 }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(router)
const PORT = process.env.PORT ;
// const PORT = 6060
app.listen(PORT,() =>{
    console.log(`Server is runing on prot http://localhost:${PORT}`)
})



