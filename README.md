Welcome to the Follow Along Project: Milestone 1!

In this mentor-led session, you will begin an exciting journey to build a full-fledged E-Commerce Application from scratch using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This project is designed to provide hands-on experience with real-world development concepts and tools.

Key features of the project This project will be built using MERN Stack. REST API Creation: Through the mentor-guided project, you will learn to build scalable APIs. Authentication: You will get to learn to implement secure login and registration functionalities. -Database Schema Design: You will get to explore how to create structured data models using MongoDB. Backend Development: As a part of the project, you will learn to set up robust server-side logic with Node.js and Express.

Core concepts covered Overview of the MERN stack :- The MERN stack is a popular set of technologies used for building full-stack web applications.The MERN stack is favored for its JavaScript-only approach, enabling developers to use a single language across the entire application (both front-end and back-end). This streamlines development and makes it easy for newbies 🐣.

## Milestones

### Milestone 1: Repository Creation

* Created a GitHub repository named "Ecommerce-Follow-Along" with a README file.

### Milestone 2: Initial Setup & Login Page

* Pushed code to the GitHub repository.
* Set up separate folders for frontend and backend.
* Developed a functional Login Page for the frontend.
* Set up a React app for the frontend and a Node.js server for the backend.
* Configure CSS for styling.
* Added optional extensions for improving development efficiency.
* Built a functional and styled Login Page for the frontend.

### Milestone 3: Project Setup & Foundation

* Established project structure, set up database connection, and implemented basic error handling.

### Milestone 4: User Authentication & File Uploads

* Implemented user registration, login, and file upload functionalities.
* Integrated user authentication and authorization middleware.

### Milestone 5: User Signup

* Created the Signup page with form validation.

### Milestone 6: Password Encryption & Data Storage

1. **Encrypt Password:**
    * Hash the user's password with `bcrypt` during signup.
    * Store the hashed password securely in the database.

2. **Store User Data:**
    * Save user data (e.g., name, email) in the database, ensuring the password remains encrypted.

### Milestone 7: Login Endpoint

1. **Accept User Credentials:** Receive email/username and password from the user.
2. **Retrieve User:** Query the database for the user matching the provided credentials.
3. **Password Validation:**
    * Hash the entered password with `bcrypt`.
    * Compare the hashed password with the stored hashed password in the database.
    * Authentication is successful if they match.

### Milestone 8: Product Card & Homepage Layout

* Created a reusable Card Component with props for product details.

* Designed the Homepage layout using a grid or flexbox to display multiple product cards.

### Milestone 9: Product Form Creation

1. **Create Product Form:**
   - Make a form for adding product details like name, description, price, and images.

2. **Image Uploads:**
   - Allow users to upload multiple images for the product.

3. **Form Validation:**
   - Check that the form fields are filled correctly (e.g., price is a number, name is not empty).

### Milestone 10: Product Schema & Endpoint

1. **Product Schema:**
   - Define product details (name, description, price, image URL) using Mongoose with validation.

2. **Endpoint Creation:**
   - Create a POST endpoint to save product data to MongoDB.

3. **Why Validation?**
   - Ensures only valid data is saved, keeping the database accurate.

### Milestone 11: Data Fetching and Display

This milestone focuses on fetching product data from the backend and dynamically displaying it on the frontend using product cards.

**Key Objectives**

* Implement a backend endpoint to retrieve all product data from MongoDB and send it to the frontend.

* Create a frontend function to fetch the product data from the endpoint.

* Dynamically render the retrieved product data using the existing product card component.

### Milestone 12: My product Page 

This milestone focuses on creating a "my Products" page that displays only the product added by the logged-in user (identified by their email).

**Key Objectives** 

* Implement a backend endpoint that retreives products from MongoDB, filtering by the user's email address.

* Create a frontend function to fetch the filtered product from the endpoint.

* Dynamically render the retrieved product data on the "My Products" page using the existing product card component.

### Milestone 13: 

This milestone focuses on adding the ability to edit uploaded products, allowing users to update product details directly from the Products page.

