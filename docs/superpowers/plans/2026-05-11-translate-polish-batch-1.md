# Translate and Polish Batch 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate Hindi content to English and polish existing English in `after-99-rejections.json` and `apocalypse-love-system.json`.

**Architecture:** Use a Node.js script to recursively traverse the story JSON files, identify Hindi content, move it to `translations.hi`, and replace the main field with polished English translation. For English-only fields, polish the grammar.

**Tech Stack:** Node.js, TypeScript (for the script if needed, or just JS for simplicity).

---

### Task 1: Create Translation and Polishing Script

**Files:**
- Create: `scratch/translate-polish.js`

- [ ] **Step 1: Write the script to process JSON recursively**

```javascript
const fs = require('fs');
const path = require('path');

// Mock translation/polishing function - in reality, the agent will perform this per field or use an API
// For this task, the agent will likely need to process fields one by one if they are many, 
// or I can write a script that identifies fields needing work.
// Actually, since I am the agent, I can use a script to FIND the fields, and then I will EDIT them.
// But the task says "Process... Update the files". 
// A better approach: Read the file, process in memory, write back.
```

- [ ] **Step 2: Implement Hindi detection and Translation/Polishing logic**
- [ ] **Step 3: Run the script on `src/stories/after-99-rejections.json`**
- [ ] **Step 4: Run the script on `src/stories/apocalypse-love-system.json`**
- [ ] **Step 5: Verify the results (spot check)**

### Task 2: Manual Review and Refinement

**Files:**
- Modify: `src/stories/after-99-rejections.json`
- Modify: `src/stories/apocalypse-love-system.json`

- [ ] **Step 1: Open `src/stories/after-99-rejections.json` and ensure all fields are polished English.**
- [ ] **Step 2: Open `src/stories/apocalypse-love-system.json` and ensure all fields are polished English.**
- [ ] **Step 3: Ensure `translations.hi` contains the original Hindi where applicable.**
