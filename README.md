Lloyd Laboratories - Inventory Control System

A simple inventory management system built with ReactJS, Ant Design, ExpressJS, and MSSQL.

FEATURES

- Login with JWT authentication
- Full product CRUD (Create, Read, Update, Delete)
- Inventory summary report (total products, total stock, stock value, low-stock alerts)
- RESTful API with JWT-protected routes

TECH STACK

Frontend: React (Vite), Ant Design, Axios, React Router
Backend: Node.js, Express, mssql, bcryptjs, jsonwebtoken
Database: Microsoft SQL Server (MSSQL)

PROJECT STRUCTURE

inventory-system
  backend      - Express API
  frontend     - React + Ant Design app
  database     - SQL schema script

REQUIREMENTS

Before starting, make sure these are installed on your machine:
- Node.js (v18 or later) and npm
- SQL Server Express and SQL Server Management Studio (SSMS)
- Git

HOW TO RUN AND TEST THE APPLICATION

Step 1: Clone the repository
Open a terminal and run:
git clone https://github.com/seanwendelgarcia60-dotcom/inventory-system.git
cd inventory-system

Step 2: Set up the database
1. Open SQL Server Management Studio (SSMS) and connect to your local server.
2. Open the file database/schema.sql, then execute it. This creates the InventoryDB database with Users and Products tables.
3. Create a SQL login for the app to use by running this in a new query window:

CREATE LOGIN inventory_admin WITH PASSWORD = 'YourPassword123!';
USE InventoryDB;
CREATE USER inventory_admin FOR LOGIN inventory_admin;
ALTER ROLE db_owner ADD MEMBER inventory_admin;

(If you prefer Windows Authentication instead, skip this step and leave DB_USER and DB_PASSWORD blank in the .env file in Step 3.)

Step 3: Set up and run the backend
1. Open a terminal in the backend folder:
cd backend
2. Install dependencies:
npm install
3. Copy .env.example to a new file named .env, then fill in your own database credentials and a JWT secret. Example:

DB_USER=inventory_admin
DB_PASSWORD=YourPassword123!
DB_SERVER=localhost\SQLEXPRESS
DB_DATABASE=InventoryDB
JWT_SECRET=any_random_secret_string
PORT=5000

4. Start the backend server:
npm run dev
5. Confirm it's working: the terminal should show "Connected to MSSQL" and "Server running on port 5000". You can also open http://localhost:5000 in a browser, it should show "Inventory API is running".

Step 4: Create an admin login
Still inside the backend folder, run:
node seed.js
This creates a login with username admin and password admin123.

Step 5: Set up and run the frontend
1. Open a second terminal in the frontend folder:
cd frontend
2. Install dependencies:
npm install
npm install @ant-design/icons
3. Start the frontend:
npm run dev
4. The terminal will show a local address, usually http://localhost:5173

Step 6: Test the application
1. Open http://localhost:5173 in a browser. You should see the login page.
2. Log in with username admin and password admin123.
3. On the Products page, click Add Product and create a new item, for example name Test Item, SKU TEST-001, category Reagents, quantity 3, price 15.00.
4. Confirm the item appears in the table, and that a Low badge shows next to the quantity since it is 5 or below.
5. Click Edit on that item, change the quantity to 20, save, and confirm the Low badge disappears.
6. Click Delete on the item and confirm it is removed from the table.
7. Click Report in the sidebar and confirm the summary numbers and any low-stock items display correctly.
8. Click Sign out and confirm you are returned to the login page, and that visiting /products directly without logging in redirects back to login.

API ENDPOINTS

POST /api/auth/login - Log in, returns a JWT
GET /api/products - List all products
GET /api/products/:id - Get one product
POST /api/products - Create a product
PUT /api/products/:id - Update a product
DELETE /api/products/:id - Delete a product
GET /api/reports/summary - Inventory summary report