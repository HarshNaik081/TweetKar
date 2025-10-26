# TweetKar - Setup Guide

Complete guide to set up and run the TweetKar application on your local machine.

---

## � Important Note

**Folder Rename:** If you'd like to rename the project folder from `tweetkar-ultimate-final` to `TWEETKAR`:
1. Close VS Code
2. In File Explorer, navigate to `C:\Users\HARSH NAIK\Downloads\TweetKar1\`
3. Rename `tweetkar-ultimate-final` to `TWEETKAR`
4. Reopen the renamed folder in VS Code

The folder name doesn't affect functionality - you can keep the current name if preferred.

---

## �📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Docker Setup (Alternative)](#docker-setup-alternative)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v16.x or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MongoDB** (Choose one option)
   
   **Option A: MongoDB Atlas (Cloud - Recommended for beginners)**
   - Create free account: https://www.mongodb.com/cloud/atlas
   - Create a cluster and get connection string
   
   **Option B: MongoDB Local Installation**
   - Download from: https://www.mongodb.com/try/download/community
   - Windows: Run installer and start MongoDB service
   - Mac: `brew install mongodb-community` then `brew services start mongodb-community`
   - Linux: Follow official MongoDB installation guide

4. **Git** (Optional, for version control)
   - Download from: https://git-scm.com/

### Optional Software

- **Docker** (for containerized deployment)
  - Download from: https://www.docker.com/get-started
- **Postman** (for API testing)
  - Download from: https://www.postman.com/downloads/

---

## 📥 Installation

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\HARSH NAIK\Downloads\TweetKar1\tweetkar-ultimate-final
```

Or navigate to wherever you have the project saved.

### Step 2: Install Dependencies

#### Option A: Install All at Once (Recommended)

```bash
npm run install-all
```

This single command will install dependencies for both backend and frontend.

#### Option B: Install Manually

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

Install root dependencies (for running both servers):
```bash
cd ..
npm install
```

### Step 3: Verify Installation

After installation, verify that `node_modules` folders exist in:
- `/backend/node_modules`
- `/frontend/node_modules`
- `/node_modules` (root)

---

## ⚙️ Configuration

### Step 1: Set Up Environment Variables

#### Backend Configuration

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

3. Edit the `.env` file with your configuration:

   **For MongoDB Atlas (Cloud):**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tweetkar?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_at_least_32_characters_long
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   CLIENT_URL=http://localhost:3000
   ```

   **For MongoDB Local:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tweetkar
   JWT_SECRET=your_random_secret_key_at_least_32_characters_long
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   CLIENT_URL=http://localhost:3000
   ```

4. **Important:** Replace `JWT_SECRET` with a secure random string. Generate one using:
   ```bash
   # Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Or use an online generator
   ```

#### Frontend Configuration (Optional)

The frontend uses default configuration. If needed, you can create a `.env` file in the frontend folder:

```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000
```

### Step 2: Start MongoDB (if using local installation)

**Windows:**
```bash
# MongoDB should start automatically as a service
# To verify, open Services and check "MongoDB Server"
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
# Connect to MongoDB shell
mongosh
# Or for older versions
mongo
```

---

## 🚀 Running the Application

You have multiple options to run the application:

### Option 1: Run Both Servers Concurrently (Easiest)

From the **root directory**:

```bash
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000) simultaneously.

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

### Option 3: Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

### Accessing the Application

1. Open your browser and navigate to: **http://localhost:3000**
2. The backend API is accessible at: **http://localhost:5000**
3. API health check: **http://localhost:5000/api/health**

---

## 🐳 Docker Setup (Alternative)

If you have Docker installed, you can run the entire application with one command:

### Step 1: Start All Services

From the root directory:

```bash
docker-compose up
```

To run in detached mode (background):
```bash
docker-compose up -d
```

### Step 2: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Step 3: Stop Services

```bash
docker-compose down
```

To also remove volumes (database data):
```bash
docker-compose down -v
```

### Docker Benefits

✅ No need to install MongoDB locally
✅ No need to install Node.js dependencies
✅ Everything runs in isolated containers
✅ Consistent environment across different machines

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Error:** `Port 5000 is already in use` or `Port 3000 is already in use`

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `.env` file:
```env
PORT=5001  # Use different port
```

#### 2. MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solution:**
- Verify MongoDB is running: `mongosh` or `mongo`
- Check if MongoDB service is active
- Verify `MONGODB_URI` in `.env` file is correct
- For Atlas: Check IP whitelist (allow 0.0.0.0/0 for testing)
- Check firewall settings

#### 3. Module Not Found

**Error:** `Cannot find module 'express'` or similar

**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

#### 4. JWT Secret Warning

**Error:** `JWT_SECRET is not defined`

**Solution:**
- Ensure `.env` file exists in backend folder
- Verify `JWT_SECRET` is set in `.env`
- Restart the backend server

#### 5. CORS Errors

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
- Verify `CLIENT_URL` in backend `.env` is `http://localhost:3000`
- Ensure both servers are running
- Check browser console for specific error details

