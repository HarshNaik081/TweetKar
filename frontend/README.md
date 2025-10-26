# TweetKar Frontend

Frontend application for TweetKar - A Twitter Clone built with vanilla JavaScript, HTML, and CSS.

## Features

- **Authentication** - Login, Register, Email Verification
- **Tweet Management** - Create, like, retweet, comment, bookmark
- **Polls** - Create and vote on polls with custom durations
- **Messaging** - Direct messages with emoji support
- **User Profiles** - View and edit user profiles
- **Notifications** - Real-time notifications
- **Search** - Search tweets, users, and hashtags
- **Lists** - Organize users into custom lists
- **Analytics** - Track tweet performance
- **Settings** - Comprehensive app settings
- **Themes** - Light and dark mode
- **Responsive Design** - Mobile, tablet, and desktop support

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Vanilla JavaScript
- **Node.js + Express** - Static file server

## Project Structure

```
frontend/
├── public/
│   ├── index.html           # Main HTML file
│   ├── app.js               # Application logic & state management
│   ├── components.js        # UI component rendering functions
│   ├── utils.js             # Utility functions & mock data
│   └── style.css            # All styles
├── server.js                # Express static server
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser:
```
http://localhost:3000
```

## Key Components

### App State (`app.js`)
- Global application state management
- User authentication flow
- Tweet CRUD operations
- Navigation and routing
- Local storage persistence

### Components (`components.js`)
- `renderTweet()` - Tweet card rendering
- `renderPoll()` - Poll component
- `renderComments()` - Comments section
- `renderProfile()` - User profile
- `renderMessage()` - Message bubbles
- `renderSettings()` - Settings panels
- And many more...

### Utils (`utils.js`)
- `generateId()` - Unique ID generation
- `timeAgo()` - Relative time formatting
- `parseContent()` - Parse hashtags and mentions
- `generateAvatar()` - Avatar generation
- Mock data (users, tweets, conversations)

### Styling (`style.css`)
- CSS custom properties for theming
- Responsive design breakpoints
- Component-based styling
- Dark mode support

## Features in Detail

### 1. Persistent Authentication
- Session persists across page reloads
- 30-day session duration
- Secure token storage

### 2. Tweet Composer
- 280 character limit
- Image upload support
- Poll creation with 2-4 options
- Custom poll duration (1 hour - 7 days)
- Character counter

### 3. Inline Comments
- Comment directly under tweets
- Load more comments
- Sort by Top/Latest/Oldest
- Nested replies support
- Like comments

### 4. Messaging
- Modern UI like WhatsApp/iMessage
- Emoji picker
- Online status indicators
- Read receipts
- Typing indicators

### 5. User Profiles
- Avatar customization
- Edit bio, location, website
- View user's tweets, replies, media
- Follow/unfollow functionality

### 6. Polls
- Create polls with multiple options
- Optional images per option
- Custom duration settings
- Vote and view results
- Real-time percentage updates

### 7. Share Feature
- Copy link
- Share to social media (Twitter, Facebook, WhatsApp)
- Email sharing
- QR code generation
- Embed code

## Configuration

### API Endpoint (for future backend integration)
Update the API base URL in `app.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Theme
Toggle between light and dark themes using the theme button in the navigation bar.

## Mock Data

The application uses mock data for demonstration:
- 70 users
- 500+ tweets
- Conversations
- Notifications
- Lists

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading of images
- Debounced search
- Optimized re-renders
- Efficient state management

## Future Enhancements

- [ ] Connect to backend API
- [ ] Real-time updates with WebSockets
- [ ] Image upload to cloud storage
- [ ] Video support
- [ ] GIF picker
- [ ] Advanced search filters
- [ ] Moments feature
- [ ] Spaces (audio rooms)
- [ ] Communities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Contact

For questions or support, please open an issue on GitHub.
