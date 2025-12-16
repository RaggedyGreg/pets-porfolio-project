# Frequently Asked Questions (FAQ)

## Table of Contents
1. [HTML Semantics](#html-semantics)
2. [CSS & Style Manipulation](#css--style-manipulation)
3. [HTML Tags Usage](#html-tags-usage)
4. [React Basic Concepts](#react-basic-concepts)
5. [React Hooks](#react-hooks)
6. [Next.js](#nextjs)
7. [State Management Libraries](#state-management-libraries)

---

## HTML Semantics

### What are HTML semantics?

HTML semantics refer to using HTML elements that clearly describe their meaning and content to both the browser and the developer. Semantic HTML improves accessibility, SEO, and code maintainability.

**Example:**
```html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>

<!-- Semantic -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
```

### Why use semantic HTML?

- **Accessibility**: Screen readers can better interpret content
- **SEO**: Search engines understand content structure better
- **Maintainability**: Code is easier to read and maintain
- **Standards**: Follows web standards and best practices

---

## CSS & Style Manipulation

### How can I manipulate styles without modifying HTML?

You can use CSS selectors, pseudo-classes, pseudo-elements, and attribute selectors to target and style elements.

**Example 1: Using CSS selectors**
```css
/* Target all paragraphs inside articles */
article p {
  color: #333;
  line-height: 1.6;
}

/* Target first child */
ul li:first-child {
  font-weight: bold;
}

/* Target elements with specific attributes */
input[type="email"] {
  border-color: blue;
}
```

**Example 2: Using pseudo-elements**
```css
/* Add content before/after elements */
.notification::before {
  content: "⚠️ ";
  color: orange;
}

/* Style first letter */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
```

**Example 3: Using CSS variables for dynamic styling**
```css
:root {
  --primary-color: #007bff;
  --spacing: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}

/* Change theme dynamically */
.dark-theme {
  --primary-color: #0056b3;
}
```

**Example 4: Using data attributes**
```html
<div data-status="success">Content</div>
```

```css
[data-status="success"] {
  background-color: green;
}

[data-status="error"] {
  background-color: red;
}
```

---

## HTML Tags Usage

### What's the difference between `<div>`, `<span>`, `<section>`, and similar elements?

#### `<div>` - Division
- **Type**: Block-level, non-semantic
- **Usage**: Generic container for grouping content
- **When to use**: When no semantic element fits

```html
<div class="card">
  <h2>Title</h2>
  <p>Content</p>
</div>
```

#### `<span>` - Span
- **Type**: Inline, non-semantic
- **Usage**: Generic inline container for text/content
- **When to use**: Styling small portions of text

```html
<p>The price is <span class="highlight">$99.99</span></p>
```

#### `<section>` - Section
- **Type**: Block-level, semantic
- **Usage**: Thematic grouping of content, typically with a heading
- **When to use**: Independent sections of content

```html
<section>
  <h2>About Us</h2>
  <p>Company information...</p>
</section>
```

#### `<article>` - Article
- **Type**: Block-level, semantic
- **Usage**: Self-contained, independently distributable content
- **When to use**: Blog posts, news articles, comments

```html
<article>
  <h2>Blog Post Title</h2>
  <p>Published: <time datetime="2025-10-30">October 30, 2025</time></p>
  <p>Content...</p>
</article>
```

#### `<aside>` - Aside
- **Type**: Block-level, semantic
- **Usage**: Tangentially related content (sidebars, callouts)
- **When to use**: Complementary information

```html
<aside>
  <h3>Related Articles</h3>
  <ul>
    <li><a href="#">Article 1</a></li>
  </ul>
</aside>
```

#### `<header>` - Header
- **Type**: Block-level, semantic
- **Usage**: Introductory content or navigation
- **When to use**: Page/section headers

```html
<header>
  <h1>Site Title</h1>
  <nav><!-- navigation --></nav>
</header>
```

#### `<footer>` - Footer
- **Type**: Block-level, semantic
- **Usage**: Footer content (copyright, links)
- **When to use**: Page/section footers

```html
<footer>
  <p>&copy; 2025 Company Name</p>
</footer>
```

#### `<nav>` - Navigation
- **Type**: Block-level, semantic
- **Usage**: Navigation links
- **When to use**: Major navigation blocks

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

#### `<main>` - Main
- **Type**: Block-level, semantic
- **Usage**: Primary content of the document
- **When to use**: Once per page for main content

```html
<main>
  <h1>Main Content Area</h1>
  <article><!-- content --></article>
</main>
```

### Complete Example with Proper Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic HTML Example</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <header>
        <h2>Article Title</h2>
        <p>By <span class="author">John Doe</span></p>
      </header>
      <section>
        <h3>Introduction</h3>
        <p>Article content...</p>
      </section>
      <section>
        <h3>Details</h3>
        <p>More content...</p>
      </section>
    </article>
    
    <aside>
      <h3>Related Content</h3>
      <p>Additional information...</p>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
</body>
</html>
```

---

## React Basic Concepts

### What is React?

React is a JavaScript library for building user interfaces, particularly single-page applications. It uses a component-based architecture and virtual DOM for efficient rendering.

### Key Concepts

#### 1. **Components**

Components are reusable pieces of UI. They can be functional or class-based (functional is now preferred).

```tsx
// Functional Component
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// Using the component
<Welcome name="Alice" />
```

#### 2. **JSX (JavaScript XML)**

JSX allows you to write HTML-like syntax in JavaScript.

```tsx
const element = (
  <div className="container">
    <h1>Title</h1>
    <p>Paragraph text</p>
  </div>
);
```

#### 3. **Props**

Props (properties) are read-only data passed from parent to child components.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Usage
<Button label="Click Me" onClick={() => alert('Clicked!')} />
```

#### 4. **State**

State is mutable data managed within a component.

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

#### 5. **Lifecycle & Effects**

Effects allow you to perform side effects in functional components.

```tsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Runs after component mounts
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
    
    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component unmounting');
    };
  }, []); // Empty dependency array = run once on mount
  
  if (loading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}
```

#### 6. **Conditional Rendering**

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}
```

#### 7. **Lists & Keys**

```tsx
interface User {
  id: number;
  name: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## React Hooks

### What are React Hooks?

Hooks are functions that let you use state and other React features in functional components.

### Common Hooks

#### 1. **useState** - State Management

Manages local component state.

```tsx
import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 2. **useEffect** - Side Effects

Handles side effects like data fetching, subscriptions, or manual DOM manipulation.

```tsx
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []); // Empty deps = run once
  
  return <p>Seconds: {seconds}</p>;
}
```

**Dependency array examples:**
```tsx
useEffect(() => {
  // Runs on every render
});

useEffect(() => {
  // Runs once on mount
}, []);

useEffect(() => {
  // Runs when 'count' changes
}, [count]);

useEffect(() => {
  // Runs when 'count' OR 'name' changes
}, [count, name]);
```

#### 3. **useContext** - Context API

Consumes context without prop drilling.

```tsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I'm {theme} themed!</button>;
}
```

#### 4. **useRef** - References

Access DOM elements or persist values without causing re-renders.

```tsx
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} placeholder="Auto-focused" />;
}

// Persisting values without re-render
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>();
  
  useEffect(() => {
    prevCountRef.current = count;
  });
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### 5. **useReducer** - Complex State Logic

Alternative to useState for complex state logic.

```tsx
import { useReducer } from 'react';

type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

#### 6. **useMemo** - Memoization

Memoize expensive calculations.

```tsx
import { useMemo, useState } from 'react';

function ExpensiveComponent({ numbers }: { numbers: number[] }) {
  const [multiplier, setMultiplier] = useState(1);
  
  // Only recalculates when 'numbers' or 'multiplier' changes
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((acc, n) => acc + n, 0) * multiplier;
  }, [numbers, multiplier]);
  
  return (
    <div>
      <p>Sum: {sum}</p>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Multiply by {multiplier + 1}
      </button>
    </div>
  );
}
```

#### 7. **useCallback** - Memoized Callbacks

Memoize callback functions to prevent unnecessary re-renders.

```tsx
import { useCallback, useState, memo } from 'react';

