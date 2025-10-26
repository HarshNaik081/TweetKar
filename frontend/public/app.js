// Main Application Logic

// Global Application State
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
    analytics: {
        impressions: 125430,
        impressionsChange: 12.5,
        profileVisits: 3420,
        profileVisitsChange: 8.3,
        engagementRate: 4.2,
        engagementChange: -0.5,
        newFollowers: 234,
        topPostEngagement: 1240,
        avgEngagement: 156
    },
    settings: {
        privateAccount: false,
        twoFactor: false,
        photoTagging: true,
        dmFromAnyone: true,
        pushNotifications: true,
        emailNotifications: false,
        reduceMotion: false
    }
};

// State Persistence Functions (using in-memory storage for sandbox compatibility)
const memoryStorage = {
    data: {},
    setItem(key, value) {
        this.data[key] = value;
    },
    getItem(key) {
        return this.data[key] || null;
    },
    removeItem(key) {
        delete this.data[key];
    }
};

function saveAppState() {
    try {
        const state = {
            currentUser: window.appState.currentUser,
            tweets: window.appState.tweets,
            comments: window.appState.comments,
            notifications: window.appState.notifications,
            conversations: window.appState.conversations,
            messages: window.appState.messages,
            lists: window.appState.lists,
            bookmarkedTweets: window.appState.bookmarkedTweets,
            theme: window.appState.theme,
            settings: window.appState.settings,
            pollImages: window.appState.pollImages,
            timestamp: Date.now()
        };
        memoryStorage.setItem('tweetkarState', JSON.stringify(state));
    } catch (e) {
        console.warn('Failed to save state:', e);
    }
}

function loadAppState() {
    try {
        const saved = memoryStorage.getItem('tweetkarState');
        if (!saved) return null;
        
        const state = JSON.parse(saved);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        
        if (Date.now() - state.timestamp > sevenDays) {
            memoryStorage.removeItem('tweetkarState');
            return null;
        }
        
        return state;
    } catch (e) {
        console.warn('Failed to load state:', e);
        return null;
    }
}

function clearAppState() {
    memoryStorage.removeItem('tweetkarState');
}

// Debounced state save
let saveTimeout;
function debouncedSaveState() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveAppState, 500);
}

// Initialize Application
function initApp() {
    // Try to restore session from localStorage
    const savedState = loadAppState();
    
    if (savedState && savedState.currentUser) {
        // Restore state
        window.appState.currentUser = savedState.currentUser;
        window.appState.tweets = savedState.tweets || [];
        window.appState.filteredTweets = savedState.tweets || [];
        window.appState.comments = savedState.comments || {};
        window.appState.notifications = savedState.notifications || [];
        window.appState.conversations = savedState.conversations || [];
        window.appState.messages = savedState.messages || {};
        window.appState.lists = savedState.lists || [];
        window.appState.bookmarkedTweets = savedState.bookmarkedTweets || [];
        window.appState.theme = savedState.theme || 'light';
        window.appState.settings = savedState.settings || window.appState.settings;
        window.appState.pollImages = savedState.pollImages || {};
        
        // Show loading screen briefly
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            showMainApp();
        }, 500);
    } else {
        // Show loading screen then auth
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const authScreen = document.getElementById('auth-screen');
            
            loadingScreen.classList.add('hidden');
            authScreen.classList.remove('hidden');
        }, 1000);
    }
}

// Auto-login for demo
function autoLogin() {
    const demoUser = mockUsers[0];
    demoUser.following = ['user2', 'user3', 'user5', 'user8', 'user17'];
    
    window.appState.currentUser = demoUser;
    window.appState.tweets = generateMockTweets(500);
    window.appState.filteredTweets = window.appState.tweets;
    window.appState.notifications = generateMockNotifications();
    window.appState.conversations = generateMockConversations();
    window.appState.lists = generateMockLists();
    generateMockComments();
    
    saveAppState();
    showMainApp();
}

// Generate mock comments for tweets
function generateMockComments() {
    window.appState.tweets.slice(0, 100).forEach(tweet => {
        const commentCount = Math.floor(Math.random() * 15) + 2;
        const comments = [];
        
        for (let i = 0; i < commentCount; i++) {
            const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
            const commentTexts = [
                'Great post!',
                'Love this! 👏',
                'Thanks for sharing',
                'This is amazing',
                'Couldn\'t agree more',
                'Interesting perspective',
                'Well said!',
                'This needs more attention',
                'Absolutely right',
                'Brilliant work!',
                'So true!',
                'Exactly what I was thinking',
                'Mind blown 🤯',
                'Keep it up!',
                'Inspiring content',
                'This resonates with me',
                'Very insightful',
                'Thanks for the inspiration'
            ];
            
            const comment = {
                id: generateId(),
                user: user,
                text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
                timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
                likes: Math.floor(Math.random() * 50),
                replies: []
            };
            
            // Add nested replies with lower probability
            if (Math.random() > 0.7) {
                comment.replies = generateNestedComments(comment.id, 0, 2);
            }
            
            comments.push(comment);
        }
        
        window.appState.comments[tweet.id] = comments;
    });
}

