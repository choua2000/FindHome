import { Models } from "../models/index.js";
import { statusMessage } from "../config/index.js";
import queryWithWhere from "../middlewares/searchMidleware.js";
class ApartmentController {
  static async createApartment(req, res) {
    try {
      //   if(!req.body){
      //     return res.status(400).json({msg: statusMessage.BAD_REQUEST})
      //   }
      //   const data = {
      //     ...req.body,
      //     createdBy: req.payload._id.toString()
      // };
      // const apartment =  await Models.apartment.create(data)
      //     if(!apartment){
      //       return res.status(404).json({msg:statusMessage.BAD_REQUEST})
      //     }
      //     return res.status(201).json({msg: statusMessage.CREATE_SUCCESS, apartment})

      const {
        title,
        description,
        address,
        images,
        price,
        priceBooking,
        apartmentType,
        badRoom,
        convenience,
        otherService,
        views,
        apartmentStatus,
      } = req.body;
      const data = {
        title,
        description,
        address,
        images,
        price,
        priceBooking,
        apartmentType,
        badRoom,
        convenience,
        otherService,
        views,
        apartmentStatus,
      };
      const apartment = await Models.apartment.create(data);
      return res
        .status(200)
        .json({ msg: statusMessage.CREATE_SUCCESS, apartment });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
  static async getApartment(req, res) {
    try {
      if (!req.params._id) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      const apartment = await Models.apartment.findById(req.params._id);
      if (!apartment) {
        return res.status(400).json({ msg: statusMessage.APARTMENT_NOT_FOND });
      }
      await Models.apartment.findByIdAndUpdate(
        req.params._id,
        { $inc: { views: 1 } },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: statusMessage.GET_SUCCESS, apartment });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
  static async getApartmentByCustomer(req, res) {
    try {
      const search = req.query;
      const _where = queryWithWhere(search);
      const apartment = await Models.apartment.find({
        apartmentStatus: true,
        ..._where,
      });
      if (!apartment) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res
        .status(200)
        .json({ msg: statusMessage.GET_SUCCESS, apartment });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
  static async getApartmentsByAdmin(req, res) {
    try {
      const apartmentStatus = req.query.apartmentStatus;
      let apartment;
      if (apartmentStatus) {
        apartment = await Models.apartment.find({ apartmentStatus });
      } else {
        apartment = await Models.apartment.find({});
      }
      return res
        .status(200)
        .json({ msg: statusMessage.GET_SUCCESS, apartment });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
  static async updateApartment(req, res) {
    try {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      const data = {
        ...req.body,
        updatedBy: req.payload._id.Storing(),
        updatedAt: Date.now(),
      };
      const apartment = await Models.apartment.findByIdAndUpdate(
        _id,
        { $set: data },
        { new: true }
      );
      if (!apartment) {
        return res.status(404).json({ msg: statusMessage.NOT_FOUND });
      }
      return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, ap });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
  static async deleteApartment(req, res) {
    try {
      if (!req.params._id) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      const apartment = await Models.apartment.findByIdAndDelete(
        req.params._id
      );
      return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
}
export default ApartmentController;
