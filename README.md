# Bistro Boss Restaurant (Server Side)

Welcome to the Bistro Boss Restaurant server-side repository! This project provides the backend services for the Bistro Boss Restaurant web application, which is built using various modern technologies to ensure a seamless and secure experience for both users and administrators.

## Technologies Used

### Client Side:
1. **React**
2. **React Router**
3. **Firebase** (Authentication & Hosting)
4. **Axios JS**
5. **Tailwind CSS**
6. **Daisy UI**
7. **React Helmet**
8. **React Hook Form**
9. **React Icons**
10. **React Parallax**
11. **React Responsive Carousel**
12. **React Simple Captcha**
13. **React Tabs**
14. **Recharts**
15. **Sweet Alerts**
16. **Swiper**
17. **Stripe**

### Server Side:
1. **CORS**
2. **Dotenv**
3. **Express.js**
4. **Node.js**
5. **MongoDB**
6. **JWT**
7. **Stripe**

## Key Features

1. **Navigation**: Bistro Boss Restaurant website has 6 navlinks.
2. **Home Page**: Unregistered users can view the carousel, swiper, menu items with a "View Full Menu" button, a parallax section, customer reviews, and footer.
3. **Dashboard Page**: The view differs for regular users and admins. Admins can see stats that regular users cannot.
4. **Menu Page**: Regular users can see all the menu items with descriptions and an "Order Now" button.
5. **Order Food**: Users navigate to this route after clicking "Order Now."
6. **Menu Tabs**: Users can see 5 tabs containing different categories of menu items.
7. **Protected Routes**: Users cannot add items to the cart before registering or logging in.
8. **Add to Cart**: After logging in, users can add products to the cart.
9. **Cart Navigation**: Clicking the cart icon navigates users to the "My Cart" navbar in the separate dashboard for regular users.
10. **Checkout**: Clicking "Pay" navigates users to the checkout page with Stripe payment gateway integration.
11. **Payment History**: Users are navigated to the "Payment History" link in the dashboard route after checkout.
12. **Admin Dashboard**: Separate links for Admin Home, Add Items, Manage Items, Manage Bookings, and All Users.
13. **Admin Stats**: Admin Home displays stats related to revenue, customers, menus, and orders with numbers, bar, and pie charts.
14. **Add Items**: Admins can add new items by filling out menu information.
15. **Manage Items**: Admins can load and see all menu items.
16. **User Management**: Admins can see all registered users, make users admins, or remove admin rights.
17. **Secure APIs**: JWT is used to secure the API, ensuring only valid users can load data.
18. **Admin Route Protection**: Admin routes are protected from unauthorized users manually typing the route in the search bar.
19. **Stripe Integration**: Users can purchase products using their card information through the Stripe payment gateway.
20. **User Registration and Login**: New users can register, and existing users can log in. Users can navigate between login and register links. Forms are implemented with Daisy UI and React Hook Form.

## API Endpoints

### JWT Related API
- **Generate JWT Token**: Generates a JWT token for authenticated users.

### Menu Collection API
- **Get All Menus**: Retrieves all menu items.
- **Get Specific Menu**: Retrieves a menu item by its ID.
- **Add New Menu**: Adds a new menu item (protected for admins).
- **Update Menu**: Updates specific fields of a menu item by its ID.
- **Delete Menu**: Deletes a menu item by its ID (protected for admins).

### Review Collection API
- **Get All Reviews**: Retrieves all review data.

### Cart Collection API
- **Get All Cart Data**: Retrieves all cart data for a user by email.
- **Add Item to Cart**: Adds a new food item to the cart.
- **Delete Cart Item**: Deletes a specific cart item by its ID.

### User Collection API
- **Get All Users**: Retrieves all user information from the database (protected for admins).
- **Check Admin Status**: Checks if a user is an admin.
- **Save User Information**: Saves user information to the database.
- **Make User Admin**: Grants admin rights to a specific user.
- **Delete User**: Deletes a specific user by their ID (protected for admins).

### Payment API
- **Create Payment Intent**: Creates a payment intent using Stripe.
- **Get Payment Info**: Retrieves payment information for a user by email.
- **Save Payment Info**: Saves payment information to the database and removes items from the cart after payment.

