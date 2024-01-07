//database connection  import database
const mysql = require("mysql");
//used for secure password[encrypt]
//turns a simple password into fixed-length characters called a hash.
const bcrypt = require("bcryptjs");
//dotenv package-->keep passwords, API keys, and other sensitive data out of your code.
const { config } = require("dotenv");
//to securely transfer information over the web(between two parties)
const jwt = require("jsonwebtoken");
const fs = require('fs');
const exceljs = require('exceljs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//cookie-->Cookies can be used by web servers to identity and track users as they navigate different pages on a website, 
//and to identify users returning to a website.
//cookie-parser is a middleware which parses cookies attached to the client request object.
const cookieParser = require("cookie-parser");

const crypto = require("crypto");



  

//to convert a method that returns 
//responses using a callback function to return responses in a promise object.
//exaple we use method async
const{promisify} = require("util");
const { type } = require("os");
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
    // port:process.env.DATABASE_PORT ,
});













// routes.js (continued)
// user.js

// Define the current user's ID



exports.login = async(req, res) => {
    const{email,password} = req.body;
try
{
   
    db.query( "SELECT * FROM users WHERE email = ?",[email],
   async(err,result)=>{
        if(err)
        //500 --> bad request
        {console.error(err);
           return res.status(500).send("Internal Server Error");
        }
        if(result.length === 0)
        {
//401 -->unauthorized  the request has not been applied because it lacks 
//valid authentication credentials 
          return res.status(401).render("login",{msg:"Invalid email or password"});
        //   return res.status(200).redirect("/register");
        }
        // RESULT[0] --> it based on the id with increment index 0 la ulla password
        const user = result[0];
        await bcrypt.compare(password,user.PASSWORD,(bcryptError,isMatch)=>
        {
        if(bcryptError)
            {
            console.error(bcryptError);
            return res.status(500).send("Internal Server Error");
            }
        if(!isMatch)
            {
               return res.status(401).render("login",{msg:"Invalid email or password"});
            }
            // console.log(result);
            //200 -> a successful request.
        // res.status(200).render("login",{msg:"Login successful"});
        // res.send("/auth/login/success")
        const id = user.ID;
        // console.log(id);
        //sign inbuit function
//A token is an object that can be used to authenticate a user to a server. 
//define a secure way to transmit information between parties using a JSON object.
        const token = jwt.sign({id : id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN,});
       console.log("userid",id);
       console.log("user",user);
        console.log("Token:" + token);
        req.users = user;
        // console.log(id);
        //create cookie 24 hours minutes seconds milliseconds
    const cookieOptions = {expires:new Date(Date.now()+process.env.JWT_CO0KIE_EXPIRES * 24 * 60 * 60 *1000),httpOnly :true,};
    //store vlues in  
    //key name
    res.cookie("santhiya",token,cookieOptions);
    // res.status(200).redirect("/success");
    res.setHeader('Content-Type', 'application/json');
res.status(200).json({ success: true, token,id });
    // Assuming you have user authentication logic
    //redirect homepage
    

    });
   });
}

catch(error){console.log(error);}
}

// user.js
// export function someFunction() {
//    console.log("hello")
//   }