const Button = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`Rendering button: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  
  // Without useCallback, this function is recreated on every render
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <Button onClick={increment} label="Increment Count" />
      <button onClick={() => setOther(other + 1)}>Increment Other</button>
    </div>
  );
}
```

#### 8. **Custom Hooks**

Create reusable logic by extracting it into custom hooks.

```tsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }: { userId: number }) {
  const { data, loading, error } = useFetch<User>(`/api/users/${userId}`);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data?.name}</div>;
}
```

### Hook Rules

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call from functional components or custom hooks

```tsx
// ❌ Wrong
function Bad() {
  if (condition) {
    const [state, setState] = useState(0); // Conditional hook!
  }
}

// ✅ Correct
function Good() {
  const [state, setState] = useState(0);
  
  if (condition) {
    // Use state here
  }
}
```

---

## Next.js

### What is Next.js?

Next.js is a React framework that provides infrastructure and optimizations for building web applications. It offers server-side rendering (SSR), static site generation (SSG), and many other features out of the box.

### Key Features

#### 1. **File-based Routing**

Create routes by adding files to the `pages` or `app` directory.

```tsx
// pages/index.tsx → /
// pages/about.tsx → /about
// pages/blog/[slug].tsx → /blog/:slug

// pages/blog/[slug].tsx
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  return <h1>Blog Post: {slug}</h1>;
}
```

