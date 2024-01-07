const express = require("express"); // because to take express router libraries
// to create a new router objects that is pages address which stores
const usercontroller = require("../controllers/user.js");
const router = express.Router();
const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const db = mysql.createConnection({
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASS,
//     database:process.env.DATABASE,
//     // port:process.env.DATABASE_PORT 
// });
// router.use(bodyParser.urlencoded({ extended: true }));
//load homepage[ all routes of the request pages]
//to link more than routers
// router.get("/",(req,res)=>{
//    res.render("home.hbs",{});
// });
//This return the home page after login so to buy use that option

// router.get("/",(req,res)=>{
//    res.render("home.hbs",{});
// });
router.get("/",(req,res)=>{
//   if(req.users){
//    res.render("login.hbs",{users:req.users});
//   }
//   else{
//    res.redirect("/#login")
//   }
   // res.send("<h1>Hai Welcome To My Website</h1>")
   // console.log(req.name);
   res.render("login.hbs",{});
});
router.get("/register",(req,res)=>{
   res.render("register.hbs",{});
});
router.get("/placed",(req,res)=>{
   res.render("placed.hbs",{});
});
router.get("/orders", usercontroller.isLoggedin, usercontroller.orders, usercontroller.showDeliveryPage, async (req, res) => {
  try {
    // Check if user and deliveryData exist in the request
    if (!req.users || !req.deliveryData) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    // Assuming you have the user's ID in req.users.ID
    const userId = req.users.ID;
    console.log("userid from app,", userId);
    const deliveryData=req.deliveryData;
    console.log("DElivery",deliveryData);
    // Fetch orders from the database for the logged-in user
    const orderss = await db.query("SELECT * FROM MYorders WHERE user_id = ?", userId);

    if (orderss.length > 0) {
      // Parse the itemList JSON for each order
      const ordersWithParsedItems = orderss.map(order => {
        order.dressItem = JSON.parse(order.dressItem);
        return order;
      });

      res.render('orders.hbs', {
        orders: ordersWithParsedItems,
        users: req.users,
        deliveryData: req.deliveryData,
      });
    } else {
      // No orders found for the user, send an appropriate response
      return res.status(404).json({ success: false, message: "No orders found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get("/index",(req,res)=>{
   res.render("index.hbs",{});
});
router.get("/Report",usercontroller.Report,(req,res)=>{
    const orders= req.orders;
    if (orders && orders.length > 0) {
        console.log("user orders",orders);
        res.render("Report.hbs", { orders: orders });
    } else {
        res.redirect("/Report");
    }
});

router.get("/load",(req,res)=>{
   res.render("load.hbs",{});
});
router.get("/profile",usercontroller.isLoggedin,(req,res)=>{
   if(req.users){
   res.render("profile.hbs",{users:req.users});}
   else{res.redirect("/profile")}
});

   // Check if user and deliveryData exist in the request
 // In your /delivery route
 router.get("/delivery", usercontroller.isLoggedin, (req, res) => {
   // Check if user and deliveryData exist in the request
   if (req.users && req.deliveryData) {
       res.render("delivery.hbs", { users: req.users, deliveryData: req.deliveryData });
   } else {
       res.render("delivery.hbs", { users: req.users, deliveryData: null });
   }
});
router.get('/ResetPassword', (req, res) => {
   res.render('forgot.hbs'); // Render the "Forgot Password" form
});
router.get("/success",(req,res)=>{
   res.render("success.hbs",{});
});
router.get("/Payment",(req,res)=>{
   res.render("payment.hbs",{});
});
router.get("/Kurti",(req,res)=>{
   res.render("Kurti.hbs",{});
});
router.get("/Gowns",(req,res)=>{
   res.render("gowns.hbs",{});
});
router.get("/mycart",(req,res)=>{
   res.render("mycart.hbs",{});
});

router.get("/logout",usercontroller.logout,(req,res) =>{
    res.cookie("santhiya","logout",{
        expires:new Date(Date.now() + 2 *! 1000),
        httpOnly:true
    });
    res.status(200).redirect("/");
});

//holds the exported values and functions from that module.
//module.exports-> object in a file 
//specifies the values to be exported from that file
//to exports javascript module that means uses in js file like app.js,...
module.exports = router;


function generateOrderStatus(orderDate) {
   const currentDate = new Date();
   const deliveryDate = new Date(orderDate);
   deliveryDate.setDate(deliveryDate.getDate() + 3);

   if (currentDate < deliveryDate) {
       return 'Ordered';
   } else if (currentDate < new Date(deliveryDate.getTime() + 4 * 24 * 60 * 60 * 1000)) {
       return 'Shipped';
   } else {
       return 'Delivered';
   }
}
function generateOrderNumber() {
   const randomNumber = Math.floor(Math.random() * 9000) + 1000;
   return `ORD-${randomNumber}`;
}
