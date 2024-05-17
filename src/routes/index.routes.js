import express from "express";
import Controllers from "../controllers/index.js";
import {
  VerifyToken,
  VerifyTokenAndAdmin,
  VerifyTokenAndAdminOrStaff,
} from "../middlewares/authMiddleware.js";
const router = express.Router();
              //   ======== authController= =======
router.post("/auth/register", Controllers.authController.Signup);
router.post("/auth/login", Controllers.authController.Login);
            //  ===========userController===========
router.post("/user/createUser", Controllers.userController.createUser);
router.get("/user/getProfile/:id", Controllers.userController.getProfile);
router.get("/user/getUser", Controllers.userController.getUsers);
router.put("/user/updateUser/:id" , Controllers.userController.updateUser);
router.post("/user/forgotPassword", Controllers.userController.forgotPassword);
router.put("/user/updaatePassword", Controllers.userController.updatePassword);
router.delete("/user/deleted/:id", Controllers.userController.deleteUser);
        // ============ apartment ================
router.post("/apartment/createApartment",Controllers.apartmentController.createApartment);  
router.get("/apartment/getApartment/:_id",VerifyTokenAndAdminOrStaff, Controllers.apartmentController.getApartment) ; 
router.get("/apartment/getApartmentByCustomer", Controllers.apartmentController.getApartmentByCustomer);
router.get("/apartment/getApartmentsByAdmin",VerifyTokenAndAdminOrStaff, Controllers.apartmentController.getApartmentsByAdmin);
router.put("/apartment/updateApartment",VerifyTokenAndAdminOrStaff, Controllers.apartmentController.updateApartment);
router.delete("/apartment/deleteApartment/:_id", Controllers.apartmentController.deleteApartment) ; 
//=============== home ===============   
router.post("/home/creatHome", Controllers.homeController.createHome);
router.get("/home/getHome/:_id", Controllers.homeController.getHome);
router.get("/home/getHomesByCustomer/", Controllers.homeController.getHomesByCustomer);
router.get("/home/getHomesByAsmin", Controllers.homeController.getHomesByAdmin);
router.put("/home/updateHome/:_id", Controllers.homeController.updateHome);
router.delete("/home/deleteHome/:_id", Controllers.homeController.deleteHome)
       // =============== booking ================
router.post("/booking/createBooking", Controllers.bookingController.createBooking );   
router.get("/booking/getBooking/:_id", Controllers.bookingController.getBooking );
router.get("/booking/getBookings", Controllers.bookingController.getBookings );  
router.delete("/booking/deleteBooking/:_id", Controllers.bookingController.deleteBooking );
router.put("/booking/updateToProcess", Controllers.bookingController.updateToProcess);
router.put("/booking/updateEnd", Controllers.bookingController.updateEnd);
            //===============ckeckout=============
router.post("/checkout/createCheckout", Controllers.checkoutController.createCheckout); 
router.get("/checkout/getCheckouts", Controllers.checkoutController.getCheckouts);      
router.delete("/checkout/deleteCheckout/:_id", Controllers.checkoutController.deleteCheckout);  
router.put("/checkout/updateCheckout/:_id", Controllers.checkoutController.updateCheckout); 
router.get("/checkout/getCheckout/:_id", Controllers.checkoutController.getCheckout);
 //=================favorite============
 router.post("/favorite/createFavorite", Controllers.favoriteController.createFavorite)
 router.get("/favorite/getFavorites", Controllers.favoriteController.getFavorites)
export default router;

