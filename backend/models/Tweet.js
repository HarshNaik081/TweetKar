const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 25
    },
    votes: {
        type: Number,
        default: 0
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    image: String
});

const pollSchema = new mongoose.Schema({
    options: [pollOptionSchema],
    totalVotes: {
        type: Number,
        default: 0
    },
    endTime: Date,
    voted: {
        type: Boolean,
        default: false
    },
    votedOption: Number
});

const tweetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Tweet content is required'],
        maxlength: [280, 'Tweet cannot exceed 280 characters']
    },
    image: {
        type: String,
        default: null
    },
    poll: {
        type: pollSchema,
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    bookmarkedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    hashtags: [{
        type: String
    }],
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isRetweet: {
        type: Boolean,
        default: false
    },
    originalTweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    isQuoteTweet: {
        type: Boolean,
        default: false
    },
    quotedTweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    impressions: {
        type: Number,
        default: 0
    },
    scheduledFor: {
        type: Date,
        default: null
    },
    isScheduled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Extract hashtags and mentions before saving
tweetSchema.pre('save', function(next) {
    // Extract hashtags
    const hashtagRegex = /#(\w+)/g;
    const hashtags = this.content.match(hashtagRegex);
    if (hashtags) {
        this.hashtags = hashtags.map(tag => tag.substring(1).toLowerCase());
    }

    // Extract mentions
    const mentionRegex = /@(\w+)/g;
    const mentions = this.content.match(mentionRegex);
    if (mentions) {
        // This would need to resolve usernames to user IDs
        // For now, we'll leave it as an array placeholder
    }

    next();
});

// Virtual for engagement count
tweetSchema.virtual('engagement').get(function() {
    return this.likes.length + this.retweets.length + this.comments.length;
});

module.exports = mongoose.model('Tweet', tweetSchema);
