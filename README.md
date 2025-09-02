Customer & Address Management System

This project is a full-stack web application that manages customers and their addresses.
It supports CRUD operations, search, pagination, and responsive UI with media queries.

🚀 Features
🔹 Frontend (React.js)

Customer list with search & pagination

Add new customer form

View customer details with addresses

Add/Edit/Delete addresses

Responsive design with media queries

Buttons styled with CSS

🔹 Backend (Node.js + Express.js + SQLite)

RESTful API for customers & addresses

Routes for CRUD operations

Pagination using LIMIT and OFFSET

CORS enabled for frontend-backend communication

🛠️ Tech Stack

Frontend: React.js, React Router, CSS (with media queries)

Backend: Node.js, Express.js, SQLite

Database: SQLite (file-based, lightweight)

📂 Project Structure
customer-address-app/
│── backend/
│   ├── server.js           # Express server
│   ├── customer.db         # SQLite database
│
│── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├──AddressFormPage
│   │   │   ├── CustomerDetailsPage
│   │   │   ├── CustomerFormPage
│   │   │   ├── CustomerListPage
│   │   ├── index.css
│   │   ├── index.js
│   ├── package.json
│
│── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/customer-address-app.git
cd customer-address-app

2️⃣ Backend Setup
cd backend
npm install


Create database file & schema:

sqlite3 customer.db


Run backend:

node server.js


👉 Server runs at: http://localhost:3000

3️⃣ Frontend Setup
cd frontend
npm install


Run frontend:

npm start


👉 App runs at: http://localhost:3001

🔗 API Endpoints
Customers
GET /customer -> Get All customers
GET /customers/:id → Get customer details & addresses

POST /customers → Add new customer

PUT /customers/edit/:id → Update customer

DELETE /customers/:id → Delete customer

Addresses

 GET - Fetch single address (for edit form) 
 
GET /customers/:customerId/addresses/:addressId

POST /customers/:id/addresses → Add address for customer

PUT /customers/:customerId/addresses/:addressId' → Update address

DELETE /addresses/:id → Delete address

📸 Screenshots
🏠 Customer List Page

Shows list of customers

Search by name/email

Pagination (Next/Prev)

Button to add new customer

👤 Customer Details Page

Shows customer info & their addresses

Add/Edit/Delete addresses

📝 Forms

Customer form for adding new customer

Address form for adding/editing addresses

🎯 Future Enhancements

✅ Authentication & role-based access

✅ Export customer data (CSV, Excel)

✅ Sorting & advanced filters

✅ Dark mode

👩‍💻 Author

Developed by [Your Name] 🚀