exports.register = (req,res)=>{
    // console.log("Form submitted");
    // console.log(req.body);

// this data to stores the database so,
// const username = req.body.username;

//above --> alter method of destructing objects
const{username,email,address,mn,password,cpassword} = req.body;
if (!email && !username && !address && !mn && !password && !cpassword) {
    return res.render('register',{ msg: 'All field is required',msg_type:"error1"});
  }
else{

  const isValidUsername = validateUsername(username);
  const isValidEmail = validateEmail(email);
  const isValidMN = validateMobileNumber(mn)
  const isValidPassword = validatePassword(password);
 
  if (!isValidUsername) {
      return res.render('register', { msg: 'Invalid  format', msg_type: "error1" });
  }
  if (!isValidEmail) {
      return res.render('register', { msg: 'Invalid email format', msg_type: "error1" });
  }
  if (!isValidPassword) {
      return res.render('register', { msg: 'Invalid password format', msg_type: "error1" });
  }
  if(!isValidMN){ return res.render('register', { msg: 'Invalid Mobile No', msg_type: "error1" })}
} 
function validateUsername(username) {
    return String(username).match( (/^[A-Za-z]+$/) );
    // Implement username validation logic (e.g., should not contain numbers)
}
function validateEmail(email) {
    return String(email).toLowerCase().match((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/));
    // Implement email validation logic (e.g., using a regular expression)
}

function validatePassword(password) {
    return String(password).match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    // Implement password validation logic (e.g., length, complexity)
}
function validateMobileNumber(mn) {
    // Regular expression pattern for a 10-digit mobile number in the United States
    const pattern = /^[0-9]{10}$/;
    return pattern.test(mn);
}


// Import any necessary modules or dependencies here

// Define the function to validate user inputs


// Export the validateInputs function so it can be used in other parts of your code



//asynchronous is used for control time taken[mysql connection]
//await that take lot of time
db.query("select * from users where email=?",[email],
async(error,result) =>
{
    if(error)
    {
        confirm.log(error);
    }
    else if(result.length>0)
    {
        return res.render('register',{msg:'Email Already Register',msg_type:"error1"});
    }
 else if (password != cpassword)
    {
        return res.render('register',{msg:'Password do not match',msg_type:"error1"});
    }

const hashPassword = await bcrypt.hash(req.body.password,8);
// console.log(hashPassword);
//stores the databse and also inserted
// const user = {username,email,address,mn,password}
db.query('insert into users set ?',
{username :username,email : email,address:address,mn:mn,password:hashPassword},
(error,result) =>{
  
    
if(error)
        {console.log(error);}
else
{
        // console.log(result);
        // this module is register nodule 
      return res.render('register',{msg:'User Registration is Success',msg_type:"success1"});}}
);
});
}
//AFTER logged in
exports.isLoggedin = async(req,res,next) =>{
    // req.name = "Check login........";
    // console.log(req.cookies); // santhiya-->cookie name
    if(req.cookies.santhiya){
    try{
        // verify token  because to decode the cookies[to find secret message]
//to convert a method that returns responses using a
//callback function to return responses in a promise object   
  const decode = await promisify(jwt.verify)(
            req.cookies.santhiya,
            process.env.JWT_SECRET);
        // console.log(decode);
// decode panna id eduthu complete user details we get..
        db.query("select * from users where id=?;"
        ,[decode.id],
        (err,results)=>{
            // console.log(results);//results be empty
        if(!results){return next();}
        req.users = results[0];
        // req.params.username = results[0].USERNAME;
        // req.params.email = results[0].EMAIL;
        return next();
        });
     
  }catch(error){console.log(error);
 return next();}
}
 else{
    next();}
    //decode pannanum so util pack
}

exports.logout = async(req,res) =>{
    res.cookie("santhiya","logout",{
        expires:new Date(Date.now() + 2 *! 1000),
        httpOnly:true
    });
    res.status(200).redirect("/");
}


// userController.js

//bcrypt -> turns password into fied length pasword called hash withsecurity 

// Function to handle the "Forgot Password" request
exports.resetPassword = async (req, res) => {
    const { email, newpassword } = req.body;
    console.log('Request Body:', req.body);

    try {
        // Hash the new password
       // Example validation using regular expressions
if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/.test(newpassword)) {
    throw new Error('Invalid password: Password not valid.');
}

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        //  console.log('Hashed Password:', hashedPassword);
        // this is iportant syntax to update users password
         const sql = 'UPDATE users SET PASSWORD = ? WHERE EMAIL = ?';
        db.query(sql, [hashedPassword, email], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).render('forgot.hbs', {
                    msg: `Internal Server Error:${error.message} `,
                    msg_type: 'error',
                });
            } else {
                console.log('Password updated successfully');
                res.render('forgot.hbs', {msg: 'Password reset successful',msg_type:"success1" });
            }
        });
    }  catch (error) {
        console.error('Error:', error);
        res.status(400).render('forgot.hbs', {
            msg: `Password Reset Failed: ${error.message}`,
            msg_type: 'error',
        });
    };
}

// userController.js

// const db = require('./db'); // Import the db connection