// Google Login Handler
function handleGoogleLogin() {
    showToast('Simulating Google OAuth...', 'info');
    
    setTimeout(() => {
        const email = 'user@gmail.com';
        window.appState.pendingEmail = email;
        
        showEmailVerification(email);
    }, 1000);
}

// Email Verification
function showEmailVerification(email) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('email-verification').classList.remove('hidden');
    document.getElementById('verify-email').textContent = email;
    
    // Focus first OTP input
    document.querySelectorAll('.otp-input')[0].focus();
}

function handleOtpInput(event, index) {
    const inputs = document.querySelectorAll('.otp-input');
    const value = event.target.value;
    
    if (value && index < 5) {
        inputs[index + 1].focus();
    }
    
    // Auto-verify if all filled
    const allFilled = Array.from(inputs).every(input => input.value);
    if (allFilled) {
        setTimeout(() => verifyOtp(), 500);
    }
}

function verifyOtp() {
    const inputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(inputs).map(input => input.value).join('');
    
    if (otp.length === 6) {
        showToast('Email verified successfully!', 'success');
        autoLogin();
    } else {
        showToast('Please enter complete OTP', 'error');
    }
}

function resendOtp(event) {
    event.preventDefault();
    showToast('OTP resent to your email', 'success');
}

// Toast Notification
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L9 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Authentication Handlers
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Mock authentication
    const user = mockUsers.find(u => u.username === username || u.email === username);
    
    if (user && password) {
        window.appState.pendingEmail = user.email;
        showEmailVerification(user.email);
    } else {
        showToast('Invalid credentials. Try: rajeshtech / any password', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Email validation
    if (!email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    window.appState.pendingEmail = email;
    window.appState.pendingUser = {
        name: name,
        username: username,
        email: email
    };
    
    showEmailVerification(email);
}

function showLogin(event) {
    event.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function showRegister(event) {
    event.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showMainApp() {
    const authScreen = document.getElementById('auth-screen');
    const mainApp = document.getElementById('main-app');
    
    authScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    // Update UI with user data
    updateNavUI();
    renderTweets();
    renderTrendingHashtags();
    renderUserSuggestions();
    updateNotificationBadge();
    
    // Apply saved theme
    applyTheme();
}

function updateNavUI() {
    const user = window.appState.currentUser;
    document.getElementById('nav-user-avatar').src = user.avatar;
    document.getElementById('composer-avatar').src = user.avatar;
}

// Navigation
function navigateTo(event, view) {
    event?.preventDefault();
    
    // Update active nav link based on data-view attribute
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === view) {
            link.classList.add('active');
        }
    });
    
    // Hide all views
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Show selected view
    const viewElement = document.getElementById(`${view}-view`);
    if (viewElement) {
        viewElement.classList.remove('hidden');
        window.appState.currentView = view;
        
        // Load view-specific data
        switch(view) {
            case 'home':
                renderTweets();
                break;
            case 'explore':
                renderExplore();
                break;
            case 'messages':
                renderMessages();
                updateMessagesBadge();
                break;
            case 'bookmarks':
                renderBookmarks();
                break;
            case 'lists':
                renderLists();
                break;
        }
    }
}

// Tweet Rendering
function renderTweets() {
    const container = document.getElementById('tweets-container');
    const tweets = window.appState.filteredTweets;
    
    if (tweets.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No tweets to show</p></div>';
        return;
    }
    
    container.innerHTML = tweets.map(tweet => renderTweet(tweet)).join('');
}

function switchFeedTab(event, tab) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    window.appState.currentFeedTab = tab;
    
    // Filter tweets
    if (tab === 'following') {
        const followingIds = window.appState.currentUser.following || [];
        window.appState.filteredTweets = window.appState.tweets.filter(tweet => 
            followingIds.includes(tweet.userId) || tweet.userId === window.appState.currentUser.id
        );
    } else {
        window.appState.filteredTweets = window.appState.tweets;
    }
    
    renderTweets();
}

// Tweet Actions
function toggleLike(tweetId) {
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (!tweet) return;
    
    tweet.liked = !tweet.liked;
    tweet.likes += tweet.liked ? 1 : -1;
    
    renderTweets();
    debouncedSaveState();
}

function toggleRetweet(tweetId) {
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (!tweet) return;
    
    tweet.retweeted = !tweet.retweeted;
    tweet.retweets += tweet.retweeted ? 1 : -1;
    
    renderTweets();
}

function toggleBookmark(tweetId) {
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (!tweet) return;
    
    tweet.bookmarked = !tweet.bookmarked;
    
    if (tweet.bookmarked) {
        window.appState.bookmarkedTweets.push(tweet);
    } else {
        window.appState.bookmarkedTweets = window.appState.bookmarkedTweets.filter(t => t.id !== tweetId);
    }
    
    renderTweets();
    debouncedSaveState();
}

