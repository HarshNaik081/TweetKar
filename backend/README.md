# TweetKar Backend

Backend API for TweetKar - A Twitter Clone built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Tweet CRUD operations
- Comments and nested replies
- Like and retweet functionality
- User profiles and followers
- Direct messaging
- Notifications
- Lists management
- Bookmarks
- Poll voting
- Tweet scheduling
- Analytics

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   ├── auth.js               # JWT authentication middleware
│   └── errorHandler.js       # Error handling middleware
├── models/
│   ├── User.js               # User schema
│   ├── Tweet.js              # Tweet schema
│   ├── Comment.js            # Comment schema
│   ├── Notification.js       # Notification schema
│   ├── Message.js            # Message schema
│   └── List.js               # List schema
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── users.js              # User routes
│   ├── tweets.js             # Tweet routes
│   ├── comments.js           # Comment routes
│   ├── notifications.js      # Notification routes
│   ├── messages.js           # Message routes
│   ├── lists.js              # List routes
│   └── bookmarks.js          # Bookmark routes
├── utils/
│   └── generateToken.js      # JWT token utilities
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tweetkar
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile/:username` - Get user profile
- `GET /api/users/search` - Search users
- `PUT /api/users/profile` - Update profile
- `POST /api/users/follow/:userId` - Follow user
- `DELETE /api/users/follow/:userId` - Unfollow user

### Tweets
- `GET /api/tweets` - Get all tweets
- `POST /api/tweets` - Create tweet
- `GET /api/tweets/:id` - Get tweet by ID
- `DELETE /api/tweets/:id` - Delete tweet
- `POST /api/tweets/:id/like` - Like tweet
- `POST /api/tweets/:id/retweet` - Retweet

### Comments
- `GET /api/comments/tweet/:tweetId` - Get tweet comments
- `POST /api/comments/tweet/:tweetId` - Create comment
- `POST /api/comments/:id/like` - Like comment
- `POST /api/comments/:id/reply` - Reply to comment

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages/:userId` - Send message

### Lists
- `GET /api/lists` - Get user lists
- `POST /api/lists` - Create list
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks/:tweetId` - Bookmark tweet
- `DELETE /api/bookmarks/:tweetId` - Remove bookmark

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 30d |
| CLIENT_URL | Frontend URL | http://localhost:3000 |

## License

MIT
