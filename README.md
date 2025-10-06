# 📚 Library Management API  
### Built with Express.js, TypeScript, and MongoDB (Mongoose)

## 🎯 Objective
This project is a **Library Management System API** that allows managing books and borrowing records.  
It demonstrates schema validation, business logic enforcement, aggregation pipelines, middleware, and Mongoose methods.

---

## 🚀 Features

### 📘 Book Management
- Create, read, update, and delete books
- Filter books by genre and sort by fields
- Pagination and query-based filtering
- Automatic validation and error handling
- Auto-update book availability when copies reach 0 (using Mongoose static method)

### 📖 Borrow Management
- Borrow books with availability checks
- Automatically deduct copies and update book status
- Aggregation summary for borrowed books (total borrowed quantity per book)

---

## 🧩 Technologies Used
- **Express.js** (Node.js Framework)
- **TypeScript** (for static typing and clean structure)
- **MongoDB + Mongoose** (for data modeling and queries)
- **Nodemon + ts-node-dev** (for development)
- **dotenv** (for environment configuration)

---

## 🧱 Project Structure

