# TweetKar - Render Deployment Guide

Complete step-by-step guide to deploy TweetKar on Render.com

---

## 📋 Deployment Overview

You will create **3 services**:
1. ✅ **MongoDB Atlas** - Database (Free tier)
2. ✅ **Render Web Service** - Backend API (Node.js)
3. ✅ **Render Static Site** - Frontend (HTML/CSS/JS)

**Total Cost:** FREE (using free tiers)

---

## Part 1: Set Up MongoDB Atlas (Database)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign In"**
3. Create account or sign in with Google/GitHub

### Step 2: Create a Database Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier (512 MB storage, shared RAM)
3. Select:
   - **Cloud Provider:** AWS (or your preference)
   - **Region:** Choose closest to you (e.g., us-east-1)
4. **Cluster Name:** Leave default or name it `TweetKar-Cluster`
5. Click **"Create"**

### Step 3: Configure Database Access

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `tweetkar_admin` (or your choice)
5. **Password:** Click "Autogenerate Secure Password" and **SAVE IT**
6. **Database User Privileges:** `Read and write to any database`
7. Click **"Add User"**

### Step 4: Configure Network Access

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - This is needed for Render to connect
4. Click **"Confirm"**

### Step 5: Get Connection String

1. In left sidebar, click **"Database"**
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** 4.1 or later
6. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
7. **Important:** Replace `<username>` and `<password>` with your actual credentials
8. Add database name at the end: `/tweetkar`
9. Final format:
   ```
   mongodb+srv://tweetkar_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tweetkar?retryWrites=true&w=majority
   ```
10. **SAVE THIS CONNECTION STRING** - you'll need it for Render!

---

## Part 2: Deploy Backend to Render

### Step 1: Sign Up for Render

1. Go to: https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest option)
4. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. **Connect Repository:**
   - If you see your repo, click **"Connect"**
   - If not, click **"Configure account"** and grant access
   - Select: `HarshNaik081/TweetKar` repository
4. Click **"Connect"**

### Step 3: Configure Backend Service

Fill in these settings **EXACTLY**:

**Basic Settings:**
- **Name:** `tweetkar-backend` (or any name you like)
- **Region:** `Singapore` or closest to you
- **Branch:** `main`
- **Root Directory:** `backend` ⭐ **CRITICAL - Type exactly: backend**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (0.1 CPU, 512 MB RAM)
- ⚠️ Free tier sleeps after 15 mins of inactivity

**Advanced Settings (Optional):**
- **Auto-Deploy:** `Yes` (deploys on every git push)

### Step 4: Add Environment Variables

Scroll to **"Environment Variables"** section and click **"Add Environment Variable"**

Add these **ONE BY ONE**:

```
Key: NODE_ENV
Value: production
```

```
Key: PORT
Value: 5000
```

```
Key: MONGODB_URI
Value: mongodb+srv://tweetkar_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tweetkar?retryWrites=true&w=majority
```
⚠️ **Use YOUR actual MongoDB connection string from Part 1!**

```
Key: JWT_SECRET
Value: GENERATE_THIS_BELOW
```
To generate JWT_SECRET, run this on your local terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as value

```
Key: JWT_EXPIRE
Value: 30d
```

```
Key: JWT_COOKIE_EXPIRE
Value: 30
```

```
Key: CLIENT_URL
Value: http://localhost:3000
```
⚠️ **You'll update this after deploying frontend**

### Step 5: Create and Deploy

1. Click **"Create Web Service"** button at bottom
2. Wait 3-5 minutes for deployment
3. Watch the logs for:
   ```
   Server running on port 5000
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```
4. Once deployed, you'll see: ✅ **Live** with a green dot
5. **Your backend URL:** `https://tweetkar-backend.onrender.com`
6. **SAVE THIS URL!**

### Step 6: Test Backend

1. Click the backend URL
2. You should see: `{"message":"Cannot GET /"}`
3. Test health endpoint: `https://tweetkar-backend.onrender.com/api/health`
4. Should see: `{"status":"success","message":"API is running"}`

✅ **Backend is LIVE!**

---

## Part 3: Deploy Frontend to Render

### Step 1: Create Static Site

1. Go back to Render dashboard
2. Click **"New +"** → **"Static Site"**
3. Select your repository: `HarshNaik081/TweetKar`
4. Click **"Connect"**

### Step 2: Configure Frontend Service

Fill in these settings:

**Basic Settings:**
- **Name:** `tweetkar-frontend` (or any name)
- **Branch:** `main`
- **Root Directory:** `frontend/public` ⭐ **CRITICAL - Type exactly: frontend/public**
- **Build Command:** Leave EMPTY or put: `echo "No build needed"`
- **Publish Directory:** `.` (just a dot)

**Auto-Deploy:**
- `Yes`

