# Team Workflow Guide

## 1. Repo Rules
- **Never commit directly to `main`.**  
  The `main` branch is protected — all changes must go through pull requests.
- **All work should go through feature branches** using the following prefixes:
  - `feature/` → new features  
  - `fix/` → bug fixes  
  - `chore/` → minor changes, config updates, or cleanup
- **Follow conventional commit messages** for clarity and consistency:  
  `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, etc.

---

## 2. Code Review Process
- **All PRs require at least one approval** before merging.
- **Status checks are enabled** — lint and build checks must pass before merge.
- **Keep PRs under ~300 lines** to make reviews easier.
- Use **draft PRs** for in-progress work.
- **Focus comments on logic and functionality**, not just formatting or style.
- **After merge**, the associated Linear issue will automatically move to "Done."

---

## 3. CI/CD Overview
- **GitHub Actions** automatically runs:
  - Linting (`npm run lint`)
  - TypeScript build checks
  - Optional test runs (as added)
- **Status checks** must pass for merges into `main`.

- **Future Deployments:**
- **Vercel** automatically deploys frontend previews for each PR.
- **Fly.io** handles backend deploys after PR approval.
- **Merges to `main`** trigger production deployments.

---

## 4. Linear Integration & Workflow

### Overview
Linear is our **source of truth for tasks** and syncs automatically with GitHub.  
Every issue in Linear corresponds to **one feature branch + one pull request.**

This setup gives everyone:
- A clear view of their assigned tasks and priorities.
- Automatic progress tracking when code is pushed or merged.
- Visual Kanban and timeline boards to stay aligned.

---

### Step-by-Step Workflow

#### 1. Start from your assigned issue in Linear
- Each task (issue) in Linear includes a unique ID (e.g. `US-17`).
- Review the description, requirements, and any linked subtasks.
- When ready, click **"Copy Git Branch Name"** (or press `⌘ + .`) in Linear.

#### 2. Create a new branch in GitHub / local
Run this in your terminal:
```bash
git checkout -b feature/US-17-add-login-page
```
Linear will automatically recognize this branch once pushed.

#### 3. Work on your task
Commit changes regularly with clear messages:
```bash
git commit -m "feat: implement login page layout (US-17)"
```

Push your branch to GitHub:
```bash
git push origin feature/US-17-add-login-page
```

#### 4. Open a Pull Request (PR)
- Create a PR from your branch → `main`.
- Use the Linear issue title and ID in your PR title (e.g. `US-17 | Add login page`).
- GitHub Actions will automatically run lint and build checks.
- Once a teammate reviews and approves, merge when all checks pass.

#### 5. Linear Auto-Update
- The PR will automatically appear under the Linear issue.
- When the PR merges:
  - Linear automatically marks the issue Done
  - The team board updates in real-time.

---

### Integration Notes
- **Auto-linking**: Linear links branches and PRs automatically when the issue ID is included in the branch name.
- **Auto-closing**: When the PR merges, the corresponding issue closes automatically.
- **Manual Linking** (if needed): You can link a PR manually by referencing the Linear ID in your PR title or description.

---

## 5. Git Fundamentals
Always sync your branch before creating new work:
```bash
git pull origin main
```

Create new branches using the correct prefix:
```bash
git checkout -b feature/<task-name>
```

Commit frequently and push often.

Resolve merge conflicts locally before pushing.

Use:
```bash
git stash
```
if you need to temporarily save work when switching branches.

---

## 6. Team Norms
- PRs should be reviewed within 24–48 hours.
- Use Discord for quick communication and to report blockers.
- Document major code changes briefly in your PR description.
- Always ask for clarification before starting a task if something is unclear.