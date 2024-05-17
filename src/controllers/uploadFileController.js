import { statusMessage } from "../config/index.js";
import UploadImage from "../middlewares/uploadFileMiddleware.js";
class UploadFileController {
  static async uploadFile(req, res) {
    try {
      const imagePaths = req.body.image;
      if (!imagePaths) {
        return res.status(404).json({ msg: statusMessage.BAD_REQUEST });
      }
      const imgUrl = await UploadImage(imagePaths);
      return res.status(200).json({ imgUrl });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
}
export default UploadFileController;
