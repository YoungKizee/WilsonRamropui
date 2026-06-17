# Portfolio Backup Checkpoint

I've created a Git repository and saved all your files exactly as they are right now. This acts as a perfect "save state" for your project.

**Commit Hash**: `fc9b3ffdf74207628110a49770b0934b72e0c154`
**Message**: "Checkpoint: Initial portfolio state before editing"

---

## How to Revert Back to this State

If you ever make changes and decide you hate them, or if something breaks, you can instantly restore your files back to this exact moment using these commands in your terminal:

### Option 1: Undo all *unsaved* changes
If you haven't run `git commit` yet and just want to wipe out all the edits you've made since this checkpoint:
```bash
git restore .
```
*(Note: If you created entirely new files, you might also need to run `git clean -fd` to delete them).*

### Option 2: Go back to this exact checkpoint completely
If you've made commits and want to completely rewind time back to this checkpoint:
```bash
git reset --hard fc9b3ffdf74207628110a49770b0934b72e0c154
```
> [!CAUTION]
> Running `git reset --hard` will permanently delete all code changes you've made after this checkpoint. Make sure you really want to go back!
