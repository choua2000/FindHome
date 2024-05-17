import bcrypt from 'bcrypt';
import { statusMessage } from '../config/index.js';
import { Models } from '../models/index.js';
import { GenerateToken } from '../middlewares/authMiddleware.js';
class authController {
    static async Signup(req,res){
        try {
            if(!req.body){
                return res.status(400).json({message: statusMessage.BAD_REQUEST,status:false})
            }
            // MERN: check phone number
            const {phoneNumber} = req.body;
            const checkExist = await Models.user.findOne({phoneNumber})
            if(checkExist){
                return res.status(400).json({message: statusMessage.USER_ALREADY_EXIST,status:false})
            }
            const hashPass = await bcrypt.hash(req.body.password , 10)
            const newData = {
                ...req.body,
                password: hashPass
            }
            //  MERN: create user
            const user = await Models.user.create(newData)
            const payload = {
                _id:user._id,
                role:user.role
            }
            // MERN: generate token
            const accessToken = await GenerateToken(payload);
            //MEAN: Return user data without the password field

            const { password, ...others} = user._doc;
            return res.status(200).json({token:accessToken, status:true})
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }
    static async Login(req,res){
       try {
        const {phoneNumber, password: passwordInput} = req.body;
        if(!phoneNumber || !passwordInput){
            return res.status(400).json({message: statusMessage.BAD_REQUEST})
        }
        const user = await Models.user.findOne({phoneNumber})
        if(!user){
            return res.status(404).json({message:statusMessage.USER_NOT_FOUND})
        }
        // MERN: compare between login and register
        const comparePass = await bcrypt.compare(passwordInput, user.password)
        if(!comparePass){
            return res.status(400).json({message:statusMessage.PASSWORD_NOT_MATCH})
        }
        const payload = {
            _id:user._id,
            role:user.role
        }
        // MERN: generate token
        const accessToken = await GenerateToken(payload)
        return res.status(200).json({accessToken})
       } catch (error) {
        return res.status(500).json({message: error.message})
       }
    }
}

export default authController;