# 🚀 TweetKar - Full Stack MERN Social Media Platform

A comprehensive Twitter clone built with the MERN stack (MongoDB, Express.js, Vanilla JavaScript, Node.js).

## 📖 Documentation

- **[Setup Guide](setup-guide.md)** - Complete installation and configuration instructions
- **[Project Info](PROJECT_INFO.md)** - Detailed project documentation and API reference

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

## 🏗️ Project Structure

```
tweetkar-mern/
├── backend/                 # Node.js + Express Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Tweet.js
│   │   ├── Comment.js
│   │   ├── Notification.js
│   │   ├── Message.js
│   │   └── List.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── tweets.js
│   │   ├── comments.js
│   │   ├── notifications.js
│   │   ├── messages.js
│   │   ├── lists.js
│   │   └── bookmarks.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── frontend/                # Vanilla JS Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── components.js
│   │   ├── utils.js
│   │   └── style.css
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript (ES6+)** - Logic
- **Express** - Static file server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher) - Local installation or MongoDB Atlas account
- **npm** or **yarn**
- **Git**

## 🚀 Getting Started

For complete setup instructions, see **[setup-guide.md](setup-guide.md)**

### Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment**
   ```bash
   cd backend
   copy .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Run the Application**
   ```bash
   # From root directory
   npm run dev
   ```

4. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

For detailed setup instructions, troubleshooting, and Docker setup, see **[setup-guide.md](setup-guide.md)**

## 📖 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
GET    /api/auth/logout      - Logout user
```

### User Endpoints

```
GET    /api/users/profile/:username  - Get user profile
GET    /api/users/search             - Search users
PUT    /api/users/profile            - Update profile
POST   /api/users/follow/:userId     - Follow user
DELETE /api/users/follow/:userId     - Unfollow user
```

### Tweet Endpoints

```
GET    /api/tweets              - Get all tweets
POST   /api/tweets              - Create tweet
GET    /api/tweets/:id          - Get tweet by ID
DELETE /api/tweets/:id          - Delete tweet
POST   /api/tweets/:id/like     - Like tweet
POST   /api/tweets/:id/retweet  - Retweet
```

### Comment Endpoints

```
GET    /api/comments/tweet/:tweetId  - Get tweet comments
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

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Inspired by Twitter/X
- Built as a learning project for MERN stack development
- Thanks to all open-source contributors

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ using MERN Stack**