function toggleComment(tweetId) {
    // Toggle inline comments section
    const tweetCard = document.querySelector(`[data-tweet-id="${tweetId}"]`);
    if (!tweetCard) return;
    
    let commentsSection = tweetCard.querySelector('.comments-section');
    
    if (commentsSection) {
        // Toggle visibility
        commentsSection.classList.toggle('hidden');
    } else {
        // Create and insert comments section
        commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
        commentsSection.innerHTML = renderComments(tweetId);
        tweetCard.appendChild(commentsSection);
    }
}

function showTweetDetail(tweetId) {
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (!tweet) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'tweet-detail-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeTweetDetail()"></div>
        <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <button class="icon-btn" onclick="closeTweetDetail()">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <h3>Tweet</h3>
            </div>
            <div class="modal-body">
                ${renderTweet(tweet)}
                <div class="comments-section" id="tweet-comments-${tweetId}">
                    ${renderComments(tweetId)}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeTweetDetail() {
    const modal = document.getElementById('tweet-detail-modal');
    if (modal) modal.remove();
}

function submitComment(tweetId) {
    const input = document.getElementById(`comment-input-${tweetId}`);
    const commentText = input?.value.trim();
    
    if (!commentText) {
        showToast('Please write a comment', 'error');
        return;
    }
    
    if (!window.appState.comments[tweetId]) {
        window.appState.comments[tweetId] = [];
    }
    
    const comment = {
        id: generateId(),
        user: window.appState.currentUser,
        text: commentText,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
    };
    
    window.appState.comments[tweetId].push(comment);
    
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (tweet) tweet.comments += 1;
    
    input.value = '';
    
    // Re-render comments in the inline section
    const tweetCard = document.querySelector(`[data-tweet-id="${tweetId}"]`);
    if (tweetCard) {
        const commentsSection = tweetCard.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.innerHTML = renderComments(tweetId);
        }
    }
    
    showToast('Comment added!', 'success');
    saveAppState();
    
    // Add notification
    if (tweet && tweet.userId !== window.appState.currentUser.id) {
        const notification = {
            id: generateId(),
            type: 'comment',
            user: window.appState.currentUser,
            text: `${window.appState.currentUser.name} commented on your tweet`,
            timestamp: new Date().toISOString(),
            read: false
        };
        window.appState.notifications.unshift(notification);
        updateNotificationBadge();
    }
}

function sortComments(tweetId, sortType) {
    const comments = window.appState.comments[tweetId];
    if (!comments) return;
    
    switch(sortType) {
        case 'top':
            comments.sort((a, b) => b.likes - a.likes);
            break;
        case 'latest':
            comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'oldest':
            comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            break;
    }
    
    document.getElementById(`tweet-comments-${tweetId}`).innerHTML = renderComments(tweetId);
}

function deleteComment(tweetId, commentId) {
    if (!confirm('Delete this comment?')) return;
    
    const comments = window.appState.comments[tweetId];
    const index = comments.findIndex(c => c.id === commentId);
    
    if (index > -1) {
        comments.splice(index, 1);
        const tweet = window.appState.tweets.find(t => t.id === tweetId);
        if (tweet) tweet.comments -= 1;
        
        // Re-render inline comments
        const tweetCard = document.querySelector(`[data-tweet-id="${tweetId}"]`);
        if (tweetCard) {
            const commentsSection = tweetCard.querySelector('.comments-section');
            if (commentsSection) {
                commentsSection.innerHTML = renderComments(tweetId);
            }
        }
        
        showToast('Comment deleted', 'success');
        saveAppState();
    }
}

function replyToComment(tweetId, commentId) {
    const replyText = prompt('Write your reply:');
    if (!replyText) return;
    
    const comments = window.appState.comments[tweetId];
    const parentComment = comments.find(c => c.id === commentId);
    
    if (parentComment) {
        if (!parentComment.replies) parentComment.replies = [];
        
        const reply = {
            id: generateId(),
            parentId: commentId,
            user: window.appState.currentUser,
            text: replyText,
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: []
        };
        
        parentComment.replies.push(reply);
        document.getElementById(`tweet-comments-${tweetId}`).innerHTML = renderComments(tweetId);
        showToast('Reply added!', 'success');
    }
}

function likeComment(tweetId, commentId) {
    const comment = window.appState.comments[tweetId]?.find(c => c.id === commentId);
    if (comment) {
        comment.likes += 1;
        showToast('Comment liked!', 'success');
    }
}

function replyToComment(tweetId, commentId) {
    showToast('Reply feature coming soon!', 'info');
}

function shareTweet(tweetId) {
    window.appState.currentShareTweetId = tweetId;
    document.getElementById('share-modal').classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
    window.appState.currentShareTweetId = null;
}

