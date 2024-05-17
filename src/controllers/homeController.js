import { Models } from "../models/index.js";
import { statusMessage } from "../config/index.js";
// import { Model } from 'mongoose';
class HomeControlller {
  static async createHome(req, res) {
    try {
      const {
        title,
        description,
        address,
        image,
        price,
        priceBooking,
        convenience,
        houseStory,
        views,
        homeStatus,
        otherService,
      } = req.body;
      const data = {
        title,
        description,
        address,
        image,
        price,
        priceBooking,
        houseStory,
        convenience,
        views,
        homeStatus,
        otherService,
      };
      const home = await Models.home.create(data);
      if (!home) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, home });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getHome(req, res) {
    try {
      const { _id } = req.params;
      const home = await Models.home.findById(_id);
      if (!home) {
        return res.status(404).json({ msg: statusMessage.HOME_NOT_FOND });
      }
      await Models.home.findByIdAndUpdate(
        _id,
        { $inc: { views: 1 } },
        { new: true }
      );
      return res.status(201).json({ msg: statusMessage.GET_SUCCESS, home });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getHomesByCustomer(req, res) {
    try {
      const search = req.query;
      const _where = queryWithWhere(search);
      console.log("first");
      const home = await Models.home.find();
      if (!home) {
        return res.status(400).json({ msg: statusMessage.HOME_NOT_FOND });
      }
      return res.status(201).json({ msg: statusMessage.GET_SUCCESS, home });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getHomesByAdmin(req, res) {
    try {
      const homeStatus = req.query.homeStatus;
      let home;
      if (homeStatus) {
        home = await Models.home.find({ homeStatus });
      } else {
        home = await Models.home.find({});
      }
      return res.status(200).json({ msg: statusMessage.GET_SUCCESS, home });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async updateHome(req, res) {
    try {
      const { _id } = req.params;
      const {
        title,
        description,
        address,
        image,
        price,
        priceBooking,
        convenience,
        houseStory,
        views,
        homeStatus,
        otherService,
      } = req.body;
      // if(!id){
      //     return res.status(400).json({msg:statusMessage.BAD_REQUEST});
      // }
      // console.log(error)
      const data = {
        title,
        description,
        address,
        image,
        price,
        priceBooking,
        convenience,
        houseStory,
        views,
        homeStatus,
        otherService,
      };
      const home = await Models.home.findByIdAndUpdate(
        { _id: _id },
        { $set: data }
      );
      if (!home) {
        return res.status(404).json({ msg: statusMessage.HOME_NOT_FOND });
      }
      return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, home });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async deleteHome(req, res) {
    try {
      const { _id } = req.params;
      const data = await Models.home.findByIdAndDelete(_id);
      if (!data) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
export default HomeControlller;