#### 2. **Server-Side Rendering (SSR)**

Render pages on the server for each request.

```tsx
import { GetServerSideProps } from 'next';

interface Props {
  data: any;
}

export default function Page({ data }: Props) {
  return <div>{JSON.stringify(data)}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
};
```

#### 3. **Static Site Generation (SSG)**

Pre-render pages at build time.

```tsx
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Post({ post }: { post: any }) {
  return <article>{post.title}</article>;
}

// Generate static paths
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map((post: any) => ({
    params: { id: post.id.toString() }
  }));
  
  return { paths, fallback: false };
};

// Fetch data for each path
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.example.com/posts/${params?.id}`);
  const post = await res.json();
  
  return {
    props: { post },
    revalidate: 60 // ISR: Regenerate page every 60 seconds
  };
};
```

#### 4. **API Routes**

Create API endpoints within your Next.js app.

```tsx
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Handle POST request
    res.status(200).json({ message: 'Created!' });
  } else {
    res.status(200).json({ message: 'Hello World' });
  }
}
```

#### 5. **Image Optimization**

Built-in image optimization with the Image component.

```tsx
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={200}
      height={200}
      priority // Load image with high priority
    />
  );
}
```

#### 6. **App Router (Next.js 13+)**

New routing system with React Server Components.

```tsx
// app/page.tsx (Server Component by default)
export default function HomePage() {
  return <h1>Home Page</h1>;
}

// app/dashboard/page.tsx → /dashboard
// app/dashboard/settings/page.tsx → /dashboard/settings

// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}

// Client component (when needed)
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Pros of Next.js

✅ **SEO-friendly** - Server-side rendering improves SEO
✅ **Performance** - Automatic code splitting, image optimization
✅ **Developer Experience** - Fast refresh, TypeScript support, file-based routing
✅ **Flexibility** - Choose SSR, SSG, or CSR per page
✅ **Built-in optimizations** - Image, font, and script optimization
✅ **API routes** - Full-stack capabilities
✅ **Large ecosystem** - Backed by Vercel, strong community

### Cons of Next.js

❌ **Learning curve** - More concepts to learn (SSR, SSG, ISR)
❌ **Build times** - Can be slow for large sites with many static pages
❌ **Vendor lock-in** - Some features work best on Vercel
❌ **Complexity** - Overhead for simple projects that don't need SSR
❌ **Server costs** - SSR requires a Node.js server (vs. pure static hosting)

### When to Use Next.js

- **E-commerce sites** - SEO and performance critical
- **Blogs/Content sites** - Benefit from SSG
- **Dynamic applications** - Need both SSR and client-side interactivity
- **SEO-critical apps** - Need server-side rendering
- **Full-stack apps** - API routes eliminate need for separate backend

### When NOT to Use Next.js

- **Simple static sites** - Plain React or static site generator may be simpler
- **Highly interactive apps** - Pure client-side apps (Vite + React might be better)
- **Non-React projects** - Obviously!

---

## State Management Libraries

### What is State Management?

State management refers to handling data that changes over time in your application. As apps grow, managing state across components becomes complex.

### When Do You Need a State Management Library?

- Sharing state between many components
- Complex state logic
- Need for global state
- State needs to persist
- Undo/redo functionality
- Time-travel debugging

### Popular Solutions

#### 1. **React Context API + useReducer** (Built-in)

**Pros:**
- ✅ No external dependencies
- ✅ Simple for small to medium apps
- ✅ Built into React

**Cons:**
- ❌ Can cause unnecessary re-renders
- ❌ No dev tools
- ❌ Can become verbose

**Example:**
```tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
  user: { name: string; email: string } | null;
  theme: 'light' | 'dark';
};

type Action =
  | { type: 'SET_USER'; payload: { name: string; email: string } }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' };

const initialState: State = {
  user: null,
  theme: 'light'
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
}

// Usage in components
function UserProfile() {
  const { state, dispatch } = useAppState();
  
  const login = () => {
    dispatch({
      type: 'SET_USER',
      payload: { name: 'John', email: 'john@example.com' }
    });
  };
  
  return (
    <div>
      {state.user ? (
        <>
          <p>{state.user.name}</p>
          <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

#### 2. **Redux / Redux Toolkit**

**Pros:**
- ✅ Predictable state updates
- ✅ Excellent dev tools (time-travel debugging)
- ✅ Large ecosystem and middleware
- ✅ Redux Toolkit reduces boilerplate

**Cons:**
- ❌ Boilerplate code (even with RTK)
- ❌ Learning curve
- ❌ Can be overkill for simple apps

**Example with Redux Toolkit:**
```tsx
// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { name: string; email: string } | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;

// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// App.tsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}

// Component usage
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setUser, logout } from './store/userSlice';

function UserProfile() {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  const login = () => {
    dispatch(setUser({ name: 'John', email: 'john@example.com' }));
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {user ? (
        <>
          <p>{user.name}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

#### 3. **Zustand**

**Pros:**
- ✅ Minimal boilerplate
- ✅ Simple API
- ✅ No Context Provider needed
- ✅ Great TypeScript support
- ✅ Small bundle size

**Cons:**
- ❌ Less mature than Redux
- ❌ Smaller ecosystem

**Example:**
```tsx
import create from 'zustand';

interface UserStore {
  user: { name: string; email: string } | null;
  loading: boolean;
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user, loading: false }),
  logout: () => set({ user: null }),
  setLoading: (loading) => set({ loading })
}));

// Usage (no Provider needed!)
function UserProfile() {
  const { user, loading, setUser, logout } = useUserStore();
  
  const login = () => {
    setUser({ name: 'John', email: 'john@example.com' });
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {user ? (
        <>
          <p>{user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

// Async actions
const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id: string) => {
    set({ loading: true });
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    set({ user, loading: false });
  },
  setUser: (user) => set({ user, loading: false }),
  logout: () => set({ user: null }),
  setLoading: (loading) => set({ loading })
}));
```

#### 4. **Recoil**

**Pros:**
- ✅ Fine-grained reactivity
- ✅ Minimal re-renders
- ✅ Atomic state management
- ✅ Great for complex state relationships

**Cons:**
- ❌ Still experimental
- ❌ Smaller community than Redux

**Example:**
```tsx
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atoms (state)
const userState = atom({
  key: 'userState',
  default: null as { name: string; email: string } | null
});

const themeState = atom({
  key: 'themeState',
  default: 'light' as 'light' | 'dark'
});

// Selectors (derived state)
const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  }
});

// Usage
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <UserProfile />
    </RecoilRoot>
  );
}

function UserProfile() {
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  
  const login = () => {
    setUser({ name: 'John', email: 'john@example.com' });
  };
  
  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>{user?.name}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

#### 5. **Jotai**

**Pros:**
- ✅ Atomic state management
- ✅ Minimal API
- ✅ No string keys
- ✅ TypeScript first

**Cons:**
- ❌ Newer library
- ❌ Smaller ecosystem

**Example:**
```tsx
import { atom, useAtom } from 'jotai';

// Define atoms
const userAtom = atom<{ name: string; email: string } | null>(null);
const countAtom = atom(0);

// Derived atoms
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Usage (no Provider needed in most cases)
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubleCount] = useAtom(doubleCountAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### Comparison Table

| Feature | Context API | Redux Toolkit | Zustand | Recoil | Jotai |
|---------|-------------|---------------|---------|--------|-------|
| **Bundle Size** | 0kb (built-in) | ~17kb | ~1kb | ~21kb | ~3kb |
| **Learning Curve** | Low | Medium-High | Low | Medium | Low |
| **Boilerplate** | Medium | Low-Medium | Minimal | Low | Minimal |
| **DevTools** | ❌ | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good |
| **TypeScript** | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Good | ✅ Excellent |
| **Performance** | Can cause re-renders | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| **Async** | Manual | ✅ RTK Query | ✅ Easy | ✅ Built-in | ✅ Built-in |
| **Middleware** | Manual | ✅ Extensive | ✅ Available | Limited | Limited |

### Which to Choose?

- **Small apps**: Context API + useReducer
- **Large enterprise apps**: Redux Toolkit
- **Simple global state**: Zustand
- **Complex state relationships**: Recoil or Jotai
- **Minimal bundle size**: Zustand or Jotai
- **Best DX for beginners**: Zustand
- **Time-travel debugging needed**: Redux Toolkit

---

## Additional Resources

### HTML & CSS
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)

### React
- [React Official Documentation](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)

### State Management
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Recoil](https://recoiljs.org/)
- [Jotai](https://jotai.org/)

---

*Last updated: October 30, 2025*
