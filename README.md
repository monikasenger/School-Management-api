# 🏫 School Management API

A Node.js + Express.js + MySQL based REST API for managing schools.  
This project allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a given location.  

🚀 **Live API**: [school_management_api](https://school-management-api-w034.onrender.com)

---

## 📌 Features
- Add new schools with name, address, latitude, and longitude.
- Fetch list of schools sorted by distance from user's location.
- Input validation to ensure correct data.
- MySQL integration for persistent storage.

---

## 🗄️ Database Setup
Create a `schools` table in MySQL:

```bash
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```
---
## 💻 Installation Guide  & Setup

### 📦 Clone the Repository
```bash

git clone https://github.com/monikasenger/School-Management-api.git
cd School-Management-api
```
---

### 🔧 Setup Backend:

```bash
cd backend
npm install

▶️ Run the backend:
npm start
```
---
## ⚙️ Environment Variables

Create a `.env` file in **backend**  folders.

### Backend `.env`
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Your_password
DB_NAME=your_database

```
---

## 📁 Folder Structure 
```bash

School-Management-api/
│── backend/
│   │── controllers/
│   │   └── schoolController.js     # Business logic for APIs
│   │
│   │── database/
│   │   └── connectdb.js            # MySQL database connection
│   │
│   │── routes/
│   │   └── schoolRoutes.js         # API routes for schools
│   │
│   │── validation/
│   │   └── schoolValidation.js     # Input validation logic
│
│── .env                            # Environment variables
│── package.json                     # Project dependencies
│── package-lock.json
│── server.js                        # Entry point (Express app)
│── school.mysql.table.sql           # SQL script for table creation
│── school.postman_collection.json   # Postman collection
│── .gitattributes
