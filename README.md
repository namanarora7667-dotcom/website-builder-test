# DevSite Builder

A beautiful, modern React application for building developer websites and portfolios. Choose from professionally designed templates tailored for different tech stacks and create stunning developer websites without any coding knowledge.

## 🎨 Features

- **4 Specialized Templates**: Frontend, Backend, Full-stack, and Cloud Engineer focused designs
- **Modern UI/UX**: Beautiful gradients, animations, and responsive design
- **Live Preview**: Real-time website preview as you customize
- **No Code Required**: Easy form-based customization
- **Professional Output**: Mobile-responsive, SEO-optimized websites
- **Tech Stack Focused**: Each template optimized for specific developer roles

## 🚀 Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite
- **Styling**: TailwindCSS 3 + Radix UI components
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Build Tool**: Vite
- **Testing**: Vitest

## 📁 Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components
│   ├── Index.tsx         # Landing page
│   ├── Builder.tsx       # Website builder interface
│   └── NotFound.tsx      # 404 page
├── components/ui/        # Pre-built UI component library
├── App.tsx              # App entry point with SPA routing
└── global.css           # TailwindCSS theming and global styles
```

## 🛠 Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build
npm run typecheck  # TypeScript validation
npm test          # Run tests
```

## 🎯 How It Works

1. **Choose Template**: Select from 4 specialized developer templates
2. **Customize Content**: Use the easy form-based editor to add your information
3. **Live Preview**: See changes in real-time with the live preview
4. **Publish**: Export your beautiful, professional website

## 🏗 Template Types

### Frontend Developer

- Portfolio showcase
- Project gallery with live demos
- Skills and technology focus
- Modern UI/UX emphasis

### Backend Developer

- API documentation sections
- Technical architecture displays
- Server-side project showcases
- Database and system design focus

### Full-stack Developer

- Complete project demonstrations
- End-to-end development showcase
- Technology stack displays
- Both frontend and backend highlights

### Cloud Engineer

- Infrastructure diagrams
- Cloud certification displays
- DevOps project showcases
- Scalability and monitoring focus

## 🎨 Customization

The application uses a modern design system with:

- **Purple gradient branding** with professional color scheme
- **Glass-morphism effects** and modern UI components
- **Smooth animations** (fade-in, slide-up, gentle bounce)
- **Responsive design** that works on all screen sizes
- **CSS custom properties** for easy theming

## 🚀 Deployment

### Static Hosting (Recommended)

Build the application:

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Preview Build Locally

```bash
npm run preview
```

## 🧩 Architecture

- **Single Page Application (SPA)** with React Router 6
- **Component-based architecture** with reusable UI components
- **TypeScript** for type safety throughout
- **Modern CSS** with TailwindCSS utility classes
- **Responsive design** mobile-first approach

## 📝 License

This project is licensed under the MIT License.