exports.showDeliveryPage = (req, res) => {
    console.log("showDeliveryPage route called");

    // Retrieve defaultAddress from req.users or set it to null if it doesn't exist
    const defaultAddress = req.users ? req.users.address : null;

    const { user_id, address, state, city, pincode, landmark, username, mn, email } = req.body;

    // Check if any required field is missing
    if (!user_id || !address || !state || !city || !pincode || !landmark || !email || !username || !mn) {
        return res.render("delivery.hbs", {
            msg: "Please provide all required information",
            msg_type: "error",
            users: req.users
        });
    }

    const deliveryData = {
        id: user_id,
        state: state,
        city: city,
        pincode: pincode,
        landmark: landmark,
        address: address || defaultAddress
    };
    console.log("Delivery Data set in showDeliveryPage:", deliveryData); // Log deliveryData here

    // Insert the delivery details into the "secondtable" with the user's ID
    db.query("INSERT INTO secondtable SET ?", [deliveryData], (error, result) => {
        if (error) {
            console.error("Database error:", error.message);
            return res.status(500).render("delivery.hbs", {
                msg: "Already Added Your Details. Please try again later.",
                msg_type: "error",
                users: req.users,
                deliveryData: req.deliveryData // No need to use req.deliveryData here
            });
        }

        // Check the result and handle any specific success or error conditions
        if (result.affectedRows > 0) {
            console.log("Delivery Data inserted successfully");
            req.deliveryData = deliveryData; // Set req.deliveryData here
            console.log("deliverData",deliveryData);
            return res.render("delivery.hbs", {
                msg: "Address Added to your ID",
                msg_type: "success1",
                users: req.users,
                deliveryData: req.deliveryData // Use req.deliveryData here
            });
        } else {
            // Insert failed
            return res.render("delivery.hbs", {
                msg: "Address insertion failed. Please try again.",
                msg_type: "error",
                users: req.users,
                deliveryData: req.deliveryData // Use req.deliveryData here
            });
        }
    });
};


exports.orders = (req, res) => {
    if (!req.users || !req.users.ID) {
      // Handle the case where user data is missing or invalid
      console.error('User data is missing or invalid');
      res.status(500).send('Internal Server Error');
      return;
    }
  
    // Assuming you have the user's ID in req.users
  
    // Use Promises to handle the asynchronous database queries
    const getOrders = () => {
      return new Promise((resolve, reject) => {
        const id = req.users.ID;
        db.query('SELECT * FROM MYorders WHERE user_id = ?', [id], (error, orders) => {
          if (error) {
            console.error(error);
            reject('Internal Server Error');
          } else {
            resolve(orders);
          }
        });
      });
    };
  
    const getSecondTableData = () => {
      return new Promise((resolve, reject) => {
        const userId = req.users.ID;
        db.query('SELECT * FROM secondtable WHERE id = ?', [userId], (error, secondTableResults) => {
          if (error) {
            console.error(error);
            reject('Internal Server Error');
          } else {
            resolve(secondTableResults[0]); // Assuming you expect a single result
          }
        });
      });
    };
  
    // Use Promise.all to execute both queries concurrently
    Promise.all([getOrders(), getSecondTableData()])
      .then(([orders, secondTableData]) => {
        // Handle the retrieved data from both tables as needed
        console.log('Orders retrieved successfully:', orders);
        // console.log('SecondTable data retrieved successfully:', secondTableData);
        const ordersWithDressItems = orders.map(order => {
          const dressItems = JSON.parse(order.dressItem);
          return {
            ...order,
            dressItems: dressItems, // Include dressItems inside each order
          };
        });
        
        console.log('Orders retrieved with dressItems:', ordersWithDressItems);

        res.render('orders.hbs', {
          orders: ordersWithDressItems,
          // dressItems:ordersWithDressItems,
          secondTableData: secondTableData,
          users: req.users,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).send(error);
      });
};
 
// user.js
// Replace with the actual database module you're using

exports.Report = async (req, res) => {
  try {
    const orders = await getAllOrders(); // Use the modified function to get all orders

    // Process and render the report
    const { reportRows, totalAmount, totalDresses } = processOrdersForReport(orders);

    res.render('report.hbs', {
      reportRows: reportRows,
      totalAmount: totalAmount,
      totalDresses: totalDresses,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Helper function to get orders
// Helper function to get all orders for all customers
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM MYorders', (err, results) => {
      if (err) {
        console.error(err);
        reject('Failed to retrieve orders');
      } else {
        resolve(results);
      }
    });
  });
};


