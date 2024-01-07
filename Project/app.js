// routes of the modules to store the node and express js

const express = require("express");
//keep passwords, API keys, and other sensitive data out of your code. It allows you to create
const dotenv = require("dotenv")
const mysql = require("mysql")
const app = express();// create express objects to link the modules
const path= require("path");
const hbs = require("hbs");
// const exphbs = require("express-handlebars");
// const json = require("json");
const exphbs = require('express-handlebars');
const twilio = require('twilio');
const cron = require('node-cron');

// Schedule the updateOrderStatuses function to run every day at a specific time (e.g., midnight)
cron.schedule('0 0 * * *', () => {
  updateOrderStatuses();
});

// const handlebars = require('handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5000', // Replace with your frontend's origin
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));

// handlebars.registerHelper('eq', function (a, b, options) {
//     if (a === b) {
//         return options.fn(this);
//     }
//     return options.inverse(this);
// });
// fetch('/createOrder', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(itemList), // Replace with your actual data
// })


const cookieParser = require("cookie-parser");
dotenv.config({
  path:"./.env"
});
// console.log(__dirname);
// if common content to all
//link--> const partialpath = pth.join(__dirname,"/views/partials");
//hbs.registerPartial("partialpath")--> this partials inside create navbar ,header copy the n,h content inside common toall
//use command{{>navbar}} {{>header}} 

//process.env --> .env secures the database information.
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
    // port:process.env.DATABASE_PORT 
});

//connect function[successful database connected or not]
// db.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('MySQL Connection Success');
//     }
// })
app.use(cookieParser());
//You NEED express.json() and
// express.urlencoded() for POST and PUT 
//requests, because in both these requests 
//you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
//this line uses our data as json formt like key/value pairs

app.use(express.static(path.join(__dirname,"controllers")));
app.use(express.static(path.join(__dirname,"public")));
// app.use(express.static(path.join(__dirname,"routes/")));
app.set('views', path.join(__dirname, "views/partials"));
// ...


// Use the sendEmail module or invoke any functions defined in send-email.js
// ...

// app.set('views', path.join(__dirname, "views/partials/womens"));
// app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set("view engine","hbs")  //hbs used for writing html in hbs to take view engine modules for
// allow us to render web pages using template files[css,javascript,images] 

// using the pages to load the project like localhost:5000/register etc
app.use('/',require("./routes/pages"));
app.use("/auth",require("./routes/auth"));
// app.use("/success",require("./routes/success"));
const partialpath = path.join(__dirname, "views/partials");
hbs.registerPartials(partialpath);
//// where "header" is an .hbs file in my views folder
// app.get('/users', (req, res) => {
//     // Read the data from data.json
//     fs.readFile('./data/products.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading data.json:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       // Parse the JSON data to an object
//       const jsonData = JSON.parse(data);
  
//       // Return the JSON data in the response
//       res.json(jsonData.products);
//     });
//   });
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views', 'partials')
]);

//setting port no for my localhost
// app.listen(7000,  () =>{
//     console.log("Server Started @ Port 7000");
// });
// Set an interval to run the updateOrderStatuses function every hour (adjust this as needed)
const updateOrderStatusesInterval = setInterval(updateOrderStatuses, 3600000); // 1 hour

const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
  
  // Connect to the database inside this callback
  db.connect((err) => {
      if (err) {
          console.error('MySQL Connection Error:', err);
      } else {
          console.log('MySQL Connection Success');
      }
  });
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });


  // Emit the 'error' event//2.25.01
//   server.emit('error', new Error('Something went wrong'));

 //twilo
 const accountSid = 'ACb4b9245e8caf571456b8f309546409dd';
const authToken = '3906965afb33f3d0a60f928decb94bd2';
const twilioClient = twilio(accountSid, authToken);

// Endpoint to send an SMS
// ...
app.post('/send-sms', (req, res) => {
  const to = req.body.to;
  
  // You can generate a new email and password here
  const newEmail = 'fabulousBoutiqueofficial_email@example.com';
  const newPassword = 'FabBoutique2023@###';

  twilioClient.messages
    .create({
      body: `Your new email: ${newEmail}, Your new password: ${newPassword}`,
      from: '+17657393220',
      to: '+919344538487',
    })
    .then((message) => {
      console.log('SMS sent successfully:', message.sid);
      res.json({ success: true });
      res.redirect('/Response');
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      // res.status(500).json({ success: false, error: 'Failed to send SMS' });
      res.status(500).send('Failed to send SMS');
    });
});
// ...

// Example route handler in your Express app
// Assuming you have already set up a database connection with the `db` object

app.post('/send-sms1', (req, res) => {
  
});
const usercontroller = require("./controllers/user.js");

// app.post('/place-order', usercontroller.isLoggedin,(req, res) => {
//   // Retrieve the user's ID from the session or token
//  if(req.users){
//   const userId = req.userId;

//   // Retrieve order data sent from the client-side JavaScript
//   const { orderData } = req.body;

