import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = "/dashboard",
  requireAdmin = false 
}: ProtectedRouteProps) {
  const { user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to access this page.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has admin role for admin-only routes
  if (requireAdmin) {
    const userRole = user.publicMetadata?.role;
    if (userRole !== "admin") {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
}
