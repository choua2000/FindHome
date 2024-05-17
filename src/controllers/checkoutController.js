import { statusMessage } from "../config/index.js";
import {Models} from '../models/index.js';
class checkoutController{
    static async createCheckout(req,res){
        try {
            const {staff, booking,staffCommission,slipCheckout} = req.body;
            const data = {
                staff, booking,staffCommission,slipCheckout
            }
        const checkout = await Models.check.create(data)
        if(!checkout){
            return res.status(400).json({msg : statusMessage.BAD_REQUEST})
    }
            return res.status(201).json({msg : statusMessage.CREATE_SUCCESS, checkout})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    static async getCheckouts(req,res){
        try {
            const checkout = await Models.check.find({})
            if(!checkout){
                return res.status(400).json({msg: statusMessage.BAD_REQUEST})
            }
            return res.status(201).json({msg: statusMessage.GET_SUCCESS, checkout})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    static async deleteCheckout(req,res){
        try {
            const {_id} = req.params;
            const data = await Models.check.findByIdAndDelete(_id)
            if(!data){
                return res.status(400).json({msg: statusMessage.BAD_REQUEST})
            }
            return res.status(201).json({msg: statusMessage.DELETE_SUCCESS})
            console.log("deleted")
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    static async updateCheckout(req,res){
        try {
            const {_id} = req.params;
            const data = {
                ...req.body
            }
            const checkout = await Models.check.findByIdAndUpdate(
                _id,
                {$set: data},
                {new:true}
            )
            if(!checkout){
                return res.status(404).json({msg:statusMessage.CHECKOUT_NOT_FOND})
            }
            return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS, checkout})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    static async getCheckout(req,res){
        try {
            const {_id} = req.params
            const data = await Models.check.findById(_id)
            if(!data){
                return res.status(404).json({msg: statusMessage.NOT_FOUND})
            }
            return res.status(201).json({msg :statusMessage.GET_SUCCESS, data})
        } catch (error) {
            return res.status(500).json({msg: error.message})

        }
    }
}
export default checkoutController;