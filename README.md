# 🛍️ Kaya Shop - Luxury Menswear E-Commerce

A sophisticated, black & white themed luxury menswear e-commerce platform built with modern web technologies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-1.29-orange)

## ✨ Features

- 🎨 **Minimalist Black & White Design** - Elegant, timeless luxury aesthetic
- 📱 **Fully Responsive** - Optimized for all devices
- 🖼️ **Hero Carousel** - Beautiful product showcases with custom imagery
- 🛒 **Shopping Cart** - Full cart functionality with state management
- 🔍 **Product Search & Filters** - Easy product discovery
- 📦 **Product Categories** - Shoes, Tops, Pants, Watches, Accessories
- 🎯 **Product Details** - Image galleries with thumbnails
- 🚀 **Fast Performance** - Optimized with Vite and React Query
- 💳 **Checkout Ready** - Prepared for payment integration

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching & caching
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Build & Development
- **Vite** - Lightning-fast bundler
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alliance74/kayashop.git
cd kayashop
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Run development server**
```bash
npm run dev
# or
bun dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
# or
bun run build
```

The build output will be in the `dist` directory.

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alliance74/kayashop)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect the configuration
4. Click "Deploy"

The project includes a `vercel.json` configuration file optimized for deployment.

## 📂 Project Structure

```
kayashop/
├── coursel/              # Hero carousel images
├── accessories/          # Accessories product images
├── src/
│   ├── assets/          # Product images
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── HeroCarousel.tsx
│   │   ├── ProductImageGallery.tsx
│   │   └── ...
│   ├── data/           # Static data & catalog
│   ├── lib/            # Utilities & helpers
│   ├── routes/         # Page routes
│   └── styles.css      # Global styles
├── public/             # Static assets
└── vercel.json        # Vercel configuration
```

## 🎨 Customization

### Color Theme
The black & white theme can be customized in `src/styles.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  /* ... other color variables */
}
```

### Adding Products
Edit `src/data/catalog.ts` to add or modify products, categories, and collections.

### Images
- Hero carousel images: `coursel/` folder
- Product images: `src/assets/` folder
- Accessories: `accessories/` folder

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Project Link: [https://github.com/alliance74/kayashop](https://github.com/alliance74/kayashop)

## 🙏 Acknowledgments

- [TanStack](https://tanstack.com/) for amazing React tools
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Lucide](https://lucide.dev/) for beautiful icons

---

Built with ❤️ for luxury fashion enthusiasts
