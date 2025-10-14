# Urban Symbiosis - Setup Guide

## Initial Setup

### 1. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
npm install

# Or install individually
cd frontend && npm install
cd ../backend && npm install
```

### 2. Development

```bash
# Frontend (runs on http://localhost:3000)
cd frontend
npm run dev

# Backend (runs on http://localhost:5000)
cd backend
npm run dev
```

### 3. Linting & Formatting

```bash
# Run linting for all projects
npm run lint

# Format all code
npm run format

# Check formatting without fixing
npm run format:check

# Type checking
npm run type-check
```

## GitHub Branch Protection Setup

To enforce CI checks and require PRs before merging to main:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** under "Branch protection rules"
4. Configure the following:

   **Branch name pattern:** `main`

   **Protect matching branches:**
   - ✅ Require a pull request before merging
     - ✅ Require approvals: 1 (or more)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - Add status checks:
       - `build (Frontend CI)`
       - `build (Backend CI)`
   - ✅ Require conversation resolution before merging
   - ✅ Do not allow bypassing the above settings

5. Click **Create** or **Save changes**

## CI/CD Workflows

The project includes GitHub Actions workflows that automatically:

- Run ESLint checks
- Run TypeScript type checking
- Build the project (if build script exists)
- Execute on every push and pull request

See [.github/workflows/](.github/workflows/) for workflow configurations.

## Code Style

The project uses:

- **Prettier** for code formatting
- **ESLint** for code linting
- **TypeScript** for type safety

Configurations are shared across frontend and backend via root-level config files:
- [.prettierrc.json](.prettierrc.json)
- [.eslintrc.json](.eslintrc.json)

## Project Structure

```
urban-symbiosis/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   └── vite.config.ts    # Vite configuration
│
├── backend/              # Express.js backend
│   └── src/
│       ├── routes/       # API route definitions
│       ├── controllers/  # Request handlers
│       ├── models/       # Data models
│       └── utils/        # Utility functions
│
└── .github/workflows/    # CI/CD pipelines
```
