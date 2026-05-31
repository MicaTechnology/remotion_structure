# Mica Video — Remotion Project

This is a shared Remotion project for creating social media videos showcasing Mica features. The skeleton (config, shared components, entry point) is tracked in git. Individual videos go in `src/videos/` which is gitignored.

## Agent Setup Instructions

When a user asks to set up this project, create a video, or if `node_modules/` doesn't exist, run the following steps automatically:

1. **Check if nvm is installed:**
   ```bash
   command -v nvm || export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
   ```
   If nvm is still not found, install it:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
   ```

2. **Install and use Node 22 (LTS):**
   ```bash
   nvm install 22
   nvm use 22
   ```

3. **Install project dependencies:**
   ```bash
   npm install
   ```

4. **Install Remotion agent skills** (if `~/.agents/skills/remotion-best-practices/` doesn't exist):
   ```bash
   npx skills add remotion-dev/skills
   ```

After setup, confirm to the user that everything is ready and they can run `npm run dev` to open Remotion Studio.

### Remotion Skills (AI Agents)

After running `npx skills add remotion-dev/skills`, best-practice rules for Remotion are installed at `~/.agents/skills/remotion-best-practices/`.

**When working on this project, always read the relevant skill rules from `~/.agents/skills/remotion-best-practices/rules/` before writing Remotion code.** Key rules to check:

- `transitions.md` — how to use `@remotion/transitions`
- `sequencing.md` — `<Series>`, `<Sequence>` patterns
- `timing.md` — `useCurrentFrame`, `interpolate`, `spring` usage
- `images.md` — `<Img>` and `staticFile()` usage
- `tailwind.md` — Tailwind CSS v4 setup with Remotion
- `text-animations.md` — animated text patterns
- `compositions.md` — registering compositions
- `parameters.md` — input props / schemas

## Usage

```bash
# Open Remotion Studio (port 3003)
npm run dev

# Render a composition to video
npx remotion render <CompositionId> out/<filename>.mp4

# Render with custom quality (lower CRF = better quality)
npx remotion render <CompositionId> out/<filename>.mp4 --crf 15
```

## Project Structure

```
my-video/
├── src/
│   ├── index.ts              # Entry point (tracked)
│   ├── Root.tsx               # Composition registry (tracked)
│   ├── index.css              # Tailwind entry (tracked)
│   ├── components/            # Shared reusable components (tracked)
│   │   ├── PhoneFrame.tsx     # Mobile device mockup
│   │   ├── BrowserFrame.tsx   # Desktop browser mockup
│   │   └── TapCursor.tsx      # Animated tap/click effect
│   └── videos/               # Individual video files (GITIGNORED)
│       └── MyFeatureVideo.tsx
├── public/                    # Screenshots & assets (GITIGNORED)
├── remotion.config.ts         # Remotion config (tracked)
├── package.json               # Dependencies (tracked)
└── tsconfig.json              # TypeScript config (tracked)
```

## Creating a New Video

1. Create your video component in `src/videos/` (e.g., `src/videos/MyFeatureVideo.tsx`)
2. Import shared components from `../components/` (PhoneFrame, BrowserFrame, TapCursor)
3. Register the composition in `src/Root.tsx` with the desired resolution and duration
4. Place screenshots/assets in `public/` and reference with `staticFile("filename.png")`
5. Preview in Studio: `npm run dev`
6. Export: `npx remotion render MyCompositionId out/my-video.mp4`

## Common Resolutions

| Format | Width | Height | Use case |
|--------|-------|--------|----------|
| TikTok / Reels | 1080 | 1920 | Vertical social media |
| YouTube / LinkedIn | 1280 | 720 | Horizontal |
| Instagram Feed | 1080 | 1080 | Square |

## Tech Stack

- **Remotion 4.x** — React-based video framework
- **React 19** + TypeScript
- **Tailwind CSS v4** via `@remotion/tailwind-v4`

## Tips

- Use `<PhoneFrame>` to wrap mobile screenshots in a phone mockup
- Use `<BrowserFrame>` to wrap desktop screenshots in a browser mockup
- Use `objectFit: "fill"` for images inside device frames to avoid cropping
- Separate text and device scenes for cleaner vertical videos
- The Mica brand green is `#72DDA3`