// Helper function to process orders for the report
// Helper function to process orders for the report
const processOrdersForReport = (orders) => {
  let totalAmount = 0;
  let totalDresses = 0;
  const reportRows = [];

  for (const order of orders) {
    const dressItems = JSON.parse(order.dressItem);

    for (const dressItem of dressItems) {
      const row = {
        order_id: order.order_no,
        ordered_date: order.delivery_date,
        status: order.status,
        dress_id: dressItem.dressId,
        dress: dressItem.dressImage,
        dress_name: dressItem.dressName,
        quantity: dressItem.Quantity,
        dress_price: dressItem.Price,
      };
      
      // Calculate the total amount for this dress item and add it to the totalAmount variable
      totalAmount += parseFloat(dressItem.Price.replace('Rs ', '').replace(/,/g, ''));

      // Increment the totalDresses count by the quantity of this dress item
      totalDresses += parseInt(dressItem.Quantity, 10);
   
      reportRows.push(row);
    }
  }

  // Now you have the totalAmount and totalDresses calculated
  console.log('Total Amount:', totalAmount);
  console.log('Total Dresses:', totalDresses);

  return { reportRows, totalAmount, totalDresses };
};



// exports.order = (req, res) => {
//   db.query(`
//   SELECT
//       order_no AS "OrderNumber",
//       status AS "Status",
//       delivery_date AS "DeliveryDate",
//       JSON_UNQUOTE(JSON_EXTRACT(itemList, '$[*].dressId')) AS "DressIDs",
//       JSON_UNQUOTE(JSON_EXTRACT(itemList, '$[*].Title')) AS "DressNames",
//       JSON_UNQUOTE(JSON_EXTRACT(itemList, '$[*].Price')) AS "DressPrices"
//   FROM
//       MYorders;
//   `, (error, rows) => {
//       if (error) {
//           console.error("Error retrieving orders:", error);
//           res.status(500).send('Internal Server Error');
//       } else {
//           if (rows.length > 0) {
//               // Orders found
//               console.log("Orders:", rows);

//               // Calculate the total amount for all dress items
//               const totalAmountForAllDressItems = rows.reduce((total, order) => {
//                   return total + order.DressPrices.reduce((sum, price) => sum + parseFloat(price.replace('Rs ', '').replace(/,/g, '')), 0);
//               }, 0);

//               // Calculate the total length of all dresses in orders
//               const totalLengthOfAllDresses = rows.reduce((total, order) => {
//                   return total + order.DressIDs.length;
//               }, 0);

//               res.render('report.hbs', {
//                   orders: rows,
//                   totalAmount: totalAmountForAllDressItems,
//                   totalLength: totalLengthOfAllDresses,
//               });
//           } else {
//               // No orders found
//               console.log("No orders found");
//               res.status(404).send('No Orders Found');
//           }
//       }
//   });
// };


exports.neworders = (req, res) => {
    // Fetch orders from the database, including the itemList data
    db.query('SELECT * FROM orders', (error, orders) => {
        if (error) {
            console.error("Error retrieving orders:", error);
            res.status(500).send('Internal Server Error');
        } else {
            if (orders.length > 0) {
                // Orders found
                console.log("my orders1", orders);
                res.render('Report.hbs', { orders: orders });
            } else {
                // No orders found
                console.log("No orders found");
                res.status(404).send('No Orders Found');
            }
        }
    });
}








// const nodemailer = require('nodemailer')

