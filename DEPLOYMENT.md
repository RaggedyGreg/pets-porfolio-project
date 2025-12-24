# Deployment Guide

## Overview

This project uses a **split deployment strategy**:
- **Frontend (client/)**: Deployed on Vercel
- **Backend (server/)**: Deployed on Railway, Render, or Heroku

The deployment files created are in the [server/](../server/) directory:
- `railway.json` - Railway configuration
- `render.yaml` - Render configuration  
- `Procfile` - Heroku configuration
- `DEPLOYMENT.md` - Detailed backend deployment guide

## Quick Links

- 📖 [Backend Deployment Guide](../server/DEPLOYMENT.md) - Complete instructions for Railway, Render, or Heroku
- 🎨 [Frontend Deployment Guide](#frontend-deployment-vercel) - Instructions below

---

## Frontend Deployment (Vercel)

### Prerequisites

1. **Backend Deployed**: Complete the [backend deployment](../server/DEPLOYMENT.md) first and obtain your API URL
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your code to GitHub

### Step 1: Configure API URL

Update [client/.env.production](../client/.env.production) with your deployed backend URL:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Important**: Do NOT commit `.env.production` with real URLs to version control. Add it to `.gitignore` or use Vercel's environment variables.

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client` (important for monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. Add environment variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.railway.app/api`

5. Click **Deploy**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variable
vercel env add REACT_APP_API_URL production
# Enter: https://your-backend-url.railway.app/api
```

### Step 3: Update Backend CORS

After deploying to Vercel, update your backend's `CLIENT_URL` environment variable:

1. **Railway**: Go to your service → Variables → Add `CLIENT_URL=https://your-app.vercel.app`
2. **Render**: Update `render.yaml` or add via dashboard
3. **Heroku**: `heroku config:set CLIENT_URL=https://your-app.vercel.app`

The backend is already configured to allow your Vercel URL in CORS (see [server/src/server.ts](../server/src/server.ts)).

### Step 4: Verify Deployment

1. **Check Health**: Visit `https://your-app.vercel.app` and open DevTools Console
2. **Test API Connection**: The app should load pets from your backend
3. **Check CORS**: No CORS errors should appear in the console

---

## Environment Variables Reference

### Client (.env.production)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://api.example.com/api` |

### Server (Backend Platform)

See [server/DEPLOYMENT.md](../server/DEPLOYMENT.md) for complete backend environment variables.

---

## Troubleshooting

### CORS Errors

**Issue**: `Access to fetch at 'https://api...' from origin 'https://your-app.vercel.app' has been blocked by CORS`

**Solution**:
1. Verify `CLIENT_URL` environment variable in backend includes your Vercel URL
2. Check [server/src/server.ts](../server/src/server.ts) CORS configuration
3. Redeploy backend after updating environment variables

### API Not Found (404)

**Issue**: Frontend can't reach backend endpoints

**Solution**:
1. Verify `REACT_APP_API_URL` is set correctly in Vercel
2. Check backend health endpoint: `curl https://your-backend-url/health`
3. Ensure backend is running and not sleeping (free tier platforms may sleep after inactivity)

### Build Failures

**Issue**: Vercel build fails with TypeScript errors

**Solution**:
1. Run `cd client && npm run build` locally to reproduce
2. Fix TypeScript errors shown in build log
3. Ensure `tsconfig.json` is properly configured
4. Check that all dependencies are in `package.json`

### Environment Variables Not Loading

**Issue**: `REACT_APP_API_URL` is undefined in production

**Solution**:
1. Ensure variable is set in Vercel dashboard (not just .env.production)
2. Variable must start with `REACT_APP_` for Create React App
3. Redeploy after adding environment variables
4. Variables are baked into build at build time, not runtime

---

## Monitoring & Logs

### Vercel

- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Deployments**: View deployment history and logs
- **Analytics**: Enable Web Analytics for traffic insights
- **Functions**: Check serverless function logs (if using)

### Performance

- **Lighthouse**: Run in Chrome DevTools
- **Vercel Speed Insights**: Enable in dashboard
- **Bundle Analysis**: Run `npm run build` and check `build/` output

---

## Continuous Deployment

Vercel automatically deploys when you push to your GitHub repository:

- **Production**: Pushes to `main` branch deploy to production
- **Preview**: Pull requests get preview deployments
- **Instant Rollback**: Redeploy previous versions from dashboard

---

## Production Checklist

- [ ] Backend deployed and health endpoint accessible
- [ ] `REACT_APP_API_URL` environment variable set in Vercel
- [ ] `CLIENT_URL` environment variable set in backend
- [ ] CORS configured correctly (no console errors)
- [ ] API endpoints working (pets load successfully)
- [ ] Authentication flow working (login/register)
- [ ] Favorites functionality working
- [ ] No TypeScript errors in build
- [ ] Lighthouse score > 90
- [ ] SSL certificate active (https://)
- [ ] Custom domain configured (optional)

---

## Next Steps

- [ ] Set up custom domain in Vercel
- [ ] Enable Vercel Analytics
- [ ] Configure error monitoring (Sentry)
- [ ] Set up uptime monitoring for backend
- [ ] Add performance monitoring
- [ ] Configure CDN caching
- [ ] Enable Vercel Image Optimization (if using images)

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Backend Deployment**: See [server/DEPLOYMENT.md](../server/DEPLOYMENT.md)
- **Issues**: Create an issue in GitHub repository
