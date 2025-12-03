# Pop!_OS Portfolio

A modern, interactive portfolio website designed to mimic the Pop!_OS desktop environment. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🖥️ **Desktop Environment** - Full desktop-like experience with draggable windows
- 🎨 **Pop!_OS Theme** - Authentic Pop!_OS color scheme and design language
- 📱 **Responsive** - Works seamlessly across different screen sizes
- ⚡ **Fast & Modern** - Built with Next.js 16 and React 19
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🔧 **Window Management** - Open, close, drag, and maximize windows

## Tech Stack

- **Framework**: Next.js 16.0.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter & Fira Code

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── apps/        # Application windows (Terminal, FileExplorer, etc.)
│   ├── DesktopContainer.tsx
│   ├── WindowFrame.tsx
│   └── Taskbar.tsx
├── context/         # React context (WindowContext)
└── data/            # Portfolio data (portfolio.json)
```

## Customization

Edit `src/data/portfolio.json` to update:
- Personal information
- Skills and experience
- Projects portfolio
- Contact details
- Tech stack

## Applications

- **Terminal** - Tech stack showcase with typewriter animation
- **File Explorer** - Interactive project portfolio browser
- **Applications** - User profile and about section
- **Resume/About** - Professional experience overview
- **Contact** - Get in touch information
- **System Info** - Browser and system details

## License

MIT
