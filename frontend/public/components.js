// Component Rendering Functions

function renderTweet(tweet) {
    const isLiked = tweet.liked ? 'liked' : '';
    const isBookmarked = tweet.bookmarked ? 'bookmarked' : '';
    const verifiedBadge = tweet.user.verified ? `
        <svg class="verified-badge" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    ` : '';
    
    const imageHtml = tweet.image ? `<img src="${tweet.image}" alt="Tweet image" class="tweet-image">` : '';
    
    const pollHtml = tweet.poll ? renderPoll(tweet) : '';
    
    return `
        <div class="tweet-card" data-tweet-id="${tweet.id}">
            <img src="${tweet.user.avatar}" alt="${tweet.user.name}" class="tweet-avatar">
            <div class="tweet-content">
                <div class="tweet-header">
                    <div class="tweet-author">
                        <span>${tweet.user.name}</span>
                        ${verifiedBadge}
                    </div>
                    <span class="tweet-username">@${tweet.user.username}</span>
                    <span class="tweet-time">· ${timeAgo(tweet.timestamp)}</span>
                </div>
                <div class="tweet-text">${parseContent(tweet.content)}</div>
                ${imageHtml}
                ${pollHtml}
                <div class="tweet-actions">
                    <button class="action-btn" onclick="toggleComment('${tweet.id}')">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <span>${formatNumber(tweet.comments)}</span>
                    </button>
                    <button class="action-btn" onclick="toggleRetweet('${tweet.id}')">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                        </svg>
                        <span>${formatNumber(tweet.retweets)}</span>
                    </button>
                    <button class="action-btn ${isLiked}" onclick="toggleLike('${tweet.id}')">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>${formatNumber(tweet.likes)}</span>
                    </button>
                    <button class="action-btn ${isBookmarked}" onclick="toggleBookmark('${tweet.id}')">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="shareTweet('${tweet.id}')">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderPoll(tweet) {
    const poll = tweet.poll;
    const maxVotes = Math.max(...poll.options.map(opt => opt.votes));
    const pollActive = poll.endTime ? new Date(poll.endTime) > new Date() : true;
    
    const optionsHtml = poll.options.map((option, index) => {
        const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
        const isWinning = option.votes === maxVotes && poll.totalVotes > 0;
        const votedForThis = poll.voted && poll.votedOption === index;
        
        return `
            <div class="poll-option ${isWinning ? 'poll-winner' : ''} ${votedForThis ? 'poll-voted' : ''}" 
                 onclick="${!poll.voted && pollActive ? `votePoll('${tweet.id}', ${index})` : ''}" 
                 style="${poll.voted || !pollActive ? 'cursor: default;' : ''}">
                <div class="poll-option-bg" style="width: ${poll.voted ? percentage : 0}%; background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-teal-400) 100%);"></div>
                <div class="poll-option-content">
                    <span class="poll-option-text">
                        ${votedForThis ? '✓ ' : ''}${option.text}
                    </span>
                    ${poll.voted ? `<span class="poll-option-percent" style="font-weight: 600;">${percentage}%</span>` : ''}
                </div>
                ${option.image ? `<img src="${option.image}" alt="Poll option" class="poll-option-image">` : ''}
            </div>
        `;
    }).join('');
    
    const timeRemaining = poll.endTime ? getTimeRemaining(poll.endTime) : null;
    const pollStatus = !pollActive ? '• Poll ended' : timeRemaining ? `• ${timeRemaining} left` : '';
    
    return `
        <div class="tweet-poll ${!pollActive ? 'poll-ended' : ''}">
            ${!pollActive ? '<div class="poll-ended-badge">Final Results</div>' : ''}
            ${optionsHtml}
            <div class="poll-info">
                <span><strong>${formatNumber(poll.totalVotes)}</strong> votes ${pollStatus}</span>
            </div>
        </div>
    `;
}

function getTimeRemaining(endTime) {
    const remaining = new Date(endTime) - new Date();
    if (remaining <= 0) return null;
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

function renderTrendingItem(item) {
    return `
        <div class="trending-item" onclick="searchHashtag(event, '${item.tag}')">
            <div class="trending-category">${item.category} · Trending</div>
            <div class="trending-tag">#${item.tag}</div>
            <div class="trending-count">${formatNumber(item.count)} posts</div>
        </div>
    `;
}

function renderUserSuggestion(user) {
    const verifiedBadge = user.verified ? `
        <svg class="verified-badge" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    ` : '';
    
    const isFollowing = window.appState.currentUser.following?.includes(user.id);
    const followsYou = user.following?.includes(window.appState.currentUser.id);
    const mutualConnections = Math.floor(Math.random() * 5);
    
    return `
        <div class="suggestion-item">
            <img src="${user.avatar}" alt="${user.name}" class="suggestion-avatar" onclick="showProfile('${user.id}')" style="cursor: pointer;">
            <div class="suggestion-info">
                <div class="suggestion-name">
                    ${user.name}
                    ${verifiedBadge}
                    ${followsYou ? '<span class="follows-you-badge">Follows you</span>' : ''}
                </div>
                <div class="suggestion-username">@${user.username}</div>
                ${mutualConnections > 0 ? `<div class="suggestion-meta">Followed by ${mutualConnections} people you follow</div>` : ''}
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
                <button class="btn btn--sm ${isFollowing ? 'btn--secondary' : 'btn--primary'}" onclick="toggleFollow('${user.id}')">
                    ${isFollowing ? 'Following' : 'Follow'}
                </button>
                ${!isFollowing ? `<button class="icon-btn" onclick="dismissSuggestion('${user.id}')" title="Dismiss" style="font-size: 12px; padding: 4px;">✕</button>` : ''}
            </div>
        </div>
    `;
}

function renderNotification(notification) {
    const iconMap = {
        like: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
        retweet: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`,
        follow: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
        comment: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`
    };
    
    return `
        <div class="notification-item ${notification.read ? '' : 'unread'}" onclick="markNotificationRead('${notification.id}')">
            <div class="notification-icon ${notification.type}">
                ${iconMap[notification.type]}
            </div>
            <div class="notification-content">
                <div class="notification-text">${notification.text}</div>
                <div class="notification-time">${timeAgo(notification.timestamp)}</div>
            </div>
        </div>
    `;
}

function renderConversation(conversation) {
    const unreadClass = conversation.unread ? 'unread' : '';
    const unreadBadge = conversation.unread ? '<span class="notification-badge active" style="position: static; margin-left: 8px;">New</span>' : '';
    const onlineIndicator = conversation.online ? '<span class="online-indicator"></span>' : '';
    
    return `
        <div class="conversation-item ${unreadClass}" onclick="openConversation('${conversation.user.id}')">
            <div style="position: relative;">
                <img src="${conversation.user.avatar}" alt="${conversation.user.name}" class="conversation-avatar">
                ${onlineIndicator}
            </div>
            <div class="conversation-content">
                <div class="conversation-header">
                    <span class="conversation-name">${conversation.user.name} ${unreadBadge}</span>
                    <span class="conversation-time">${timeAgo(conversation.timestamp)}</span>
                </div>
                <div class="conversation-preview">${conversation.lastMessage}</div>
            </div>
        </div>
    `;
}

function renderMessage(message) {
    const ownClass = message.own ? 'own' : '';
    const user = message.own ? window.appState.currentUser : window.appState.activeConversation;
    
    const readReceipt = message.own && message.read ? `
        <span class="message-status">
            <svg viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="14" height="14" style="margin-left: -8px;">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        </span>
    ` : '';
    
    const mediaContent = message.image ? `<img src="${message.image}" alt="Shared image" class="message-image">` : '';
    const emojiReactions = message.reactions ? `
        <div class="message-reactions">
            ${message.reactions.map(r => `<span class="reaction">${r.emoji} ${r.count}</span>`).join('')}
        </div>
    ` : '';
    
    return `
        <div class="message-group ${ownClass}">
            <img src="${user.avatar}" alt="${user.name}" class="message-avatar">
            <div class="message-content">
                <div class="message-bubble">
                    ${message.content}
                    ${mediaContent}
                </div>
                ${emojiReactions}
                <div class="message-time">${timeAgo(message.timestamp)} ${readReceipt}</div>
            </div>
        </div>
    `;
}

function renderList(list) {
    const privacyBadge = list.private ? '🔒 Private' : '🌐 Public';
    
    return `
        <div class="list-card" onclick="openList('${list.id}')">
            <div class="list-header">
                <div class="list-info">
                    <h3>${list.name}</h3>
                    <div class="list-meta">${privacyBadge}</div>
                </div>
                <button class="icon-btn" onclick="editList(event, '${list.id}')">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                </button>
            </div>
            ${list.description ? `<div class="list-description">${list.description}</div>` : ''}
            <div class="list-meta">
                ${list.memberCount} members · ${list.subscriberCount} subscribers
            </div>
        </div>
    `;
}

function renderComments(tweetId) {
    const comments = window.appState.comments[tweetId] || [];
    
    const commentForm = `
        <div class="comment-form">
            <img src="${window.appState.currentUser.avatar}" alt="You" class="comment-avatar">
            <div class="comment-input-wrapper" style="flex: 1;">
                <textarea class="comment-input" id="comment-input-${tweetId}" placeholder="Add a comment..." rows="2" style="margin-bottom: 8px;"></textarea>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="icon-btn" onclick="addEmojiToComment('${tweetId}')" title="Add emoji">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    </button>
                    <button class="btn btn--primary btn--sm" onclick="submitComment('${tweetId}')">Comment</button>
                </div>
            </div>
        </div>
    `;
    
    const commentSort = `
        <div class="comment-sort">
            <button class="active" onclick="sortComments('${tweetId}', 'top')">Top</button>
            <button onclick="sortComments('${tweetId}', 'latest')">Latest</button>
            <button onclick="sortComments('${tweetId}', 'oldest')">Oldest</button>
        </div>
    `;
    
    if (comments.length === 0) {
        return commentForm + '<div style="padding: 20px; text-align: center; color: var(--color-text-secondary); font-size: 14px;">No comments yet. Be the first to comment!</div>';
    }
    
    const renderComment = (comment, nested = false) => {
        const nestedClass = nested ? 'nested' : '';
        const repliesHtml = comment.replies && comment.replies.length > 0 
            ? comment.replies.map(reply => renderComment(reply, true)).join('')
            : '';
            
        return `
            <div class="comment-item ${nestedClass}">
                <img src="${comment.user.avatar}" alt="${comment.user.name}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.user.name}</span>
                        <span style="color: var(--color-text-secondary); font-size: 13px;">@${comment.user.username} · ${timeAgo(comment.timestamp)}</span>
                    </div>
                    <div class="comment-text">${parseContent(comment.text)}</div>
                    <div class="comment-actions">
                        <button onclick="likeComment('${tweetId}', '${comment.id}')"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> ${comment.likes || 0}</button>
                        <button onclick="replyToComment('${tweetId}', '${comment.id}')"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg> Reply</button>
                        ${comment.user.id === window.appState.currentUser.id ? `<button onclick="deleteComment('${tweetId}', '${comment.id}')"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg> Delete</button>` : ''}
                    </div>
                </div>
            </div>
            ${repliesHtml}
        `;
    };
    
    const commentsList = comments.map(c => renderComment(c)).join('');
    const loadMoreBtn = comments.length > 10 ? '<div style="padding: 12px 20px; text-align: center;"><button class="btn btn--sm btn--secondary">Load more comments</button></div>' : '';
    
    return commentForm + commentSort + commentsList + loadMoreBtn;
}

function addEmojiToComment(tweetId) {
    const emojis = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '💯', '✨', '🤔', '👏', '🙏', '💪'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const input = document.getElementById(`comment-input-${tweetId}`);
    if (input) {
        input.value += emoji;
        input.focus();
    }
}

function renderProfileTabs(user, activeTab = 'tweets') {
    const tabs = {
        tweets: 'Tweets',
        replies: 'Tweets & Replies',
        media: 'Media',
        likes: 'Likes'
    };
    
    const tabButtons = Object.entries(tabs).map(([key, label]) => `
        <button class="tab-btn ${activeTab === key ? 'active' : ''}" onclick="switchProfileTab('${user.id}', '${key}')">
            ${label}
        </button>
    `).join('');
    
    return `<div class="feed-tabs">${tabButtons}</div>`;
}

function renderProfile(user) {
    const verifiedBadge = user.verified ? `
        <svg class="verified-badge" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    ` : '';
    
    const isOwnProfile = user.id === window.appState.currentUser.id;
    const isFollowing = window.appState.currentUser.following?.includes(user.id);
    
    return `
        <div class="profile-header">
            <div class="profile-banner"></div>
            <div class="profile-info">
                <div class="profile-avatar-container">
                    <img src="${user.avatar}" alt="${user.name}" class="profile-avatar-large">
                </div>
                <div class="profile-actions">
                    ${isOwnProfile ? 
                        `<button class="btn btn--secondary" onclick="openProfileEdit()">Edit Profile</button>` :
                        `<button class="btn ${isFollowing ? 'btn--secondary' : 'btn--primary'}" onclick="toggleFollow('${user.id}')">
                            ${isFollowing ? 'Following' : 'Follow'}
                        </button>`
                    }
                </div>
                <div class="profile-details">
                    <div class="profile-name">
                        ${user.name}
                        ${verifiedBadge}
                    </div>
                    <div class="profile-username">@${user.username}</div>
                    ${user.bio ? `<div class="profile-bio">${user.bio}</div>` : ''}
                    <div class="profile-meta">
                        ${user.location ? `
                            <span>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                ${user.location}
                            </span>
                        ` : ''}
                        ${user.website ? `
                            <span>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                                </svg>
                                <a href="${user.website}" target="_blank">${user.website}</a>
                            </span>
                        ` : ''}
                        <span>
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
                                <path fill="currentColor" d="M5 22h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM5 8h14v12H5V8z"/>
                            </svg>
                            Joined ${new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <div class="profile-stats">
                        <span class="stat">
                            <span class="stat-value">${formatNumber(user.following)}</span>
                            <span class="stat-label">Following</span>
                        </span>
                        <span class="stat">
                            <span class="stat-value">${formatNumber(user.followers)}</span>
                            <span class="stat-label">Followers</span>
                        </span>
                        <span class="stat">
                            <span class="stat-value">${formatNumber(user.tweets)}</span>
                            <span class="stat-label">Posts</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        ${renderProfileTabs(user, 'tweets')}
        <div id="profile-tweets" class="tweets-container">
            <!-- User's tweets will be rendered here -->
        </div>
    `;
}

function renderAnalytics() {
    const stats = window.appState.analytics;
    
    return `
        <div class="analytics-grid">
            <div class="analytics-card">
                <h3>Total Impressions</h3>
                <div class="analytics-value">${formatNumber(stats.impressions)}</div>
                <div class="analytics-change positive">↑ ${stats.impressionsChange}% from last month</div>
            </div>
            <div class="analytics-card">
                <h3>Profile Visits</h3>
                <div class="analytics-value">${formatNumber(stats.profileVisits)}</div>
                <div class="analytics-change positive">↑ ${stats.profileVisitsChange}% from last month</div>
            </div>
            <div class="analytics-card">
                <h3>Engagement Rate</h3>
                <div class="analytics-value">${stats.engagementRate}%</div>
                <div class="analytics-change ${stats.engagementChange >= 0 ? 'positive' : 'negative'}">
                    ${stats.engagementChange >= 0 ? '↑' : '↓'} ${Math.abs(stats.engagementChange)}% from last month
                </div>
            </div>
            <div class="analytics-card">
                <h3>New Followers</h3>
                <div class="analytics-value">+${formatNumber(stats.newFollowers)}</div>
                <div class="analytics-change positive">This month</div>
            </div>
            <div class="analytics-card">
                <h3>Top Post</h3>
                <div class="analytics-value">${formatNumber(stats.topPostEngagement)}</div>
                <div class="analytics-change">Engagements</div>
            </div>
            <div class="analytics-card">
                <h3>Average Engagement</h3>
                <div class="analytics-value">${stats.avgEngagement}</div>
                <div class="analytics-change">Per post</div>
            </div>
        </div>
    `;
}

function renderSettings() {
    const settings = window.appState.settings;
    
    return `
        <div class="settings-section">
            <h3>Account Settings</h3>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Private Account</h4>
                    <div class="setting-description">Only approved followers can see your posts</div>
                </div>
                <div class="toggle-switch ${settings.privateAccount ? 'active' : ''}" onclick="toggleSetting('privateAccount')"></div>
            </div>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Two-Factor Authentication</h4>
                    <div class="setting-description">Add an extra layer of security to your account</div>
                </div>
                <div class="toggle-switch ${settings.twoFactor ? 'active' : ''}" onclick="toggleSetting('twoFactor')"></div>
            </div>
        </div>
        <div class="settings-section">
            <h3>Privacy &amp; Safety</h3>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Photo Tagging</h4>
                    <div class="setting-description">Allow others to tag you in photos</div>
                </div>
                <div class="toggle-switch ${settings.photoTagging ? 'active' : ''}" onclick="toggleSetting('photoTagging')"></div>
            </div>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Direct Messages</h4>
                    <div class="setting-description">Allow messages from anyone</div>
                </div>
                <div class="toggle-switch ${settings.dmFromAnyone ? 'active' : ''}" onclick="toggleSetting('dmFromAnyone')"></div>
            </div>
        </div>
        <div class="settings-section">
            <h3>Notifications</h3>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Push Notifications</h4>
                    <div class="setting-description">Receive push notifications on this device</div>
                </div>
                <div class="toggle-switch ${settings.pushNotifications ? 'active' : ''}" onclick="toggleSetting('pushNotifications')"></div>
            </div>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Email Notifications</h4>
                    <div class="setting-description">Receive email updates about your activity</div>
                </div>
                <div class="toggle-switch ${settings.emailNotifications ? 'active' : ''}" onclick="toggleSetting('emailNotifications')"></div>
            </div>
        </div>
        <div class="settings-section">
            <h3>Accessibility</h3>
            <div class="setting-item">
                <div class="setting-label">
                    <h4>Reduce Motion</h4>
                    <div class="setting-description">Reduce animations and transitions</div>
                </div>
                <div class="toggle-switch ${settings.reduceMotion ? 'active' : ''}" onclick="toggleSetting('reduceMotion')"></div>
            </div>
        </div>
    `;
}