//   // Include the user's ID in the order data
//   orderData.user_id = userId;

//   // Insert the order data into the 'orders' table
//   db.query('INSERT INTO orders SET ?', orderData, (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Internal Server Error');
//     }
//     // Order placement successful
//     res.status(200).send('Order placed successfully');
//   });
// }
// });

app.post('/login', usercontroller.login);
let dressItemsData = null;
app.post('/createOrder', usercontroller.isLoggedin, (req, res) => {
  if (req.users) {
    const userId = req.users.ID;
    console.log("userid from app,", userId);
    const { orders } = req.body;
    console.log('Received orders data:', orders);
    const dressItems = orders.dressItem;

    // if (Array.isArray(dressItems) && dressItems.length > 0) {
    //     // Iterate through the dressItems array
    //     for (const dressItem of dressItems) {
    //         // Extract individual fields from dressItem
    //         const {
    //             dressImage,
    //             dressName,
    //             quantity,
    //             dressID,
    //             price
    //         } = dressItem;
    // console.log('Received dress items:', dressItems.dressImage);
    // dressItemsData = dressItems;
    const { dressImages, dressNames,dressId,dressPrice,Quantity } = req.body;

  // ... (rest of your code)

  // Now, you have access to the dressImages and dressNames arrays
  console.log('Received dress images:', dressImages);
  console.log('Received dress names:', dressNames);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const currentDate = new Date();
    
    const orderNumber = generateOrderNumber();
    const {Length,Price,itemList, total_amount} = req.body;
    const { dressItem } = req.body.orders; // Access the dressItem from the specific order
   console.log('Received dress item for the specific order:', dressItem);

    console.log('Price before sending:', Price);
    // console.log('dressItem before sending:', dressItem);
    const totalAmount = orders.total_amount;
    console.log("total_amont",totalAmount);
    // Create an object with order details
  // const priceArray = Price.split(',').map((price) => parseFloat(price.trim()));
  const status = generateOrderStatus(new Date());
  const order = {
    user_id: userId, // Replace with the correct way to get the user ID
    order_no: orderNumber, // Replace with the order number
    status: status,
    delivery_date:deliveryDate,
    total_amount: total_amount,
    Length: Length,
    Price:Price,
    // dressImage: dressImage,
    // dressName: dressName,
    // Quantity: quantity,
    // dressId: dressID,
    // dressPrice: price,
    dressItem: JSON.stringify(dressItems),
    itemList: JSON.stringify(orders.itemList),
  };
  // dressItemsData = dressItems;
  // console.log("dressItem from app",dressItem);
  // // console.log("itemList dress from App",dressItem.dressImage);
  // // Insert the order into the database
  // console.log("itemList from App",order.itemList);
 
  db.query('INSERT INTO MYorders SET ?', order, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: 'Invalid dress items' });
    } else {
      console.log('Order inserted: ' + result);
      console.log('Order inserted with ID: ' + result.insertId);
      res.json({ success: true, message: 'Order created successfully' });
    }
  });
}
});


app.get('/orders', usercontroller.isLoggedin, usercontroller.orders, usercontroller.showDeliveryPage, async (req, res) => {
  try {
    // Check if user and deliveryData exist in the request
    if (!req.users || !req.deliveryData) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }
    console.log("Before checking dressItemsData");
    // Assuming you have the user's ID in req.users.ID
    if (Array.isArray(dressItemsData) && dressItemsData.length > 0) {
      console.log("Inside dressItemsData condition");
      const userId = req.users.ID;
    db.query('SELECT * FROM MYorders WHERE user_id = ?', userId, (err, results) => {
      const orders = results;
      if (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to retrieve orders' });
      } else {
        
        const ordersWithParsedDressItem = results.map(order => {
          order.dressItem = JSON.parse(order.dressItem); // Parse the JSON string
         console.log("order dressItem",order.dressItem);
          return order;
        });
        console.log("ORDERS FROM APP ", ordersWithParsedDressItem); // Correct variable name

        // Create an array to store all dress items separately
        const allDressItems = [];

        // Iterate through orders and extract dress items separately
        for (const order of ordersWithParsedDressItem) {
          const dressItems = order.dressItem;
          allDressItems.push(...dressItems); // Add dress items to the allDressItems array
        }

        // Calculate the total amount for all dress items
        const totalAmountForAllDressItems = allDressItems.reduce((total, dressItem) => {
          return total + parseFloat(dressItem.Price.replace('Rs ', '').replace(/,/g, '')); // Remove Rs and commas from Price
        }, 0);

        // Calculate the total length of all dresses in orders
        const totalLengthOfAllDresses = allDressItems.reduce((total, dressItem) => {
          return total + parseInt(dressItem.Length, 10);
        }, 0);
        console.log("Dress Items Data:", dressItemsData);
        res.render('orders.hbs', {
          orders: ordersWithParsedDressItem, // Correct variable name
          users: req.users,
          deliveryData: req.deliveryData,
          dressItems: dressItemsData, // Pass the dressItemsData array to the template
          totalAmount: totalAmountForAllDressItems,
          totalLength: totalLengthOfAllDresses
        });
      }
    });
  }else {
    console.log("No dressItemsData to display");
  }
 } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});







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
function updateOrderStatuses() {
  const currentDate = new Date();

  // Connect to your MySQL database (you should already have the connection)

  // SQL query to retrieve orders with a status of 'Ordered'
  const query = "SELECT * FROM orders WHERE status = 'Ordered'";

  // Execute the SQL query
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error while fetching 'Ordered' orders:", error);
      return;
    }

    // Loop through the results and check each order's delivery date
    results.forEach((order) => {
      const deliveryDate = new Date(order.delivery_date);

      if (currentDate >= deliveryDate) {
        // If the current date is greater than or equal to the delivery date, change the status to 'Shipped'
        const updateQuery = "UPDATE orders SET status = 'Shipped' WHERE order_id = ?";

        // Execute the update query to change the order status to 'Shipped'
        db.query(updateQuery, [order.order_id], (updateError, updateResult) => {
          if (updateError) {
            console.error("Error while updating order status to 'Shipped':", updateError);
          } else {
            console.log(`Order ID ${order.order_id} status updated to 'Shipped'`);
          }
        });
      }
    });
  });
}