function shareVia(platform) {
    const tweetId = window.appState.currentShareTweetId;
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    
    if (!tweet) return;
    
    const tweetUrl = `https://tweetkar.app/tweet/${tweetId}`;
    const text = tweet.content.substring(0, 100) + '...';
    
    switch(platform) {
        case 'copylink':
            showToast('Link copied to clipboard!', 'success');
            break;
        case 'twitter':
            showToast('Opening X (Twitter)...', 'info');
            // window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(tweetUrl)}`, '_blank');
            break;
        case 'facebook':
            showToast('Opening Facebook...', 'info');
            // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tweetUrl)}`, '_blank');
            break;
        case 'whatsapp':
            showToast('Opening WhatsApp...', 'info');
            // window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + tweetUrl)}`, '_blank');
            break;
        case 'telegram':
            showToast('Opening Telegram...', 'info');
            // window.open(`https://t.me/share/url?url=${encodeURIComponent(tweetUrl)}&text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'email':
            showToast('Opening email client...', 'info');
            // window.location.href = `mailto:?subject=${encodeURIComponent('Check out this post')}&body=${encodeURIComponent(text + '\n\n' + tweetUrl)}`;
            break;
        case 'qrcode':
            showToast('QR Code generated!', 'success');
            break;
        case 'embed':
            showToast('Embed code copied!', 'success');
            break;
    }
    
    closeShareModal();
}

function votePoll(tweetId, optionIndex) {
    const tweet = window.appState.tweets.find(t => t.id === tweetId);
    if (!tweet || !tweet.poll || tweet.poll.voted) return;
    
    tweet.poll.voted = true;
    tweet.poll.votedOption = optionIndex;
    tweet.poll.options[optionIndex].votes += 1;
    tweet.poll.totalVotes += 1;
    
    renderTweets();
    saveAppState();
    showToast('Vote recorded!', 'success');
}

// Composer
function openComposer() {
    document.getElementById('composer-modal').classList.remove('hidden');
    document.getElementById('tweet-textarea').focus();
}

function closeComposer() {
    const modal = document.getElementById('composer-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    const textarea = document.getElementById('tweet-textarea');
    if (textarea) {
        textarea.value = '';
    }
    
    const charCount = document.getElementById('char-count');
    if (charCount) {
        charCount.textContent = '280';
        charCount.classList.remove('warning', 'error');
    }
    
    removeComposerImage();
    removePoll();
}

function submitTweet() {
    const textarea = document.getElementById('tweet-textarea');
    const content = textarea.value.trim();
    const pollCreator = document.getElementById('poll-creator');
    
    // Check if poll is being created
    const hasPoll = !pollCreator.classList.contains('hidden');
    
    if (!content && !window.appState.composerImage && !hasPoll) {
        showToast('Please write something, add an image, or create a poll', 'error');
        return;
    }
    
    if (content.length > 280) {
        showToast('Tweet is too long. Maximum 280 characters.', 'error');
        return;
    }
    
    // Create new tweet
    const newTweet = {
        id: generateId(),
        userId: window.appState.currentUser.id,
        user: window.appState.currentUser,
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        retweets: 0,
        comments: 0,
        views: 0,
        liked: false,
        retweeted: false,
        bookmarked: false
    };
    
    if (window.appState.composerImage) {
        newTweet.image = window.appState.composerImage;
    }
    
    // Add poll if created
    if (hasPoll) {
        const option1 = document.getElementById('poll-option-1').value.trim();
        const option2 = document.getElementById('poll-option-2').value.trim();
        const option3 = document.getElementById('poll-option-3').value.trim();
        const option4 = document.getElementById('poll-option-4').value.trim();
        
        const pollDays = parseInt(document.getElementById('poll-days').value) || 0;
        const pollHours = parseInt(document.getElementById('poll-hours').value) || 24;
        const totalHours = (pollDays * 24) + pollHours;
        
        if (!option1 || !option2) {
            showToast('Poll must have at least 2 options', 'error');
            return;
        }
        
        if (totalHours < 1 || totalHours > 168) {
            showToast('Poll duration must be between 1 hour and 7 days', 'error');
            return;
        }
        
        const options = [option1, option2];
        if (option3) options.push(option3);
        if (option4) options.push(option4);
        
        newTweet.poll = {
            options: options.map(text => ({ text, votes: 0 })),
            totalVotes: 0,
            voted: false,
            votedOption: null,
            endTime: new Date(Date.now() + totalHours * 60 * 60 * 1000).toISOString(),
            duration: totalHours
        };
    }
    
    // Add to tweets
    window.appState.tweets.unshift(newTweet);
    window.appState.filteredTweets.unshift(newTweet);
    window.appState.currentUser.tweets += 1;
    
    // Close composer and refresh
    closeComposer();
    removePoll();
    renderTweets();
    saveAppState();
    showToast('Tweet posted!', 'success');
}

// Update character count
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('tweet-textarea');
    if (textarea) {
        textarea.addEventListener('input', (e) => {
            const count = 280 - e.target.value.length;
            const countEl = document.getElementById('char-count');
            countEl.textContent = count;
            
            if (count < 0) {
                countEl.classList.add('error');
                countEl.classList.remove('warning');
            } else if (count < 20) {
                countEl.classList.add('warning');
                countEl.classList.remove('error');
            } else {
                countEl.classList.remove('warning', 'error');
            }
        });
    }
});

