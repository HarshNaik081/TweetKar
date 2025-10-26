// API Configuration
const API_CONFIG = {
    // Change this to your deployed backend URL when ready
    // Local development: 'http://localhost:5000'
    // Production: 'https://your-backend-url.onrender.com'
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://tweetkar-backend.onrender.com', // UPDATE THIS with your backend URL
    
    API_ENDPOINTS: {
        // Auth
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        ME: '/api/auth/me',
        
        // Users
        USERS: '/api/users',
        FOLLOW: '/api/users/follow',
        
        // Tweets
        TWEETS: '/api/tweets',
        LIKE: '/api/tweets/:id/like',
        RETWEET: '/api/tweets/:id/retweet',
        
        // Comments
        COMMENTS: '/api/comments',
        
        // Notifications
        NOTIFICATIONS: '/api/notifications',
        
        // Messages
        MESSAGES: '/api/messages',
        CONVERSATIONS: '/api/messages/conversations',
        
        // Lists
        LISTS: '/api/lists',
        
        // Bookmarks
        BOOKMARKS: '/api/bookmarks'
    }
};

// Helper function to build full API URL
function getApiUrl(endpoint) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}
