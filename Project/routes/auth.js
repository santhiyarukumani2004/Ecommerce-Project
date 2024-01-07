const express = require("express");
const usercontroller = require("../controllers/user.js");
const router =  express.Router();
// const bodyParser = require("body-parser");


//controller handle database
//post[/auth folder] data takes users controllers theses process 
//controller is a class defined with methods for handling one or more requests. 
//action   [auth]route-->get((user/{id})),  usercontroller --> show
//toutes only done with controllers
//controllers --> handling incoming requests and returning responses to the client.
//for example to submit your register.hbs the it will respond the form submitted using controller[users.js]  
router.post("/register",usercontroller.register);
router.post("/login",usercontroller.login);
router.get("/logout",usercontroller.logout);
router.post("/showDeliveryPage", usercontroller.showDeliveryPage);

// Route for handling password reset
router.post('/ResetPassword', usercontroller.resetPassword);
// In your router (auth.js or users.js)
router.get("/orders", usercontroller.isLoggedin, usercontroller.orders,usercontroller.showDeliveryPage);
router.get('/generateExcel', usercontroller.isLoggedin, usercontroller.generateExcel);
router.get("/Report",usercontroller.orders,usercontroller.Report);
router.get("/neworders",usercontroller.neworders);



  
module.exports = router;

//auth that routes using register method for response --> these action operate with controllers to responding 