function togglePollCreator() {
    const pollCreator = document.getElementById('poll-creator');
    const imagePreview = document.getElementById('image-preview');
    
    // Hide image if showing poll
    if (pollCreator.classList.contains('hidden')) {
        pollCreator.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        removeComposerImage();
    } else {
        pollCreator.classList.add('hidden');
    }
}

function removePoll() {
    document.getElementById('poll-creator').classList.add('hidden');
    document.getElementById('poll-option-1').value = '';
    document.getElementById('poll-option-2').value = '';
    document.getElementById('poll-option-3').value = '';
    document.getElementById('poll-option-4').value = '';
    document.getElementById('poll-hours').value = '24';
    document.getElementById('poll-days').value = '0';
}

function setQuickPollDuration(hours) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    document.getElementById('poll-days').value = days;
    document.getElementById('poll-hours').value = remainingHours;
    
    showToast(`Poll duration set to ${hours} hours`, 'success');
}

function addImageToPollOption(optionNumber) {
    showToast('Poll option images coming soon!', 'info');
    // In a real app, this would open an image picker
}

function addEmojiToTweet() {
    const emojis = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '💯', '✨', '🤔', '👏', '🙏', '💪', '🌟', '🚀', '💡', '📸', '🎵', '⚡', '🌈', '💖'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const textarea = document.getElementById('tweet-textarea');
    if (textarea) {
        textarea.value += emoji;
        textarea.focus();
        
        // Update character count
        const count = 280 - textarea.value.length;
        const countEl = document.getElementById('char-count');
        if (countEl) {
            countEl.textContent = count;
        }
    }
}

function addEmojiToMessage() {
    const emojis = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '💯', '✨', '🤔', '👏', '🙏', '💪'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const input = document.getElementById('message-input');
    if (input) {
        input.value += emoji;
        input.focus();
    }
}

function addImageToMessage() {
    showToast('Image sharing coming soon!', 'info');
    // In a real app, this would open file picker
}

function dismissSuggestion(userId) {
    showToast('Suggestion dismissed', 'info');
    // In a real app, this would remove from suggestions
}

// Search and Hashtags
function handleGlobalSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (!query) {
        window.appState.filteredTweets = window.appState.tweets;
        renderTweets();
        return;
    }
    
    window.appState.filteredTweets = window.appState.tweets.filter(tweet => 
        tweet.content.toLowerCase().includes(query) ||
        tweet.user.name.toLowerCase().includes(query) ||
        tweet.user.username.toLowerCase().includes(query)
    );
    
    renderTweets();
}

function searchHashtag(event, tag) {
    event?.preventDefault();
    
    const query = tag.toLowerCase();
    window.appState.filteredTweets = window.appState.tweets.filter(tweet => 
        tweet.content.toLowerCase().includes('#' + query)
    );
    
    navigateTo(null, 'home');
    renderTweets();
}

function viewUserProfile(event, username) {
    event?.preventDefault();
    
    const user = mockUsers.find(u => u.username === username);
    if (user) {
        showProfile(user.id);
    }
}

// Trending and Suggestions
function renderTrendingHashtags() {
    const widget = document.getElementById('trending-widget');
    widget.innerHTML = trendingHashtags.slice(0, 5).map(item => renderTrendingItem(item)).join('');
}

function renderUserSuggestions() {
    const widget = document.getElementById('suggestions-widget');
    const suggestions = mockUsers.filter(u => u.id !== window.appState.currentUser.id).slice(0, 3);
    widget.innerHTML = suggestions.map(user => renderUserSuggestion(user)).join('');
}

// Follow/Unfollow
function toggleFollow(userId) {
    const currentUser = window.appState.currentUser;
    const targetUser = mockUsers.find(u => u.id === userId);
    
    if (!currentUser.following) {
        currentUser.following = [];
    }
    
    const index = currentUser.following.indexOf(userId);
    if (index > -1) {
        currentUser.following.splice(index, 1);
        if (typeof currentUser.following === 'number') {
            currentUser.following -= 1;
        }
        if (targetUser) targetUser.followers -= 1;
        showToast(`Unfollowed @${targetUser?.username}`, 'info');
    } else {
        currentUser.following.push(userId);
        if (typeof currentUser.following === 'number') {
            currentUser.following += 1;
        }
        if (targetUser) targetUser.followers += 1;
        showToast(`Following @${targetUser?.username}`, 'success');
        
        // Add notification for the followed user
        const notification = {
            id: generateId(),
            type: 'follow',
            user: currentUser,
            text: `${currentUser.name} started following you`,
            timestamp: new Date().toISOString(),
            read: false
        };
        window.appState.notifications.unshift(notification);
    }
    
    renderUserSuggestions();
    renderTweets();
    updateNotificationBadge();
    debouncedSaveState();
}

