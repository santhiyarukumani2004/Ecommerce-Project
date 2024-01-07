//register
// const form = document.querySelector('#form');
// const username = document.querySelector('#username');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');
// const cpassword = document.querySelector('#cpassword');
// const address  = document.querySelector('#address');
// const mn = document.querySelector('#mn');
// document.addEventListener('DOMContentLoaded', function () {
// form.addEventListener('submit',()=>{
//    e.preventDefault();
//    validateInputs();
// });





// function validateInputs(){
//    const userval =  username.value.trim();
//    const emailval = email.value.trim();
//    const passval =  password.value.trim();
//    const cpassval =  cpassword.value.trim();
//    const addressval = address.value.trim();
//    const mnval = mn.value.trim();   

//    //username
//    if (userval === '') {setError(username,'*Username is required')} 
//    else if(!validateName(userval)){setError(username,'Username is incorrect')}
//    else { setSuccess(userval);}

// //email
//    if(emailval === ''){setError(email,'*Email is required');}
//    else if (!validateEmail(emailval)){setError(email,'Email is incorrect');}
//    else {setSuccess(emailval);}

// //password
//    if(passval === ''){setError(password,'*Password is required');}
//    else if(!validatePassword(passval)) {setError(password,'Password is incorrect');}
//    else { setSuccess(passwordval);}

//  //cpassword
//    if(cpassval === ''){setError(cpassword,'*Confirm Password is required');}
//    else if(cpassval !== passval)  {setError(cpassword,'Confirm Password is incorrect');}
//    else{setSuccess(cpassval);}

//    //address
//    if(addressval === ''){setError(address,'*Address  is required');}
//   //  else if(!validateAddress(addressval) ){setError(address,'Address')}
//   else{setSuccess(addressval);}

//   //phone no
//   if(mnval === ''){ setError(mn,'*Mobile no is required');}
//   else{setSuccess(mnval);}

// }

// //step 3[setsuccess]
// function setSuccess(element){
//     const inputgroup = element.parentElement;
//     const errorelement = inputgroup.querySelector('.error');
//     errorelement.innerText = '';
//     inputgroup.classList.add('success');
//     inputgroup.classList.remove('error');
// }

// //step 4[seterror]
// function setError(element,message){
//    const inputgroup = element.parentElement;
//    const errorelement = inputgroup.querySelector('.error');
//    errorelement.innerText = message;
//    inputgroup.classList.add('error');
//    inputgroup.classList.remove('success');
   
// }

// //step 5
// const validateName = (username)=>
// {
//    return String(username).match( (/^[A-Za-z]+$/) );
// };
// const validateEmail = (email)=>
// {
//    return String(email).toLowerCase().match((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/));
// };
// const validatePassword  = (password)=>
// {
//     return String(password).match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
// };});
// // Define the selectSize function outside of the event listener
// Get the value of the 'santhiya' cookie

// You can include this code in your script.js file or wherever you need to use the token.

// Make an HTTP request to the server to log in or register
// After receiving the response JSON
// Define userid at the top level of your script


// Your other code...

// Your login function
// Modify your login function to call getOrderHistory after a successful login
// Declare userid variable in a higher scope
// Define userid at the top level of your script
// Import Axios if you installed it via npm
// const axios = require('axios');

let itemList = [];

function updatePaymentPageElements(total) {
    console.log("updatePaymentPageElements called with total:", total);
    const totAmtElements = document.querySelectorAll('.tot-amt');
    const ship = document.querySelectorAll('.ship');
    const totamt = document.querySelectorAll('.totamt');
    const save = document.querySelectorAll('.saveamt');
  
    // Calculate ship// document.addEventListener('DOMContentLoaded',ping charge and discount based on your logic
    const shippingCharge =  40; // Example calculation
const discount = total * 0.10; // Example calculation for a 10% discount
console.log("Total:", total);
console.log("Shipping Charge:", shippingCharge);
console.log("Discount:", discount);

    // Update the elements with calculated values
    totAmtElements.forEach(element => {
      element.textContent = `Rs ${total}`;
    });
  
    ship.forEach(elements => {
      elements.textContent = `Rs ${shippingCharge}`;
    });
  
    totamt.forEach(elements => {
      const totalAmount = total + shippingCharge - discount; // Calculate total amount
      elements.textContent = `Rs ${totalAmount}`;
    });
  
    save.forEach(elements => {
      elements.textContent = `Rs ${discount}`; // Display the fixed discount
    });
  
    // Update the "Total Amount" element if needed
    const totalAmountElement = document.querySelector('.tot-amt');
    if (totalAmountElement) {
      totalAmountElement.textContent = `Rs ${total}`;
    }
  }
// );
document.addEventListener('DOMContentLoaded', function () {
  getOrderHistory();
});
let userid;
let isUserLoggedIn = false;
let orders={};
// ... Previous JavaScript code ...

document.addEventListener('DOMContentLoaded', function () {
  // alert("i am script")


  // Call your getOrderHistory function
  getOrderHistory();
});

// Inside the login function, assign a value to userid
function login(email, password) {
  return new Promise((resolve, reject) => {
    axios.post('/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.data.success && response.data.id) {
          // Store the userid from the response
          userid = response.data.id;
          isUserLoggedIn = true;
          console.log("userid from script", userid);

          showCustomAlert('Welcome to Fabulous Boutique. Happy shopping');
          resolve();
        } else {
          // Handle login failure with specific error message
          console.error('Login failed:', response.data.error); // Log the error
          reject('Login failed: ' + response.data.error); // Reject the promise with an error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.message === 'Non-JSON response received') {
          // Handle the non-JSON response here, e.g., display an error message
          document.getElementById('error-message').textContent = 'Server returned non-JSON data.';
        } else {
          // Handle other errors, e.g., display a generic error message
          document.getElementById('error-message').textContent = 'An error occurred during login.';
        }
        reject('An error occurred during login.'); // Reject the promise with an error message
      });
  });
}
function getOrderHistory() {
  // Make an AJAX request to the server to retrieve order history
  fetch("/orders")
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              const orderHistory = data.orders;
              console.log("order History",orderHistory);
              // Handle the order history data (e.g., update a UI component)
          } else {
              console.error("Failed to retrieve order history");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
}

