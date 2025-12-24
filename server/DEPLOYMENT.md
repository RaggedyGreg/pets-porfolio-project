# Backend Deployment Guide

## Quick Start

The Pet Manager backend can be deployed to **Railway**, **Render**, or **Heroku**. All three platforms offer free tiers suitable for development.

---

## Option 1: Railway (Recommended - Easiest)

### Why Railway?
- ✅ Free tier with $5/month credit
- ✅ Automatic deployments from GitHub
- ✅ Built-in MongoDB support
- ✅ Simple environment variable management

### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI (optional)
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Link project
   railway link
   ```

3. **Add MongoDB Database**
   - In Railway dashboard, click "New" → "Database" → "Add MongoDB"
   - Railway will automatically set `MONGODB_URI` environment variable

4. **Deploy from GitHub**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Set root directory to `/server`
   - Railway will auto-detect and deploy

5. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRES_IN=7d
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

6. **Your API will be live at:**
   ```
   https://your-project.railway.app
   ```

---

## Option 2: Render

### Why Render?
- ✅ Free tier available
- ✅ Automatic SSL certificates
- ✅ Built-in CI/CD
- ✅ Good documentation

### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Dashboard → "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: pet-manager-api
     - **Root Directory**: server
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add MongoDB Atlas**
   - Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string
   - Add to Render environment variables

4. **Set Environment Variables** (in Render dashboard)
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/pet-manager
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRES_IN=7d
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Render will automatically build and deploy
   - Your API will be at: `https://pet-manager-api.onrender.com`

---

## Option 3: Heroku

### Why Heroku?
- ✅ Industry standard
- ✅ Extensive documentation
- ✅ Many add-ons available

### Steps:

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from heroku.com/cli
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd server
   heroku create pet-manager-api
   ```

3. **Add MongoDB**
   ```bash
   # Option A: MongoDB Atlas add-on (free)
   heroku addons:create mongolab:sandbox
   
   # Option B: Use your own MongoDB Atlas
   heroku config:set MONGODB_URI="mongodb+srv://..."
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key-here
   heroku config:set JWT_EXPIRES_IN=7d
   heroku config:set CLIENT_URL=https://your-frontend.vercel.app
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

---

## MongoDB Setup (for Render/Heroku)

### Create Free MongoDB Atlas Cluster:

1. **Sign up at** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select region closest to your hosting

3. **Create Database User**
   - Database Access → Add New User
   - Username: `petmanager`
   - Password: Generate secure password
   - Permissions: Read and write to any database

4. **Whitelist IPs**
   - Network Access → Add IP Address
   - Add: `0.0.0.0/0` (allow from anywhere)
   - ⚠️ For production, restrict to specific IPs

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pet-manager?retryWrites=true&w=majority
   ```

6. **Add to Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://petmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pet-manager?retryWrites=true&w=majority
   ```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` (Railway/Heroku), `10000` (Render) |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | Generate with `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

---

## Connecting Frontend to Backend

After deploying backend, update your frontend API configuration:

### In `client/src/config/api.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-backend-url.railway.app/api';

export const endpoints = {
  getPets: () => `${API_BASE_URL}/pets`,
  getPetById: (id: string) => `${API_BASE_URL}/pets/${id}`,
  // ... other endpoints
};
```

### Add to `client/.env.production`:

```bash
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## Health Check

After deployment, verify your API is running:

```bash
curl https://your-backend-url.railway.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-23T..."
}
```

---

## Testing API Endpoints

### Register User:
```bash
curl -X POST https://your-api.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

### Get All Pets:
```bash
curl https://your-api.railway.app/api/pets
```

---

## Monitoring & Logs

### Railway:
- Dashboard → Project → Deployments
- Click deployment → View Logs

### Render:
- Dashboard → Service → Logs tab
- Real-time log streaming

### Heroku:
```bash
heroku logs --tail
```

---

## CI/CD

All three platforms support automatic deployments:

1. **Push to GitHub** → Platform detects changes
2. **Automatic Build** → Runs `npm install && npm run build`
3. **Automatic Deploy** → Starts with `npm start`

---

## Troubleshooting

### "Application Error" or 503
- Check logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set

### CORS Errors
- Verify `CLIENT_URL` matches your frontend URL exactly
- Include `https://` in the URL
- Check Vercel deployment URL (not preview URLs)

### MongoDB Connection Timeout
- Verify IP whitelist includes `0.0.0.0/0` or your platform's IPs
- Check MongoDB Atlas cluster is running
- Verify connection string is correct

### Build Failures
- Ensure `package.json` has correct scripts
- Check TypeScript compilation: `npm run build` locally
- Verify all dependencies are in `dependencies` (not `devDependencies`)

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0 for development)
- [ ] Backend deployed to Railway/Render/Heroku
- [ ] All environment variables set
- [ ] Health endpoint returning 200
- [ ] JWT secret generated and set
- [ ] CLIENT_URL points to production frontend
- [ ] Seed data loaded (optional): `npm run seed`
- [ ] API endpoints tested with curl/Postman
- [ ] Frontend updated with production API URL
- [ ] CORS working between frontend and backend

---

## Next Steps

1. Deploy backend using one of the options above
2. Get your backend URL (e.g., `https://pet-manager-api.railway.app`)
3. Update frontend environment variable: `REACT_APP_API_URL`
4. Deploy frontend to Vercel
5. Test end-to-end functionality

**Recommended for beginners: Railway** - It's the easiest and includes free MongoDB hosting.
