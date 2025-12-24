# Setup Guide - Pet Manager Monorepo

Complete guide to set up and run the Pet Manager full-stack application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Choose one:
  - **Local MongoDB** - [Download](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RaggedyGreg/pets-porfolio-project.git
cd Gregory-Loginow-AnB
```

### 2. Install Dependencies

Install dependencies for root, client, and server:

```bash
npm run install:all
```

This runs:
- `npm install` in root (installs concurrently)
- `npm install` in client/ (React dependencies)
- `npm install` in server/ (Node.js dependencies)

### 3. Configure MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB runs as a service automatically
   ```
3. Verify it's running:
   ```bash
   mongo --eval "db.version()"
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier M0)
3. Create a database user (username + password)
4. Whitelist your IP address (or allow access from anywhere for development)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 4. Configure Backend Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your settings:

```env
PORT=5000
NODE_ENV=development

# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/pet-manager

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet-manager

JWT_SECRET=your-super-secret-key-here-change-this
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
```

**Important:** Change `JWT_SECRET` to a random string. Generate one:

```bash
# macOS/Linux
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any long random string
```

### 5. Seed the Database

Add sample pet data to your database:

```bash
# From project root
npm run seed

# Or from server directory
cd server
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing pets
✅ Added 10 pets to database
👋 Database connection closed
```

### 6. Run the Application

#### Development Mode (Both Client & Server)

From the project root:

```bash
npm run dev
```

This starts:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

#### Run Individually

```bash
# Terminal 1 - Frontend only
npm run dev:client

# Terminal 2 - Backend only
npm run dev:server
```

### 7. Verify Everything Works

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"success":true,"message":"Server is running",...}`

2. **Frontend:**
   Open http://localhost:3000 in your browser
   - You should see the pet list
   - Try searching and filtering

3. **Test Authentication:**
   - Register a new account
   - Login
   - Try favoriting a pet

## Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
- Ensure MongoDB is running: `brew services list` (macOS)
- Check MONGODB_URI in `.env` file
- Try restarting MongoDB: `brew services restart mongodb-community`

### Issue: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
- Kill the process using port 5000:
  ```bash
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  
  # Or change PORT in server/.env
  ```

### Issue: Cannot Find Module

**Error:** `Error: Cannot find module 'express'`

**Solutions:**
- Re-install dependencies:
  ```bash
  cd server
  rm -rf node_modules package-lock.json
  npm install
  ```

### Issue: JWT Secret Not Set

**Error:** `JWT_SECRET is not defined`

**Solutions:**
- Ensure `server/.env` exists and has `JWT_SECRET=...`
- Restart the server after creating `.env`

## Development Workflow

### Making Changes

1. **Frontend changes** - Auto-reloads at http://localhost:3000
2. **Backend changes** - Nodemon auto-restarts server
3. **Database changes** - Re-run seed script if needed

### Testing

```bash
# Run all tests
npm test

# Test client
cd client && npm test

# Test server
cd server && npm test

# Watch mode
npm run test:watch
```

### Building for Production

```bash
# Build everything
npm run build

# Build individually
npm run build:client
npm run build:server
```

## MongoDB Atlas Specific Setup

### 1. Create Cluster

1. Log in to MongoDB Atlas
2. Click "Build a Database"
3. Choose "Shared" (Free tier)
4. Select your cloud provider and region
5. Name your cluster (e.g., "PetManagerCluster")

### 2. Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set user privileges to "Read and write to any database"

### 3. Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IP addresses

### 4. Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database user password
6. Update `MONGODB_URI` in `server/.env`

## Next Steps

- [ ] Explore the API endpoints at http://localhost:5000
- [ ] Read [PORTFOLIO.md](../PORTFOLIO.md) for architecture details
- [ ] Check out [ABOVE-AND-BEYOND.md](../ABOVE-AND-BEYOND.md) for enhancement ideas
- [ ] Deploy to production (see Deployment Guide below)

## Deployment

### Frontend (Vercel)

```bash
cd client
vercel deploy
```

### Backend (Railway)

1. Sign up at [Railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repo
4. Set root directory to `/server`
5. Add environment variables
6. Deploy!

### Backend (Render)

1. Sign up at [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set root directory to `server`
5. Build command: `npm install && npm run build`
6. Start command: `npm start`
7. Add environment variables
8. Create!

## Support

Having issues? Check:
- [GitHub Issues](https://github.com/RaggedyGreg/pets-porfolio-project/issues)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)

---

**Happy Coding! 🚀**