document.addEventListener('DOMContentLoaded', function () {
 // Retrieve the cart items from localStorage
 const savedCart = localStorage.getItem('cart');
  
 // Check if there are items in localStorage and parse them
 if (savedCart) {
   itemList = JSON.parse(savedCart);
 }
 
 // Calculate the total based on the retrieved items
 const total = calculateTotal(itemList);

 // Update the payment page elements
 updatePaymentPageElements(total);
 // Update the cart UI and total
 updateCartUI();
 updateCartTotal();
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  document.getElementById("btn-buy").addEventListener("click", () => {
    alert('clicked');
    // Assuming you have a proper authentication mechanism to check if the user is logged in
    const isUserLoggedIn = true; // Replace this with actual authentication logic
  
    if (!isUserLoggedIn) {
      showCustomAlert('User is not logged in. Please log in to place an order.');
      window.location.href = '/';
    } else {
      showCustomAlert('Order placement logic is executing.');
      const cart = JSON.parse(localStorage.getItem('cart'));
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      const currentDate = new Date();
      const status = generateOrderStatus(currentDate);
      const orderNumber = generateOrderNumber();
  
      const allDressItems = cart.map((item) => {
        const dressItem = {
          dressImage: item.Image,
          dressName: item.Title,
          dressId: item.dressId,
          Quantity: item.quantity,
          Price: item.Price
        };
        return dressItem;
      });
  
      const totalAmountForAllUsers = allDressItems.reduce((total, userOrders) => {
        if (!Array.isArray(userOrders)) {
          userOrders = [userOrders];
        }
        const userTotal = userOrders.reduce((userTotal, item) => {
          const numericPrice = parseFloat(item.Price.replace(/[^0-9.]/g, ''));
          return userTotal + numericPrice * item.Quantity;
        }, 0);
        return total + userTotal;
      }, 0);
      console.log(totalAmountForAllUsers)
      const totalPriceForAllOrders = allDressItems.reduce((total, item) => {
        const numericPrice = parseFloat(item.Price.replace(/[^0-9.]/g, ''));
        return total+ numericPrice * item.Quantity;
      }, 0);
    console.log(totalPriceForAllOrders)
      const orders = {
        user_id: userid, // Assuming you have the user ID defined somewhere
        order_no: orderNumber,
        status: status,
        delivery_date: deliveryDate,
        total_amount: totalAmountForAllUsers, // Add total amount here
        Length: allDressItems.length,
        Price: totalPriceForAllOrders, // Add total price here
        dressItem: allDressItems,
        itemList: JSON.stringify(cart),
      };
    
      // Log the orders object before sending
      console.log('Sending orders object:', orders);
      const allDressImages = allDressItems.map((item) => item.dressImage);
    const allDressNames = allDressItems.map((item) => item.dressName);
    const allDressId = allDressItems.map((item) => item.dressId);
    const allDressPrice = allDressItems.map((item) => item.Price);
    const allDressQuantity = allDressItems.map((item) => item.quantity);
    // Send the orders object to the server for creation
      fetch("/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
          orders:orders, 
          dressItems:allDressItems,
          dressImages: allDressImages,
          dressNames: allDressNames,
          dressId:allDressId,
          dressPrice:allDressPrice,
          Quantity:allDressQuantity,
          total_amount: totalAmountForAllUsers, // Add total amount here
          Length: allDressItems.length,
          Price: totalPriceForAllOrders, // Add total price here
          dressItem: allDressItems,
          itemList: cart,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the server's response here
        console.log("Server response:", data);
        alert("Order placed successfully from script.js");
        showCustomAlert('Order placed successfully');
        // window.location.href = '/payment';
        if (data.success ==true) {
          showCustomAlert('Order placed successfully');
          alert("Order placed successfully from script.js");
          setTimeout(function () {
            localStorage.removeItem('cart'); // Clear the cart
            itemList = []; // Empty the itemList
            updateCartUI(); // Update the cart UI
            updateCartTotal(); // Update the cart total
        
            // Redirect to the payment page or perform other actions
            window.location.href = '/payment';
        }, 8000); // 5000 milliseconds = 5 seconds else {
          alert('Order placement failed');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setTimeout(() => {
        itemList = [];
        updateCartUI();
        updateCartTotal();
        localStorage.removeItem('cart');
        window.location.href = '/payment';
      }, 5000);
    }
  });
  
  
     

  const loginButton = document.getElementById('button');
  loginButton.addEventListener('click', () => {
    const email = document.getElementById('em').value;
    const password = document.getElementById('pass').value;
    login(email, password)
      .then(() => {
        isUserLoggedIn = true;
        console.log('User logged in:', isUserLoggedIn);
        alert('success');
        setTimeout(() => { window.location.href = '/success'; }, 2000);
      })
      .catch((error) => {
        alert('failure');
        console.log("ERROR", error);
      });
  });

  // Rest of your code...
updateCartUI();updateCartTotal();
  // Call your getOrderHistory function
  getOrderHistory();
});



document.addEventListener('DOMContentLoaded', function () {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentDate = new Date();

  // Extract the date components
  const day = currentDate.getDate();
  const month = currentDate.getMonth(); // Month is zero-indexed
  const year = currentDate.getFullYear();

  // Extract the time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Calculate the date one week from the current date
  const oneWeekLater = new Date(currentDate);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  // Extract the components of the future date
  const expectedDay = oneWeekLater.getDate();
  const expectedMonth = oneWeekLater.getMonth();
  const expectedYear = oneWeekLater.getFullYear();

  // Format the current date and time/
  const formattedDate = `${day}/${monthNames[month]}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Format the expected delivery date
  const formattedExpectedDate = `${expectedDay}/${monthNames[expectedMonth]}`;

  // Display the date, time, and expected delivery date in the HTML document
  document.getElementById('date').textContent = `Date: ${formattedDate}`;
  document.getElementById('time').textContent = `Time: ${formattedTime}`;
  document.getElementById('day').textContent = `${formattedExpectedDate}`;
});

/// Example usage:
document.addEventListener('DOMContentLoaded', function () {
  const customAlertCloseButton = document.getElementById('custom-alert-close');
  customAlertCloseButton.addEventListener('click', hideCustomAlert);
});


// Assuming you have itemList declared globally

// Add an event listener to the "Cancel order" link
const cancelLink = document.querySelector('#cancel');
cancelLink.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default behavior of the link (navigating to a new page)

  // Clear the itemList array
  itemList = [];

  // Update the cart UI to reflect the empty cart
  updateCartUI();

  // Update the cart total to reflect the empty cart
  updateCartTotal();

  // Clear the cart data from localStorage
  localStorage.removeItem('cart');
});



// Function to close the alert when the close button is clicked
// function closeAlert() {
//   var alert = document.getElementById("success-alert");
//   alert.style.display = "none";
// }

function  createCart(Image,Title,Price,cartamt,quantity,size,dressId){
  // let cartamt = document.querySelector('.cart-amt');
  // let quantity = document.querySelector('#valueDisplay')
    return  `
    <div class="cart-box">
    <div class="image-column">
    <img src="${Image}" alt="" class="cart-img">
     </div>
     <div class="detail-column">
     <div class="cart-dress-title">${Title}</div>
    <div class="price-box">
       <div class="cart-price">${Price}</div>
        <div class="cart-amt">${Price}</div>
   
        <div class="selected-size"> </div>

    </div>
   </div>
      <div class="button-column">
        <button id="decreaseButton">-</button>
       <span id="valueDisplay">${quantity}</span>
      <button id="increaseButton">+</button>
      </div>
   <div class="trash-column">
      <ion-icon name="trash" class="cart-remove"></ion-icon>
   </div>
   
</div>`
 }
 // Define an object to store selected sizes for each dress item
const selectedSizes = {};
function selectSize(dressId, size, event) {
  // Remove the "active" class from all buttons in the same dress item
  console.log("dressId:", dressId);
  console.log("size:", size);

  // Debugging: Log the entire event object to inspect it
  console.log("Event Object:", event);
  selectedSizes[dressId] = size;

  // Display the selected value in the console
  console.log(`Selected Size for Dress ${dressId}: ${selectedSizes[dressId]}`);

  // Update the selected size content for the specific dress item
  const selectedSizeDiv = document.querySelector(`.selected-size`);
  console.log(`[data-dress-id="${dressId}"] .selected-size:`, selectedSizeDiv);

if (selectedSizeDiv) {
  console.log("Selected Size Div Found");
  selectedSizeDiv.textContent = `Size: ${selectedSizes[dressId]}`;
}

  if (selectedSizeDiv) {
    console.log("i am there");
    selectedSizeDiv.textContent = `Size: ${selectedSizes[dressId]}`;
  }
}

 document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.size-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      const size = event.target.getAttribute('data-size'); // Get size from data attribute
      const dressId = event.target.getAttribute('data-dress-id');
      console.log("dressId:", dressId);
      console.log("size:", size);

      selectSize(dressId, size, event);
    });
  });
  
});
function updateCartUI() {
// Add this code after adding an item to the itemList


  const cartcount = document.querySelector('#cart-count');
  let count = itemList.length; // Update this based on your cart items
  cartcount.innerHTML = count;
// my second not works so using if that cart count atleast one time to eneter the if statement this is used
  const cartcount1 = document.getElementsByClassName('cart-count');
  if (cartcount1.length > 0) {
      cartcount1[0].innerHTML = count;
  }
  
  const cartBasket = document.querySelector('.cart-content');
  cartBasket.innerHTML = '';

  itemList.forEach(item => {
    const newProductElement = createCart(item.Image, item.Title, item.Price, item.quantity,item.size,item.dressId);
    

    const element = document.createElement('div');
    element.innerHTML = newProductElement;
    cartBasket.appendChild(element);
    
const cartcount = document.querySelector('#cart-count');
let count = itemList.length;
cartcount.innerHTML = count;
const cartcount1 = document.getElementsByClassName('cart-count');
cartcount1.innerHTML = count;
console.log(count);
    const increaseButton = element.querySelector('#increaseButton');
    const decreaseButton = element.querySelector('#decreaseButton');
    const valueDisplay = element.querySelector('#valueDisplay');
    
    valueDisplay.textContent = item.quantity;

    increaseButton.addEventListener('click', () => {
      item.quantity++;
      valueDisplay.textContent = item.quantity;
      updateItemTotal(element, item.quantity);
      updateCartTotal();
      localStorage.setItem('cart', JSON.stringify(itemList));
    });

    decreaseButton.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        valueDisplay.textContent = item.quantity;
        updateItemTotal(element, item.quantity);
        updateCartTotal();
        localStorage.setItem('cart', JSON.stringify(itemList));
        
      }
    });
  });
  
  let message1 = document.querySelector('.message1');
const cartRemoveIcons = document.querySelectorAll('.cart-remove');
function hideMessageAfterDelay() {
  message1.style.display = 'block'; // Show the message initially

  setTimeout(() => {
    message1.style.display = 'none'; // Hide the message after a delay
  }, 1500);}
  // const cartRemoveIcons = document.querySelectorAll('.cart-remove');
    cartRemoveIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const cartBox = icon.closest('.cart-box');
            if (cartBox) {
                const confirmDelete = window.confirm('Are you sure you want to remove this cart box?');
                if (confirmDelete) {
                    hideMessageAfterDelay();
                    cartBox.remove();
                    const titleToRemove = cartBox.querySelector('.cart-dress-title').textContent;
                    itemList = itemList.filter(item => item.Title !== titleToRemove);
                    console.log(itemList);
                    updateCartUI();
                    updateCartTotal();
                    updateEmptyCartMessage();
                    const cartcount = document.querySelector('#cart-count');
                    
                    let count = itemList.length ; // Update this based on your cart items
                    cartcount.innerHTML = count;
// my second not works so using if that cart count atleast one time to eneter the if statement this is used
                  const cartcount1 = document.getElementsByClassName('cart-count');
                  if (cartcount1.length > 0) {
                        cartcount1[0].innerHTML = count;
  }
                 //this is  main to after refresh your page
                }
            }
        });
    });

  updateEmptyCartMessage();
  updateCartTotal();
}

// function calculateOrderStatus(orderDate) {
//   const currentDate = new Date();
//   const deliveryDate = new Date(orderDate);
//   deliveryDate.setDate(deliveryDate.getDate() + 3); // Adjust for 3 days delivery
//   const shippedDate = new Date(orderDate);
//   shippedDate.setDate(shippedDate.getDate() + 7); // Adjust for 7 days to change to "Delivered"

//   if (currentDate < deliveryDate) {
//     return 'Ordered';
//   } else if (currentDate < shippedDate) {
//     return 'Shipped';
//   } else {
//     return 'Delivered';
//   }
// }
// function displayOrderHistory() {
//   // Retrieve order history from local storage
//   const orderHistory = JSON.parse(localStorage.getItem('orderHistory'));

//   if (orderHistory && orderHistory.length > 0) {
//     const orderList = document.getElementById('order-list');
//     orderList.innerHTML = ''; // Clear previous content

//     // Loop through each order and create a row for it
//     orderHistory.forEach((order) => {
//       const orderItem = document.createElement('div');
//       orderItem.classList.add('order-item');

//       // Calculate the order status
//       const orderStatus = calculateOrderStatus(order.date);

//       // Create the order details row
//       const orderDetails = document.createElement('div');
//       orderDetails.classList.add('order-details');
//       orderDetails.innerHTML = `
//         <strong>Order #${order.orderNumber}</strong><br>
//         Date: ${order.date}<br>
//         Status: ${orderStatus}<br>
//         Delivery Expected By: <span class="h4" id="day">${calculateExpectedDeliveryDate(order.date)}</span>
//       `;

//       // Create a row for each dress in the order
//       order.items.forEach((item) => {
//         const dressRow = document.createElement('div');
//         dressRow.classList.add('dress-row');
//         dressRow.innerHTML = `
//           <div class="dress-image">
//             <img src="${item.Image}" alt="${item.Title}" width="100">
//           </div>
//           <div class="dress-details">
//             ${item.Title}<br>
//             Price: ${item.Price}<br>
//             Quantity: ${item.quantity}
//           </div>
//         `;
//         orderDetails.appendChild(dressRow);
//       });

//       // Create a button to view order details
//       const viewDetailsButton = document.createElement('button');
//       viewDetailsButton.textContent = 'View Details';
//       viewDetailsButton.addEventListener('click', () => {
//         viewOrderDetails(order.orderNumber);
//       });

//       orderDetails.appendChild(viewDetailsButton);
//       orderItem.appendChild(orderDetails);

//       orderList.appendChild(orderItem);
//     });
//   } else {
//     console.log('No order history found.');
//   }
// }

// Sample item list for demonstration
function isValidPrice(price) {
  const regex = /^Rs (\d+(\.\d{1,2})?)$/; // Matches "Rs" followed by a number with optional decimal places
  return regex.test(price);
}

function addToCart(event) {
  console.log("add to button clicked ");
  event.preventDefault();
  
  const dressID = event.target.getAttribute('data-dress-id');
  
  const dressElement = document.querySelector(`[data-dress-id="${dressID}"]`);
  if(dressElement){
  const cardimg = dressElement.querySelector('#card-img-top');
  const cardtitle = dressElement.querySelector('#card-title');
  const cardtext = dressElement.querySelector('#card-text');
  const btn = dressElement.querySelector('#btn');
  const dressId = dressElement.getAttribute('data-dress-id');
  const Image = cardimg?.getAttribute('src');
  const Title = cardtitle?.innerHTML;
  const Price = cardtext?.innerHTML;
  console.log("dreessid",dressId);
  const size = btn?.getAttribute('data-size'); // Capture the selected size
  showCustomAlert("Product is Added to your bag!");
  
  updateCartUI();
  const existingItem = itemList.find(item => item.Title === Title); // Check for both Title 
  let message = document.querySelector('.message');
  if(existingItem){
    message.classList.add('msg-shown');
    setTimeout(() => {
      message.classList.remove('msg-shown'); // Remove class after a delay (you can adjust the delay)
    }, 2000); 
    return;
  }

  if (existingItem) {
    existingItem.quantity++;
  } else {
    // Validate the Price before adding to the cart
    if (isValidPrice(Price)) {
      itemList.push({
        Image,
        Title,
        Price,
        quantity: 1,
        size,
        dressId,
      });
      console.log(itemList);
      console.log("Type of itemList:", typeof itemList);

      updateCartUI();
      localStorage.setItem('cart', JSON.stringify(itemList));  
   
    } else {
      // Handle the case where the Price is invalid (e.g., display an error message)
      alert("Invalid Price format. Please enter a valid price.");
    }
  }
}
}
function updateEmptyCartMessage() {
  const emptyCartMessage = document.querySelector('.message2');
  if (itemList.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
}
// function  createCart(Image,Title,Price,cartamt,quantity,size){
//   // let cartamt = document.querySelector('.cart-amt');
//   // let quantity = document.querySelector('#valueDisplay')
//     return  `
//     <div class="cart-box">
//     <div class="image-column">
//     <img src="${Image}" alt="" class="cart-img">
//      </div>
//      <div class="detail-column">
//      <div class="cart-dress-title">${Title}</div>
//     <div class="price-box">
//        <div class="cart-price">${Price}</div>
//         <div class="cart-amt">${Price}</div>
//         <div class="selected-size">${size}</div>
//     </div>
//    </div>
//       <div class="button-column">
//         <button id="decreaseButton">-</button>
//        <span id="valueDisplay">${quantity}</span>
//       <button id="increaseButton">+</button>
//       </div>
//    <div class="trash-column">
//       <ion-icon name="trash" class="cart-remove"></ion-icon>
//    </div>
   
// </div>`
//  }

 let cart = document.querySelector('#cart-icon');
cart.addEventListener('click',()=>{
  const cartpackage = document.querySelector('.cart-package');
  cartpackage.classList.add('cart-show');
  // console.log(cart);
  
});

let cart1 = document.querySelector('#cart');
cart1.addEventListener('click',()=>{
  const cartpackage = document.querySelector('.cart-package');
  cartpackage.classList.remove('cart-show');
});

// FULL OF OLD ORDERS


// itemList=[];

//   // Function to generate a unique order number
//   function generateOrderNumber() {
//       return Math.floor(Math.random() * 9000) + 1000;
//   }

//   // Function to get the current date
//   function getCurrentDate() {
//       const currentDate = new Date();
//       return currentDate.toDateString();
//   }

//   // Function to calculate order status
//   function calculateOrderStatus(orderDate) {
//       const currentDate = new Date();
//       const deliveryDate = new Date(orderDate);
//       deliveryDate.setDate(deliveryDate.getDate() + 3);

//       if (currentDate < deliveryDate) {
//           return 'Ordered';
//       } else if (currentDate < new Date(deliveryDate.getTime() + 4 * 24 * 60 * 60 * 1000)) {
//           return 'Shipped';
//       } else {
//           return 'Delivered';
//       }
//   }

//   // Function to calculate expected delivery date
//   function calculateExpectedDeliveryDate(orderDate) {
//       const deliveryDate = new Date(orderDate);
//       deliveryDate.setDate(deliveryDate.getDate() + 3);
//       return deliveryDate.toLocaleDateString();
//   }


//   // Function to place an order
  
//   function viewOrderDetails(orderNumber) {
//     const orderHistory = JSON.parse(localStorage.getItem('orderHistory'));
//     const order = orderHistory.find((order) => order.orderNumber === orderNumber);
  
//     if (order) {
     
//       console.log('Viewing order details:', order);
//       // Perform actions to display order details, e.g., open a modal or navigate to a new page
//     }
//   }


//   // Function to display order histor
//     function displayOrderHistory() {
//       const orderHistory = JSON.parse(localStorage.getItem('orderHistory'));
     
//       const orderListContainer = document.getElementById('order-list');
//       orderListContainer.innerHTML = ''; // Clear the container first

//       if (orderHistory && orderHistory.length > 0) {
//           orderHistory.forEach((order, index) => {
//               const orderStatus = calculateOrderStatus(order.date);

//               const orderItem = document.createElement('div');
//               orderItem.classList.add('order-item');

//               orderItem.innerHTML = `
//             <div class="order-item-col" id="orders">
//                       <strong>Order #${order.orderNumber}</strong>
//                       Date: ${order.date}
//                       <b>Status: ${orderStatus}</b>
                     
//             </div>
//                   ${order.items.map((item) => `
//     <div class="order-item-col" >
//       <img src="${item.Image}" alt="${item.Title}">
//     </div>
//     <div class="order-item-col" id="same">
//       <p><b>${item.Title}</b></p>
    
//   `).join('')}
//   Delivery Expected By: <span class="h4" id="day">${calculateExpectedDeliveryDate(order.date)}</span>
//   </div>
//                   <div class="order-item-col">
//                       <button onclick="viewOrderDetails(${index})">View Details</button>
//                   </div>
//                   </div>
//               `;
// //<!-- Assuming 'order.items' is an array of dress objects -->
// //In this code, we use the map function to iterate through each dress in the order.items array and create HTML elements for them. The join('') method 
// //is used to concatenate the HTML elements into a single string that can be inserted into your document.
//               orderListContainer.appendChild(orderItem);
//               console.log("Order List",orderListContainer );
//             });
//       } else {
//           console.log('No order history found.');
//       }
//       // console.log("Order History",orderHistory.items);
//   }

     
// // ...
// //-----------------------------------------some---------------------------------------
// // const numbers = [1, 3, 5, 6, 7];

// // const hasEvenNumber = numbers.some((number) => {
// //   return number % 2 === 0;
// // });

// // console.log(hasEvenNumber); // Output: true
// // In this example, some() returns true because it found at least one element (the number 6) 
// // that satisfies the condition of being even.
// // Function to place an order
// function placeOrder() {
//   // Create a new order with a unique order number and current date
//   console.log("Place order called");
//   const orderData = {
//   orderNumber: generateOrderNumber(),
//    date: getCurrentDate(),
//     items: [] // Initialize the items array for this order
//   };

//   // Check for duplicate items in the itemList
//   const uniqueItems = [];
//   for (const item of itemList) {
//     // Check if the item is already in the orderData
//     if (!orderData.items.some((existingItem) => existingItem.Title === item.Title)) {
//       orderData.items.push(item); // Add the unique item to the order
//       uniqueItems.push(item); 
//       // Add it to the uniqueItems list
//       console.log(item);
//     }
//   }


//   // Retrieve existing order history from local storage or initialize as an empty array
//   const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
//   console.log("exixting Orders",existingOrders);
//   // Check if the same order (same items) already exists
//   const isDuplicateOrder = existingOrders.some((existingOrder) => {
//     // Check if there are duplicate items in the existing order
//     const hasDuplicateItems = uniqueItems.some((newItem) => {
//       return existingOrder.items.some((existingItem) => {
//         // Compare items within the order for equality
//         return newItem.Title === existingItem.Title; // You should have a unique identifier for each item, like an 'id'
//       });
//     });

//     return hasDuplicateItems;
//   });

//   if (!isDuplicateOrder) {
//     // Add the new order to the order history
//     existingOrders.push(orderData);
//     console.log("ORDER DATA=>",orderData);
//     // Store the updated order history in local storage
//     localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
//  // Display the success alert
 
//  showCustomAlert('Your order has been placed successfully!');
//   res.redirect('/orders');

//   } else {
//     // Display a message if the order is a duplicate
//     showCustomAlert('This order is a duplicate and will not be placed.');
   
//   }

//   // Empty the cart and refresh the order history display
  

//   console.log("ItemList =>", itemList);
//   displayOrderHistory();
  
// }
// document.addEventListener('DOMContentLoaded', function () {
//   // Add an event listener to the "Place Order" button
//   const placeOrderBtn = document.querySelector('.btn-buy');
//   if (placeOrderBtn) {
   
//       console.log("yes",placeOrderBtn);
//   } else {
//     console.log("no");
//   }
//   placeOrderBtn.addEventListener('click', placeOrder);
 
//   displayOrderHistory(); // Initial display of orders
// });
//--------------------------------------------------------------------------------------------








const contactIcon = document.getElementById('mycontact');
const accountOptions = document.getElementById('account-options');

  // Function to toggle the visibility of account options
  function toggleAccountOptions() {
    accountOptions.style.display = accountOptions.style.display === 'none' ? 'block' : 'none';
  }
 
  

  // Event listener for clicking on the contact icon
  contactIcon.addEventListener('click', toggleAccountOptions);

  // Event listener for clicking outside the account options to hide it

  document.addEventListener('click', function (event) {
    if (!contactIcon.contains(event.target) && !accountOptions.contains(event.target)) {
      accountOptions.style.display = 'none';
    }
  });
  // Select all elements with the "order-item" class


   
  
  //special count
  let daysItem = document.querySelector("#days");
  let hoursItem = document.querySelector("#hours");
  let minItem = document.querySelector("#min");
  let secItem = document.querySelector("#sec");
  
  let countDown = () => {
      let futureDate = new Date("30 Nov 2023");
      let currentDate = new Date();
      let myDate = futureDate - currentDate;
  
      let days = Math.floor(myDate / 1000 / 60 / 60 / 24);
      let hours = Math.floor(myDate / 1000 / 60 / 60) % 24;
      let min = Math.floor(myDate / 1000 / 60) % 60;
      let sec = Math.floor(myDate / 1000) % 60;
  
      daysItem.innerHTML = days;
      hoursItem.innerHTML = hours;
      minItem.innerHTML = min;
      secItem.innerHTML = sec;
  }
  countDown();setInterval(countDown, 1000);
  
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    let total = 0;
  
    cartItems.forEach(product => {
      const valueDisplay = product.querySelector('#valueDisplay');
      const cartAmtElement = product.querySelector('.cart-amt');
      const priceElement = product.querySelector('.cart-price');
  
      const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, '').trim());
      const quantity = parseInt(valueDisplay.textContent);
      const cartAmt = price * quantity;
  
      total += cartAmt;
  
      // Update the cart amount for this item
      cartAmtElement.textContent = `Rs. ${cartAmt}`;
    });
  
    const totalElement = document.querySelector('.total-price');
    totalElement.innerHTML = `Rs ${total}`;
  
    const cartMessage = document.querySelector('.cart-message');
    const placeOrderButton = document.querySelector('.btn-buy');
    console.log('Total:',total);
        
    // localStorage.setItem('cartTotal', total); 
    const totAmtElements = document.querySelectorAll('.tot-amt');
    const ship = document.querySelectorAll('.ship');
    const totamt = document.querySelectorAll('.totamt');
    const save = document.querySelectorAll('.saveamt');
    
    // Assuming total, shipDiscount, and saveamtDiscount are defined and have appropriate values
    
    // Update the "Total" element inside your cart package if it has the class "tot-amt"
    totAmtElements.forEach(element => {
      element.textContent = `Rs ${total}`;
    });
    
    // Update the "Shipping Charge" element inside your cart package if it has the class "ship"
    ship.forEach(elements => {
      const shippingCharge = total + 40; // Calculate shipping charge
      elements.textContent = `Rs ${shippingCharge}`;
    });
    
    // Update the "Total Amount" element inside your cart package if it has the class "totamt"
    totamt.forEach(elements => {
      const totalAmount = total + 40 - 20; // Calculate total amount
      elements.textContent = `Rs ${totalAmount}`;
    });
    
    // Update the "Discount" element inside your cart package if it has the class "saveamt"
    save.forEach(elements => {
      const discount =  (total + 40 - 20) - total; // Calculate discount
      elements.textContent = `Rs ${discount}`;
    });
    
   
  
    if (total >= 500) {
      placeOrderButton.disabled = false;
      cartMessage.style.display = 'none'; // Hide the message
    } else {
      placeOrderButton.disabled = true;
      cartMessage.style.display = 'block'; // Show the message
    }
  
    // Update the cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(itemList));
  }
  
  
 function updateItemTotal(cartBox, quantity) {
    const cartAmtElement = cartBox.querySelector('.cart-amt');
    const cartPriceElement = cartBox.querySelector('.cart-price');
  const priceString = cartPriceElement.textContent.replace(/[^\d.]/g, '').trim();
  console.log('Cart Price:',priceString)  ;
  const price = parseFloat(priceString);
  console.log('Amt Price',price);
  const itemTotal = price * quantity;
    const itemTotalInt = parseInt(itemTotal); // Convert to integer without decimal places

    cartAmtElement.textContent = `Rs. ${itemTotalInt}`; // Display integer value
    localStorage.setItem('cart', JSON.stringify(itemList));
    updateCartTotal();

}

// Define the global variable
// Define the global variable and initialize it

// // Function to show the custom alert AND ALSO INDEX DETAILS

// function showTooltip() {
//     var tooltip = document.getElementById("tooltip");
//     tooltip.style.visibility = "visible";
//     tooltip.style.opacity = "1";
// }

// function hideTooltip() {
//     var tooltip = document.getElementById("tooltip");
//     tooltip.style.visibility = "hidden";
//     tooltip.style.opacity = "0";
// }


// var commonMobileNumber = '9344538487'; // The common mobile number

// function showMobileInput() {
//     document.getElementById('mobileInput').style.display = 'block';
// }

// function checkLogin() {
//     var enteredUsername = document.getElementById('login__username').value;
//     var enteredPassword = document.getElementById('login__password').value;

//     // Check if the entered values match the predefined values
//     if (enteredUsername === 'fabulousBoutiqueyofficial_email@example.com' && enteredPassword === 'FabBoutique2023@###') {
//         showCustomAlert('Login successful!');
//         window.location.href = '/Report'; // Redirect to the report page upon successful login.
//     } else {
//         showCustomAlert('Invalid email or password. Please try again.');
//     }
// }




// function checkLogin() {
//   var enteredUsername = document.getElementById('login__username').value;
//   var enteredPassword = document.getElementById('login__password').value;

//   // Check if the entered values match the predefined values
//   if (enteredUsername === 'fabulousBoutiqueyofficial_email@example.com' && enteredPassword === 'FabBoutique2023@###') {
//       showCustomAlert('Login successful!');
//       window.location.href = '/Report'; // Redirect to the report page upon successful login.
//   } else {
//       showCustomAlert('Invalid email or password. Please try again.');
//   }
// }
// function sendSmsWithTwilio() {
//     var mobileNumber = document.getElementById('login__mobile').value;

//     if (mobileNumber === commonMobileNumber) {
//         // Generate new email and password (you can customize this)
//         var newEmail = 'fabulousBoutiqueyofficial_email@example.com';
//         var newPassword = 'FabBoutique2023@###';

//         // You can send an SMS with the newEmail and newPassword here

//         // After sending SMS, show a message to the user
//         showCustomAlert('New email and password sent via SMS. Check your mobile!');

//         // Automatically populate the login fields with the new credentials
//         document.getElementById('login__username').value = newEmail;
//         document.getElementById('login__password').value = newPassword;

//         // Hide the mobile input field
//         document.getElementById('mobileInput').style.display = 'none';
//     } else {
//         showCustomAlert('Invalid mobile number. Please enter the common mobile number.');
//     }
// }




function showMobileInput() {
  document.getElementById('mobileInput').style.display = 'block';
}

// function checkLogin() {
//   var enteredUsername = document.getElementById('login__username').value;
//   var enteredPassword = document.getElementById('login__password').value;

//   // Check if the entered values match the predefined values
//   if (enteredUsername === 'fabulousBoutiqueyofficial_email@example.com' && enteredPassword === 'FabBoutique2023@###') {
//       showCustomAlert('Login successful!');
//   } else {
//       showCustomAlert('Invalid email or password. Please try again.');
//   }
// }

function sendSmsWithTwilio() {
var mobileNumber = document.getElementById('login__mobile').value;
var mobileno = '9344538487'
// Validate mobile number (you can add more validation logic here)
if (/^\d{10}$/.test(mobileNumber)) {
// Generate new email and password (you can customize this)
var newEmail = 'fabulousBoutiqueyofficial_email@example.com';
var newPassword = 'FabBoutique2023@###';
if(mobileNumber = mobileno){
// Make an HTTP request to your server-side endpoint to send the SMS
fetch('/send-sms', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      to: mobileno,
      body: `Your new email: ${newEmail}, Your new password: ${newPassword}`,
  }),
})
.then((response) => response.json())
.then((data) => {
  if (data.success) {
      showCustomAlert('New email and password sent via SMS. Check your mobile!');
      document.getElementById('login__username').value = newEmail;
      document.getElementById('login__password').value = newPassword;
  } else {
      showCustomAlert('Failed to send SMS. Please try again later.');
  }
})
.catch((error) => {
  console.error(error);
 showCustomAlert('Error sending SMS. Please try again later.');
});
} else {
showCustomAlert('Invalid mobile number. Please enter a valid 10-digit mobile number.');
}
}
}
function checkLogin() {
  var enteredUsername = document.getElementById('login__username').value;
  var enteredPassword = document.getElementById('login__password').value;

  // Check if the entered values match the predefined values
  if (enteredUsername === 'fabulousBoutiqueyofficial_email@example.com' && enteredPassword === 'FabBoutique2023@###') {
      showCustomAlert('Lets Entry To Report!');
      window.location.href = '/Report';
  } else {
      showCustomAlert('Invalid email or password. Please try again.');
  }
}

