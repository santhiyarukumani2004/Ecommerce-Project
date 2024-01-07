// const express = require("express");
// const router = express.Router();
// const usercontroller = require("../controllers/user.js");
// const script = require("./public/javascript/script.js")

// // Create a new order
// router.post("/createOrder", usercontroller.isLoggedin, (req, res) => {
//     if(req.users){
//         const {userid} = req.body;
//         const userId = userid; 
//         const orderNumber = generateOrderNumber();
//         const deliveryDate = new Date();
//         deliveryDate.setDate(deliveryDate.getDate() + 7);
//         const currentDate = new Date(); // Get the current date
// const status = generateOrderStatus(currentDate);
//         const { dressImage, dressName, total,itemList } = script.itemList;
      
//         // Calculate the delivery date (current date + 7 days)
       
//         // Construct the order object
//         const order = {
//             user_id: userId,
//             order_no :orderNumber,
//             status:status,
//             dress_image: dressImage,
//             dress_name: dressName,
//             delivery_date: deliveryDate,
//             total_amount:total,
//             itemList,
//         };
        
//         // Insert the order data into the database
//         db.query("INSERT INTO orders SET ?", order, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 res.json({ success: false, message: "Failed to create order" });
//             } else {
//                 console.log("Order created successfully");
//                 res.json({ success: true, message: "Order created successfully" });
//             }
          
//           });
//       }
// });

// // Retrieve a user's order history
// router.get("/orderHistory", usercontroller.isLoggedin, (req, res) => {
//     if(req.users){
//         const {userid} = req.body;
//   const userId = userid; 
//         // Query the database to retrieve the user's order history
//         db.query("SELECT * FROM orders WHERE user_id = ?", [userId], (err, results) => {
//             if (err) {
//                 console.error(err);
//                 res.json({ success: false, message: "Failed to retrieve order history" });
//             } else {
//                 // Send the order history to the client
//                 res.json({ success: true, orders: results });
//             }
//         });
//       }
// });

// module.exports = router;
// function generateOrderNumber() {
//     return Math.floor(Math.random() * 9000) + 1000;
//   }