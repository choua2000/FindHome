import { Models } from "../models/index.js";
import { statusMessage } from "../config/index.js";
import { sendEmail, sendEmailToAdmin } from "../middlewares/searchGmailMiddleware.js";
class BookingController {
  static async createBooking(req, res) {
    try {
      const { apartment, home, email, priceBooking, bookingStatus } = req.body;
      //     if(!req.body){
      //         return res.status(400).json({msg: statusMessage.BAD_REQUEST})
      //     }
      const data = {
        apartment,
        home,
        email,
        priceBooking,
        bookingStatus,
      };
      const booking = await Models.booking.create(data);
      if (!data) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res
        .status(201)
        .json({ msg: statusMessage.CREATE_SUCCESS, booking });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getBooking(req, res) {
    try {
      const { _id } = req.params;
      const data = await Models.booking.findById(_id);
      if (!data) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res.status(201).json({ msg: statusMessage.GET_SUCCESS, data });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR });
    }
  }
  static async getBookings(req, res) {
    try {
      const data = await Models.booking.find();
      if (!data) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      return res.status(201).json({ msg: statusMessage.GET_SUCCESS, data });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR });
    }
  }
  static async deleteBooking(req,res){
    try {
        const {_id} = req.params;
        const data = await Models.booking.findByIdAndDelete(_id);
        if(!data){
            return res.status(404).json({msg: statusMessage.BOOKING_NOT_FOND})
        }
        return res.status(201).json({msg: statusMessage.DELETE_SUCCESS})
    } catch (error) {
        return res.status(500).json({ msg: statusMessage.SERVER_ERROR });

    }
  }
  static async updateToProcess(req,res){
    try {
        const {_id, email} = req.body;
        if(!_id){
            return res.status(400).json({msg : statusMessage.BAD_REQUEST})
        }
        const statusBooking = await Models.booking.findById(_id)
        if(statusBooking.bookingStatus !== "BOOKING" ){
            return res.status(400).json({msg : statusMessage.PERMISSION_DENIED})
        }
        const emailInfo = await sendEmailToAdmin(email `${statusMessage.BOOKING_MESSAGE}, ${email}`)
        const data = {
            ...req.body,
            bookingStatus:"PROCESS"
        }
        const booking = await Models.booking.findByIdAndUpdate(
            _id,
            {$set: data},
            {new: true}
        );
        if(!booking){
            return res.statua(400).json({msg: statusMessage.BAD_REQUEST})
        }
        return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS, result:{booking, email: `ມີການຈອງເຂົ້າມາໃໝ່ຈາກ ${email} ສະຖານະ ${emailInfo}`}})
    } catch (error) {
        return res.status(500).json({ msg: statusMessage.SERVER_ERROR });
    }
  }
  static async updateEnd(req,res){
    try {
        const {_id, bookingStatus} = req.body;
        if(!_id){
            return res.status(400).json({msg : statusMessage.BAD_REQUEST})
        }
        const customerBooking = await Models.booking.findById(_id)
        if(!customerBooking.bookingStatus !== "PROCESS"){
            return res.status(400).json({msg : statusMessage.PERMISSION_DENIED})
        }
        const customerEmail = customerBooking.email
        let emailInfo
        if(bookingStatus ==  "SUCCESS"){
            emailInfo = await sendEmail(customerEmail.statusMessage.BOOKING_SUCCESS)
        } else{
            emailInfo = await sendEmail(customerEmail.statusMessage.BOOKING_SUCCESS)
        }
        const data = {
            ...req.body,
            bookingStatus,
            updatedBy: req.payload._id.toStoring(),
            updatedAt: Date.now()
        };
        const booking = await Models.booking.findByIdAndUpdate(
            _id,
            {$set: data},
            {new: true}
        );
        if(!booking){
            return res.status(404).json({msg : statusMessage.BOOKING_NOT_FOND})
        }
        return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, result:{booking, email:` ສົ່ງ Gmail ສຳເລັດໄປທີ່ ${customerEmail} ສະຖານະ ${emailInfo}`  }});
    } catch (error) {
        return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
}
export default BookingController;