function showCustomAlert(message) {
  const customAlert = document.getElementById('custom-alert');
  const customAlertMessage = document.getElementById('custom-alert-message');

  // Set the message
  customAlertMessage.textContent = message;

  // Show the custom alert
  customAlert.style.display = 'flex';
}

// Function to hide the custom alert
function hideCustomAlert() {
  const customAlert = document.getElementById('custom-alert');
  customAlert.style.display = 'none';
}



///------------------------------------------------ORDERS-------------------------------------------
  // Function to calculate order status
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


// Function to retrieve and display a user's order history


// Call getOrderHistory when the user logs in or views their order history page
// document.addEventListener('DOMContentLoaded',
// getOrderHistory()
// );

function createOrder(orderData) {
  fetch('/orders', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Handle a successful order creation, e.g., display a success message
          alert('Order placed successfully!');
          // Clear the cart or perform any other necessary actions
          // ...
      } else {
          // Handle an unsuccessful order creation, e.g., display an error message
          alert('Failed to create order. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing your order.');
  });
}
function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${randomNumber}`;
}


    function getCurrentDate() {
            const currentDate = new Date();
            return currentDate.toDateString();
        }

        function calculateTotal(itemList) {
          let total = 0;
          
          for (const item of itemList) {
            const priceString = item.Price.replace(/[^\d.]/g, '').trim();
            const itemPrice = parseFloat(priceString);
            const quantity = item.quantity; // Assuming you have a Quantity property in your items
            
            if (!isNaN(itemPrice) && quantity > 0) {
              total += itemPrice * quantity;
            } else {
              console.error(`Invalid Price or Quantity for item: ${item.Title}`);
            }
          }
          
          console.log("Total:", total);
          return total;
        }
        





//------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  // Assuming itemList contains dress data
  const itemList = [
    {
      dressId: 'dress1',
      Image: '/images/kurti.png',
      Title: 'Navy Blue Kurti',
    },
    {
      dressId: 'dress2',
      Image: '/images/kurti3.png',
      Title: 'White Print Kurti',
    },
    {
      dressId: 'dress3',
      Image: '/images/kurti2.png',
      Title: 'Red Print Anarkali',
    },
    // Add more dress data as needed
  ];

  const tableBody = document.querySelector('.dressidcontainer');

  itemList.forEach((dress) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${dress.dressId}</td>
      <td><img src="${dress.Image}" alt="${dress.Title}" style="max-width: 100px;"></td>
      <td>${dress.Title}</td>
      <td>20</td> <!-- You can set the common stock value here -->
    `;
    tableBody.appendChild(newRow);
  });
});

