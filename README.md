<img width="1920" height="1080" alt="Screenshot 2026-04-26 083154" src="https://github.com/user-attachments/assets/9891c2f0-eea6-49bc-b459-79a7269415ee" /><img width="1920" height="1080" alt="Screenshot 2026-04-26 083154" src="https://github.com/user-attachments/assets/9ad1353d-a190-43c7-b3a1-bf730e7a252d" /># 🛒 UrbanCart - Full-Stack E-Commerce Platform (MERN)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/urbancart?style=social)](https://github.com/yourusername/urbancart)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

UrbanCart is a feature-rich, full-stack E-commerce application designed with a focus on clean architecture, scalability, and exceptional user experience. Built with the **MERN stack**, it features a modern customer frontend, a robust admin dashboard, and a secure RESTful API.

---

## 🌟 Project Overview

This project was built to demonstrate industry-standard development practices, including:
- **Modular Monorepo Structure**: Clean separation between Frontend, Admin, and Backend.
- **Production-Ready Image Handling**: Dual support for local assets and Cloudinary CDN.
- **Secure Authentication**: JWT-based auth with protected routes and password hashing.
- **Scalable State Management**: Efficient use of React Context API for global application state.
- **Mobile-First Design**: Fully responsive UI crafted with Tailwind CSS.

---

## 🚀 Key Features

### ✨ Customer Frontend
- **Advanced Product Discovery**: Real-time search, multi-category filtering, and price sorting.
- **Dynamic Shopping Cart**: Persistent cart with guest support and size-specific item management.
- **Seamless Checkout**: Professional multi-step order placement flow.
- **Order History**: Personalized dashboard for users to track their order status.
- **Visual Excellence**: Optimized image rendering with smooth transitions and hover effects.

### 🛡️ Admin Dashboard
- **Inventory Management**: Full CRUD operations for products with multi-image upload support.
- **Order Processing**: Real-time status management (Packing, Shipped, Delivered).
- **Security**: Role-based access control with dedicated admin authentication.

### ⚙️ Backend & API
- **Modular Controller Pattern**: Logic separated into clean, reusable controllers.
- **Database Reliability**: MongoDB with Mongoose for structured and validated data.
- **Error Handling**: Global middleware for consistent API error responses.
- **Database Seeding**: Utility scripts to initialize the platform with professional sample data.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Image Storage**: Cloudinary CDN / Local Multer Storage
- **Authentication**: JSON Web Token (JWT) & BcryptJS

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account or Local MongoDB
- Cloudinary Account (for production image hosting)

### 2. Installation & Setup

#### **Step 1: Clone the Repository**
```bash
git clone https://github.com/pallavi-shankarappa/Ecommerce.git
```

#### **Step 2: Backend Configuration**
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment: Create a `.env` file based on `.env.example`.
4. **Seed Database**: Run `node utils/seedProducts.js` to populate with sample products.
5. Start server: `npm run dev`

#### **Step 3: Frontend & Admin Setup**
1. Open new terminals for both `frontend` and `admin` folders.
2. Run `npm install` in each directory.
3. Configure `.env` in both: `VITE_BACKEND_URL=http://localhost:4000`
4. Start development servers: `npm run dev`

---

## 📁 Project Structure

```text
urbancart/
├── admin/            # Admin Panel (React + Vite)
├── backend/          # API Server (Node/Express)
│   ├── config/       # DB & Cloudinary configs
│   ├── controllers/  # API business logic
│   ├── middleware/   # Auth & Multer uploads
│   ├── models/       # Mongoose schemas
│   └── routes/       # API endpoints
└── frontend/         # Customer App (React + Vite)
    ├── src/
    │   ├── context/  # Global state management
    │   ├── services/ # API interceptors
    │   └── utils/    # Image resolvers & helpers
```

---

## 📸 Screenshots & Demo

- **Home Page**:
  <img width="1920" height="1080" alt="Screenshot 2026-04-26 083154" src="https://github.com/user-attachments/assets/eb8c6c6f-0229-4953-bb3d-a7e6e09841b4" />
- **Collection View**:
  <img width="1920" height="1080" alt="Screenshot 2026-04-26 083207" src="https://github.com/user-attachments/assets/e6839bfb-ab1a-4ad0-b736-661a21e62c82" />

- **Product Details**:
  <img width="1920" height="1080" alt="Screenshot 2026-04-26 083232" src="https://github.com/user-attachments/assets/50dba114-b65f-48a8-a124-45c277d390fd" />

- **Admin Dashboard**:
  <img width="1920" height="1080" alt="Screenshot 2026-04-26 084137" src="https://github.com/user-attachments/assets/5c114a21-36cd-4971-b2fd-7e1e2ce8e078" />


**Live Demo**: [Link to your hosted app]

---

## 👤 Author

**Your Name**
- GitHub: [Pallavi-shankarappa](https://github.com/pallavi-shankarappa)
- LinkedIn: [Your Profile](https://linkedin.com/in/pallavi-shankarappa)