**Key Objective**

* Add a edit button on each product card on the product page.

* implement a backend endpoint to update product details in mongoDB.

* Ensure changes are reflected on the front end.


### Milestone 14: 

Implemented product deletion: backend endpoint to delete products by ID and frontend "Delete" button functionality.

**Key Objectives**

* Added a delete button in the front and implemented its functionality 

* Implemented an endpoint to delete the products by their ID.

### Milestone 15: 

This milestone focuses on creating a reusable navigation bar, ensuring seamless navigation across different pages in the application.

**Key Objectives**

* Create a Navbar Component: Develop a separate Nav.jsx component.

* Integrate Navbar Across Pages: Use the Nav component in the main layout for consistent navigation.

* Improve User Experience: Enhance the UI with styling to make the navbar modern and easy to use.

### Milestone 17 :

This milestone is to write the cart schema to store products and to create an endpoint to store receive and store product details in cart.

**Key Objectives**

* Created a schema model for cart products.

* Implemented an endpoint for store recieve and storing product details in a cart 

## Milestone 18: Fetch Cart Products

### Learning Goals  
- Create an endpoint to retrieve products from the user's cart.  

### Steps  
1. Build a backend endpoint to fetch cart products using the user’s email.  
2. Integrate with the cart page.  

---

## Milestone 19: Cart Page UI & Quantity Update  

### Learning Goals  
- Create a frontend cart page to display products.  
- Add + and - buttons to adjust quantity.  
- Write an endpoint to update quantity.  

### Steps  
1. Design the cart UI and display cart products.  
2. Implement + and - buttons for quantity control.  
3. Write an endpoint to update product quantity in the cart.  

---

## Milestone 20: Profile Page  

### Learning Goals  
- Build a backend endpoint to fetch user data.  
- Create a frontend profile page to display user info.  

### Steps  
1. Develop a backend endpoint to send user data.  
2. Create a profile page displaying photo, name, and email.  
3. Show address section with an "Add Address" button.  
4. If no address is found, display "No address found."  

## Milestone 21: Address Form Page  

### Learning Goals  
- Create a form to collect address details.  
- Store input values using React state.  
- Navigate to the form when "Add Address" is clicked.  

### Steps  
1. **Create Address Form Page** – Add fields for country, city, address1, address2, zip code, and address type.  
2. **Manage State** – Store input values using state.  
3. **Navigation** – Clicking "Add Address" in the profile page should open this form.  


## Milestone 22: Save Address in Database  

### Learning Goals  
- Create a backend endpoint to store the address in the user profile.  

### Steps  
1. **Create Backend Endpoint** – Receive address data from the frontend form.  
2. **Update User Collection** – Add the address to the address array inside the user collection.  

## Milestone 23: Select Address & Order Schema  

### Learning Goals  
- Add a "Place Order" button in the cart.  
- Create a select address page in the frontend.  
- Write an order schema in the backend.  

### Steps  
1. **Add Place Order Button** – Inside the cart page, navigate to the select address page when clicked.  
2. **Create Select Address Page** – Display all saved addresses and allow the user to choose one.  
3. **Backend Endpoint** – Create an endpoint to fetch all addresses of the user.  
4. **Write Order Schema** – Define a schema in Mongoose to store order details.  

# Milestone 24: Select Address Page  

## Learning Goals  
- Fetch and display saved addresses.  
- Allow users to select a delivery address.  
- Integrate address selection with order placement.  

## Steps  
1. **Fetch Addresses** – Get user addresses using `/api/v1/profile/getProfile`.  
2. **Display Addresses** – Show addresses with radio buttons for selection.  
3. **Confirm Selection** – Add a "Confirm Address" button to proceed to order confirmation.  

---

# Milestone 25: Order Confirmation Page  

## Learning Goals  
- Show selected address and cart details.  
- Provide an option to place an order.  

