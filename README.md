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


PART 1: INSTALL THE REQUIRED SOFTWARE

Skip any of these you already have installed.

1. Node.js and npm
   Go to nodejs.org and download the LTS version. Run the installer and click through
   with the default options. This also installs npm automatically.

   To confirm it installed correctly, open a terminal (Command Prompt or PowerShell)
   and run:
   node -v
   npm -v
   Both should print a version number.

2. Git
   Go to git-scm.com/downloads and download the installer for your operating system.
   Run it with default options.

   To confirm it installed correctly, run:
   git --version
   It should print a version number.

3. SQL Server Express
   Go to microsoft.com/sql-server/sql-server-downloads and download the free
   Express edition. Run the installer and choose the "Basic" installation type.

   During setup, when asked about authentication mode, choose "Mixed Mode
   Authentication" and set an SA password. Write this password down, you may
   need it later.

4. SQL Server Management Studio (SSMS)
   Go to aka.ms/ssmsfullsetup and download it. Run the installer. This is the
   visual tool used to view and manage the database.


PART 2: DOWNLOAD THE PROJECT

1. Open a terminal.
2. Navigate to a folder where you want the project to live, for example:
   cd Documents
3. Clone the repository:
   git clone https://github.com/seanwendelgarcia60-dotcom/inventory-system.git
4. Move into the project folder:
   cd inventory-system

You should now see three folders inside: backend, frontend, and database.


PART 3: SET UP THE DATABASE

1. Open SSMS.
2. In the "Connect to Server" window:
   - Server name: localhost\SQLEXPRESS
   - Authentication: choose either "Windows Authentication" (uses your current
     Windows login, no password needed) or "SQL Server Authentication" if you
     set up a SQL login during installation
3. Before clicking Connect, click the "Options" button if visible, or after
   connecting, if you get a certificate error, reopen the connection window
   and:
   - Set "Encrypt" to "Optional"
   - Check "Trust Server Certificate"
   Then click Connect again.
4. Once connected, you will see a server tree on the left. Click "New Query"
   in the top toolbar.
5. In your file explorer, open the file database/schema.sql from the cloned
   project folder using a text editor, copy its full contents, and paste them
   into the new query window in SSMS.
6. Click "Execute" (or press F5) to run it.
7. You should see "Commands completed successfully" in the output area.
8. In the left panel, right-click "Databases" and click "Refresh". You should
   now see a database called InventoryDB containing two tables: Users and
   Products.

9. Create a login for the application to use. Click "New Query" again and run:

   CREATE LOGIN inventory_admin WITH PASSWORD = 'YourPassword123!';
   USE InventoryDB;
   CREATE USER inventory_admin FOR LOGIN inventory_admin;
   ALTER ROLE db_owner ADD MEMBER inventory_admin;

   Note: if you get a login-related error here, it likely means Mixed Mode
   Authentication was not enabled during installation. To fix this, right-click
   your server name at the top of the left panel, choose Properties, click
   Security, select "SQL Server and Windows Authentication mode", click OK,
   then restart the SQL Server service (search "Services" in the Windows Start
   menu, find "SQL Server (SQLEXPRESS)", right-click, Restart). Then run the
   CREATE LOGIN script again.


PART 4: SET UP AND RUN THE BACKEND

1. Open a terminal in the project's backend folder:
   cd backend
2. Install the required packages:
   npm install
3. In the backend folder, create a new file named exactly .env (there is a
   template file called .env.example you can copy and rename, or create it
   from scratch). Fill it in like this, using the login you created in Part 3:

   DB_USER=inventory_admin
   DB_PASSWORD=YourPassword123!
   DB_SERVER=localhost\SQLEXPRESS
   DB_DATABASE=InventoryDB
   JWT_SECRET=any_random_secret_string
   PORT=5000

4. Start the backend server:
   npm run dev
5. Confirm it is working. The terminal should display:
   Connected to MSSQL
   Server running on port 5000

   If you see a connection timeout error instead, the most common causes are:
   - The SQL Server Browser service is not running. Open Windows Services,
     find "SQL Server Browser", right-click, Start, and set its startup type
     to Automatic.
   - TCP/IP is disabled for the SQL instance. Open "SQL Server Configuration
     Manager", expand "SQL Server Network Configuration", click "Protocols for
     SQLEXPRESS", right-click "TCP/IP" and enable it, then restart the SQL
     Server service.

6. Leave this terminal running. You can double check the API is live by
   opening a browser and going to http://localhost:5000, it should display
   "Inventory API is running".

7. Open a second, separate terminal (do not close the one running the server).
   Navigate back into the backend folder and run this one-time command to
   create a default admin login:
   cd backend
   node seed.js
   You should see:
   Admin user created: username=admin, password=admin123


PART 5: SET UP AND RUN THE FRONTEND

1. Open a third terminal window.
2. Navigate into the frontend folder from the project root:
   cd frontend
3. Install the required packages:
   npm install
   npm install @ant-design/icons
4. Start the frontend:
   npm run dev
5. The terminal will display a local address, typically:
   http://localhost:5173
6. Leave this terminal running as well. At this point you should have two
   terminals running at the same time: one for the backend (port 5000) and
   one for the frontend (port 5173).

   If npm commands are blocked with a message about script execution being
   disabled, this is a Windows security setting. Open PowerShell as
   Administrator (search "PowerShell" in the Start menu, right-click, "Run as
   administrator") and run:
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   Type Y and press Enter to confirm, then try the npm command again in a
   normal terminal.


PART 6: TEST THE APPLICATION

1. Open a browser and go to http://localhost:5173
   You should see a login page with a dark teal branded panel on the left
   reading "Lloyd Laboratories" and a login form on the right.

2. Log in with:
   Username: admin
   Password: admin123
   You should be redirected to the Product Inventory page with a dark sidebar
   on the left.

3. Test creating a product:
   Click "Add Product". Fill in the form, for example:
   Name: Test Reagent
   SKU: TEST-001
   Category: Reagents
   Quantity: 3
   Price: 15.00
   Click OK/Save. The product should appear in the table, and because the
   quantity is 5 or below, an orange "Low" badge should appear next to it.

4. Test updating a product:
   Click "Edit" on the product you just created. Change the quantity to 20.
   Save. Confirm the table updates and the "Low" badge disappears.

5. Test deleting a product:
   Click "Delete" on the product, confirm the popup. The row should
   disappear from the table.

6. Test the report page:
   Click "Report" in the left sidebar. You should see three summary cards
   (Total Products, Total Stock, Total Stock Value) and a table of any
   low-stock items, if applicable. Add a low-quantity product first if you
   want to see this table populated.

7. Test logout and route protection:
   Click "Sign out" in the sidebar. You should be returned to the login page.
   While logged out, try going directly to http://localhost:5173/products in
   the browser address bar. You should be redirected back to the login page
   automatically, confirming the route is protected.

8. Test the API directly (optional):
   Using a tool like Postman, send a POST request to
   http://localhost:5000/api/auth/login with a JSON body of:
   { "username": "admin", "password": "admin123" }
   This should return a token. Copy that token and use it as a Bearer token
   in the Authorization header to test GET http://localhost:5000/api/products,
   which should return a list of products.


API ENDPOINTS

POST /api/auth/login - Log in, returns a JWT
GET /api/products - List all products
GET /api/products/:id - Get one product
POST /api/products - Create a product
PUT /api/products/:id - Update a product
DELETE /api/products/:id - Delete a product