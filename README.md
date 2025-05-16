# FeedBridge - Customer Feedback Management

FeedBridge is a modern SaaS application for managing customer feedback. Built with Next.js, TypeScript, and Tailwind CSS, it provides a beautiful and intuitive interface for collecting, organizing, and acting on customer feedback.

## Features

- 🔐 Authentication with NextAuth.js
- 👥 Organization-based user management
- 📝 Create and manage feedback items
- 🏷️ Categorize and prioritize feedback
- 📊 Dashboard with feedback statistics
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Form Handling:** React Hook Form with Zod validation
- **UI Components:** Headless UI
- **Icons:** Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/feedbridge.git
   cd feedbridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   - Set your database URL
   - Generate a secure NEXTAUTH_SECRET (you can use `openssl rand -base64 32`)
   - Add your OAuth provider credentials (optional)

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Development

### Database Migrations

To create a new migration after modifying the Prisma schema:

```bash
npx prisma migrate dev --name your_migration_name
```

### Type Generation

After modifying the Prisma schema, generate the Prisma Client:

```bash
npx prisma generate
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