// function calculateTotal(cart) {
//   // Your logic to calculate the total goes here
//   // Return the calculated total
//   cart = localStorage.getItem('cart');
//   return cart.Price;
// }

function calculateTotal(itemList) {
  let total = 0;
  for (const item of itemList) {
      const priceString = item.Price.replace(/[^\d.]/g, '').trim();
      const itemPrice = parseFloat(priceString);
      const quantity = item.quantity;

      if (!isNaN(itemPrice) && quantity > 0) {
          total += itemPrice * quantity;
      } else {
          console.error(`Invalid Price or Quantity for item: ${item.Title}`);
      }
  }
  console.log("Total:", total);
  return total;
}




// Define your route handlers
// app.get("/orders", usercontroller.isLoggedin, usercontroller.orders, usercontroller.showDeliveryPage, (req, res) => {
//   if (req.users || req.deliveryData) {
//     const { userid } = req.body;
//     const userId = userid;
//     const deliveryDate = new Date();
//     deliveryDate.setDate(deliveryDate.getDate() + 7);
//     const currentDate = new Date();
//     const status = generateOrderStatus(currentDate);
//     const orderNumber = generateOrderNumber();
//     const { itemList, dressImage, dressName } = req.body;
//     console.log("Received itemList:", itemList);

//     function calculateTotal(itemList) {
//       let total = 0;

//       for (const item of itemList) {
//         const priceString = item.Price.replace(/[^\d.]/g, '').trim();
//         const itemPrice = parseFloat(priceString);
//         const quantity = item.quantity;

//         if (!isNaN(itemPrice) && quantity > 0) {
//           total += itemPrice * quantity;
//         } else {
//           console.error(`Invalid Price or Quantity for item: ${item.Title}`);
//         }
//       }

//       console.log("Total:", total);
//       return total;
//     }

//     const itemListJson = JSON.stringify(itemList);
//     const total = calculateTotal(itemList);
//     console.log("Calculated Total:", total);
//     const order = {
//       user_id: userId,
//       order_no: orderNumber,
//       status: status,
//       dress_image: dressImage,
//       dress_name: dressName,
//       delivery_date: deliveryDate,
//       total_amount: total,
//       itemList: itemListJson
//     };

//     db.query("INSERT INTO orders SET ?", order, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.json({ success: false, message: "Failed to create order" });
//       } else {
//         console.log("Order created successfully from route.js ");
//         console.log("order data", order);

//         // After creating the order, retrieve the user's orders from the database
//         db.query("SELECT * FROM orders WHERE user_id = ?", userId, (err, orders) => {
//           if (err) {
//             console.error("Error retrieving orders:", err);
//             res.render("orders.hbs", { deliveryData: req.deliveryData, users: req.users, orders: [] });
//           } else {
//             if (orders.length > 0) {
//               // There are orders, send them in the JSON response
//               res.render("orders.hbs", { deliveryData: req.deliveryData, users: req.users, orders: orders });
//               // Now you can render the orders.hbs template if needed
//               const order = orders[0];
//               const orderNumber = order.order_no;
//               const orderStatus = order.status;
//               const orderDate = new Date(order.order_date).toLocaleDateString();

//               console.log("Order Number:", orderNumber);
//               console.log("Order Status:", orderStatus);
//               console.log("Order Date:", orderDate);

//               // Pass the `orders` data to the Handlebars template along with other data
//               res.render("orders.hbs", { deliveryData: req.deliveryData, users: req.users, orders: orders });
//             } else {
//               // No orders found, send an appropriate response
//               res.json({ success: false, message: "No orders found" });
//             }
//           }
//         });
//       }
//     });
//   } else {
//     res.json({ success: false, message: "Invalid request" });
//   }
// });