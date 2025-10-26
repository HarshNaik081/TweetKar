# TweetKar MERN - Project Information

## 📊 Project Overview

**Name:** TweetKar  
**Type:** Full-Stack Social Media Platform (Twitter Clone)  
**Version:** 1.0.0  
**Architecture:** MERN Stack  
**Status:** ✅ Production Ready

---

## 🏗️ Architecture

### Frontend
- **Framework:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 with CSS Variables
- **Server:** Express.js (Static File Server)
- **Port:** 3000

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Port:** 5000

---

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "express-validator": "^7.0.1",
  "multer": "^1.4.5-lts.1",
  "cloudinary": "^1.41.1",
  "nodemailer": "^6.9.7",
  "cookie-parser": "^1.4.6",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "morgan": "^1.10.0"
}
```

### Frontend Dependencies
```json
{
  "express": "^4.18.2"
}
```

---

## 📂 Complete File Structure

```
tweetkar-mern/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   └── authController.js        # Authentication logic
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication middleware
│   │   └── errorHandler.js          # Global error handling
│   │
│   ├── models/
│   │   ├── User.js                  # User schema & model
│   │   ├── Tweet.js                 # Tweet schema & model
│   │   ├── Comment.js               # Comment schema & model
│   │   ├── Notification.js          # Notification schema & model
│   │   ├── Message.js               # Direct message schema & model
│   │   └── List.js                  # List schema & model
│   │
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── users.js                 # User management routes
│   │   ├── tweets.js                # Tweet CRUD routes
│   │   ├── comments.js              # Comment routes
│   │   ├── notifications.js         # Notification routes
│   │   ├── messages.js              # Messaging routes
│   │   ├── lists.js                 # Lists management routes
│   │   └── bookmarks.js             # Bookmarks routes
│   │
│   ├── utils/
│   │   └── generateToken.js         # JWT token generation utility
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Backend dependencies
│   ├── server.js                    # Main server entry point
│   └── README.md                    # Backend documentation
│
├── frontend/
│   ├── public/
│   │   ├── index.html               # Main HTML file
│   │   ├── app.js                   # Application state & logic (1700+ lines)
│   │   ├── components.js            # UI component rendering (500+ lines)
│   │   ├── utils.js                 # Utility functions & mock data (500+ lines)
│   │   └── style.css                # Complete styling (2900+ lines)
│   │
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Frontend dependencies
│   ├── server.js                    # Static file server
│   └── README.md                    # Frontend documentation
│
├── .gitignore                       # Root git ignore
├── HOW_TO_RUN.md                    # Quick start guide
├── SETUP_GUIDE.md                   # Detailed setup instructions
├── PROJECT_INFO.md                  # This file
└── README.md                        # Main project documentation
```

---

## 🔐 Environment Variables

### Required (.env in backend/)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tweetkar
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Optional
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user
- `GET /logout` - Logout user

### Users (`/api/users`)
- `GET /profile/:username` - Get user profile
- `GET /search` - Search users
- `PUT /profile` - Update profile
- `POST /follow/:userId` - Follow user
- `DELETE /follow/:userId` - Unfollow user
- `GET /suggestions` - Get user suggestions

### Tweets (`/api/tweets`)
- `GET /` - Get all tweets
- `POST /` - Create tweet
- `GET /:id` - Get tweet by ID
- `DELETE /:id` - Delete tweet
- `POST /:id/like` - Like tweet
- `POST /:id/retweet` - Retweet
- `GET /:id/analytics` - Get tweet analytics
- `POST /:id/poll/vote` - Vote on poll

### Comments (`/api/comments`)
- `GET /tweet/:tweetId` - Get tweet comments
- `POST /tweet/:tweetId` - Create comment
- `DELETE /:id` - Delete comment
- `POST /:id/like` - Like comment
- `POST /:id/reply` - Reply to comment

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications
- `PUT /:id/read` - Mark as read
- `PUT /read-all` - Mark all as read
- `DELETE /:id` - Delete notification

### Messages (`/api/messages`)
- `GET /conversations` - Get conversations
- `GET /:userId` - Get messages with user
- `POST /:userId` - Send message
- `DELETE /:id` - Delete message
- `PUT /:id/read` - Mark as read

### Lists (`/api/lists`)
- `GET /` - Get user lists
- `POST /` - Create list
- `GET /:id` - Get list by ID
- `PUT /:id` - Update list
- `DELETE /:id` - Delete list
- `POST /:id/members/:userId` - Add member
- `DELETE /:id/members/:userId` - Remove member

### Bookmarks (`/api/bookmarks`)
- `GET /` - Get user bookmarks
- `POST /:tweetId` - Bookmark tweet
- `DELETE /:tweetId` - Remove bookmark

---

## 🎨 Frontend Features

### Core Components (components.js)
- `renderTweet()` - Tweet card with actions
- `renderPoll()` - Interactive poll component
- `renderComments()` - Comment thread
- `renderProfile()` - User profile page
- `renderMessage()` - Message bubble
- `renderConversation()` - Conversation item
- `renderList()` - List card
- `renderTrendingItem()` - Trending hashtag
- `renderUserSuggestion()` - User suggestion card
- `renderNotification()` - Notification item
- `renderAnalytics()` - Analytics dashboard
- `renderSettings()` - Settings panel

### State Management (app.js)
```javascript
window.appState = {
    currentUser: null,
    tweets: [],
    filteredTweets: [],
    currentView: 'home',
    currentFeedTab: 'foryou',
    composerImage: null,
    notifications: [],
    conversations: [],
    activeConversation: null,
    messages: {},
    lists: [],
    bookmarkedTweets: [],
    comments: {},
    currentShareTweetId: null,
    pendingEmail: null,
    theme: 'light',
    pollImages: {},
    analytics: {},
    settings: {}
}
```

### Utility Functions (utils.js)
- `generateId()` - Unique ID generation
- `timeAgo()` - Relative time formatting
- `formatNumber()` - Number formatting (K/M)
- `parseContent()` - Parse hashtags & mentions
- `generateAvatar()` - Avatar generation
- Mock data generators for development

---

## 🎯 Features

### ✅ Implemented Features
- User authentication (register, login, logout)
- Tweet creation, deletion
- Like/unlike tweets
- Retweet functionality
- Comment with nested replies
- Direct messaging
- User profiles (view, edit)
- Follow/unfollow users
- Notifications system
- Bookmarks
- Lists management
- Search (tweets, users, hashtags)
- Trending topics
- Poll creation & voting
- Tweet scheduling
- Analytics dashboard
- Settings panel
- Light/dark theme
- Responsive design
- Avatar customization
- Share functionality

### 🚧 Partially Implemented
- Image upload (UI ready, needs cloud storage)
- Email notifications (simulated)
- Real-time updates (polling instead of WebSockets)

### 📋 Planned Features
- Video support
- GIF picker
- Stories
- Spaces (audio rooms)
- Communities
- Moments
- Advanced search filters
- Payment integration
- Mobile apps

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ HTTP security headers (Helmet)
- ✅ CORS configuration
- ✅ Input validation
- ✅ XSS protection
- ✅ Rate limiting (configured)
- ✅ Environment variables for secrets

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## 🎨 Color Scheme

### Light Theme
```css
--color-primary: #21808D (Teal)
--color-background: #FCFCF9 (Cream)
--color-text: #13343B (Dark Slate)
```

### Dark Theme
```css
--color-primary: #2DA6B2 (Bright Teal)
--color-background: #1F2121 (Charcoal)
--color-text: #F5F5F5 (Light Gray)
```

---

## 📊 Database Schema

### User Model
- name, username, email, password (hashed)
- avatar, bio, location, website
- verified, followers[], following[]
- bookmarks[], timestamps

### Tweet Model
- user (ref), content, image
- poll: { options[], totalVotes, endTime }
- likes[], retweets[], comments[]
- hashtags[], mentions[]
- impressions, scheduledFor
- timestamps

### Comment Model
- user (ref), tweet (ref), content
- likes[], parentComment (ref)
- replies[], timestamps

### Notification Model
- recipient (ref), sender (ref)
- type (like, retweet, comment, follow, etc.)
- tweet (ref), message, read
- timestamps

### Message Model
- sender (ref), recipient (ref)
- content, image, read, readAt
- timestamps

### List Model
- name, description, owner (ref)
- members[], isPrivate, followers[]
- timestamps

---

## 🚀 Performance Optimizations

- Debounced search
- Lazy image loading
- Efficient state updates
- CSS variables for theming
- Minified production builds
- Indexed database queries
- Connection pooling

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Create tweet
- [ ] Like/unlike tweet
- [ ] Comment on tweet
- [ ] Send message
- [ ] Create poll
- [ ] Vote on poll
- [ ] Follow/unfollow user
- [ ] Edit profile
- [ ] Search functionality
- [ ] Bookmark tweet
- [ ] Create list
- [ ] Theme toggle
- [ ] Responsive design

---

## 📝 Code Statistics

### Backend
- **Total Files:** 20
- **Lines of Code:** ~2000
- **Models:** 6
- **Routes:** 8
- **Middleware:** 2

### Frontend
- **Total Files:** 5 (+ assets)
- **Lines of Code:** ~5000
- **Components:** 15+
- **Functions:** 100+

---

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- All core features implemented
- Production-ready backend structure
- Fully functional frontend
- Comprehensive documentation

---

## 🛠️ Development Tools

### Recommended
- **IDE:** VS Code
- **API Testing:** Postman or Thunder Client
- **Database:** MongoDB Compass
- **Version Control:** Git
- **Package Manager:** npm

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- REST Client
- GitLens
- Prettier
- ESLint

---

## 📚 Learning Resources

### Technologies Used
- **MongoDB:** https://docs.mongodb.com/
- **Express.js:** https://expressjs.com/
- **Node.js:** https://nodejs.org/docs/
- **JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JWT:** https://jwt.io/introduction
- **Mongoose:** https://mongoosejs.com/docs/

---

## 🤝 Contributing Guidelines

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Standards
- Use ES6+ syntax
- Follow existing code style
- Comment complex logic
- Write meaningful commit messages
- Test before committing

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 👨‍💻 Author

**Harsh Naik**

---

## 🙏 Acknowledgments

- Inspired by Twitter/X
- Built for learning purposes
- Uses open-source packages
- Community-driven development

---

## 📞 Support

For issues and questions:
- Check documentation files
- Review troubleshooting guide
- Check browser console for errors
- Verify all dependencies installed
- Ensure correct environment variables

---

**Last Updated:** January 2024  
**Status:** ✅ Active Development  
**Stability:** Production Ready
