# Portfolio Project Setup Guide

A step-by-step walkthrough to transform Fever Pets into a portfolio-ready project.

**Estimated Time:** 20-30 hours over 2-3 weeks  
**Difficulty:** Intermediate to Advanced

---

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] Git installed and configured
- [ ] GitHub account
- [ ] Code editor (VS Code recommended)
- [ ] Basic understanding of React, TypeScript, and CI/CD concepts

---

## 🎯 Phase 1: Live Deployment (Priority: Critical)

**Time Estimate:** 1-2 hours  
**Goal:** Get your project live on the internet with a public URL

### Step 1.1: Choose Your Deployment Platform

**Option A: Vercel (Recommended for React)**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel --prod
```

4. Follow prompts:
   - Link to existing project? → No
   - Project name? → fever-pets (or your choice)
   - Directory? → ./
   - Override settings? → No

**Option B: Netlify**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

### Step 1.2: Create Deployment Configuration

**For Vercel - Create `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": { "cache-control": "s-maxage=31536000,immutable" },
      "dest": "/static/$1"
    },
    { "src": "/favicon.ico", "dest": "/favicon.ico" },
    { "src": "/manifest.json", "dest": "/manifest.json" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**For Netlify - Create `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Step 1.3: Configure Environment Variables

1. Create `.env.production` (if needed):
```bash
REACT_APP_API_BASE_URL=https://my-json-server.typicode.com/Feverup/fever_pets_data
```

2. Add to platform:
   - **Vercel:** Dashboard → Project → Settings → Environment Variables
   - **Netlify:** Dashboard → Site Settings → Build & Deploy → Environment

### Step 1.4: Test Deployment

1. Visit your deployed URL
2. Test all routes:
   - Home page (/)
   - Detail page (/detail/1)
   - 404 page (/nonexistent)
3. Test on mobile device
4. Check browser console for errors

### Step 1.5: Set Up Custom Domain (Optional)

**Vercel:**
1. Go to Project → Settings → Domains
2. Add domain (e.g., fever-pets.yourdomain.com)
3. Configure DNS as instructed

**Netlify:**
1. Go to Domain Settings → Add custom domain
2. Follow DNS configuration steps

### ✅ Phase 1 Checklist

- [ ] Vercel or Netlify account created
- [ ] CLI tools installed
- [ ] Project successfully deployed
- [ ] Configuration file created (`vercel.json` or `netlify.toml`)
- [ ] Environment variables configured (if any)
- [ ] All routes working correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Custom domain configured (optional)
- [ ] Deployment URL saved and ready to share

---

## 📸 Phase 2: Visual Assets & Documentation (Priority: Critical)

**Time Estimate:** 3-4 hours  
**Goal:** Create professional screenshots, GIFs, and visual documentation

### Step 2.1: Create Documentation Directory

```bash
mkdir -p docs/images
```

### Step 2.2: Capture Screenshots

**Tools needed:**
- Browser DevTools (built-in)
- [Awesome Screenshot](https://www.awesomescreenshot.com/) (browser extension)
- [Cleanshot X](https://cleanshot.com/) (Mac, paid but excellent)

**Screenshots to capture:**

1. **Hero/Homepage Screenshot** (`hero-screenshot.png`)
   - Full page view showing pet list
   - Use a clean browser window (no extensions visible)
   - 1920x1080 or 2560x1440 resolution
   - Show at least 5 pets for variety

2. **Detail Page** (`detail-view.png`)
   - Individual pet detail page
   - Show all information fields
   - Include health status indicator

3. **Mobile View** (`mobile-responsive.png`)
   - Open Chrome DevTools → Toggle device toolbar
   - iPhone 12/13 Pro dimensions
   - Capture both home and detail views

4. **Features Showcase** (multiple images)
   - Sorting in action (`sorting-demo.png`)
   - Pagination (`pagination-demo.png`)
   - Pet of the Day feature (`pet-of-day.png`)

**Chrome DevTools Method:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "screenshot"
3. Select "Capture full size screenshot" or "Capture screenshot"
4. Save to `docs/images/`

### Step 2.3: Create Animated GIFs

**Tools needed:**
- [LICEcap](https://www.cockos.com/licecap/) (free, simple)
- [Kap](https://getkap.co/) (Mac, free)
- [ScreenToGif](https://www.screentogif.com/) (Windows, free)

**GIFs to create:**

1. **Feature Demo** (`feature-demo.gif`)
   - 10-15 seconds
   - Show: Navigate home → Sort pets → Open detail → Navigate back
   - Keep file size under 5MB (optimize if needed)

2. **Pet of the Day** (`pet-of-day-demo.gif`)
   - 5-10 seconds
   - Click button, show modal/result

**Recording tips:**
- Record at 10-15 FPS (smaller file size)
- Keep videos under 20 seconds
- Use smooth, deliberate mouse movements
- Crop tightly to relevant area

### Step 2.4: Create Architecture Diagram

**Tools:**
- [Excalidraw](https://excalidraw.com/) (free, browser-based)
- [Draw.io](https://app.diagrams.net/) (free)
- [Lucidchart](https://www.lucidchart.com/) (free tier)

**Diagram to create:** `architecture-diagram.png`

**Include these components:**
```
┌─────────────────────────────────────────┐
│           User Interface                │
│    (Home, Detail, NoMatch Views)        │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         React Components                │
│  • Layout  • Health  • ErrorBoundary    │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│          Custom Hooks                   │
│   • useFetch   • useFetchDetail         │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│       Strategy Pattern Layer            │
│      HealthStrategyFactory              │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │   Dog    │  │   Cat    │  │  Bird  ││
│  │ Strategy │  │ Strategy │  │Strategy││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│           API Layer                     │
│  Fever Pets REST API (JSON Server)     │
└─────────────────────────────────────────┘
```

### Step 2.5: Optimize Images

**Install image optimization tool:**
```bash
npm install -g sharp-cli
```

**Optimize all images:**
```bash
cd docs/images
sharp -i hero-screenshot.png -o hero-screenshot.png --webp
```

**Or use online tools:**
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

**Target sizes:**
- Screenshots: < 500KB each
- GIFs: < 5MB each
- Architecture diagram: < 200KB

### ✅ Phase 2 Checklist

- [ ] `docs/images/` directory created
- [ ] Hero screenshot captured (hero-screenshot.png)
- [ ] Detail page screenshot captured (detail-view.png)
- [ ] Mobile responsive screenshots captured (mobile-responsive.png)
- [ ] Sorting/filtering demo screenshot (sorting-demo.png)
- [ ] Feature demo GIF created (feature-demo.gif)
- [ ] Pet of the Day GIF created (pet-of-day-demo.gif)
- [ ] Architecture diagram created (architecture-diagram.png)
- [ ] All images optimized (< 500KB for PNGs, < 5MB for GIFs)
- [ ] Images committed to Git repository

---

## 🔧 Phase 3: CI/CD Pipeline (Priority: Critical)

**Time Estimate:** 2-3 hours  
**Goal:** Automate testing and deployment with GitHub Actions

### Step 3.1: Create GitHub Actions Workflow

1. Create workflow directory:
```bash
mkdir -p .github/workflows
```

2. Create workflow file:
```bash
touch .github/workflows/ci.yml
```

3. Add CI/CD configuration:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Test & Build
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Build application
      run: npm run build
    
    - name: Analyze bundle size
      run: |
        npm install -g source-map-explorer
        source-map-explorer 'build/static/js/*.js' --json > bundle-analysis.json
    
    - name: Upload bundle analysis
      uses: actions/upload-artifact@v3
      with:
        name: bundle-analysis
        path: bundle-analysis.json
        retention-days: 30

  deploy:
    name: Deploy to Production
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

### Step 3.2: Set Up Codecov (Test Coverage Reporting)

1. Go to [codecov.io](https://codecov.io/)
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token
5. Add to GitHub Secrets:
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CODECOV_TOKEN`
   - Value: [paste token]

### Step 3.3: Configure Vercel/Netlify Secrets

**For Vercel:**

1. Get your tokens from [Vercel Dashboard](https://vercel.com/account/tokens)
2. Get Org ID and Project ID:
```bash
# Run in project directory
vercel link
cat .vercel/project.json
```

3. Add to GitHub Secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: From project.json (orgId)
   - `VERCEL_PROJECT_ID`: From project.json (projectId)

**For Netlify:**

1. Get auth token from [Netlify User Settings](https://app.netlify.com/user/applications)
2. Get Site ID from Site Settings → General → Site details
3. Add to GitHub Secrets:
   - `NETLIFY_AUTH_TOKEN`: Your token
   - `NETLIFY_SITE_ID`: Your site ID

### Step 3.4: Add Status Badges to README

Add these at the top of your README:

```markdown
[![CI/CD](https://github.com/yourusername/fever-pets/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/fever-pets/actions)
[![codecov](https://codecov.io/gh/yourusername/fever-pets/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/fever-pets)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
```

### Step 3.5: Test the Pipeline

1. Commit and push workflow file:
```bash
git add .github/workflows/ci.yml
git commit -m "feat: add CI/CD pipeline"
git push origin main
```

2. Go to GitHub → Actions tab
3. Watch the workflow run
4. Fix any errors that appear
5. Verify deployment succeeds

### ✅ Phase 3 Checklist

- [ ] `.github/workflows/ci.yml` created
- [ ] Codecov account created and token added
- [ ] Vercel/Netlify secrets configured in GitHub
- [ ] CI pipeline tests pass (linting, tests, build)
- [ ] Test coverage uploaded to Codecov
- [ ] Deployment step works (if on main branch)
- [ ] Status badges added to README
- [ ] All badges showing correct status
- [ ] Pipeline runs successfully on push

---

## 🛡️ Phase 4: Error Handling & Boundaries (Priority: Critical)

**Time Estimate:** 2-3 hours  
**Goal:** Make the app production-ready with graceful error handling

### Step 4.1: Create ErrorBoundary Component

1. Create component directory:
```bash
mkdir -p src/components/ErrorBoundary
```

2. Create component file:
```bash
touch src/components/ErrorBoundary/ErrorBoundary.tsx
```

3. Add ErrorBoundary implementation:
```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Error as ErrorIcon, Home, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // TODO: Log to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            gap={3}
          >
            <ErrorIcon sx={{ fontSize: 80, color: 'error.main' }} />
            
            <Typography variant="h3" component="h1">
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="600px">
              We're sorry for the inconvenience. The error has been logged and 
              we'll look into it. Please try refreshing the page or returning home.
            </Typography>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                  borderRadius: 1,
                  textAlign: 'left',
                  maxWidth: '100%',
                  overflow: 'auto',
                  width: '100%'
                }}
              >
                <Typography variant="caption" component="pre" sx={{ fontSize: '0.75rem' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </Typography>
              </Box>
            )}
            
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
```

### Step 4.2: Add ErrorBoundary to App

Update `src/App.tsx`:

```typescript
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="detail/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
```

### Step 4.3: Enhance Network Error Handling

Update `src/hooks/useFetch.ts`:

```typescript
import { useState, useEffect } from 'react';
import { Pet, PetPaginationModel, PetSortModel } from '../interfaces/interfaces';

interface UseFetchResult {
  data: Pet[];
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

export const useFetch = (
  url: string,
  pagination: PetPaginationModel,
  sort: PetSortModel
): UseFetchResult => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams({
          _page: String(pagination.page + 1),
          _limit: String(pagination.pageSize),
          ...(sort.sortField && {
            _sort: sort.sortField,
            _order: sort.sortOrder
          })
        });

        const response = await fetch(`${url}?${params}`, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // Request was cancelled, don't set error
        }
        
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        
        // Auto-retry logic (max 3 attempts)
        if (retryCount < 2) {
          console.log(`Retrying... Attempt ${retryCount + 2}/3`);
          setTimeout(() => setRetryCount(prev => prev + 1), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, pagination.page, pagination.pageSize, sort.sortField, sort.sortOrder, retryCount]);

  const retry = () => {
    setRetryCount(0);
    setError(null);
  };

  return { data, loading, error, retry };
};
```

Update `src/hooks/useFetchDetail.ts` similarly.

### Step 4.4: Add Error UI to Views

Update `src/views/Home/Home.tsx` to show errors:

```typescript
// Add this after the loading check
if (error) {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="400px"
      gap={2}
    >
      <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
      <Typography variant="h5">Failed to load pets</Typography>
      <Typography variant="body2" color="text.secondary">
        {error.message}
      </Typography>
      <Button variant="contained" onClick={retry} startIcon={<Refresh />}>
        Retry
      </Button>
    </Box>
  );
}
```

### Step 4.5: Test Error Scenarios

1. **Test ErrorBoundary:**
   - Temporarily add a component that throws an error
   - Verify error screen appears
   - Test "Try Again" and "Go Home" buttons

2. **Test Network Errors:**
   - Use DevTools to simulate offline mode (Network tab → Offline)
   - Verify error message appears
   - Verify retry button works

3. **Test API Errors:**
   - Change API URL to invalid endpoint
   - Verify appropriate error message

### ✅ Phase 4 Checklist

- [ ] ErrorBoundary component created
- [ ] ErrorBoundary added to App.tsx
- [ ] Error UI includes helpful message
- [ ] Error UI includes action buttons (retry, go home)
- [ ] Development mode shows error details
- [ ] Production mode hides technical details
- [ ] useFetch hook handles network errors
- [ ] useFetchDetail hook handles network errors
- [ ] Auto-retry logic implemented (max 3 attempts)
- [ ] Request cancellation on unmount
- [ ] Error state displayed in Home view
- [ ] Error state displayed in Detail view
- [ ] Retry button works correctly
- [ ] All error scenarios tested

---

## 🎨 Phase 5: UI/UX Enhancements (Priority: High)

**Time Estimate:** 4-6 hours  
**Goal:** Polish the UI with loading states, animations, and improved visuals

### Step 5.1: Add Skeleton Loading States

1. Install skeleton dependency (Material-UI already includes it):
```bash
# Already available in @mui/material
```

2. Create PetCardSkeleton component:
```bash
mkdir -p src/components/PetCardSkeleton
touch src/components/PetCardSkeleton/PetCardSkeleton.tsx
```

3. Implement skeleton:
```typescript
import { TableRow, TableCell, Skeleton, Box } from '@mui/material';

export const PetCardSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={120} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={100} height={32} />
      </TableCell>
    </TableRow>
  );
};
```

4. Use in Home view:
```typescript
// In Home.tsx, replace CircularProgress with:
{loading ? (
  <>
    {[...Array(paginationModel.pageSize)].map((_, index) => (
      <PetCardSkeleton key={index} />
    ))}
  </>
) : (
  // existing pet rows
)}
```

### Step 5.2: Add Smooth Animations

1. Install framer-motion:
```bash
npm install framer-motion
```

2. Create animated wrapper component:
```bash
mkdir -p src/components/AnimatedCard
touch src/components/AnimatedCard/AnimatedCard.tsx
```

3. Implement animation:
```typescript
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
}

export const AnimatedCard = ({ children, delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};
```

4. Wrap table rows in Home view:
```typescript
// Around each TableRow
<AnimatedCard delay={index * 0.05}>
  <TableRow
    onClick={() => handleClickRow(pet.id)}
    sx={{ cursor: "pointer" }}
  >
    {/* existing content */}
  </TableRow>
</AnimatedCard>
```

### Step 5.3: Create Hero Section

1. Create HeroSection component:
```bash
mkdir -p src/components/HeroSection
touch src/components/HeroSection/HeroSection.tsx
```

2. Implement hero:
```typescript
import { Box, Typography, Chip, Container } from '@mui/material';
import { Pets } from '@mui/icons-material';

export const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: { xs: 4, md: 6 },
        borderRadius: 2,
        marginBottom: 4,
        textAlign: 'center',
        boxShadow: 3
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Pets sx={{ fontSize: 60 }} />
      </Box>
      
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 700
        }}
      >
        Fever Pets
      </Typography>
      
      <Typography 
        variant="h5" 
        sx={{ 
          opacity: 0.9,
          fontSize: { xs: '1rem', md: '1.25rem' },
          mb: 3
        }}
      >
        Discover, track, and manage pet data with ease
      </Typography>
      
      <Box 
        display="flex" 
        gap={2} 
        justifyContent="center"
        flexWrap="wrap"
      >
        <Chip 
          label="150+ Pets" 
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 600
          }} 
        />
        <Chip 
          label="3 Species" 
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 600
          }} 
        />
        <Chip 
          label="Real-time Updates" 
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 600
          }} 
        />
      </Box>
    </Box>
  );
};
```

3. Add to Home view:
```typescript
// At the top of the return statement in Home.tsx
import { HeroSection } from '../../components/HeroSection/HeroSection';

return (
  <Stack spacing={2}>
    <HeroSection />
    {/* existing content */}
  </Stack>
);
```

### Step 5.4: Improve Detail Page Layout

Update `src/views/Detail/Detail.tsx`:

```typescript
// Enhance the image display
<Grid item md={6} textAlign="center">
  <Box
    sx={{
      position: 'relative',
      display: 'inline-block',
      '&:hover img': {
        transform: 'scale(1.05)',
      }
    }}
  >
    <img
      data-testid="bigImage"
      alt={data?.name}
      style={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
      }}
      src={data?.photo_url}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = notFound;
      }}
    />
  </Box>
</Grid>
```

### Step 5.5: Add Page Transitions

Update `src/App.tsx`:

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<CircularProgress />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Routes location={location}>
                {/* existing routes */}
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
```

### ✅ Phase 5 Checklist

- [ ] PetCardSkeleton component created
- [ ] Skeleton loaders replace loading spinner in Home view
- [ ] Skeleton loaders added to Detail view
- [ ] framer-motion installed
- [ ] AnimatedCard component created
- [ ] Table rows animate on load
- [ ] Hover effects on interactive elements
- [ ] HeroSection component created
- [ ] Hero section added to Home view
- [ ] Detail page image has hover effect
- [ ] Detail page layout improved
- [ ] Page transitions added
- [ ] All animations smooth (no jank)
- [ ] Mobile animations tested

---

## 🎓 Phase 6: Documentation (Priority: High)

**Time Estimate:** 3-4 hours  
**Goal:** Create professional documentation for contributors and users

### Step 6.1: Create CONTRIBUTING.md

```bash
touch CONTRIBUTING.md
```

Add content:
```markdown
# Contributing to Fever Pets

Thank you for your interest in contributing! This project is a portfolio piece, but feedback and contributions are welcome.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/fever-pets.git
   cd fever-pets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Workflow

### Running the Application
```bash
npm start              # Development server on http://localhost:3000
npm test               # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run build          # Production build
```

### Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── Health/       # Health status badge
│   ├── Layout/       # Page wrapper
│   ├── ErrorBoundary/ # Error handling
│   └── ...
├── views/            # Page-level components
│   ├── Home/         # Pet list
│   ├── Detail/       # Pet details
│   └── NoMatch/      # 404
├── hooks/            # Custom React hooks
├── strategies/       # Strategy pattern for health
├── interfaces/       # TypeScript types
├── utils/            # Helper functions
└── locales/          # i18n translations
```

## Code Standards

### TypeScript
- Use strict typing, avoid `any`
- Define interfaces for all data structures
- Use discriminated unions for polymorphic types

### React
- Functional components with hooks
- Use TypeScript for props and state
- Extract reusable logic into custom hooks

### Testing
- Minimum 80% coverage on new features
- Test business logic thoroughly
- Use React Testing Library for components

### Naming Conventions
- **Components:** PascalCase (e.g., `PetCard.tsx`)
- **Hooks:** camelCase with "use" prefix (e.g., `useFetch.ts`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add bird filtering capability
fix: resolve health calculation for edge cases
docs: update README with deployment steps
test: add tests for useFetch hook
refactor: simplify PetCard component
style: format code with Prettier
```

## Adding a New Pet Type

1. **Define types** in `src/interfaces/interfaces.ts`
2. **Create strategy** in `src/strategies/health/`
3. **Write tests** with 100% coverage
4. **Register strategy** in `HealthStrategyFactory.ts`
5. **Add translations** in `src/locales/*/translation.json`
6. **Add icon** in `src/icons/icons.ts`
7. **Update documentation**

## Pull Request Process

1. Ensure all tests pass: `npm test`
2. Update documentation if needed
3. Add screenshots for UI changes
4. Link related issues in description
5. Request review from maintainers

## Questions?

Open an issue or reach out via email: your.email@example.com
```

### Step 6.2: Create ARCHITECTURE.md

```bash
mkdir -p docs
touch docs/ARCHITECTURE.md
```

Add detailed architecture documentation (see previous sections for full content).

### Step 6.3: Create LICENSE File

```bash
touch LICENSE
```

Add MIT License:
```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 6.4: Update Package.json

Add metadata:
```json
{
  "name": "fever-pets",
  "version": "1.0.0",
  "description": "A modern React/TypeScript pet management platform with advanced filtering and health tracking",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/fever-pets.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/fever-pets/issues"
  },
  "homepage": "https://fever-pets.vercel.app",
  "keywords": [
    "react",
    "typescript",
    "material-ui",
    "pets",
    "portfolio",
    "code-splitting",
    "strategy-pattern"
  ]
}
```

### Step 6.5: Add Code Comments

Add JSDoc comments to key functions:

```typescript
/**
 * Custom hook for fetching paginated and sorted pet data
 * @param url - API endpoint URL
 * @param pagination - Pagination configuration (page, pageSize)
 * @param sort - Sort configuration (field, order)
 * @returns Object containing data, loading state, error, and retry function
 * 
 * @example
 * const { data, loading, error, retry } = useFetch(
 *   'https://api.example.com/pets',
 *   { page: 0, pageSize: 10 },
 *   { sortField: 'name', sortOrder: 'asc' }
 * );
 */
export const useFetch = (
  url: string,
  pagination: PetPaginationModel,
  sort: PetSortModel
): UseFetchResult => {
  // implementation
};
```

### ✅ Phase 6 Checklist

- [ ] CONTRIBUTING.md created with guidelines
- [ ] docs/ARCHITECTURE.md created
- [ ] LICENSE file added (MIT)
- [ ] package.json metadata updated (description, author, repo)
- [ ] Keywords added to package.json
- [ ] JSDoc comments added to key functions
- [ ] README links to CONTRIBUTING.md
- [ ] README links to ARCHITECTURE.md
- [ ] All documentation reviewed for accuracy
- [ ] Documentation committed to repository

---

## 🎬 Phase 7: Video & Promotion (Priority: Medium)

**Time Estimate:** 4-5 hours  
**Goal:** Create promotional materials to showcase your project

### Step 7.1: Create Video Walkthrough

**Tools:**
- [Loom](https://www.loom.com/) (easiest, free)
- [OBS Studio](https://obsproject.com/) (more control, free)
- QuickTime Player (Mac, built-in)

**Video Script (2-3 minutes):**

```
[00:00-00:15] Hook
"I reduced a React app's bundle size by 70% while adding new features. Let me show you how."

[00:15-00:45] Demo
- Open live site
- Show pet list with sorting
- Click to detail page
- Show Pet of the Day feature
- Demonstrate mobile responsiveness

[00:45-01:15] Technical Highlights
- Open code in VS Code
- Show Strategy Pattern implementation
- Highlight type-safe discriminated unions
- Show test coverage report

[01:15-01:45] Performance
- Open bundle analyzer
- Show before/after comparison
- Highlight code splitting
- Show Lighthouse scores

[01:45-02:15] Architecture
- Show architecture diagram
- Explain data flow
- Discuss scalability

[02:15-02:30] Call to Action
"Check out the live demo and source code. Links in the description."
```

**Recording Steps:**

1. **Prepare environment:**
   - Close unnecessary apps
   - Clear browser cache
   - Use incognito mode
   - Prepare all tabs in advance

2. **Record:**
   ```bash
   # Start recording
   # Follow script
   # Keep mouse movements smooth
   # Speak clearly and at moderate pace
   ```

3. **Edit (optional):**
   - Trim beginning/end
   - Add title card
   - Add background music (royalty-free)
   - Add captions

4. **Upload:**
   - YouTube (unlisted or public)
   - Loom (shareable link)
   - Vimeo (if preferred)

### Step 7.2: Write Blog Post/Case Study

**Platform Options:**
- [Dev.to](https://dev.to/) (developer-focused)
- [Medium](https://medium.com/) (broader audience)
- [Hashnode](https://hashnode.com/) (developer blogs)
- Your personal blog

**Article Structure:**

```markdown
# How I Reduced React Bundle Size by 70% While Adding Features

## Introduction
Brief context about the project and challenge

## The Challenge
- Started with 329 KB bundle
- Needed to add bird support
- Had to maintain performance

## The Problem Analysis
- Identified main culprits (Material-UI, router)
- Analyzed bundle with source-map-explorer
- Set performance targets

## The Solution
### 1. Code Splitting
[Explain implementation with code examples]

### 2. Lazy Loading
[Show before/after code]

### 3. Type-Safe Architecture
[Discuss discriminated unions and Strategy Pattern]

## The Results
- 69.9% bundle reduction
- Faster load times
- Better user experience
[Include graphs and metrics]

## Key Takeaways
1. Measure before optimizing
2. Code splitting is powerful
3. Design patterns aid scalability

## Conclusion
Link to live demo and repo

---

**Tags:** #react #typescript #performance #webdev #portfolio
```

**Writing Tips:**
- Use short paragraphs (2-3 sentences)
- Include code snippets with syntax highlighting
- Add images and diagrams
- Use headers for structure
- Include real metrics

### Step 7.3: Create Social Media Posts

**LinkedIn Post:**
```
🚀 Just launched my latest portfolio project: Fever Pets!

A React/TypeScript pet management platform that demonstrates:

✅ 70% bundle size reduction through strategic code splitting
✅ Type-safe architecture with discriminated unions
✅ Strategy Pattern for extensible health calculations
✅ 97 passing tests with comprehensive coverage
✅ CI/CD pipeline with automated deployment
✅ Internationalization (EN/ES)

🎯 Key Technical Achievements:
• Reduced initial bundle from 329 KB to 99 KB
• Implemented lazy loading for optimal performance
• Achieved 67% test coverage (100% on business logic)
• Built fully responsive, accessible UI

💡 What I Learned:
1. Performance optimization requires measurement and iteration
2. Design patterns are essential for scalable architecture
3. TypeScript's advanced features prevent bugs at compile-time

🔗 Live Demo: [your-url]
📦 Source Code: [github-url]
📝 Case Study: [blog-url]

#React #TypeScript #WebDevelopment #Portfolio #SoftwareEngineering

---

Would love to hear your thoughts! What optimization techniques do you use?
```

**Twitter/X Thread:**
```
🧵 I just shipped a React portfolio project that reduced bundle size by 70%. Here's what I learned:

1/7 The Challenge:
Started with a 329 KB bundle. Needed to add features while improving performance. Seemed impossible? Let's dig in 👇

2/7 The Analysis:
Used source-map-explorer to identify bloat. Material-UI and router were main culprits. But I needed both...

3/7 The Solution: Code Splitting
Implemented React.lazy() and route-based splitting. Each page loads only when needed. Result: 99 KB initial bundle ⚡

4/7 Type Safety:
Used TypeScript discriminated unions for different pet types. Compiler catches bugs before they ship 🛡️

5/7 Architecture:
Strategy Pattern for health calculations. Adding new pet types? Just add a new strategy. Open/Closed Principle FTW 🎯

6/7 The Results:
• 70% smaller bundle
• 97 passing tests
• CI/CD pipeline
• Live on Vercel

7/7 Check it out:
🔗 Demo: [url]
💻 Code: [url]
📝 Deep dive: [url]

What's your favorite optimization technique? 👇
```

### Step 7.4: Update README with Links

Add promotion section to README:

```markdown
## 🎥 Media

- **Live Demo:** [fever-pets.vercel.app](https://fever-pets.vercel.app)
- **Video Walkthrough:** [YouTube](https://youtu.be/xxx)
- **Case Study:** [Blog Post](https://medium.com/@you/article)
- **GitHub:** [Source Code](https://github.com/you/fever-pets)

## 📱 Connect

Built by [Your Name](https://yourportfolio.com)

- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [github.com/yourusername](https://github.com/yourusername)
- Email: your.email@example.com
```

### ✅ Phase 7 Checklist

- [ ] Video script written (2-3 minutes)
- [ ] Recording environment prepared
- [ ] Video recorded with smooth narration
- [ ] Video edited (trimmed, titled)
- [ ] Video uploaded (YouTube/Loom/Vimeo)
- [ ] Blog post outline created
- [ ] Blog post written (1500-2000 words)
- [ ] Code snippets added with syntax highlighting
- [ ] Images and diagrams embedded
- [ ] Blog post published
- [ ] LinkedIn post drafted and published
- [ ] Twitter/X thread posted
- [ ] README updated with media links
- [ ] Video link added to README
- [ ] Blog post link added to README

---

## 📊 Final Checklist: Portfolio Ready

### Critical Items ✓
- [ ] Project deployed live (Vercel/Netlify)
- [ ] Custom domain configured (optional but recommended)
- [ ] CI/CD pipeline running successfully
- [ ] Error boundaries implemented
- [ ] Loading states polished (skeletons)
- [ ] All tests passing
- [ ] Test coverage > 60%
- [ ] No console errors in production

### Documentation ✓
- [ ] README professionally formatted
- [ ] Screenshots and GIFs added
- [ ] Architecture diagram created
- [ ] CONTRIBUTING.md written
- [ ] LICENSE file added
- [ ] Code comments on complex logic
- [ ] Status badges showing green

### Visual Polish ✓
- [ ] Hero section on homepage
- [ ] Smooth animations
- [ ] Hover effects on interactive elements
- [ ] Skeleton loaders instead of spinners
- [ ] Responsive on mobile
- [ ] Professional color scheme
- [ ] Consistent spacing and typography

### Promotion ✓
- [ ] Video walkthrough created (2-3 min)
- [ ] Blog post/case study published
- [ ] LinkedIn post shared
- [ ] Twitter/X thread posted
- [ ] Portfolio website updated with project
- [ ] GitHub profile README includes project
- [ ] Resume updated with project

### Performance ✓
- [ ] Lighthouse score > 90 (all categories)
- [ ] Bundle size < 150 KB initial load
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading configured

### Accessibility ✓
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Alt text on images
- [ ] Color contrast ratio > 4.5:1
- [ ] Screen reader tested (optional)

---

## 🎯 Success Metrics

Track these metrics to measure portfolio impact:

**Quantitative:**
- GitHub stars: Target 10+
- LinkedIn post impressions: Target 1000+
- Blog post views: Target 500+
- Website visitors: Track with analytics

**Qualitative:**
- Interview mentions: How many times do interviewers reference it?
- Code review feedback: What do peers say?
- Recruiter interest: Does it generate inbound opportunities?

---

## ⏱️ Timeline Summary

| Phase | Time | Priority | Status |
|-------|------|----------|--------|
| 1. Deployment | 1-2 hours | Critical | ⬜ |
| 2. Visual Assets | 3-4 hours | Critical | ⬜ |
| 3. CI/CD | 2-3 hours | Critical | ⬜ |
| 4. Error Handling | 2-3 hours | Critical | ⬜ |
| 5. UI/UX | 4-6 hours | High | ⬜ |
| 6. Documentation | 3-4 hours | High | ⬜ |
| 7. Promotion | 4-5 hours | Medium | ⬜ |
| **Total** | **19-27 hours** | | |

---

## 💡 Pro Tips

1. **Start with deployment** - Having a live URL motivates you to keep improving

2. **One phase at a time** - Don't try to do everything at once

3. **Test on mobile** - 50%+ of users are on mobile devices

4. **Get feedback early** - Share with peers before promoting widely

5. **Keep iterating** - Portfolio projects are never "done"

6. **Document decisions** - Future you will thank present you

7. **Celebrate milestones** - Each completed phase is an achievement

---

## 🚀 Ready to Start?

Pick Phase 1 and begin! The most important step is starting.

**Remember:** A good portfolio project tells a story about you as a developer. What story do you want to tell?

Good luck! 🎉