exports.generateExcel = (req, res) => {
const query = `
SELECT
  u.ID,
  u.USERNAME,
  u.EMAIL,
  u.ADDRESS,
  u.mn AS 'Mobile No',
  s.state AS 'State',
  s.city AS 'City',
  s.pincode AS 'Pincode',
  s.landmark AS 'Landmark'
FROM
  users AS u
LEFT JOIN
  secondtable AS s
ON
  u.ID = s.id
`;

db.query(query, (err, results) => {
if (err) {
  console.error('Database query error:', err);
  db.end(); // Close the database connection
  return;
}

// Generate the Excel sheet
const workbook = new exceljs.Workbook();
const worksheet = workbook.addWorksheet('User Details');
worksheet.columns = [
  { header: 'ID', key: 'ID' },
  { header: 'Username', key: 'USERNAME' },
  { header: 'Email', key: 'EMAIL' },
  { header: 'Address', key: 'ADDRESS' },
  { header: 'Mobile No', key: 'Mobile No' },
  { header: 'State', key: 'State' },
  { header: 'City', key: 'City' },
  { header: 'Pincode', key: 'Pincode' },
  { header: 'Landmark', key: 'Landmark' },
];

results.forEach((row) => {
  worksheet.addRow(row);
});

// Save the Excel file to a specified location
workbook.xlsx.writeFile('user_details.xlsx').then(() => {
  console.log('Excel file created successfully');
  db.end(); // Close the database connection
});
});



// Load the Excel file
const workbook = new exceljs.Workbook();
const excelFilePath = 'user_details.xlsx'; // Replace with your Excel file path

workbook.xlsx.readFile(excelFilePath)
  .then(function() {
    // Assuming you want to read the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Define CSV file path and header
    const csvFilePath = 'output.csv'; // Replace with your desired output path
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'ID', title: 'ID' },
        { id: 'Username', title: 'USERNAME' },
        { id: 'Email', title: 'EMAIL' },
        { id: 'Address', title: 'ADDRESS' },
        { id: 'Mobile No', title: 'MOBILE NO' }, // Adjust column key to match Excel
        { id: 'State', title: 'STATE' },
        { id: 'City', title: 'CITY' },
        { id: 'Pincode', title: 'PINCODE' },
        { id: 'Landmark', title: 'LANDMARK' },
      ],
    });

    // Extract data from the worksheet
    const data = [];
    worksheet.eachRow(function(row, rowNumber) {
      // Map data to the CSV header keys
      const rowData = {
        ID: row.getCell(1).value,
        Username: row.getCell(2).value,
        Email: row.getCell(3).value,
        Address: row.getCell(4).value,
        'Mobile No': row.getCell(5).value, // Use the correct key as defined in the CSV header
        State: row.getCell(6).value,
        City: row.getCell(7).value,
        Pincode: row.getCell(8).value,
        Landmark: row.getCell(9).value,
      };
      data.push(rowData);
    });

    // Write data to CSV file
    csvWriter.writeRecords(data)
      .then(() => {
        console.log('CSV file has been written successfully');
      })
      .catch((error) => {
        console.error('Error writing CSV file:', error);
      });
  })
  .catch(function(error) {
    console.error('Error reading Excel file:', error);
  });

let query2 = 'SELECT ID, USERNAME, EMAIL, ADDRESS, mn FROM users';
db.query(query2, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      db.end(); // Close the database connection
      return;
    }
    console.log('Query results:', results); // Log the results to check if they are as expected
    // Rest of your code
  });
}  


// After successfully verifying the user's credentials and generating the JWT token
// const id = user.ID; // Assuming you have the user's ID
// const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
// });

// // Include the userid in the response
// res.status(200).json({ token, userid: id });


// function getDeliveryDataFromDatabase(userId, callback) {
//     const query = "SELECT * FROM delivery_data WHERE user_id = ?";
//     db.query(query, [userId], (error, results) => {
//         if (error) {
//             console.error("Error fetching delivery data:", error);
//             return callback(error, null);
//         }

//         // Assuming you get the delivery data associated with the user
//         const deliveryData = results[0]; // Assuming there's only one record for each user

//         callback(null, deliveryData);
//     });
// }

// // Example usage of the function:
// getDeliveryDataFromDatabase(userId, (error, deliveryData) => {
//     if (error) {
//         // Handle the error
//         console.error("Error:", error);
//     } else {
//         // Use the retrieved deliveryData
//         console.log("Delivery Data:", deliveryData);
//     }
// });

