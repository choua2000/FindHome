import { statusMessage } from "../config/index.js";
import { Models } from "../models/index.js";
class favoriteController{
    static async createFavorite(req,res){
        try {
            const favoriteData = await Models.favorite.findOne({
                $or: [
                    {home: req.body.home},
                    {apartment: req.body.apartment}
                ]
            });
            // if(favoriteData){
                const data = {
                    ...req.body
                }
            // }
            const favorite = await Models.favorite.create(data)
            if(!favorite){
                return res.status(404).json({msg : statusMessage.BAD_REQUEST})
            }
            // await Models.favorite.findByIdAndDelete({_id: favoriteData._id})
            return res.status(201).json({msg: statusMessage.CREATE_SUCCESS, favorite})   
        } catch (error) {
            return res.status(500).json({ msg: error.message });

        }
    }
    static async getFavorites(req,res){
        try {
            const data = await Models.favorite.find({})
            if(!data){
                return res.status(404).json({msg :statusMessage.BAD_REQUEST})
            }
            return res.status(201).json({msg : statusMessage.GET_SUCCESS, data})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}
export default favoriteController;