function fetchOrders() {
    fetch('/api/orders') // Replace with the actual endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the orders data and populate the table
            const orders = data.orders; // Assuming your response contains an 'orders' property
            const tableBody = document.getElementById('orderTableBody');

            // Loop through orders and create table rows
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.order_no}</td>
                    <td>${order.order_date}</td>
                    <td>${order.status}</td>
                    <td>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dress Id</th>
                                    <th>Dress</th>
                                    <th>Dress Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.itemList.map(item => `
                                    <tr>
                                        <td>${item.dressId}</td>
                                        <td>${item.Title}</td>
                                        <td>${item.Price}</td>
                                        <td>${item.quantity}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// // Create an empty array to store dress objects
// const dresses = [];

// // Get all dress elements within the dressContainer
// const dressElements = document.querySelectorAll("#card");

// // Loop through each dress element and extract data
// dressElements.forEach((dressElement) => {
//     const dressId = dressElement.getAttribute("data-dress-id");
//     const dressName = dressElement.querySelector("#card-title").textContent;
//     const dressImage = dressElement.querySelector("#card-img-top").getAttribute("src");
//     const dressPriceText = dressElement.querySelector("#card-text").textContent;
    
//     // Extract the price as a number (remove "Rs " and convert to a number)
//     const dressPrice = parseFloat(dressPriceText.replace("Rs ", ""));
    
//     // Create a dress object and push it to the dresses array
//     const dress = {
//         dressId,
//         dressImage,
//         dressName,
//         Price: dressPrice,
//     };
    
//     dresses.push(dress);
// });

// // Now, dresses array contains the dynamically extracted dress data
// console.log(dresses);
// // Assuming you have already extracted dress data into the 'dresses' array

// // Get a reference to the table element where you want to display the data
// const table = document.createElement("table");
// table.id = "dressTable"; // Set the table ID if needed

// // Create a table row for the header row
// const headerRow = document.createElement("tr");

// // Create table header cells for the headers
// const headers = ["Product ID", "Products", "Product Names", "Total"];

// headers.forEach((headerText) => {
//   const th = document.createElement("th");
//   th.textContent = headerText;
//   headerRow.appendChild(th);
// });

// // Append the header row to the table
// table.appendChild(headerRow);

// // Loop through the 'dresses' array and create a table row for each dress
// dresses.forEach((dress) => {
//   const tr = document.createElement("tr");

//   // Create table data cells for each dress property
//   const tdProductId = document.createElement("td");
//   tdProductId.textContent = dress.dressId;
//   const tdProductImage = document.createElement("td");
//   const img = document.createElement("img");
//   img.src = dress.dressImage;
//   tdProductImage.appendChild(img);
//   const tdProductName = document.createElement("td");
//   tdProductName.textContent = dress.dressName;
//   const tdTotal = document.createElement("td");
//   tdTotal.textContent = `Rs ${dress.Price}`;

//   // Append the table data cells to the row
//   tr.appendChild(tdProductId);
//   tr.appendChild(tdProductImage);
//   tr.appendChild(tdProductName);
//   tr.appendChild(tdTotal);

//   // Append the row to the table
//   table.appendChild(tr);
// });

// // Get a reference to the element where you want to append the table
// const container = document.querySelector(".dressContainer");

// // Append the table to the container
// container.appendChild(table);


// // Call the function to fetch and populate orders data when the page loads
// window.addEventListener('load', fetchOrders);


// //ramyanambi234@gmail.com   Password123##