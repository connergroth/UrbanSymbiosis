# Urban Symbiosis - Community Membership Platform

A comprehensive membership platform designed to serve as a "one-stop shop" for community members, offering event management, marketplace functionality, space rentals, and social features.

## Project Overview

Urban Symbiosis is a full-stack web application that enables community organizations to:
- Manage member registrations and profiles with demographic data collection
- Host and manage events, workshops, and classes with RSVP functionality
- Operate a marketplace for food and product sales
- Manage space and kitchen rentals with booking system
- Facilitate member-to-member communication and social interactions
- Provide integrated communications (email notifications, in-app messaging)

The platform emphasizes **website sovereignty** - empowering administrators to manage and update the site independently after the initial development.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Supabase Client** - Auth and real-time features

### Backend
- **Node.js** with Express
- **TypeScript** - Full type safety
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication & authorization
  - File storage
  - Real-time subscriptions

### Infrastructure
- **GitHub Actions** - CI/CD pipelines
- **Vercel** - Frontend hosting (planned)
- **Fly.io** - Backend hosting (planned)
- **Linear** - Project management

## Documentation

Comprehensive documentation is available in the [docs/](docs/) folder:

- [SETUP.md](SETUP.md) - Initial setup and development guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute to the project
- [docs/WORKFLOW.md](docs/WORKFLOW.md) - Team workflow and Git practices
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture overview
- [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database design and schema

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Supabase account (get credentials from team lead)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UrbanSymbiosis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend
   cd frontend
   cp .env.example .env
   # Add your Supabase credentials to .env

   # Backend
   cd ../backend
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Frontend (http://localhost:3000)
   cd frontend
   npm run dev

   # Terminal 2 - Backend (http://localhost:5000)
   cd backend
   npm run dev
   ```

## Project Structure

```
urban-symbiosis/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and configurations
│   │   └── App.tsx       # Main app component
│   ├── .env.example      # Environment variables template
│   └── package.json
│
├── backend/              # Express.js backend
│   ├── src/
│   │   ├── routes/       # API route definitions
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Custom middleware
│   │   ├── lib/          # Utilities and configurations
│   │   └── index.ts      # Server entry point
│   ├── .env.example      # Environment variables template
│   └── package.json
│
├── docs/                 # Project documentation
├── .github/workflows/    # CI/CD pipelines
└── README.md            # This file
```

## Key Features

### Phase 1 - Authentication & Profiles
- User registration with email verification
- Login/logout functionality
- User profiles with demographics (zip code, interests, etc.)
- Member directory with privacy controls

### Phase 2 - Events & Workshops
- Event creation and management
- Event listings with filtering and search
- RSVP system with capacity management
- Calendar view
- Email notifications

### Phase 3 - Marketplace
- Product listings with categories
- Shopping cart functionality
- Order management
- Inventory tracking
- Fulfillment options (pickup/delivery)

### Phase 4 - Space & Kitchen Rentals
- Space availability management
- Booking system with conflict prevention
- Pricing calculator (hourly/half-day/full-day)
- Booking confirmations

### Phase 5 - Social Features
- Member-to-member messaging
- Community feed with posts
- Activity notifications
- Member filtering and discovery

### Phase 6 - Admin Portal
- Member management
- Content moderation
- Analytics dashboard
- Settings configuration

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Follow conventional commit messages
- Keep PRs under 300 lines when possible

### Git Workflow
1. Create feature branch from `main`: `feature/US-XX-description`
2. Make changes and commit regularly
3. Push branch and create Pull Request
4. Get approval and merge to `main`

See [docs/WORKFLOW.md](docs/WORKFLOW.md) for detailed workflow documentation.

## Scripts

### Root Level
```bash
npm run lint          # Lint all projects
npm run format        # Format all code
npm run format:check  # Check formatting
npm run type-check    # TypeScript type checking
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint frontend code
```

### Backend
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm run start        # Run compiled code
npm run lint         # Lint backend code
```

## Environment Variables

Required environment variables are documented in `.env.example` files:

**Frontend** ([frontend/.env.example](frontend/.env.example)):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_API_URL` - Backend API URL

**Backend** ([backend/.env.example](backend/.env.example)):
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process and how to submit pull requests.
