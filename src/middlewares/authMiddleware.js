import jwt from "jsonwebtoken";
import {statusMessage, tokenSet} from "../config/index.js";
// Mean: Generate Access Token
export const GenerateToken = async(data) =>{
    try {
        const token = await jwt.sign(data, tokenSet.JWT_SECRET_KEY, {expiresIn: tokenSet.TOKEN_EXPIRE_TIME})
        return token;
    } catch (error) {
        console.log(error)
    }
}
// MEAN : Verify Token
export const VerifyToken = async (req,res,next) =>{
    const autthorization = req.headers['authorization']
    try {
        jwt.verify(autthorization, tokenSet.JWT_SECRET_KEY,(err,payload) =>{
            if(err){
                console.log({err})
                return res.status(403).json({message: statusMessage.TOKEN_IS_NOT_VALID})
            }
            req.payload = payload;
            return next();
        })
    } catch (error) {
        return res.status(500).json({message: statusMessage.TOKEN_IS_EXPIRED})
    };
};
export const VerifyTokenAndAdmin = (req,res,next) =>{
    VerifyToken(req,res, () =>{
       if(req.payload.role === "ADMIN"){
        return next();
       }else{
        return res.status(400).json({message:statusMessage.PERMISSION_DENIED})
    }
       
    });
};
export const VerifyTokenAndAdminOrStaff = (req,res,next) =>{
    VerifyToken(req,res, () =>{
        if(req.payload.role === "ADMIN" || req.payload.role === "STAFF"){
        return next();
        }
        return res.status(500).json({message:statusMessage.PERMISSION_DENIED})
    });
};