## Steps  
1. **Fetch Cart Items** – Display cart products using `/getCart`.  
2. **Show Address** – Display the selected delivery address.  
3. **Place Order** – Add a "Place Order" button to send order data to `/api/v1/orders/create`.  

---

# Milestone 26: Fetch User Orders  

## Learning Goals  
- Retrieve user orders using email.  
- Display past orders in the frontend.  

## Steps  
1. **Backend Update** – Modify `/api/v1/orders/user-orders` to accept `userEmail`.  
2. **Fetch Orders** – Retrieve orders using `_id` mapped from `userEmail`.  
3. **Sort & Display** – Sort orders by `createdAt` and populate product details.  

---

# Milestone 27: My Orders Page  

## Learning Goals  
- Show order history for users.  
- Provide easy access to past orders.  

## Steps  
1. **Create MyOrders Page** – Fetch and display user orders.  
2. **Navigation** – Add a "My Orders" link in the navbar.  
3. **Improve UI** – Show order status, date, and total amount.  

---

# Milestone 28: Order Cancellation  

## Learning Goals  
- Allow users to cancel orders.  
- Update order status dynamically.  

## Steps  
1. **Update MyOrders Page** – Add a "Cancel Order" button for eligible orders.  
2. **Create Backend Endpoint** – Add `PUT /api/v1/orders/cancel/:orderId`.  
3. **Update Status** – Change order status to "Cancelled" upon request.  

---

# Milestone 29: Payment Options Setup  

## Learning Goals  
- Prepare for payment integration.  
- Navigate users to a payment options page.  

## Steps  
1. **Modify Order Confirmation** – Navigate to `/payment-options` on "Place Order".  
2. **Pass Order Details** – Send cart items, subtotal, and address to the payment page.  
3. **Prepare UI** – Add radio buttons for "Cash on Delivery" and "Online Payment".  

---

# Milestone 30: Payment Integration  

## Learning Goals  
- Implement PayPal payment integration.  
- Support multiple payment methods.  

## Steps  
1. **Create PaymentOptions Page** – Show payment choices to users.  
2. **Integrate PayPal** – Use `@paypal/react-paypal-js` for online payments.  
3. **Save Order on Success** – Call `/api/v1/orders/create` after successful payment.  
4. **Redirect on Completion** – Navigate to `/order-success` after order placement.  


# **Milestone 31: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Redux Installation**: Installed the `react-redux` npm package for global state management.
- ✅ **Store Folder Creation**: Created a `store` folder in the `client` directory with `store.js` and `userActions.js` files.
- ✅ **Global State Configuration**: Configured a Redux store in `store.js` with a `userReducer` to manage the user’s email state.
- ✅ **Action Creator**: Defined a `setEmail` function in `userActions.js` to update the email in the global state.
- ✅ **Provider Integration**: Wrapped the `App` component with the `Provider` component in `main.jsx`, passing the store as a prop.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing frontend structure without backend modifications.

## **3️⃣ Key Achievements**

- Successfully set up Redux to manage the user’s email as a global state, accessible across components like `OrderConfirmation`, `PaymentOptions`, and `MyOrders`.
- Established a foundation for centralized state management in the e-commerce application.

# **Milestone 32: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Dispatch Email in Login**: Updated the `Login` page to use `useDispatch` from `react-redux` to dispatch the `setEmail` action, storing the user’s email in the global state after a successful login.
- ✅ **Access Email with useSelector**: Modified `OrderConfirmation`, `PaymentOptions`, and `MyOrders` pages to access the user’s email from the Redux store using `useSelector`, replacing previous methods (`localStorage`, URL params, or navigation state).
- ✅ **Removed Redundant Email Storage**: Removed `localStorage` usage for storing the email in `Login` and other pages, relying entirely on Redux for email management.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing endpoints (`/login`, `/getCart`, `/getUserByEmail`, `/api/v1/orders/create`) without modifications.

## **3️⃣ Key Achievements**

- Successfully used Redux to store and access the user’s email across the application, ensuring consistent state management.
- Eliminated dependency on `localStorage` and URL params for email access, improving security and maintainability.





