
# Tachles Platform (תכל'ס)

A comprehensive supplier and service management platform built with React, Vite, Tailwind CSS, and Supabase.

## 🚀 Features

- **Supplier Registration**: Complete supplier onboarding system
- **Service Management**: Comprehensive service catalog
- **Real-time Updates**: Live data synchronization with Supabase
- **Responsive Design**: Mobile-first design approach
- **Multi-language Support**: Hebrew and English interface

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Docker, GitHub Actions
- **State Management**: TanStack Query

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

```bash
# Clone the repository
git clone https://github.com/TahlesAi/tahles-ai.git
cd tahles-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Docker Development

```bash
# Build and run with Docker Compose
npm run docker:dev

# Or manually
docker-compose --profile dev up --build
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build Docker image
npm run docker:build
```

## 🗄️ Database

This project uses Supabase for:
- PostgreSQL database
- Real-time subscriptions
- Authentication
- Row Level Security (RLS)

### Database Schema

Key tables:
- `suppliers` - Supplier information and profiles
- `products` - Product catalog
- `categories` & `subcategories` - Product categorization
- `orders` - Order management
- `reviews` - Customer feedback system

## 🚀 Deployment

### GitHub Actions

The project includes automated CI/CD pipelines:

- **CI Pipeline**: Linting, type checking, and building
- **Docker Build**: Automated Docker image creation
- **Supabase Migrations**: Database schema updates

### Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Routes

- `/` - Landing page
- `/home` - Dashboard
- `/supplier-registration` - Supplier registration form

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions, please contact the development team.

---

**Built with ❤️ by the Tachles AI Team**