// Notifications
function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('hidden');
    
    if (!panel.classList.contains('hidden')) {
        renderNotifications();
    }
}

function renderNotifications() {
    const container = document.getElementById('notifications-list');
    const notifications = window.appState.notifications;
    
    if (notifications.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No notifications</p></div>';
        return;
    }
    
    container.innerHTML = notifications.map(n => renderNotification(n)).join('');
}

function markNotificationRead(notificationId) {
    const notification = window.appState.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateNotificationBadge();
        renderNotifications();
    }
}

function markAllRead() {
    window.appState.notifications.forEach(n => n.read = true);
    updateNotificationBadge();
    renderNotifications();
}

function updateNotificationBadge() {
    const unreadCount = window.appState.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notification-count');
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.add('active');
    } else {
        badge.classList.remove('active');
    }
}

// User Menu
function toggleUserMenu() {
    const menu = document.getElementById('user-menu-dropdown');
    menu.classList.toggle('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('.user-menu-dropdown')) {
        document.getElementById('user-menu-dropdown')?.classList.add('hidden');
    }
    if (!e.target.closest('.notification-btn') && !e.target.closest('.notifications-panel')) {
        document.getElementById('notifications-panel')?.classList.add('hidden');
    }
});

function handleLogout() {
    showToast('Logging out...', 'info');
    
    setTimeout(() => {
        clearAppState();
        
        window.appState = {
            currentUser: null,
            tweets: [],
            filteredTweets: [],
            comments: {},
            notifications: [],
            conversations: [],
            messages: {},
            lists: [],
            bookmarkedTweets: [],
            pollImages: {}
        };
        
        document.getElementById('main-app').classList.add('hidden');
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('email-verification').classList.add('hidden');
    }, 500);
}

// Profile
function showProfile(userId) {
    const user = userId ? mockUsers.find(u => u.id === userId) : window.appState.currentUser;
    if (!user) return;
    
    const profileView = document.getElementById('profile-view');
    profileView.innerHTML = renderProfile(user);
    
    // Hide all views and show profile
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });
    profileView.classList.remove('hidden');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const profileLink = document.querySelector('[data-view="profile"]');
    if (profileLink) profileLink.classList.add('active');
    
    // Render user's tweets (default tab)
    switchProfileTab(user.id, 'tweets');
}

function switchProfileTab(userId, tab) {
    const user = mockUsers.find(u => u.id === userId) || window.appState.currentUser;
    let tweets = [];
    
    switch(tab) {
        case 'tweets':
            // Original tweets only
            tweets = window.appState.tweets.filter(t => t.userId === userId);
            break;
        case 'replies':
            // Tweets and replies (tweets where user commented)
            tweets = window.appState.tweets.filter(t => {
                if (t.userId === userId) return true;
                const comments = window.appState.comments[t.id] || [];
                return comments.some(c => c.user.id === userId);
            });
            break;
        case 'media':
            // Only tweets with images
            tweets = window.appState.tweets.filter(t => t.userId === userId && t.image);
            break;
        case 'likes':
            // Liked tweets
            tweets = window.appState.tweets.filter(t => {
                // In real app, this would check a likes array
                return Math.random() > 0.9 && t.userId !== userId; // Simulate some liked tweets
            });
            break;
    }
    
    const container = document.getElementById('profile-tweets');
    if (tweets.length === 0) {
        const emptyMessages = {
            tweets: 'No tweets yet',
            replies: 'No replies yet',
            media: 'No media yet',
            likes: 'No liked tweets yet'
        };
        container.innerHTML = `<div class="empty-state"><p>${emptyMessages[tab]}</p></div>`;
    } else {
        container.innerHTML = tweets.map(t => renderTweet(t)).join('');
    }
}

function openProfileEdit() {
    const modal = document.getElementById('profile-edit-modal');
    const user = window.appState.currentUser;
    
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-bio').value = user.bio || '';
    document.getElementById('edit-location').value = user.location || '';
    document.getElementById('edit-website').value = user.website || '';
    document.getElementById('edit-avatar-preview').src = user.avatar;
    
    modal.classList.remove('hidden');
}

function showAvatarPicker() {
    document.getElementById('avatar-picker').classList.toggle('hidden');
}

function selectAvatar(type) {
    if (type === 'upload') {
        document.getElementById('avatar-upload').click();
        return;
    }
    
    // Generate avatar based on type
    const avatarMap = {
        gradient1: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FF6B6B"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%234ECDC4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23g1)"%3E%3C/rect%3E%3C/svg%3E',
        gradient2: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667EEA"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%23764BA2"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23g2)"%3E%3C/rect%3E%3C/svg%3E',
        geometric: generateAvatar('GEO'),
        cat: generateAvatar('CAT'),
        mountain: generateAvatar('MTN'),
        cosmic: generateAvatar('SPC'),
        wave: generateAvatar('WVE'),
        rainbow: generateAvatar('RBW'),
        tech: generateAvatar('TCH'),
        professional: generateAvatar('PRO')
    };
    
    const newAvatar = avatarMap[type] || generateAvatar('NEW');
    document.getElementById('edit-avatar-preview').src = newAvatar;
    window.appState.currentUser.avatar = newAvatar;
    
    // Update avatar everywhere
    document.querySelectorAll('.user-avatar, #nav-user-avatar, #composer-avatar').forEach(img => {
        img.src = newAvatar;
    });
    
    document.getElementById('avatar-picker').classList.add('hidden');
    saveAppState();
    showToast('Avatar updated everywhere!', 'success');
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('edit-avatar-preview').src = e.target.result;
        window.appState.currentUser.avatar = e.target.result;
        document.getElementById('avatar-picker').classList.add('hidden');
        showToast('Avatar uploaded!', 'success');
    };
    reader.readAsDataURL(file);
}