#### 6. Backend Not Starting

**Solution:**
```bash
# Check for syntax errors
cd backend
npm run dev

# Check logs for specific errors
# Common issues:
# - Missing .env file
# - Wrong MongoDB URI
# - Port already in use
```

#### 7. Frontend Not Loading

**Solution:**
```bash
# Clear cache and restart
cd frontend
rm -rf node_modules
npm install
npm start

# If using browser:
# - Clear browser cache (Ctrl+Shift+Delete)
# - Try incognito mode
# - Check browser console for errors
```

---

## 📁 Project Structure

```
tweetkar-ultimate-final/
├── backend/                    # Backend Node.js/Express server
│   ├── config/                 # Configuration files
│   │   └── db.js              # Database connection
│   ├── controllers/            # Request handlers
│   │   ├── authController.js
│   │   ├── tweetController.js
│   │   ├── userController.js
│   │   └── ...
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js            # Authentication
│   │   └── errorHandler.js    # Error handling
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Tweet.js
│   │   ├── Comment.js
│   │   └── ...
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── tweets.js
│   │   ├── users.js
│   │   └── ...
│   ├── utils/                  # Utility functions
│   ├── .env.example           # Environment variables template
│   ├── .env                   # Your environment variables (create this)
│   ├── .gitignore             # Git ignore rules
│   ├── Dockerfile             # Docker configuration
│   ├── package.json           # Dependencies and scripts
│   └── server.js              # Server entry point
│
├── frontend/                   # Frontend static server
│   ├── public/                # Static files
│   │   ├── app.js            # Main application logic
│   │   ├── components.js     # UI components
│   │   ├── utils.js          # Utility functions
│   │   ├── style.css         # Styles
│   │   └── index.html        # Main HTML file
│   ├── .gitignore            # Git ignore rules
│   ├── Dockerfile            # Docker configuration
│   ├── package.json          # Dependencies and scripts
│   └── server.js             # Static file server
│
├── .gitignore                 # Root git ignore
├── docker-compose.yml         # Docker compose configuration
├── package.json               # Root package.json for running both servers
├── README.md                  # Project overview
├── setup-guide.md            # This file
├── HOW_TO_RUN.md             # Quick start guide
├── SETUP_GUIDE.md            # Detailed setup (old)
├── PROJECT_INFO.md           # Project documentation
└── QUICK_REFERENCE.md        # Command reference
```

---

## 🎯 Next Steps

After successfully running the application:

1. **Create an Account**
   - Go to http://localhost:3000
   - Click "Sign Up" and create an account
   - Login with your credentials

2. **Explore Features**
   - Create tweets
   - Like and retweet
   - Follow users
   - Send messages
   - Explore trending topics

3. **Development**
   - Frontend code: `frontend/public/`
   - Backend API: `backend/`
   - Database models: `backend/models/`

4. **API Testing**
   - Use Postman or similar tool
   - Import API endpoints from `PROJECT_INFO.md`
   - Test endpoints at http://localhost:5000/api

5. **Database Management**
   - Use MongoDB Compass: https://www.mongodb.com/products/compass
   - Connect to your MongoDB instance
   - View and manage collections

---

## 📚 Additional Resources

- **Project Documentation:** See `PROJECT_INFO.md`
- **Quick Reference:** See `QUICK_REFERENCE.md`
- **API Endpoints:** See `backend/routes/`
- **Database Schema:** See `backend/models/`

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review error messages in terminal
3. Check browser console (F12)
4. Verify all prerequisites are installed
5. Ensure MongoDB is running
6. Check `.env` configuration

---

## ✅ Verification Checklist

Before running the application, ensure:

- [ ] Node.js and npm are installed
- [ ] MongoDB is installed and running (or Atlas account created)
- [ ] All dependencies are installed (`npm run install-all`)
- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` is correctly set in `.env`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] Ports 3000 and 5000 are available
- [ ] No firewall blocking the ports

---

## 🎉 Success!

If everything is set up correctly:

✅ Backend should display: `Server running on port 5000`
✅ Backend should display: `MongoDB Connected: <your-connection>`
✅ Frontend should display: `Server running on port 3000`
✅ Browser should load TweetKar at http://localhost:3000

**Happy Tweeting! 🐦**

---

*Last Updated: October 26, 2025*
