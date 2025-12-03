# Tailwind Notes

A minimal `tailwind.config.cjs` was added to this project with sensible `content` paths.

If you want to (re)generate the config and PostCSS setup locally, run:

```powershell
npx tailwindcss init -p
```

The global stylesheet `app/globals.css` was updated to use the standard Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

To run the app locally:

```powershell
npm install
npm run dev
```

If you want me to also append these notes to `README.md` instead of creating this file, tell me and I'll try again.