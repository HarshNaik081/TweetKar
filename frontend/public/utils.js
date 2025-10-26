// Utility Functions and Mock Data

// Generate unique IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + 'y';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + 'mo';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + 'd';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + 'h';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + 'm';
    
    return Math.floor(seconds) + 's';
}

// Format number with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Parse hashtags and mentions in text
function parseContent(text) {
    if (!text) return '';
    
    // Parse hashtags
    text = text.replace(/#(\w+)/g, '<a href="#" class="hashtag" onclick="searchHashtag(event, \'$1\')">$&</a>');
    
    // Parse mentions
    text = text.replace(/@(\w+)/g, '<a href="#" class="mention" onclick="viewUserProfile(event, \'$1\')">$&</a>');
    
    return text;
}

// Generate random avatar
function generateAvatar(name) {
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${color}"/>
            <text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em" font-family="sans-serif" font-weight="bold">${initial}</text>
        </svg>
    `)}`;
}

// Mock Data
const mockUsers = [
    { id: 'user1', name: 'Rajesh Kumar', username: 'rajeshtech', email: 'rajesh@example.com', bio: 'Full Stack Developer | Tech Enthusiast | Coffee Lover ☕', location: 'Mumbai, India', website: 'https://rajeshtech.dev', avatar: generateAvatar('Rajesh Kumar'), verified: true, followers: 15420, following: 892, tweets: 3421, joinedDate: '2018-03-15' },
    { id: 'user2', name: 'Priya Sharma', username: 'priyaartistry', email: 'priya@example.com', bio: 'Digital Artist | Creating magic with pixels ✨', location: 'Bangalore, India', website: 'https://priyaart.com', avatar: generateAvatar('Priya Sharma'), verified: false, followers: 8934, following: 567, tweets: 2156, joinedDate: '2019-06-20' },
    { id: 'user3', name: 'Tech News Daily', username: 'technewsdaily', email: 'news@technews.com', bio: 'Latest tech news and updates | Follow for daily tech insights', location: 'New Delhi, India', website: 'https://technewsdaily.com', avatar: generateAvatar('Tech News Daily'), verified: true, followers: 45670, following: 234, tweets: 12340, joinedDate: '2017-01-10' },
    { id: 'user4', name: 'Arjun Patel', username: 'arjunpatel', email: 'arjun@example.com', bio: 'Cricket enthusiast | Sports journalist 🏏', location: 'Ahmedabad, India', website: null, avatar: generateAvatar('Arjun Patel'), verified: true, followers: 23450, following: 345, tweets: 5670, joinedDate: '2018-09-12' },
    { id: 'user5', name: 'Sneha Reddy', username: 'snehareddy', email: 'sneha@example.com', bio: 'Food blogger | Recipe creator | Culinary adventurer 🍽️', location: 'Hyderabad, India', website: 'https://snehacooks.com', avatar: generateAvatar('Sneha Reddy'), verified: false, followers: 12340, following: 678, tweets: 3890, joinedDate: '2019-04-25' },
    { id: 'user6', name: 'Vikram Singh', username: 'vikramsingh', email: 'vikram@example.com', bio: 'Startup founder | Building the future 🚀', location: 'Bangalore, India', website: 'https://startupvikram.com', avatar: generateAvatar('Vikram Singh'), verified: true, followers: 18900, following: 445, tweets: 2345, joinedDate: '2017-11-30' },
    { id: 'user7', name: 'Ananya Iyer', username: 'ananyaiyer', email: 'ananya@example.com', bio: 'Classical dancer | Arts & culture promoter 💃', location: 'Chennai, India', website: null, avatar: generateAvatar('Ananya Iyer'), verified: false, followers: 9870, following: 523, tweets: 1890, joinedDate: '2020-02-14' },
    { id: 'user8', name: 'Rohan Mehta', username: 'rohanmehta', email: 'rohan@example.com', bio: 'AI researcher | Machine Learning expert | PhD candidate', location: 'Mumbai, India', website: 'https://rohanml.com', avatar: generateAvatar('Rohan Mehta'), verified: true, followers: 16750, following: 289, tweets: 1234, joinedDate: '2018-07-08' },
    { id: 'user9', name: 'Divya Nair', username: 'divyanair', email: 'divya@example.com', bio: 'Fitness coach | Yoga instructor | Wellness advocate 🧘', location: 'Kerala, India', website: 'https://divyawellness.com', avatar: generateAvatar('Divya Nair'), verified: false, followers: 14560, following: 612, tweets: 2567, joinedDate: '2019-01-20' },
    { id: 'user10', name: 'Kabir Khan', username: 'kabirkhan', email: 'kabir@example.com', bio: 'Film director | Storyteller | Cinema lover 🎬', location: 'Mumbai, India', website: null, avatar: generateAvatar('Kabir Khan'), verified: true, followers: 34560, following: 178, tweets: 987, joinedDate: '2016-05-12' },
    { id: 'user11', name: 'Meera Desai', username: 'meeradesai', email: 'meera@example.com', bio: 'Fashion designer | Sustainable fashion advocate ♻️', location: 'Mumbai, India', website: 'https://meerafashion.com', avatar: generateAvatar('Meera Desai'), verified: false, followers: 11230, following: 456, tweets: 1678, joinedDate: '2019-08-30' },
    { id: 'user12', name: 'Aditya Gupta', username: 'adityagupta', email: 'aditya@example.com', bio: 'Cybersecurity expert | Ethical hacker | Tech speaker', location: 'Pune, India', website: 'https://adityasec.com', avatar: generateAvatar('Aditya Gupta'), verified: true, followers: 19870, following: 334, tweets: 2890, joinedDate: '2017-12-05' },
    { id: 'user13', name: 'Ishita Malhotra', username: 'ishitamalhotra', email: 'ishita@example.com', bio: 'Travel blogger | Adventure seeker | Wanderlust ✈️', location: 'New Delhi, India', website: 'https://ishitatravels.com', avatar: generateAvatar('Ishita Malhotra'), verified: false, followers: 16780, following: 789, tweets: 4560, joinedDate: '2018-03-22' },
    { id: 'user14', name: 'Sanjay Verma', username: 'sanjayverma', email: 'sanjay@example.com', bio: 'Business consultant | Leadership coach | Author 📚', location: 'Bangalore, India', website: 'https://sanjaycoaching.com', avatar: generateAvatar('Sanjay Verma'), verified: true, followers: 21450, following: 267, tweets: 1456, joinedDate: '2016-09-18' },
    { id: 'user15', name: 'Pooja Kapoor', username: 'poojakapoor', email: 'pooja@example.com', bio: 'Makeup artist | Beauty influencer | Glam squad 💄', location: 'Mumbai, India', website: null, avatar: generateAvatar('Pooja Kapoor'), verified: false, followers: 28900, following: 523, tweets: 3678, joinedDate: '2019-02-10' },
    { id: 'user16', name: 'Rahul Joshi', username: 'rahuljoshi', email: 'rahul@example.com', bio: 'Environmental activist | Climate advocate | Green warrior 🌱', location: 'Pune, India', website: 'https://rahulgreen.org', avatar: generateAvatar('Rahul Joshi'), verified: false, followers: 13450, following: 445, tweets: 2234, joinedDate: '2018-11-25' },
    { id: 'user17', name: 'Kavya Rao', username: 'kavyarao', email: 'kavya@example.com', bio: 'Software engineer | Open source contributor | Tech blogger', location: 'Bangalore, India', website: 'https://kavyatech.dev', avatar: generateAvatar('Kavya Rao'), verified: true, followers: 14560, following: 389, tweets: 1987, joinedDate: '2017-07-14' },
    { id: 'user18', name: 'Amit Shah', username: 'amitshah', email: 'amit@example.com', bio: 'Stand-up comedian | Making people laugh since 2015 😂', location: 'Mumbai, India', website: 'https://amitcomedy.com', avatar: generateAvatar('Amit Shah'), verified: true, followers: 42300, following: 456, tweets: 5678, joinedDate: '2015-04-20' },
    { id: 'user19', name: 'Nisha Khanna', username: 'nishakhanna', email: 'nisha@example.com', bio: 'Journalist | Political analyst | News anchor 📰', location: 'New Delhi, India', website: null, avatar: generateAvatar('Nisha Khanna'), verified: true, followers: 38900, following: 234, tweets: 6789, joinedDate: '2016-01-08' },
    { id: 'user20', name: 'Karan Malhotra', username: 'karanmalhotra', email: 'karan@example.com', bio: 'Music producer | DJ | Electronic music enthusiast 🎵', location: 'Goa, India', website: 'https://karanmusic.com', avatar: generateAvatar('Karan Malhotra'), verified: false, followers: 17890, following: 567, tweets: 2456, joinedDate: '2018-06-15' },
    { id: 'user21', name: 'Riya Chawla', username: 'riyachawla', email: 'riya@example.com', bio: 'Medical student | Future doctor | Health awareness 🩺', location: 'Delhi, India', website: null, avatar: generateAvatar('Riya Chawla'), verified: false, followers: 8760, following: 623, tweets: 1345, joinedDate: '2020-01-18' },
    { id: 'user22', name: 'Vivek Oberoi', username: 'vivekoberoi', email: 'vivek@example.com', bio: 'Real estate developer | Property expert | Investment advisor', location: 'Mumbai, India', website: 'https://vivekproperties.com', avatar: generateAvatar('Vivek Oberoi'), verified: false, followers: 11230, following: 378, tweets: 987, joinedDate: '2019-05-22' },
    { id: 'user23', name: 'Tanvi Agarwal', username: 'tanviagarwal', email: 'tanvi@example.com', bio: 'Data scientist | Analytics expert | Python lover 🐍', location: 'Bangalore, India', website: 'https://tanvidata.com', avatar: generateAvatar('Tanvi Agarwal'), verified: true, followers: 15670, following: 412, tweets: 1789, joinedDate: '2017-10-30' },
    { id: 'user24', name: 'Nikhil Saxena', username: 'nikhilsaxena', email: 'nikhil@example.com', bio: 'Photographer | Visual storyteller | Canon shooter 📷', location: 'Jaipur, India', website: 'https://nikhilphotos.com', avatar: generateAvatar('Nikhil Saxena'), verified: false, followers: 19450, following: 689, tweets: 3456, joinedDate: '2018-04-12' },
    { id: 'user25', name: 'Shreya Bose', username: 'shreyabose', email: 'shreya@example.com', bio: 'Content writer | SEO specialist | Digital marketer ✍️', location: 'Kolkata, India', website: 'https://shreyawrites.com', avatar: generateAvatar('Shreya Bose'), verified: false, followers: 12890, following: 534, tweets: 2678, joinedDate: '2019-07-08' },
    { id: 'user26', name: 'Harsh Vardhan', username: 'harshvardhan', email: 'harsh@example.com', bio: 'Blockchain developer | Crypto enthusiast | Web3 builder', location: 'Bangalore, India', website: 'https://harshchain.dev', avatar: generateAvatar('Harsh Vardhan'), verified: true, followers: 22340, following: 298, tweets: 1234, joinedDate: '2017-02-25' },
    { id: 'user27', name: 'Simran Kaur', username: 'simrankaur', email: 'simran@example.com', bio: 'HR professional | Talent acquisition | People person 👥', location: 'Chandigarh, India', website: null, avatar: generateAvatar('Simran Kaur'), verified: false, followers: 9870, following: 456, tweets: 1456, joinedDate: '2019-09-14' },
    { id: 'user28', name: 'Varun Dhawan', username: 'varundhawan', email: 'varun@example.com', bio: 'Actor | Bollywood star | Fitness freak 🎭', location: 'Mumbai, India', website: 'https://varundhawan.com', avatar: generateAvatar('Varun Dhawan'), verified: true, followers: 56780, following: 189, tweets: 2345, joinedDate: '2015-08-20' },
    { id: 'user29', name: 'Anjali Mehta', username: 'anjalimehta', email: 'anjali@example.com', bio: 'Education consultant | Career counselor | Mentor', location: 'Pune, India', website: 'https://anjaliguidance.com', avatar: generateAvatar('Anjali Mehta'), verified: false, followers: 13450, following: 512, tweets: 1987, joinedDate: '2018-12-03' },
    { id: 'user30', name: 'Gaurav Kumar', username: 'gauravkumar', email: 'gaurav@example.com', bio: 'Gaming streamer | Esports player | PC builder 🎮', location: 'Noida, India', website: 'https://gauravgaming.com', avatar: generateAvatar('Gaurav Kumar'), verified: true, followers: 34560, following: 423, tweets: 4567, joinedDate: '2017-05-17' },
    { id: 'user31', name: 'Preeti Singh', username: 'preetisingh', email: 'preeti@example.com', bio: 'Entrepreneur | E-commerce expert | Online business coach', location: 'Mumbai, India', website: 'https://preetieco.com', avatar: generateAvatar('Preeti Singh'), verified: false, followers: 16780, following: 378, tweets: 2234, joinedDate: '2018-08-28' },
    { id: 'user32', name: 'Suresh Raina', username: 'sureshraina', email: 'suresh@example.com', bio: 'Former cricketer | Cricket commentator | Sports analyst', location: 'Chennai, India', website: null, avatar: generateAvatar('Suresh Raina'), verified: true, followers: 67890, following: 156, tweets: 1678, joinedDate: '2014-11-22' },
    { id: 'user33', name: 'Neha Dhupia', username: 'nehadhupia', email: 'neha@example.com', bio: 'Actress | Podcast host | Mom life 👶', location: 'Mumbai, India', website: 'https://nehadhupia.com', avatar: generateAvatar('Neha Dhupia'), verified: true, followers: 45670, following: 267, tweets: 3456, joinedDate: '2016-03-10' },
    { id: 'user34', name: 'Siddharth Roy', username: 'siddharthroy', email: 'siddharth@example.com', bio: 'UI/UX designer | Product designer | Design thinking advocate', location: 'Bangalore, India', website: 'https://siddesign.com', avatar: generateAvatar('Siddharth Roy'), verified: false, followers: 14560, following: 489, tweets: 1890, joinedDate: '2018-01-15' },
    { id: 'user35', name: 'Lakshmi Nair', username: 'lakshminair', email: 'lakshmi@example.com', bio: 'Ayurveda practitioner | Holistic health | Natural healing 🌿', location: 'Trivandrum, India', website: 'https://lakshmiayurveda.com', avatar: generateAvatar('Lakshmi Nair'), verified: false, followers: 11230, following: 345, tweets: 1567, joinedDate: '2019-04-07' },
    { id: 'user36', name: 'Manish Tiwari', username: 'manishtiwari', email: 'manish@example.com', bio: 'Digital marketing expert | SEO guru | Growth hacker', location: 'Indore, India', website: 'https://manishtdigital.com', avatar: generateAvatar('Manish Tiwari'), verified: true, followers: 18900, following: 423, tweets: 2678, joinedDate: '2017-06-25' },
    { id: 'user37', name: 'Sonam Bajwa', username: 'sonambajwa', email: 'sonam@example.com', bio: 'Model | Brand ambassador | Influencer 👗', location: 'Delhi, India', website: 'https://sonambajwa.com', avatar: generateAvatar('Sonam Bajwa'), verified: true, followers: 38900, following: 289, tweets: 2345, joinedDate: '2016-07-18' },
    { id: 'user38', name: 'Kunal Kapoor', username: 'kunalkapoor', email: 'kunal@example.com', bio: 'Celebrity chef | Culinary expert | Food network star 👨‍🍳', location: 'Mumbai, India', website: 'https://kunalcooks.com', avatar: generateAvatar('Kunal Kapoor'), verified: true, followers: 42300, following: 234, tweets: 3890, joinedDate: '2015-09-12' },
    { id: 'user39', name: 'Pallavi Sharda', username: 'pallavisharda', email: 'pallavi@example.com', bio: 'Kathak dancer | Cultural ambassador | Arts educator 💃', location: 'Mumbai, India', website: null, avatar: generateAvatar('Pallavi Sharda'), verified: false, followers: 13450, following: 456, tweets: 1789, joinedDate: '2018-10-20' },
    { id: 'user40', name: 'Abhishek Banerjee', username: 'abhishekbanerjee', email: 'abhishek@example.com', bio: 'Screenwriter | Film critic | Cinema enthusiast 🎥', location: 'Kolkata, India', website: 'https://abhishekwrites.com', avatar: generateAvatar('Abhishek Banerjee'), verified: false, followers: 16780, following: 523, tweets: 2456, joinedDate: '2017-11-08' },
    { id: 'user41', name: 'Ritika Sharma', username: 'ritikasharma', email: 'ritika@example.com', bio: 'Psychology student | Mental health advocate | Counseling', location: 'Chandigarh, India', website: null, avatar: generateAvatar('Ritika Sharma'), verified: false, followers: 9870, following: 389, tweets: 1234, joinedDate: '2020-03-15' },
    { id: 'user42', name: 'Dev Anand', username: 'devanand', email: 'dev@example.com', bio: 'DevOps engineer | Cloud architect | AWS certified ☁️', location: 'Hyderabad, India', website: 'https://devcloud.dev', avatar: generateAvatar('Dev Anand'), verified: true, followers: 17890, following: 312, tweets: 1678, joinedDate: '2017-04-22' },
    { id: 'user43', name: 'Swati Mishra', username: 'swatimishra', email: 'swati@example.com', bio: 'Interior designer | Home decor expert | Space creator 🏠', location: 'Lucknow, India', website: 'https://swatidesigns.com', avatar: generateAvatar('Swati Mishra'), verified: false, followers: 12890, following: 467, tweets: 1987, joinedDate: '2018-07-30' },
    { id: 'user44', name: 'Pankaj Tripathi', username: 'pankajtripathi', email: 'pankaj@example.com', bio: 'Actor | National award winner | Theater artist 🎬', location: 'Mumbai, India', website: null, avatar: generateAvatar('Pankaj Tripathi'), verified: true, followers: 51230, following: 178, tweets: 987, joinedDate: '2014-12-05' },
    { id: 'user45', name: 'Natasha Malhotra', username: 'natashamalhotra', email: 'natasha@example.com', bio: 'Wildlife photographer | Conservation advocate | Nature lover 🦁', location: 'Ranthambore, India', website: 'https://natashawild.com', avatar: generateAvatar('Natasha Malhotra'), verified: false, followers: 19450, following: 534, tweets: 2678, joinedDate: '2017-08-18' },
    { id: 'user46', name: 'Mohit Suri', username: 'mohitsuri', email: 'mohit@example.com', bio: 'Investment banker | Financial advisor | Stock market expert 📈', location: 'Mumbai, India', website: 'https://mohitfinance.com', avatar: generateAvatar('Mohit Suri'), verified: true, followers: 24560, following: 289, tweets: 1456, joinedDate: '2016-05-08' },
    { id: 'user47', name: 'Aditi Rao', username: 'aditirao', email: 'aditi@example.com', bio: 'Lawyer | Human rights activist | Legal consultant ⚖️', location: 'Delhi, India', website: null, avatar: generateAvatar('Aditi Rao'), verified: false, followers: 15670, following: 423, tweets: 1789, joinedDate: '2018-09-25' },
    { id: 'user48', name: 'Vishal Bhardwaj', username: 'vishalbhardwaj', email: 'vishal@example.com', bio: 'Film director | Music composer | Storyteller 🎼', location: 'Mumbai, India', website: 'https://vishalfilms.com', avatar: generateAvatar('Vishal Bhardwaj'), verified: true, followers: 38900, following: 156, tweets: 1234, joinedDate: '2015-02-14' },
    { id: 'user49', name: 'Kritika Kamra', username: 'kritikakamra', email: 'kritika@example.com', bio: 'TV actress | OTT content creator | Fitness enthusiast 📺', location: 'Mumbai, India', website: 'https://kritikakamra.com', avatar: generateAvatar('Kritika Kamra'), verified: true, followers: 33450, following: 267, tweets: 2345, joinedDate: '2016-06-20' },
    { id: 'user50', name: 'Aman Gupta', username: 'amangupta', email: 'aman@example.com', bio: 'Audio tech entrepreneur | Shark Tank India | boAt co-founder', location: 'Delhi, India', website: 'https://boat-lifestyle.com', avatar: generateAvatar('Aman Gupta'), verified: true, followers: 78900, following: 234, tweets: 2567, joinedDate: '2014-08-10' }
];

const sampleTweets = [
    { content: 'Just deployed my new React app to production! 🚀 The performance improvements are incredible. #ReactJS #WebDev #JavaScript', hasImage: false, hasPoll: false },
    { content: 'New digital art piece complete! Spent 15 hours on this one. What do you think? 🎨 #DigitalArt #Creative', hasImage: true, hasPoll: false },
    { content: 'Breaking: Major tech announcement coming tomorrow! Stay tuned for the latest updates. #TechNews #Breaking', hasImage: false, hasPoll: false },
    { content: 'That last over was absolutely insane! What a match! 🏏 #Cricket #IndVsPak #Sports', hasImage: false, hasPoll: false },
    { content: 'Just tried this amazing biryani recipe! You have to taste it to believe it 😋 #FoodPhotography #Biryani #IndianFood', hasImage: true, hasPoll: false },
    { content: 'Excited to announce our startup just raised Series A funding! 🎉 Thank you to all our supporters. #StartupIndia #Entrepreneurship', hasImage: false, hasPoll: false },
    { content: 'Beautiful Kathak performance at the cultural festival today 💃 #IndianCulture #Dance #Arts', hasImage: true, hasPoll: false },
    { content: 'New AI model achieves 98% accuracy on image classification! Research paper link in thread 🧠 #AI #MachineLearning #Research', hasImage: false, hasPoll: false },
    { content: 'Yoga at sunrise is the best way to start your day 🧘‍♀️☀️ #Yoga #Fitness #Wellness', hasImage: true, hasPoll: false },
    { content: 'Just wrapped up shooting for our new film! Can\'t wait for you all to see it 🎬 #IndianCinema #Bollywood', hasImage: false, hasPoll: false },
    { content: 'Sustainable fashion is the future. Check out our new eco-friendly collection 👗♻️ #SustainableFashion #EcoFriendly', hasImage: true, hasPoll: false },
    { content: 'Cybersecurity tip: Always use 2FA on all your accounts. Stay safe online! 🔒 #CyberSecurity #InfoSec #Security', hasImage: false, hasPoll: false },
    { content: 'Exploring the beautiful valleys of Himachal Pradesh ⛰️ Travel goals! #Travel #Himachal #Adventure', hasImage: true, hasPoll: false },
    { content: 'Leadership is not about being in charge. It\'s about taking care of those in your charge. #Leadership #Business #Motivation', hasImage: false, hasPoll: false },
    { content: 'New makeup tutorial dropping tomorrow! Stay tuned 💄✨ #MakeupTutorial #Beauty #Cosmetics', hasImage: true, hasPoll: false },
    { content: 'Climate change is real. We need to act NOW. Join the movement for a greener planet 🌍 #ClimateAction #Environment', hasImage: false, hasPoll: false },
    { content: 'Just pushed a major update to my open-source library! Check it out on GitHub 🔧 #OpenSource #GitHub #Programming', hasImage: false, hasPoll: false },
    { content: 'Tonight\'s show was EPIC! Thank you Mumbai for the amazing energy 😂 #StandUpComedy #Comedy #Live', hasImage: true, hasPoll: false },
    { content: 'In-depth analysis of today\'s political developments. Full coverage on our channel tonight. #Politics #News #India', hasImage: false, hasPoll: false },
    { content: 'New music track releasing this Friday! Get ready to dance 🎵🔥 #Music #EDM #NewRelease', hasImage: true, hasPoll: false },
    { content: 'Mental health matters. It\'s okay to not be okay. Reach out for help when you need it. 💚 #MentalHealth #Wellness', hasImage: false, hasPoll: false },
    { content: 'Investing in real estate? Here are 5 tips you should know 📊 Full video on my channel. #RealEstate #Investment', hasImage: false, hasPoll: false },
    { content: 'Data visualization of India\'s tech startup growth (2020-2025) 📈 #DataScience #Analytics #Startups', hasImage: true, hasPoll: false },
    { content: 'Golden hour photography at India Gate 📷✨ #Photography #Delhi #Travel', hasImage: true, hasPoll: false },
    { content: 'Top 10 SEO strategies for 2025. Thread below 👇 #SEO #DigitalMarketing #ContentMarketing', hasImage: false, hasPoll: false },
    { content: 'Blockchain technology is revolutionizing the financial sector. Here\'s how 🔗 #Blockchain #Crypto #Web3', hasImage: false, hasPoll: false },
    { content: 'Company culture is everything. Happy employees = successful business 👥 #HR #CompanyCulture #Workplace', hasImage: false, hasPoll: false },
    { content: 'Behind the scenes from our latest movie shoot! 🎭 #BTS #Bollywood #Acting', hasImage: true, hasPoll: false },
    { content: 'Career guidance session was amazing today! Helping students find their path 🎓 #Education #Career #Students', hasImage: false, hasPoll: false },
    { content: 'Epic gaming stream tonight at 8 PM! Join me for some intense battles 🎮 #Gaming #Twitch #Esports', hasImage: false, hasPoll: false },
    { content: 'E-commerce sales tips that actually work! Saved me thousands 💰 #Ecommerce #Business #OnlineSelling', hasImage: false, hasPoll: false },
    { content: 'What a comeback! Absolutely thrilling match today 🏏 #Cricket #IPL #Sports', hasImage: true, hasPoll: false },
    { content: 'Podcast episode out now! Discussing motherhood, career, and everything in between 🎙️ #Podcast #Mom #Life', hasImage: false, hasPoll: false },
    { content: 'UI/UX design principles that will elevate your product 🎨 #UIUXDesign #ProductDesign #Design', hasImage: true, hasPoll: false },
    { content: 'Ayurvedic remedies for common ailments. Natural healing is powerful 🌿 #Ayurveda #Health #Natural', hasImage: false, hasPoll: false },
    { content: 'Digital marketing trends you can\'t ignore in 2025 📱 #DigitalMarketing #Marketing #Trends', hasImage: false, hasPoll: false },
    { content: 'New fashion collection launching next week! Sneak peek 👗✨ #Fashion #Model #Style', hasImage: true, hasPoll: false },
    { content: 'Chicken tikka masala recipe that\'ll blow your mind! 🍛 Recipe in comments #IndianFood #Cooking #Recipe', hasImage: true, hasPoll: false },
    { content: 'Kathak workshop this weekend! Limited seats available. DM for details 💃 #Kathak #Dance #Workshop', hasImage: false, hasPoll: false },
    { content: 'Film review: Latest blockbuster is a visual masterpiece! 9/10 ⭐ #MovieReview #Cinema #Entertainment', hasImage: false, hasPoll: false },
    { content: 'Taking care of your mental health is not selfish, it\'s necessary 💚 #MentalHealthAwareness #SelfCare', hasImage: false, hasPoll: false },
    { content: 'AWS vs Azure vs Google Cloud - Which one should you choose? Thread 👇 #Cloud #DevOps #AWS', hasImage: false, hasPoll: false },
    { content: 'Home office makeover complete! Creating the perfect workspace 🏠💻 #InteriorDesign #HomeOffice #Decor', hasImage: true, hasPoll: false },
    { content: 'Honored to receive the National Award! This is for everyone who believed in me 🏆 #NationalAward #Acting #Achievement', hasImage: true, hasPoll: false },
    { content: 'Spotted a Bengal tiger in the wild today! Incredible moment 🐅 #Wildlife #Photography #Tiger', hasImage: true, hasPoll: false },
    { content: 'Stock market analysis for this week. Key trends to watch 📊 #StockMarket #Investing #Finance', hasImage: false, hasPoll: false },
    { content: 'Fighting for justice is not easy, but it\'s always worth it ⚖️ #Justice #Law #HumanRights', hasImage: false, hasPoll: false },
    { content: 'Composing music for the new film. Excited to share it with you all 🎼 #Music #Composer #Film', hasImage: false, hasPoll: false },
    { content: 'BTS from our latest TV show! So much fun on set 📺 #TVShow #Acting #BehindTheScenes', hasImage: true, hasPoll: false },
    { content: 'Proud to be part of Shark Tank India! Amazing entrepreneurs with brilliant ideas 🦈 #SharkTankIndia #Entrepreneurship', hasImage: false, hasPoll: false },
    { content: 'Monday motivation: Success is not final, failure is not fatal 💪 #MondayMotivation #Inspiration #Success', hasImage: false, hasPoll: false },
    { content: 'Tech meetup was fantastic! Great discussions on AI and future of work 🤖 #TechMeetup #AI #Networking', hasImage: true, hasPoll: false },
    { content: 'What\'s your favorite programming language? 💻', hasImage: false, hasPoll: true, pollOptions: [{ text: 'JavaScript', votes: 145 }, { text: 'Python', votes: 198 }, { text: 'Java', votes: 87 }, { text: 'Other', votes: 52 }] },
    { content: 'Best Indian city for food? 🍛', hasImage: false, hasPoll: true, pollOptions: [{ text: 'Delhi', votes: 234 }, { text: 'Mumbai', votes: 198 }, { text: 'Lucknow', votes: 167 }, { text: 'Hyderabad', votes: 201 }] },
    { content: 'IPL 2025: Who will win? 🏏', hasImage: false, hasPoll: true, pollOptions: [{ text: 'Mumbai Indians', votes: 456 }, { text: 'CSK', votes: 398 }, { text: 'RCB', votes: 312 }, { text: 'KKR', votes: 234 }] },
    { content: 'Morning person or night owl? 🌅🌙', hasImage: false, hasPoll: true, pollOptions: [{ text: 'Morning Person', votes: 567 }, { text: 'Night Owl', votes: 789 }, { text: 'Both!', votes: 123 }, { text: 'Neither', votes: 89 }] }
];

const trendingHashtags = [
    { tag: 'ReactJS', count: 15420, category: 'Technology' },
    { tag: 'MondayMotivation', count: 34560, category: 'Lifestyle' },
    { tag: 'Cricket', count: 28900, category: 'Sports' },
    { tag: 'AINews', count: 12340, category: 'Technology' },
    { tag: 'FoodPhotography', count: 9870, category: 'Food' },
    { tag: 'IndianCinema', count: 18750, category: 'Entertainment' },
    { tag: 'StartupIndia', count: 7890, category: 'Business' },
    { tag: 'JavaScript', count: 11230, category: 'Technology' },
    { tag: 'Travel', count: 16780, category: 'Lifestyle' },
    { tag: 'Fitness', count: 14560, category: 'Health' },
    { tag: 'Bollywood', count: 23450, category: 'Entertainment' },
    { tag: 'Photography', count: 13450, category: 'Creative' },
    { tag: 'Yoga', count: 10890, category: 'Health' },
    { tag: 'DigitalMarketing', count: 8760, category: 'Business' },
    { tag: 'CyberSecurity', count: 9870, category: 'Technology' },
    { tag: 'ClimateAction', count: 12340, category: 'Environment' },
    { tag: 'DataScience', count: 11230, category: 'Technology' },
    { tag: 'Fashion', count: 15670, category: 'Lifestyle' },
    { tag: 'Gaming', count: 19450, category: 'Entertainment' },
    { tag: 'MentalHealth', count: 17890, category: 'Health' },
    { tag: 'Blockchain', count: 8760, category: 'Technology' },
    { tag: 'IPL', count: 45670, category: 'Sports' },
    { tag: 'Cooking', count: 12890, category: 'Food' },
    { tag: 'Art', count: 13450, category: 'Creative' },
    { tag: 'Music', count: 16780, category: 'Entertainment' },
    { tag: 'Education', count: 10890, category: 'Learning' },
    { tag: 'Investment', count: 9870, category: 'Finance' },
    { tag: 'Python', count: 14560, category: 'Technology' },
    { tag: 'UI UXDesign', count: 11230, category: 'Design' },
    { tag: 'Podcast', count: 12340, category: 'Entertainment' }
];

function generateMockTweets(count = 500) {
    const tweets = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const template = sampleTweets[Math.floor(Math.random() * sampleTweets.length)];
        const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        const tweet = {
            id: generateId(),
            userId: user.id,
            user: user,
            content: template.content,
            timestamp: timestamp.toISOString(),
            likes: Math.floor(Math.random() * 500),
            retweets: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 100),
            views: Math.floor(Math.random() * 5000),
            liked: false,
            retweeted: false,
            bookmarked: false
        };
        
        if (template.hasImage) {
            tweet.image = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
                    <rect width="600" height="400" fill="#${Math.floor(Math.random()*16777215).toString(16)}"/>
                    <text x="300" y="200" font-size="24" fill="white" text-anchor="middle" font-family="sans-serif">Sample Image</text>
                </svg>
            `)}`;
        }
        
        if (template.hasPoll) {
            tweet.poll = {
                options: template.pollOptions,
                totalVotes: template.pollOptions.reduce((sum, opt) => sum + opt.votes, 0),
                voted: false,
                votedOption: null
            };
        }
        
        tweets.push(tweet);
    }
    
    return tweets.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function generateMockConversations() {
    const lastMessages = [
        'Hey! How are you doing?',
        'Thanks for the follow!',
        'Did you see the latest update?',
        'Let\'s catch up soon!',
        'Great post! 👏',
        'Can we discuss the project?',
        'Love your work!',
        'When are you free?',
        'Check your DM',
        'Congratulations! 🎉'
    ];
    
    return mockUsers.slice(1, 51).map((user, index) => ({
        id: generateId(),
        user: user,
        lastMessage: lastMessages[Math.floor(Math.random() * lastMessages.length)],
        timestamp: new Date(Date.now() - index * 1800000).toISOString(),
        unread: index < 15,
        online: Math.random() > 0.6
    }));
}