### Admin Stats API
- **Get Admin Stats**: Retrieves stats for admins, including user count, menu item count, order count, and total revenue.

### Order Stats API
- **Get Order Stats**: Retrieves order statistics using an aggregate pipeline.

This comprehensive setup ensures a seamless experience for both users and administrators, offering robust features and secure interactions.
## Live Website

* Firebase: https://bistro-boss-client-8d542.web.app/

* Netlify: https://bistro-boss-client-nion.netlify.app/

* Surge: https://waiting-lettuce.surge.sh/
## Getting Startted

### Prerequisites

- Node.js installed on your local machine.
- MongoDB instance (local or cloud-based) for data storage.
- SMTP service credentials for sending emails (e.g., Gmail SMTP).

## Installation


1. Clone the repository:

   ```bash
   git clone https://github.com/Nadim-Nion/bistro-boss-server.git
   ```

2. Install dependencies:

   ```bash
   cd bistro-boss-server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   SMTP_HOST=<smtp_host>
   SMTP_PORT=<smtp_port>
   SMTP_USER=<smtp_username>
   SMTP_PASS=<smtp_password>
   ```

4. Start the server:

   ```bash
   npm start
   ```Absolutely, here's the section on commits with a potential improvement:

## Commits

This repository adheres to a structured commit message convention to enhance readability and maintainability. Here's an overview of the key commit types:

- **feat:** Introduces a new feature to the application.
- **fix:** Addresses a bug or issue identified in the codebase.
- **docs:** Encompasses changes made to documentation, such as updates, additions, or corrections.
- **style:** Covers formatting adjustments, whitespace changes, or fixing minor inconsistencies like missing semicolons.
- **refactor:** Represents code structure improvements without altering functionality. This can involve code organization, renaming variables or functions, or improving readability.
- **test:** Introduces new tests or updates existing tests to ensure code quality and maintainability.
- **chore:** Encompasses changes that don't directly affect the application's functionality, such as updating build tasks, package manager configurations, or dependency versions.

**Optional Improvement:**

Consider adopting a more comprehensive commit message convention like Conventional Commits ([https://www.conventionalcommits.org/en/v1.0.0-beta.4/](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)). This approach provides a standard format for commit messages, including type, scope (optional), and a clear description of the change, making it easier to generate changelogs, automate workflows, and collaborate effectively.

By following these guidelines and potentially adopting a more detailed convention, you'll ensure clear and consistent commit messages that benefit you and your team in the long run.
## Contributing

Contributions are always welcome!

Contributions are welcome! Please open a pull request for any improvements or features.

Please adhere to this project's `code of conduct`.


## License

This project is licensed under the [MIT License](LICENSE).


## Deployment

To deploy this project run

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add originhttps://github.com/Nadim-Nion/bistro-boss-server.git
git push -u origin main

```


## Tech Stack

**Client:** React+Vite, React Router, Firebase (Authentication & Hosting), Tailwind CSS, Daisy UI, Axios JS

**Server:** Express.js, Node.js, JWT, Stripe

**Database:** MongoDB

**Tools:** Vite, Vercel, npm, Surge, Netlify

**State Management:** Context API



## FAQ

#### Is this website reponsible?

Answer : Yes, the full website is responsive for the all devices (Desktop, Tablet and Phone)

#### Is this website store data to the database?

Answer : I have stored all the data in MongoDB.

## 🚀 About Me
Hi, I am Nadim Mahmud Nion. I have recently concluded my graduation from the department of Computer Science and Engineering (CSE) at the Daffodil International University (DIU). I have been learning MERN Stack Web Development since 2022. I am expertise in the following skills:

* React

* Express.js 

* Node.js 

* MongoDB

* JWT

* Stripe

* Vite

* React Router

* Firebase (Authentication & Hosting)

* Vercel

* JavaScript

* Advanced JavaScript

* Daisy UI 

* Bootstrap

* Tailwind

* HTML5

* CSS3

* Media Query

I have built multiple projects using these skills. You are invited to my GitHub profile to know about my projects and don't forget to give a star to my projects.

