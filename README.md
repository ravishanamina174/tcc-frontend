# ParkNet - Smart Parking Solution

A modern React application for smart parking management with real-time status updates and reservation system.

## Features

- 🔐 **Clerk Authentication** - Secure authentication with Gmail OAuth support
- 🎨 **Modern UI** - Built with Shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚗 **Smart Parking** - Real-time parking spot management
- 📍 **Live Location** - Real-time GPS tracking with Google Maps integration
- 📊 **Dashboard** - User-friendly analytics and monitoring
- 🔒 **Protected Routes** - Secure access to user-specific features

## Authentication

This application uses [Clerk](https://clerk.com/) for authentication with the following features:

- **Gmail OAuth** - Sign in with Google account
- **Email/Password** - Traditional authentication
- **Protected Routes** - Secure access to dashboard, reservations, and settings
- **User Management** - Profile management and logout functionality

## Environment Setup

Create a `.env` file in the root directory with your API keys:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Google Maps API Setup

The live location feature requires a Google Maps API key. Follow these steps:

1. **Get API Key**: Visit [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable Maps JavaScript API**: Search and enable the Maps JavaScript API
3. **Create Credentials**: Generate an API key in the Credentials section
4. **Add to .env**: Copy the key to your `.env` file

For detailed setup instructions, see [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file with your Clerk publishable key
   - Get your key from the [Clerk Dashboard](https://dashboard.clerk.com/)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Authentication Flow

1. **Home Page** - Users can click "Get Started Free" or "Login" buttons
2. **Sign Up** - New users can create accounts with Gmail OAuth or email/password
3. **Sign In** - Existing users can authenticate with their credentials
4. **Protected Pages** - Dashboard, Reservations, Settings, and Admin require authentication
5. **User Menu** - Authenticated users see their profile in the top navigation

## Key Components

- **ClerkProvider** - Wraps the entire app for authentication context
- **ProtectedRoute** - Component to secure pages requiring authentication
- **TopNav** - Navigation with authentication status and user menu
- **Login/Signup Pages** - Clerk authentication components with custom styling

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible components
- **Clerk** - Authentication and user management
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── TopNav.tsx          # Navigation with auth
│   ├── ui/                      # Shadcn/ui components
│   ├── LiveLocationMap.tsx      # Google Maps live location component
│   └── ProtectedRoute.tsx       # Auth protection component
├── pages/
│   ├── Index.tsx               # Home page with auth buttons
│   ├── Login.tsx               # Clerk SignIn component
│   ├── Signup.tsx              # Clerk SignUp component
│   ├── Dashboard.tsx           # Main dashboard with live location
│   ├── Settings.tsx            # User settings with auth
│   └── ...                     # Other pages
└── App.tsx                     # Main app with ClerkProvider
```

## Authentication Features

- ✅ Gmail OAuth integration
- ✅ Email/password authentication
- ✅ Protected routes for sensitive pages
- ✅ User profile management
- ✅ Secure logout functionality
- ✅ Responsive authentication UI
- ✅ Loading states and error handling

## Development

The application is set up with:

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prettier** - Code formatting
- **Tailwind CSS** - Styling
- **Vite** - Fast development server

## Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Ensure your Clerk domain is configured for production

## Support

For authentication issues, check the [Clerk Documentation](https://clerk.com/docs).
