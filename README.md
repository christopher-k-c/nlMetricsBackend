# Studio Dashboard - Next.js with Supabase Authentication

A post-production dashboard tool designed to track New Look's retouching team's work. Retouchers can log daily outputs, differentiate various tasks, and add notes about their workday or specific tasks. Built with Next.js and Supabase authentication, this dashboard provides insights into both team and individual progress, helping improve workflows over time.

## How This Application Was Created

### Setup Commands

The application was created using the official Next.js with Supabase Starter Kit:

```bash
# Using npm
npx create-next-app -e with-supabase
```

After creating the initial project, the following packages were installed:


### Project Configuration

The project uses:
- TypeScript for type safety
- Next.js App Router for routing
- Tailwind CSS for styling
- shadcn/ui components for UI elements
- Supabase for authentication and backend services

## Key Components


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
```

---

This project was built based on the [Next.js with Supabase Starter Kit](https://github.com/vercel/next.js/tree/canary/examples/with-supabase).
