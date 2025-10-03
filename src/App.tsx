import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider } from "@clerk/clerk-react";
import TopNav from "./components/layout/TopNav";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import SpotDetails from "./pages/SpotDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyReservations from "./pages/MyReservations";

const queryClient = new QueryClient();

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}

const App = () => (
  <ClerkProvider publishableKey={clerkPubKey}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TopNav />
            <Routes>
              {/* Public routes - accessible to everyone */}
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth routes - redirect signed-in users to dashboard */}
              <Route path="/login" element={
                <PublicRoute redirectTo="/dashboard">
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute redirectTo="/dashboard">
                  <Signup />
                </PublicRoute>
              } />
              
              {/* Protected routes - require authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/reservations" element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              } />
              <Route path="/my-reservations" element={
                <ProtectedRoute>
                  <MyReservations />
                </ProtectedRoute>
              } />
              <Route path="/spots/:id" element={<SpotDetails />} />
              
              {/* Admin-only routes */}
              <Route path="/settings" element={
                <AdminRoute>
                  <Settings />
                </AdminRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
