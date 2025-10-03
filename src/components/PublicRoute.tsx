import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({ children, redirectTo = "/dashboard" }: PublicRouteProps) {
  const { user, isLoaded } = useUser();

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

  // If user is signed in, redirect them away from public routes
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
