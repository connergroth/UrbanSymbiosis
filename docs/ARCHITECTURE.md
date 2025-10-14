# Urban Symbiosis - Technical Architecture

## Overview
Urban Symbiosis is a community membership platform that serves as a "one-stop shop" for members to access events, workshops, food/product purchases, space rentals, kitchen access, and social features.

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage for files/images

### Infrastructure
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend hosting (planned)
- **Fly.io** - Backend hosting (planned)

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    End Users                            │
│          (Members, Admins, Public Visitors)             │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTPS
                 ▼
┌───────────────────────────────────────────────────a──────┐
│              React Frontend (Vite)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Pages: Home, Login, Dashboard, Events,          │   │
│  │         Marketplace, Rentals, Profile, Admin     │   │
│  │  Components: Shared UI elements                  │   │
│  │  Hooks: Custom React hooks                       │   │
│  │  Utils: Helper functions                         │   │
│  └──────────────────────────────────────────────────┘   │
└────────────┬───────────────────────────┬────────────────┘
             │                           │
             │ REST API                  │ Supabase Client
             │                           │ (Auth, Real-time)
             ▼                           ▼
┌────────────────────────────┐  ┌──────────────────────────┐
│   Node.js Backend          │  │      Supabase            │
│   (Express + TypeScript)   │  │                          │
│                            │  │  ┌────────────────────┐  │
│  ┌──────────────────────┐  │  │  │  PostgreSQL DB     │  │
│  │  Routes              │  │  │  └────────────────────┘  │
│  │  - Auth              │  │  │  ┌────────────────────┐  │
│  │  - Members           │  │  │  │  Authentication    │  │
│  │  - Events            │  │  │  │  - Email/Password  │  │
│  │  - Products          │  │  │  │  - Social OAuth    │  │
│  │  - Rentals           │  │  │  └────────────────────┘  │
│  │  - Messaging         │  │  │  ┌────────────────────┐  │
│  │  - Admin             │  │  │  │  Storage           │  │
│  └──────────────────────┘  │  │  │  - Images          │  │
│  ┌──────────────────────┐  │  │  │  - Documents       │  │
│  │  Controllers         │  │  │  └────────────────────┘  │
│  │  - Business Logic    │  │  │  ┌────────────────────┐  │
│  └──────────────────────┘  │  │  │  Real-time         │  │
│  ┌──────────────────────┐  │  │  │  Subscriptions     │  │
│  │  Middleware          │  │  │  └────────────────────┘  │
│  │  - Auth Validation   │  │  │                          │
│  │  - Error Handling    │◄─┼──┤  Supabase Service Key    │
│  └──────────────────────┘  │  │  (Server-side access)    │
└────────────────────────────┘  └──────────────────────────┘
```

## Key Features & Components

### 1. Authentication & User Management
- Email/password registration with email verification
- Social OAuth (Google, Facebook - optional)
- Member profiles with demographics (zip code, age, interests)
- Role-based access control (Member, Admin, Super Admin)

### 2. Membership Management
- Membership tiers/plans
- Payment integration (Stripe - future)
- Member onboarding flow
- Member directory with privacy controls

### 3. Events & Workshops
- Event creation and management
- RSVP system
- Calendar view
- Event categories and filtering
- Capacity management
- Email notifications

### 4. Marketplace
- Food and product listings
- Inventory management
- Shopping cart
- Order processing
- Product categories

### 5. Space & Kitchen Rentals
- Space availability calendar
- Booking system
- Rental pricing
- Booking confirmations
- Conflict prevention

### 6. Social/Community Features
- Member-to-member messaging
- Community feed/posts
- Event discussions
- Member filtering (by interests, location)
- Activity notifications

### 7. Communications
- Email notifications (using Supabase + SendGrid/Mailgun)
- In-app notifications
- SMS notifications (optional - Twilio)
- Newsletter system

### 8. Admin Portal
- Member management
- Content moderation
- Analytics dashboard
- Event management
- Product management
- Settings configuration

## Data Flow Patterns

### Authentication Flow
```
User → Frontend → Supabase Auth → Frontend
                       ↓
                  JWT Token stored
                       ↓
              Subsequent requests
                       ↓
Frontend → Backend (with JWT) → Verify with Supabase
                                      ↓
                                Allow/Deny request
```

### Typical API Request Flow
```
User Action → React Component
                    ↓
              Custom Hook (API call)
                    ↓
              Backend API Route
                    ↓
              Middleware (Auth, Validation)
                    ↓
              Controller (Business Logic)
                    ↓
              Supabase Client (Database)
                    ↓
              Response back to Frontend
                    ↓
              Update UI State
```

## Security Considerations

### Authentication
- JWTs for session management
- Refresh token rotation
- Secure password hashing (handled by Supabase)
- Rate limiting on auth endpoints

### Authorization
- Row Level Security (RLS) in Supabase
- Role-based access control (RBAC)
- Resource ownership validation
- Admin-only endpoints protected

### Data Protection
- HTTPS only
- Environment variables for secrets
- Input validation and sanitization
- SQL injection prevention (Supabase parameterized queries)
- XSS prevention (React's built-in escaping)

## Performance Considerations

### Frontend
- Code splitting by route
- Lazy loading of components
- Image optimization
- Caching strategies
- Memoization for expensive computations

### Backend
- Database query optimization
- Proper indexing in PostgreSQL
- Response caching where appropriate
- Connection pooling

### Database
- Efficient queries with proper indexes
- Pagination for large datasets
- Materialized views for complex aggregations
- Real-time subscriptions only where needed

## Scalability Approach

### Phase 1 (MVP)
- Single region deployment
- Monolithic backend
- Direct Supabase integration
- Basic caching

### Phase 2 (Growth)
- CDN for static assets
- Database read replicas
- API rate limiting
- Advanced caching (Redis)

### Phase 3 (Scale)
- Multi-region if needed
- Microservices for specific domains
- Message queue for async tasks
- Full-text search (Elasticsearch/Meilisearch)

## Development Principles

1. **Mobile-First**: Design and build for mobile devices first
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Progressive Enhancement**: Core functionality works without JavaScript
4. **Type Safety**: Strict TypeScript across the stack
5. **Testing**: Unit tests, integration tests, E2E tests
6. **Documentation**: Code comments, API docs, architecture docs
7. **Monitoring**: Error tracking, performance monitoring, usage analytics

## Future Enhancements

- Mobile app (React Native)
- Advanced analytics dashboard
- Recommendation engine
- Integration with external services (calendar sync, payment processors)
- Multi-language support
- Advanced reporting