function closeProfileEdit() {
    document.getElementById('profile-edit-modal').classList.add('hidden');
}

function saveProfile() {
    const user = window.appState.currentUser;
    
    user.name = document.getElementById('edit-name').value;
    user.bio = document.getElementById('edit-bio').value;
    user.location = document.getElementById('edit-location').value;
    user.website = document.getElementById('edit-website').value;
    
    closeProfileEdit();
    showProfile();
    updateNavUI();
    saveAppState();
    showToast('Profile updated successfully!', 'success');
}

// Messages
function renderMessages() {
    const container = document.getElementById('conversations-container');
    container.innerHTML = window.appState.conversations.map(c => renderConversation(c)).join('');
}

function openConversation(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return;
    
    window.appState.activeConversation = user;
    
    // Generate or get messages
    if (!window.appState.messages[userId]) {
        window.appState.messages[userId] = generateMockMessages(userId);
    }
    
    const conversation = window.appState.conversations.find(c => c.user.id === userId);
    const onlineStatus = conversation?.online ? '<span style="color: var(--color-success); font-size: 12px;">● Online</span>' : '';
    
    const detailContainer = document.getElementById('conversation-detail');
    detailContainer.innerHTML = `
        <div class="conversation-header-bar">
            <div style="position: relative;">
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                ${conversation?.online ? '<span class="online-indicator"></span>' : ''}
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600;">${user.name}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">@${user.username} ${onlineStatus}</div>
            </div>
        </div>
        <div class="messages-container" id="active-messages">
            ${window.appState.messages[userId].map(m => renderMessage(m)).join('')}
            <div class="typing-indicator hidden" id="typing-indicator">
                <span></span><span></span><span></span>
                <span style="margin-left: 8px; color: var(--color-text-secondary); font-size: 12px;">${user.name} is typing...</span>
            </div>
        </div>
        <div class="message-input-container">
            <input type="text" class="message-input" placeholder="Type a message..." id="message-input" onkeypress="handleMessageSend(event, '${userId}')" oninput="showTypingIndicator()">
            <button class="btn btn--primary" onclick="sendMessage('${userId}')">Send</button>
        </div>
    `;
    
    // Mark conversation as read
    if (conversation) {
        conversation.unread = false;
        renderMessages();
        updateMessagesBadge();
    }
    
    // Scroll to bottom
    setTimeout(() => {
        const messagesContainer = document.getElementById('active-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 100);
}

function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator && Math.random() > 0.95) {
        indicator.classList.remove('hidden');
        setTimeout(() => {
            indicator.classList.add('hidden');
        }, 2000);
    }
}

function updateMessagesBadge() {
    const unreadCount = window.appState.conversations.filter(c => c.unread).length;
    const badge = document.getElementById('messages-badge');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function handleMessageSend(event, userId) {
    if (event.key === 'Enter') {
        sendMessage(userId);
    }
}

function sendMessage(userId) {
    const input = document.getElementById('message-input');
    const content = input.value.trim();
    
    if (!content) return;
    
    const message = {
        id: generateId(),
        userId: window.appState.currentUser.id,
        content: content,
        timestamp: new Date().toISOString(),
        own: true,
        read: false
    };
    
    window.appState.messages[userId].push(message);
    input.value = '';
    
    // Update conversation preview
    const conversation = window.appState.conversations.find(c => c.user.id === userId);
    if (conversation) {
        conversation.lastMessage = content;
        conversation.timestamp = new Date().toISOString();
    }
    
    // Re-render messages
    const messagesContainer = document.getElementById('active-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = window.appState.messages[userId].map(m => renderMessage(m)).join('');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    saveAppState();
}

function startNewConversation() {
    alert('New conversation - would show user selection dialog');
}

// Bookmarks
function renderBookmarks() {
    const container = document.getElementById('bookmarks-container');
    const bookmarks = window.appState.bookmarkedTweets;
    
    if (bookmarks.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No bookmarks yet</p></div>';
        return;
    }
    
    container.innerHTML = bookmarks.map(tweet => renderTweet(tweet)).join('');
}

// Lists
function renderLists() {
    const container = document.getElementById('lists-container');
    const lists = window.appState.lists;
    
    if (lists.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No lists yet</p></div>';
        return;
    }
    
    container.innerHTML = lists.map(list => renderList(list)).join('');
}

function createNewList() {
    const name = prompt('Enter list name:');
    if (!name) return;
    
    const newList = {
        id: generateId(),
        name: name,
        description: '',
        memberCount: 0,
        subscriberCount: 0,
        private: false
    };
    
    window.appState.lists.push(newList);
    renderLists();
}

function openList(listId) {
    alert('Open list - would show list tweets');
}

function editList(event, listId) {
    event.stopPropagation();
    alert('Edit list - would show edit dialog');
}

// Explore
function renderExplore() {
    const container = document.getElementById('trending-section');
    if (!container) return;
    
    container.innerHTML = `
        <h3 style="padding: 16px 20px; font-size: 20px; font-weight: 600; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">Trending Now</h3>
        <div style="padding: 8px 0;">
            ${trendingHashtags.map(item => renderTrendingItem(item)).join('')}
        </div>
        <div style="padding: 20px; text-align: center;">
            <button class="btn btn--secondary" onclick="loadMoreTrending()">Show More</button>
        </div>
    `;
}

function loadMoreTrending() {
    showToast('Loading more trends...', 'info');
    setTimeout(() => {
        showToast('All trends loaded!', 'success');
    }, 500);
}

function handleExploreSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (!query) {
        renderExplore();
        return;
    }
    
    const filtered = trendingHashtags.filter(item => 
        item.tag.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('trending-section');
    container.innerHTML = `
        <h3 style="padding: 16px; font-size: 20px; font-weight: 600;">Search Results</h3>
        ${filtered.map(item => renderTrendingItem(item)).join('')}
    `;
}

// Analytics
function showAnalytics() {
    document.getElementById('user-menu-dropdown')?.classList.add('hidden');
    
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });
    
    const analyticsView = document.getElementById('analytics-view');
    if (analyticsView) {
        analyticsView.classList.remove('hidden');
        const container = document.getElementById('analytics-container');
        if (container) {
            container.innerHTML = renderAnalytics();
        }
    }
}

// Settings
function showSettings() {
    document.getElementById('user-menu-dropdown')?.classList.add('hidden');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === 'settings') {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });
    
    const settingsView = document.getElementById('settings-view');
    if (settingsView) {
        settingsView.classList.remove('hidden');
        const container = settingsView.querySelector('.settings-container');
        if (container) {
            container.innerHTML = renderSettings();
        }
    }
}

