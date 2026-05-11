# Story Translation, Content Creation, and Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate all Hindi text to perfect English, polish existing English text, write 2 new long stories, and deploy the application.

**Architecture:** We will use subagents to process the JSON files in batches to ensure high quality translations and text polishing without hitting context limits. We will also use subagents to generate two new long stories matching the existing schema. Finally, we will commit, push, and run the deployment script.

**Tech Stack:** JSON, Git, Bun

---

### Task 1: Translate and Polish Batch 1

**Files:**
- Modify: `src/stories/after-99-rejections.json`
- Modify: `src/stories/apocalypse-love-system.json`
- Modify: `src/stories/beast-girl.json`
- Modify: `src/stories/beauty-roommates.json`

- [ ] **Step 1: Process `after-99-rejections.json` and `apocalypse-love-system.json`**
  Dispatch a subagent to read these two files. For every `text`, `title`, and `description` field:
  - If it contains Hindi, move the Hindi to the `translations.hi` field (if not already there) and translate the content into perfect, polished English in the `text`/`title`/`description` field.
  - If it is already English, polish the grammar and flow.
  Update the files with the modified JSON content. Ensure valid JSON syntax is maintained.

- [ ] **Step 2: Process `beast-girl.json` and `beauty-roommates.json`**
  Dispatch a subagent to read these two files and perform the same translation and polishing process. Ensure valid JSON syntax is maintained.

### Task 2: Translate and Polish Batch 2

**Files:**
- Modify: `src/stories/ceo-wife.json`
- Modify: `src/stories/dragon-king.json`
- Modify: `src/stories/forbidden-peak.json`
- Modify: `src/stories/frozen-apocalypse.json`

- [ ] **Step 1: Process `ceo-wife.json` and `dragon-king.json`**
  Dispatch a subagent to process these two files, following the same translation and polishing rules.

- [ ] **Step 2: Process `forbidden-peak.json` and `frozen-apocalypse.json`**
  Dispatch a subagent to process these two files, following the same translation and polishing rules.

### Task 3: Translate and Polish Batch 3

**Files:**
- Modify: `src/stories/landlady-ex.json`
- Modify: `src/stories/level-up-real-world.json`
- Modify: `src/stories/monster-girl.json`
- Modify: `src/stories/plane-kiss.json`

- [ ] **Step 1: Process `landlady-ex.json` and `level-up-real-world.json`**
  Dispatch a subagent to process these two files, following the same translation and polishing rules.

- [ ] **Step 2: Process `monster-girl.json` and `plane-kiss.json`**
  Dispatch a subagent to process these two files, following the same translation and polishing rules.

### Task 4: Translate and Polish Batch 4

**Files:**
- Modify: `src/stories/reborn-thoughts.json`
- Modify: `src/stories/secret-agent-tutor.json`
- Modify: `src/stories/sinister-school.json`
- Modify: `src/stories/superstar-shadow.json`
- Modify: `src/stories/underworld-heir.json`

- [ ] **Step 1: Process `reborn-thoughts.json` and `secret-agent-tutor.json`**
  Dispatch a subagent to process these two files, following the same translation and polishing rules.

- [ ] **Step 2: Process `sinister-school.json`, `superstar-shadow.json`, and `underworld-heir.json`**
  Dispatch a subagent to process these three files, following the same translation and polishing rules.

### Task 5: Write New Story 1

**Files:**
- Create: `src/stories/system-of-the-gods.json`

- [ ] **Step 1: Generate Story Content**
  Dispatch a subagent to generate a new long story titled "System of the Gods". The story should fall under genres like "Fantasy" and "Action". It must have a description, poster image path (`/images/stories/system-of-the-gods.png`), and at least 1 season with 2 episodes, each containing at least 5 parts.
  The JSON structure must exactly match the existing files (e.g., `id`, `slug`, `title`, `description`, `genres`, `rating`, `views`, `status`, `availableLanguages`, `seasons`, `episodes`, `parts`).

- [ ] **Step 2: Save the Story**
  Write the generated JSON string to `src/stories/system-of-the-gods.json`. Ensure it's valid JSON.

### Task 6: Write New Story 2

**Files:**
- Create: `src/stories/cyberpunk-heist.json`

- [ ] **Step 1: Generate Story Content**
  Dispatch a subagent to generate a new long story titled "Cyberpunk Heist". The story should fall under genres like "Sci-Fi" and "Thriller". It must have a description, poster image path (`/images/stories/cyberpunk-heist.png`), and at least 1 season with 2 episodes, each containing at least 5 parts.
  The JSON structure must exactly match the existing files.

- [ ] **Step 2: Save the Story**
  Write the generated JSON string to `src/stories/cyberpunk-heist.json`. Ensure it's valid JSON.

### Task 7: Git Commit, Push, and Deploy

**Files:**
- N/A

- [ ] **Step 1: Check Git Status**
  Run `git status` to verify all changed and new files in `src/stories/`.

- [ ] **Step 2: Add and Commit Changes**
  Run `git add src/stories/*.json` and `git commit -m "feat: translate stories to perfect english, polish text, and add 2 new long stories"`.

- [ ] **Step 3: Push to Remote**
  Run `git push`.

- [ ] **Step 4: Deploy**
  Run `bun run deploy`. Verify that the deployment command completes successfully.