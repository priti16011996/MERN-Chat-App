# 💬 Talk-A-Tive

A modern real-time chat application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and **Socket.IO**. Talk-A-Tive enables users to communicate seamlessly through one-to-one and group conversations with real-time messaging, notifications, image sharing, emoji support, and typing indicators.

---

## 📖 Overview

Talk-A-Tive is a full-stack real-time messaging platform designed to provide a smooth and interactive communication experience. The application allows users to connect instantly through private and group chats while receiving real-time updates and notifications.

Built with React and Chakra UI on the frontend and Node.js, Express.js, MongoDB, and Socket.IO on the backend, Talk-A-Tive demonstrates modern web development practices, scalable architecture, and real-time communication capabilities.

---

## ✨ Features

### 👤 Authentication & Authorization

* User Registration & Login
* JWT Authentication
* Secure Password Hashing with bcrypt
* Protected Routes
* User Profile Management

### 💬 Real-Time Messaging

* One-to-One Chat
* Group Chat Functionality
* Instant Message Delivery
* Real-Time Communication using Socket.IO
* Latest Message Tracking

### 🔔 Notifications

* Real-Time Message Notifications
* Unread Message Indicators
* Instant Chat Updates

### 😊 User Experience

* Typing Indicators
* Emoji Support
* Responsive Design
* Modern UI with Chakra UI

### 🖼️ Media Sharing

* Image Sharing in Chats
* Media Preview Support

### 🛡️ Security

* JWT-Based Authentication
* Protected API Endpoints
* Secure User Sessions
* Input Validation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Chakra UI
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Real-Time Communication

* Socket.IO

### Authentication

* JWT (JSON Web Token)
* bcrypt.js

### Deployment

* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
Talk-A-Tive/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/priti16011996/MERN-Chat-App.git
cd MERN-Chat-App
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

## ▶️ Run Application

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
cd frontend
npm start
```

### Run Both Concurrently

```bash
npm run dev
```

---

## 🌐 API Routes

### User Routes

| Method | Route           | Description   |
| ------ | --------------- | ------------- |
| POST   | /api/user       | Register User |
| POST   | /api/user/login | Login User    |
| GET    | /api/user       | Search Users  |

### Chat Routes

| Method | Route                 | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | /api/chat             | Access Chat            |
| GET    | /api/chat             | Fetch User Chats       |
| POST   | /api/chat/group       | Create Group Chat      |
| PUT    | /api/chat/rename      | Rename Group           |
| PUT    | /api/chat/groupadd    | Add User to Group      |
| PUT    | /api/chat/groupremove | Remove User from Group |

### Message Routes

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/message         | Send Message      |
| GET    | /api/message/:chatId | Get Chat Messages |

---

## 🗄️ Database Models

### User

```javascript
{
  name: String,
  email: String,
  password: String,
  pic: String
}
```

### Chat

```javascript
{
  chatName: String,
  isGroupChat: Boolean,
  users: [ObjectId],
  latestMessage: ObjectId,
  groupAdmin: ObjectId
}
```

### Message

```javascript
{
  sender: ObjectId,
  content: String,
  chat: ObjectId
}
```

---

## 🚀 Key Highlights

* Full Stack MERN Application
* Real-Time Communication using Socket.IO
* One-to-One Messaging
* Group Chat Management
* Latest Message Tracking
* Typing Indicators
* Emoji Support
* Image Sharing
* JWT Authentication
* Responsive UI with Chakra UI
* MongoDB Atlas Integration
* RESTful API Architecture

---

## 📈 Future Enhancements

* Voice Messages
* Video Calling
* Message Reactions
* Online/Offline Status
* Read Receipts
* File Sharing
* Push Notifications
* Message Search
* Dark Mode

---

## 📸 Project Screenshots

### Login Page

*Add Screenshot Here*

### Chat Interface

*Add Screenshot Here*

### Group Chat

*Add Screenshot Here*

### Notifications

*Add Screenshot Here*

---

## 🌍 Live Demo

Add your deployed application URL here:

```text
https://your-chat-app-url.com
```

---

## 👨‍💻 Author

### Priti Maurya

Full Stack Developer passionate about building scalable web applications using the MERN Stack, cloud technologies, and real-time systems.

* GitHub: https://github.com/priti16011996

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