function generateMockMessages(userId) {
    const messages = [];
    const count = Math.floor(Math.random() * 20) + 10;
    
    const sampleMessages = [
        'Hey! How are you doing?',
        'I\'m doing great, thanks for asking!',
        'Did you check the latest updates?',
        'Yes, looks amazing!',
        'Let\'s schedule a call soon',
        'Sure, when works for you?',
        'Tomorrow at 3 PM?',
        'Perfect! See you then',
        'Thanks for the collaboration',
        'Anytime! Let\'s stay in touch',
        'Great working with you!',
        'Same here! 🙌',
        'Can you send me that file?',
        'Sure, sending it now',
        'Got it, thanks!',
        'No problem!',
        'Congratulations on the launch!',
        'Thank you so much! 🎉',
        'Looking forward to more updates',
        'Will keep you posted!'
    ];
    
    for (let i = 0; i < count; i++) {
        const isOwn = Math.random() > 0.5;
        messages.push({
            id: generateId(),
            userId: isOwn ? 'currentUser' : userId,
            content: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
            timestamp: new Date(Date.now() - (count - i) * 300000).toISOString(),
            own: isOwn,
            read: Math.random() > 0.3
        });
    }
    
    return messages;
}

function generateMockNotifications() {
    const types = ['like', 'retweet', 'follow', 'comment', 'mention', 'message'];
    const notifications = [];
    
    for (let i = 0; i < 200; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        
        let text = '';
        switch (type) {
            case 'like':
                text = `${user.name} liked your tweet`;
                break;
            case 'retweet':
                text = `${user.name} retweeted your tweet`;
                break;
            case 'follow':
                text = `${user.name} started following you`;
                break;
            case 'comment':
                text = `${user.name} commented on your tweet`;
                break;
            case 'mention':
                text = `${user.name} mentioned you in a tweet`;
                break;
            case 'message':
                text = `New message from ${user.name}`;
                break;
        }
        
        notifications.push({
            id: generateId(),
            type: type,
            user: user,
            text: text,
            timestamp: new Date(Date.now() - i * 1800000).toISOString(),
            read: i > 25
        });
    }
    
    return notifications;
}