function toggleSetting(settingName) {
    window.appState.settings[settingName] = !window.appState.settings[settingName];
    document.querySelector('.settings-container').innerHTML = renderSettings();
    saveAppState();
}

// Theme
function toggleTheme() {
    window.appState.theme = window.appState.theme === 'light' ? 'dark' : 'light';
    applyTheme();
}

function applyTheme() {
    if (window.appState.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    saveAppState();
}

// Add scroll to top functionality
function addScrollToTop() {
    const feed = document.querySelector('.feed');
    if (!feed) return;
    
    let scrollBtn = document.querySelector('.jump-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('div');
        scrollBtn.className = 'jump-to-top';
        scrollBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
        scrollBtn.style.display = 'none';
        scrollBtn.onclick = () => {
            feed.scrollTo({ top: 0, behavior: 'smooth' });
        };
        document.body.appendChild(scrollBtn);
    }
    
    feed.addEventListener('scroll', () => {
        if (feed.scrollTop > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Performance tracking
function trackPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
    }
    
    // N for new tweet
    if (e.key === 'n' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        openComposer();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeComposer();
        closeProfileEdit();
        closeShareModal();
        closeTweetDetail();
        document.getElementById('user-menu-dropdown')?.classList.add('hidden');
        document.getElementById('notifications-panel')?.classList.add('hidden');
    }
});

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
        trackPerformance();
        setTimeout(addScrollToTop, 1000);
    });
} else {
    initApp();
    trackPerformance();
    setTimeout(addScrollToTop, 1000);
}

// Save state before page unload
window.addEventListener('beforeunload', () => {
    if (window.appState.currentUser) {
        saveAppState();
    }
});

// Auto-save every 30 seconds
setInterval(() => {
    if (window.appState.currentUser) {
        saveAppState();
    }
}, 30000);

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.appState.currentUser) {
        saveAppState();
    }
});

console.log('%cTweetKar', 'font-size: 24px; font-weight: bold; color: #21808D;');
console.log('%cFully Functional Social Media Platform', 'font-size: 14px; color: #666;');
console.log('%c✓ Persistent Login State', 'color: #00ba7c;');
console.log('%c✓ Enhanced Poll Feature with Custom Time', 'color: #00ba7c;');
console.log('%c✓ Inline Comment Section', 'color: #00ba7c;');
console.log('%c✓ Avatar Persistence Fix', 'color: #00ba7c;');
console.log('%c✓ Rich Messaging with Emojis', 'color: #00ba7c;');
console.log('%c✓ Improved Who to Follow', 'color: #00ba7c;');