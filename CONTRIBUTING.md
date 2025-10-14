# Contributing to Urban Symbiosis

Thank you for contributing to the Urban Symbiosis platform! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- A Supabase account (ask team lead for project credentials)
- Access to the Linear project board

### First Time Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UrbanSymbiosis
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example env files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   Ask your team lead for the actual Supabase credentials and update both `.env` files.

4. **Verify setup**
   ```bash
   # Run linting
   npm run lint

   # Run type checking
   npm run type-check
   ```

5. **Start development servers**
   ```bash
   # In one terminal - Frontend
   cd frontend && npm run dev

   # In another terminal - Backend
   cd backend && npm run dev
   ```

## Development Workflow

### 1. Pick a Task from Linear
- Go to the Linear project board
- Find your assigned issue or claim an unassigned one
- Review the requirements and acceptance criteria
- Copy the branch name from Linear (⌘ + .)

### 2. Create a Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/US-XX-brief-description
```

Branch naming conventions:
- `feature/US-XX-description` - New features
- `fix/US-XX-description` - Bug fixes
- `chore/US-XX-description` - Maintenance tasks

### 3. Make Your Changes
- Write clean, readable code
- Follow existing code style (enforced by ESLint and Prettier)
- Add comments for complex logic
- Keep commits atomic and focused

### 4. Commit Your Work
Use conventional commit messages:
```bash
git add .
git commit -m "feat: add user profile page (US-XX)"
```

Commit message prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request
```bash
git push origin feature/US-XX-brief-description
```

Then on GitHub:
- Create a Pull Request to `main`
- Title: `US-XX | Brief Description`
- Fill out the PR template
- Link to Linear issue (should happen automatically)
- Request review from team member

## Code Standards

### TypeScript
- Always use TypeScript, avoid `any` types
- Define proper interfaces for data structures
- Use type inference where appropriate

### React
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Use meaningful component and variable names
- Extract reusable logic into custom hooks

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Keep consistent spacing using Tailwind scale

### API Design
- RESTful endpoints with clear naming
- Proper HTTP status codes
- Consistent error response format
- Input validation on all endpoints

## Testing
(To be added as testing framework is implemented)
- Write unit tests for utility functions
- Write integration tests for API endpoints
- Test authentication flows thoroughly

## Code Review Guidelines

### As an Author
- Keep PRs focused and under 300 lines when possible
- Write a clear PR description
- Test your changes locally before requesting review
- Respond to feedback promptly
- Update your branch if requested

### As a Reviewer
- Review within 24-48 hours
- Test the changes locally if needed
- Focus on logic, security, and functionality
- Be constructive and kind in feedback
- Approve when satisfied, request changes if needed

## Common Issues

### Supabase Connection Errors
- Verify your `.env` files have correct credentials
- Check that Supabase project is active
- Ensure you're using the right Supabase URL

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Merge Conflicts
```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-branch
git merge main
# Resolve conflicts in your editor
git add .
git commit -m "chore: resolve merge conflicts"
```

## Getting Help

- Check the [docs/](docs/) folder for technical documentation
- Ask in the team Discord channel
- Tag your team lead in Linear comments
- Schedule a pairing session for complex issues

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Linear Documentation](https://linear.app/docs)
