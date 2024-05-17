import bcrypt, { hash } from "bcrypt";
import { statusMessage } from "../config/index.js";
import { Models } from "../models/index.js";
class UserController {
  static async createUser(req, res) {
    try {
      const { userName, phoneNumber, password, email, address } = req.body;
      const data = await Models.user.findOne({ phoneNumber });
      if (data) {
        return res
          .status(400)
          .json({ message: statusMessage.USER_ALREADY_EXIST, status: true });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const newData = await Models.user.create({
        userName,
        phoneNumber,
        password: hashPass,
        email,
        address,
      });
      if (newData)
        //    const user = await Models.user.create(newData)
        return res.status(200).json(newData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: statusMessage.SERVER_ERROR, status: true });
    }
  }
  static async getProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await Models.user.findById({ _id: id });
      if (!user) {
        return res.status(400).json({ message: statusMessage.BAD_REQUEST });
      }
      return res.status(200).json({ message: statusMessage.GET_SUCCESS, user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: statusMessage.SERVER_ERROR, error });
    }
  }
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await Models.user({ _id: id });
      if (!user) {
        return res.status(400).json({ message: statusMessage.BAD_REQUEST });
      }
      return res.status(200).json({ message: statusMessage.GET_SUCCESS, user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: statusMessage.SERVER_ERROR, error });
    }
  }
  static async getUsers(req, res) {
    try {
      const user = await Models.user.find({});
      if (!user) {
        return res
          .status(400)
          .json({ message: statusMessage.BAD_REQUEST, status: false });
      }
      return res.status(200).json({ message: statusMessage.GET_SUCCESS, user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: statusMessage.SERVER_ERROR, error });
    }
  }
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { userName, phoneNumber, password, email, address } = req.body;
      const data = await Models.user.findById({ _id: id });
      if (!data) {
        return res.status(400).json({ message: "not found" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const newData = {
        ...req.body,
        password: hashPass,
      };
      const user = await Models.user.create(newData);
      if (!user) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res.status(200).json({ msg: statusMessage.CREATE_SUCCESS, user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async forgotPassword(req, res) {
    try {
      const { phoneNumber, newPassword } = req.body;
      if (!phoneNumber && !newPassword) {
        return res.status(400).json({ message: statusMessage.BAD_REQUEST });
      }
      const userPhoneNumber = await Models.user.findOne({ phoneNumber });
      if (!userPhoneNumber) {
          return res
          .status(400)
          .json({ message: statusMessage.PASSWORD_NOT_MATCH });
        }
        const hash = await bcrypt.hash(newPassword, 10);
        const newData = {
            ...req.body,
            password: hash,
            updatedAt: Date.now()
        };
        console.log("hhhh")
      const user = await Models.user.findByIdAndUpdate(
        userPhoneNumber._id,
        { $set: newData },
        { new: true }
      );
      console.log("hhhh")
      if(!user){
          return res.status(404).json({message: statusMessage.USER_NOT_FOUND})
        }
        const {password, ...others} = user._doc;
        return res.status(200).json({message: statusMessage.UPDATE_SUCCESS, ...others})
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
  }
  static async updatePassword(req,res){
    try {
      const {_id} = req.params;
      const {oldPassword, newPassword} = req.body;
      if(!oldPassword & !newPassword){
        return res.status(400).json({message:statusMessage.BAD_REQUEST})
      }
      const user = await Models.user.findById({_id})
      if(!user){
        return res.status(400).json({message:statusMessage.BAD_REQUEST})
      }
      const compareWD = await bcrypt.compare(oldPassword, user.password)
      if(!compareWD){
        return res.status(400).json({message:statusMessage.PASSWORD_NOT_MATCH})
      }
      const hash = await bcrypt.hash(newPassword, 10)
      const newData = {
             ...req.body,
             password: hash,
             updatedAt: Date.now()
      }
      const userUpdate = await Models.user.findByIdAndUpdate(_id, {$set:newData},{new:true})
      if(!userUpdate){
        return res.status(400).json({message:statusMessage.USER_NOT_FOUND})
      }
      const { password, ...others } = userUpdate._doc;

      return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS,...others})
    } catch (error) {
      return res.status(404).json({ msg: statusMessage.NOT_FOUND });
    }
  }
  static async deleteUser(req, res) {
    try {
      const {id} = req.params;
      const data = await Models.user.findByIdAndDelete(id)
        if (!data) {
            return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
        }
        return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
    } catch (error) {
        return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
}
};

export default UserController;