function generateMockLists() {
    return [
        {
            id: generateId(),
            name: 'Tech Influencers',
            description: 'Leading voices in technology and innovation',
            memberCount: 45,
            subscriberCount: 120,
            private: false,
            createdAt: '2023-01-15'
        },
        {
            id: generateId(),
            name: 'Web Developers',
            description: 'Amazing web developers sharing their knowledge',
            memberCount: 78,
            subscriberCount: 234,
            private: false,
            createdAt: '2023-03-20'
        },
        {
            id: generateId(),
            name: 'Design Inspiration',
            description: 'Beautiful designs and creative ideas',
            memberCount: 32,
            subscriberCount: 89,
            private: true,
            createdAt: '2023-06-10'
        },
        {
            id: generateId(),
            name: 'Startup Founders',
            description: 'Entrepreneurs and startup enthusiasts',
            memberCount: 56,
            subscriberCount: 167,
            private: false,
            createdAt: '2023-08-05'
        },
        {
            id: generateId(),
            name: 'Cricket Fans',
            description: 'All things cricket and sports',
            memberCount: 123,
            subscriberCount: 456,
            private: false,
            createdAt: '2023-09-12'
        }
    ];
}

// Image handling
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('image-preview');
        const previewImage = document.getElementById('preview-image');
        
        previewImage.src = e.target.result;
        preview.classList.remove('hidden');
        
        // Store in app state
        window.appState.composerImage = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeComposerImage() {
    const preview = document.getElementById('image-preview');
    const previewImage = document.getElementById('preview-image');
    const fileInput = document.getElementById('image-upload');
    
    preview.classList.add('hidden');
    previewImage.src = '';
    fileInput.value = '';
    window.appState.composerImage = null;
}

