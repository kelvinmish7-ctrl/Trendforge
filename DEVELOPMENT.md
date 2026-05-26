# TrendForge Development

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/kelvinmish7-ctrl/trendforge.git
cd trendforge

# Install dependencies
npm install

# Copy environment template and fill in your credentials
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Environment Variables

Required variables in `.env.local`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Reddit API
REDDIT_CLIENT_ID=your_reddit_id
REDDIT_CLIENT_SECRET=your_reddit_secret

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_key
```

## Project Features

- ✅ Dark/Light mode
- ✅ Mobile responsive
- ✅ Reddit & YouTube analysis
- ✅ Complaint grouping
- ✅ Trend & business scoring
- ✅ Gamification system
- ✅ Search history
- 🚀 Authentication (in progress)
- 🚀 Database integration (in progress)

## Development

### File Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── dashboard/   # Dashboard components
│   ├── search/      # Search components
│   ├── ui/          # Reusable UI components
│   └── providers/   # Context providers
├── lib/             # Utilities and helpers
│   ├── api/         # API integrations
│   ├── analysis.ts  # Trend analysis logic
│   ├── store.ts     # Zustand stores
│   └── supabase.ts  # Supabase client
└── styles/          # Global styles
```

## API Integration

### Reddit API
- Search comments and posts
- Filter by topic and keywords
- No authentication required (public endpoints)

### YouTube API
- Search videos
- Fetch and analyze comments
- Requires API key from Google Cloud Console

## Database Schema

### Supabase Tables
- `users` - User accounts
- `searches` - Search history
- `complaints` - Analyzed complaints
- `opportunities` - Business opportunities
- `user_coins` - Gamification currency
- `user_badges` - Achievement system

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t trendforge .
docker run -p 3000:3000 trendforge
```

## Testing

```bash
npm run lint
npm run type-check
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Support

For issues and feature requests, please open a GitHub issue.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
