# Design Doc: Story Translation, Content Creation, and Deployment

## Goal
1. Translate all Hindi text to perfect English in the `text` field of story JSON files in `src/stories/`, and polish existing English text to ensure high quality. Ensure original Hindi is preserved in the `translations.hi` field.
2. Write 2 new long stories and save them as JSON files in `src/stories/`.
3. Commit the changes, push to the remote repository, and deploy the application using `bun run deploy`.

## Scope
- Directory: `src/stories/*.json`
- Translation Fields: `text`, `title`, `description` (recursive throughout the JSON structure, primarily in `seasons`, `episodes`, and `parts`).
- New Content: Two new JSON files in `src/stories/` adhering to the existing schema.
- Deployment: Git operations and `bun run deploy`.

## Approach
1.  **Translation & Polishing (via Subagent):** For each existing JSON file:
    -   Identify all `text`, `title`, and `description` fields.
    -   If the field contains Hindi characters:
        -   Ensure the Hindi content is stored in the `translations.hi` sibling field.
        -   Translate the Hindi to "perfect English".
        -   Update the field with the new English translation.
    -   If the field is already in English:
        -   Polish the text for grammar, flow, and "perfection".
2.  **Content Creation (via Subagent):**
    -   Generate two new long stories with multiple episodes and parts.
    -   Ensure the structure matches existing files (e.g., `id`, `title`, `slug`, `posterImage`, `description`, `genres`, `rating`, `views`, `status`, `availableLanguages`, `seasons`).
    -   Save them as new JSON files in `src/stories/`.
3.  **Deployment:**
    -   `git add src/stories/*.json`
    -   `git commit -m "feat: translate stories to perfect english, polish text, and add 2 new long stories"`
    -   `git push`
    -   `bun run deploy`

## Validation
Ensure the JSON structure remains valid, all fields are correctly updated, new files conform to the schema, and the deployment script completes successfully.