function triggerImageUpload() {
    document.getElementById('image-upload').click();
}

// Generate nested comments
function generateNestedComments(parentId, level = 0, maxLevel = 3) {
    if (level >= maxLevel) return [];
    
    const replyCount = Math.floor(Math.random() * 3);
    const replies = [];
    
    for (let i = 0; i < replyCount; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const reply = {
            id: generateId(),
            parentId: parentId,
            user: user,
            text: ['Great point!', 'I agree!', 'Thanks for sharing', 'Interesting perspective', 'Well said!'][Math.floor(Math.random() * 5)],
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            likes: Math.floor(Math.random() * 20),
            level: level + 1,
            replies: []
        };
        
        // Recursively generate nested replies
        reply.replies = generateNestedComments(reply.id, level + 1, maxLevel);
        replies.push(reply);
    }
    
    return replies;
}

// Format poll end time
function getPollEndTime(days) {
    const endTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return endTime.toISOString();
}

// Check if poll is active
function isPollActive(endTime) {
    return new Date(endTime) > new Date();
}

// Local storage simulation (using in-memory objects)
const storage = {
    data: {},
    get: function(key) {
        return this.data[key];
    },
    set: function(key, value) {
        this.data[key] = value;
    },
    remove: function(key) {
        delete this.data[key];
    }
};