### Step 3: Create and Deploy

1. Click **"Create Static Site"**
2. Wait 1-2 minutes
3. Once deployed: ✅ **Live**
4. **Your frontend URL:** `https://tweetkar-frontend.onrender.com`

### Step 4: Update Backend CORS

Now update your backend environment variables:

1. Go to Render dashboard
2. Click on **tweetkar-backend** service
3. Go to **"Environment"** tab
4. Find **CLIENT_URL** variable
5. Click **"Edit"**
6. Change value to: `https://tweetkar-frontend.onrender.com`
7. Click **"Save Changes"**
8. Backend will automatically redeploy

✅ **Frontend is LIVE!**

---

## Part 4: Verify Deployment

### Test Your Deployment:

1. **Frontend:** Visit `https://tweetkar-frontend.onrender.com`
   - Should load TweetKar homepage
   - Should show login/register screen

2. **Backend:** Visit `https://tweetkar-backend.onrender.com/api/health`
   - Should return: `{"status":"success","message":"API is running"}`

3. **Database:** Check MongoDB Atlas
   - Go to "Database" → "Browse Collections"
   - Should see `tweetkar` database (may be empty until first user registers)

---

## 📊 Deployment Summary

### Your Live URLs:

```
Frontend:  https://tweetkar-frontend.onrender.com
Backend:   https://tweetkar-backend.onrender.com
API Base:  https://tweetkar-backend.onrender.com/api
Database:  MongoDB Atlas (cloud)
```

### What You Deployed:

| Service | Platform | Directory | Status |
|---------|----------|-----------|--------|
| Frontend | Render Static Site | `frontend/public` | ✅ |
| Backend | Render Web Service | `backend` | ✅ |
| Database | MongoDB Atlas | Cloud | ✅ |

---

## 🔧 Important Notes

### Free Tier Limitations:

**Render Free Tier:**
- ⏰ **Sleeps after 15 minutes** of inactivity
- 🕐 **Takes 30-60 seconds** to wake up on first request
- 📊 **750 hours/month** free (enough for 24/7 if only 1 service)
- 🔄 Automatically spins down and up

**MongoDB Atlas Free (M0):**
- ✅ **512 MB storage** (plenty for testing)
- ✅ **Shared RAM**
- ✅ **No sleep** - always on
- ✅ **Backups not included**

### To Prevent Sleep (Optional):

Use a service like **UptimeRobot** (free):
1. Go to: https://uptimerobot.com
2. Add monitor for your backend URL
3. Pings every 5 minutes to keep it awake

---

## 🐛 Troubleshooting

### Backend Shows "Application failed to respond"

**Solution:**
- Check backend logs in Render
- Verify `Root Directory` is exactly: `backend`
- Verify `Start Command` is: `npm start`
- Check Environment Variables are all set

### "MongoServerError: bad auth"

**Solution:**
- MongoDB password wrong in `MONGODB_URI`
- Regenerate password in Atlas → Database Access
- Update `MONGODB_URI` in Render environment variables

### Frontend Shows 404

**Solution:**
- Check `Root Directory` is: `frontend/public`
- Check `Publish Directory` is: `.`
- Redeploy the frontend

### CORS Errors in Browser Console

**Solution:**
- Verify `CLIENT_URL` in backend environment variables
- Should be: `https://tweetkar-frontend.onrender.com`
- No trailing slash!

### Backend Takes Long to Respond

**Reason:**
- Free tier sleeps after 15 mins
- First request wakes it up (30-60 seconds)
- Subsequent requests are fast

---

## 🔄 Update Your Code

### To Deploy Updates:

1. **Make changes locally**
2. **Commit to git:**
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. **Render auto-deploys** (if auto-deploy enabled)
4. **Wait 2-3 minutes**
5. **Check logs** in Render dashboard

### Manual Redeploy:

1. Go to Render dashboard
2. Click your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Deployment Checklist

Before going live:

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access allows 0.0.0.0/0
- [ ] Connection string saved
- [ ] Backend deployed to Render
- [ ] All environment variables added
- [ ] Backend shows "Live" status
- [ ] Backend health check works
- [ ] Frontend deployed to Render
- [ ] Frontend shows "Live" status
- [ ] Frontend loads in browser
- [ ] Backend CLIENT_URL updated to frontend URL
- [ ] No CORS errors in browser console

---

## 🎉 You're Live!

Congratulations! Your TweetKar app is now deployed and accessible worldwide!

**Share your app:**
```
https://tweetkar-frontend.onrender.com
```

**Next Steps:**
1. Test all features
2. Register a test account
3. Create some tweets
4. Share with friends!

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://www.mongodb.com/docs/atlas/
- **Your Render Dashboard:** https://dashboard.render.com

---

*Last Updated: October 27, 2025*
