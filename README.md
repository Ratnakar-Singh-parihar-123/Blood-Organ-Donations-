# 🩸 Jeevandaan  
### Real-Time Blood & Organ Donation Platform (MERN Stack)

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Socket.io](https://img.shields.io/badge/RealTime-Socket.io-black)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Overview

**Jeevandaan** is a real-time Blood & Organ Donation Platform built using the MERN Stack.  

It connects **Donors**, **Patients**, and **Hospitals** through secure authentication, real-time chat, instant notifications, and urgent request handling to reduce emergency response time and save lives.

---

## 🚀 Key Features

### 🔐 Secure Authentication
- JWT-based Login & Registration
- OTP Email Verification
- Role-Based Access Control
- Protected Routes & Middleware

### 👥 Role-Based System

#### 🩸 Donor
- Register / Login
- Verify via OTP
- Update Donation Availability
- Accept / Reject Requests
- Real-Time Notifications
- Chat with Patients

#### 🧑‍⚕️ Patient
- Register / Login
- Create Blood/Organ Requests
- Mark Request as 🚨 Urgent
- Search Nearby Hospitals
- Real-Time Status Tracking
- Chat with Donors

#### 🏥 Hospital (Extension Ready)
- Post Blood/Organ Requirements
- Monitor Active Requests
- Manage Donations

---

## 💬 Real-Time Capabilities

- Instant Chat (Socket.io)
- Live Notifications
- Urgent Alerts Highlighting
- Live Request Status Updates

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Nodemailer (OTP System)

---

## 📂 Project Structure

```
Jeevandaan/
│
├── client/              # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── server/              # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── sockets/
│
└── README.md
```

---

## 🔄 Authentication Flow

1. User registers (Donor / Patient)
2. OTP sent to registered email
3. OTP verification successful
4. JWT token generated
5. Role-based protected routes enabled

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/jeevandaan.git
cd jeevandaan
```

### 2️⃣ Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3️⃣ Environment Variables

Create `.env` inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Run Application

#### Start Backend
```bash
npm run dev
```

#### Start Frontend
```bash
npm start
```

---

## 🌍 Deployment (Optional Section)

You can deploy:

- Frontend → Vercel / Netlify  
- Backend → Render / Railway  
- Database → MongoDB Atlas  

---

## 📸 Demo

Add screenshots here:

```
/screenshots/home.png
/screenshots/dashboard.png
/screenshots/chat.png
```

---

## 📌 Future Enhancements

- 📍 Google Maps Integration
- 📱 React Native Mobile App
- 📊 Admin Dashboard
- 🏥 Verified Hospital Badge System
- 📈 Analytics & Reporting

---

## ❤️ Mission

Every drop of blood and every organ donation can give someone a second chance at life.  
**Jeevandaan aims to bridge the gap between donors and patients instantly.**

---

## 👨‍💻 Developed By

Your Name  
MERN Stack Developer  
