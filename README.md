# Studio Dashboard - Next.js with Supabase Authentication

This project is a modern web application built with Next.js and Supabase, featuring a complete authentication system. This README explains how the application was created and how key components like authentication work.

## How This Application Was Created

### Setup Commands

The application was created using the official Next.js with Supabase Starter Kit:

```bash
# Using npm
npx create-next-app --example with-supabase with-supabase-app

# Or using yarn
yarn create next-app --example with-supabase with-supabase-app

# Or using pnpm
pnpm create next-app --example with-supabase with-supabase-app
```

After creating the initial project, the following packages were installed:

```bash
# UI components
npm install @radix-ui/react-checkbox @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-slot
npm install class-variance-authority clsx lucide-react next-themes
npm install tailwind-merge tailwindcss-animate

# Formatting
npm install prettier
```

### Project Configuration

The project uses:
- TypeScript for type safety
- Next.js App Router for routing
- Tailwind CSS for styling
- shadcn/ui components for UI elements
- Supabase for authentication and backend services

## Key Components

### Authentication System

The authentication system is built using Supabase Auth with cookie-based sessions, which allows for seamless authentication across:
- Client Components
- Server Components
- API Routes
- Server Actions
- Middleware

#### How Authentication Works

1. **Setup**:
   - Environment variables in `.env.local` configure the Supabase connection
   - Middleware ensures cookie-based session management across the app

2. **Authentication Flow**:
   - User signs up with email/password via the `/sign-up` form
   - Email verification link is sent to the user
   - User signs in via the `/sign-in` form
   - Authentication state is maintained through cookies
   - Protected routes require authentication

3. **Implementation Details**:

   - **Server Actions** (`app/actions.ts`):
     - `signUpAction` - Handles user registration
     - `signInAction` - Authenticates users
     - `signOutAction` - Logs users out
     - `forgotPasswordAction` - Initiates password reset
     - `resetPasswordAction` - Completes password reset

   - **Supabase Client Setup**:
     - Server-side client (`utils/supabase/server.ts`) - Uses cookie storage
     - Middleware client (`utils/supabase/middleware.ts`) - Handles session updates
     - Client-side setup (`utils/supabase/client.ts`) - For browser interactions

   - **Route Protection**:
     - Middleware intercepts all requests to validate authentication
     - Protected routes are under `/protected/*`
     - Authentication pages are under `/auth/*` and `/(auth-pages)/*`

## Folder Structure

```
studio-dashboard/
├── app/                      # Next.js App Router
│   ├── (auth-pages)/         # Auth-related pages
│   ├── auth/                 # Auth callback handlers 
│   ├── protected/            # Protected routes
│   ├── profile/              # User profile pages
│   └── actions.ts            # Server actions for auth
├── components/               # UI components
├── lib/                      # Library code
├── utils/
│   └── supabase/             # Supabase configuration
│       ├── client.ts         # Browser client
│       ├── server.ts         # Server client
│       └── middleware.ts     # Auth middleware
├── middleware.ts             # Next.js middleware
└── .env.local                # Environment variables
```

## Environment Setup

The application requires these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development Workflow

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

This project was built based on the [Next.js with Supabase Starter Kit](https://github.com/vercel/next.js/tree/canary/examples/with-supabase).
