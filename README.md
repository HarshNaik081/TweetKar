# � [TweetKar - Microblogging MEERN App](https://tweetkar-frontend.onrender.com).

A full-featured Twitter clone built with the MERN stack. Post tweets, follow users, like & retweet, send direct messages, and explore trending topics!

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-v16+-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-green)

## � Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd tweetkar-ultimate-final

# Install dependencies for both frontend and backend
npm run install-all

# Configure environment variables
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run the application (from root directory)
cd ..
npm run dev
```

**Access the app:** http://localhost:3000

## ✨ Features

### Core Features
- ✅ User Authentication (Register, Login, Logout)
- ✅ Create, Read, Update, Delete Tweets
- ✅ Like & Unlike Tweets
- ✅ Retweet & Quote Tweet
- ✅ Comments with Nested Replies
- ✅ User Profiles
- ✅ Follow/Unfollow Users
- ✅ Direct Messaging
- ✅ Notifications
- ✅ Bookmarks
- ✅ Lists
- ✅ Search (Users, Tweets, Hashtags)
- ✅ Trending Topics
- ✅ Poll Creation & Voting
- ✅ Tweet Scheduling
- ✅ Tweet Analytics
- ✅ Light/Dark Theme

### Advanced Features
- 📊 User Analytics Dashboard
- 📅 Tweet Scheduling
- 🔍 Advanced Search
- 📝 Lists Management
- 🔔 Real-time Notifications
- 💬 Rich Text Messaging
- 📸 Image Upload Support
- 📊 Poll Creation with Custom Duration
- ⚙️ Comprehensive Settings
- 🎨 Customizable Avatars
- 📱 Fully Responsive Design

## 🏗️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Express.js (Static file server)
- Responsive Design

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing

**DevOps:**
- Docker & Docker Compose
- Git version control

## 📁 Project Structure

```
tweetkar/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
│
├── frontend/               # Static frontend
│   ├── public/             # HTML, CSS, JS files
│   └── server.js           # Static file server
│
├── docker-compose.yml      # Docker orchestration
├── package.json            # Root scripts
└── setup-guide.md         # Detailed setup guide
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd tweetkar-ultimate-final

# Install all dependencies
npm run install-all
```

### Step 2: Environment Configuration

```bash
# Navigate to backend
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your credentials
```

**Required environment variables:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tweetkar
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

### Step 3: Run the Application

**Option A: Run both servers concurrently (Recommended)**
```bash
# From root directory
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🐳 Docker Setup (Alternative)

```bash
# Start all services (MongoDB + Backend + Frontend)
docker-compose up

# Stop services
docker-compose down
```

## 📚 Documentation

- **[setup-guide.md](setup-guide.md)** - Complete setup & troubleshooting guide
- **[PROJECT_INFO.md](PROJECT_INFO.md)** - Detailed API documentation

## 🔧 Available Scripts

**Root directory:**
```bash
npm run install-all    # Install all dependencies
npm run dev           # Run both frontend & backend
npm run server        # Run backend only
npm run client        # Run frontend only
```

**Backend directory:**
```bash
npm start            # Production mode
npm run dev          # Development mode (nodemon)
```

**Frontend directory:**
```bash
npm start            # Start static server
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/logout` - Logout user (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/followers` - Get user followers
- `POST /api/users/:id/follow` - Follow user

### Tweets
- `GET /api/tweets` - Get all tweets
- `POST /api/tweets` - Create tweet
- `GET /api/tweets/:id` - Get single tweet
- `DELETE /api/tweets/:id` - Delete tweet
- `POST /api/tweets/:id/like` - Like/unlike tweet
- `POST /api/tweets/:id/retweet` - Retweet

*See [PROJECT_INFO.md](PROJECT_INFO.md) for complete API documentation*

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or start MongoDB service
- Check `MONGODB_URI` in `.env` file

**Port Already in Use:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

For more troubleshooting, see [setup-guide.md](setup-guide.md)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Your Name**
- GitHub: [@HarshNaik081](https://github.com/HarshNaik081)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

*Built with ❤️ using the MERN stack*
POST   /api/comments/tweet/:tweetId  - Create comment
POST   /api/comments/:id/like        - Like comment
POST   /api/comments/:id/reply       - Reply to comment
```

For complete API documentation, see `backend/README.md`

## 🎯 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tweetkar
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Optional (for advanced features)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎨 Features Walkthrough

### 1. Authentication
- Register with name, username, email, password
- Email verification (simulated)
- Persistent login (30-day session)
- Secure JWT authentication

### 2. Tweet Management
- Create tweets up to 280 characters
- Upload images
- Create polls (2-4 options, custom duration)
- Schedule tweets for later
- Edit and delete your tweets
- View tweet analytics

### 3. Engagement
- Like/unlike tweets
- Retweet or quote tweet
- Comment with nested replies
- Bookmark tweets
- Share tweets (multiple platforms)

### 4. User Interaction
- Follow/unfollow users
- View user profiles
- Edit your profile
- Custom avatar selection
- View user statistics

### 5. Messaging
- Direct messages
- Emoji support
- Online status
- Read receipts
- Typing indicators

### 6. Discovery
- Explore trending topics
- Search tweets and users
- Hashtag tracking
- User suggestions (Who to follow)

### 7. Organization
- Create custom lists
- Add users to lists
- View list timelines
- Manage multiple lists

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
Open the application in browser and test manually:
1. Register a new account
2. Create tweets
3. Like, comment, retweet
4. Send messages
5. Create polls
6. Test responsive design

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP security headers (Helmet)
- CORS configuration
- Rate limiting
- Input validation
- XSS protection

## 🚧 Known Issues & Limitations

- File uploads are simulated (no cloud storage yet)
- Real-time features use polling (WebSocket implementation pending)
- Email sending is simulated
- Some advanced features are UI-only

## 🗺️ Roadmap

- [ ] Connect frontend to backend API
- [ ] Implement real-time updates with Socket.IO
- [ ] Add image upload to Cloudinary
- [ ] Implement email verification
- [ ] Add video support
- [ ] Implement Stories feature
- [ ] Add Spaces (audio rooms)
- [ ] Create mobile apps (React Native)
- [ ] Add payment integration
- [ ] Implement verified badges

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Harsh Naik

## 🙏 Acknowledgments

- Inspired by Twitter/X
- Built as a learning project for MERN stack development
- Thanks to all open-source contributors

## 📞 Support

For support, email harshnaik081@gmail.com or open an issue on GitHub.

---

**Made with ❤️ using MERN Stack**
