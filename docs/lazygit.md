# Lazygit Quick Start

## Initial Setup (One-Time)

### Connect to a Remote Repository

1. Open lazygit from your project root:

   ```bash
   lazygit
   ```

2. Press `h` or `?` to open the help menu — it's the most useful reference.

3. **Set the remote origin** (if not already done):

   - Press `Esc` to exit help
   - Press `o` to open the **remotes** view (or press `h` then type `remotes`)
   - Alternatively, from the main screen press `1` to go to the **branches** panel, press `h` for help, then look for **remotes**
   - Actually the simplest way: press `o` from the main screen to toggle the **remotes** panel
   - With the remotes panel open, press `a` to **add** a new remote
   - Enter the remote name (usually `origin`)
   - Enter the remote URL (clone URL from your git host — GitHub, GitLab, etc.)
   - Press `Enter` to confirm

   You can also just run the git command directly:

   ```bash
   git remote add origin https://github.com/yourname/family-tree.git
   ```

   Then refresh lazygit (press `r` in the main panel).

## Daily Workflow

### Stage & Commit

1. **Stage files** — From the main screen:
   - Use `j`/`k` to navigate to a file in the **files** panel (right side)
   - Press `space` to **stage** a single file (cycles: unstaged → staged → ignored)
   - Press `v` to **stage all** files in the current directory
   - Press `V` to **stage all** files in the entire project

2. **Commit**:
   - Press `cc` to **commit staged**
   - Type your commit message (follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, etc.)
   - Press `Enter` to confirm

3. **Push**:
   - Press `P` to **push** (upstream)
   - First push may ask you to set the upstream branch — press `Enter` to accept
   - For subsequent pushes, `P` works directly

### Branching

- Press `n` in the **branches** panel to create a new branch
- Press `Enter` on a branch to check it out
- Press `D` to delete a branch (after checking it out elsewhere first)

### Navigation Shortcuts

| Key | Action |
|-----|--------|
| `j` / `k` | Move up/down |
| `h` / `l` | Open help / open selected item |
| `Esc` | Close panels / exit help |
| `q` | Close the side panel you're in |
| `r` | Refresh |
| `cc` | Commit staged changes |
| `P` | Push |
| `p` | Pull |
| `c` | Open commit menu (amend, revert, etc.) |
| `b` | Open branch menu (checkout, create, delete) |
| `o` | Toggle remotes panel |
| `?` | Open help menu |

### First Push Checklist

1. `git remote add origin <url>` (or set it in lazygit)
2. `git branch -M main` (or `master`) — ensure correct default branch name
3. Stage your files (`space` or `V`)
4. Commit (`cc`)
5. Push (`P`)
