// Utility functions for Clerk user management
// Note: These are client-side utilities. For production, you'll want to handle role management
// through Clerk's dashboard or their backend API endpoints.

export const CLERK_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type ClerkRole = typeof CLERK_ROLES[keyof typeof CLERK_ROLES];

// Function to check if a user has a specific role
export function hasRole(userRole: string | undefined, requiredRole: ClerkRole): boolean {
  return userRole === requiredRole;
}

// Function to check if user has admin access
export function isAdmin(userRole: string | undefined): boolean {
  return hasRole(userRole, CLERK_ROLES.ADMIN);
}

// Function to check if user has user access
export function isUser(userRole: string | undefined): boolean {
  return hasRole(userRole, CLERK_ROLES.USER);
}

// Function to get role display name
export function getRoleDisplayName(role: string | undefined): string {
  switch (role) {
    case CLERK_ROLES.ADMIN:
      return "Administrator";
    case CLERK_ROLES.USER:
      return "User";
    default:
      return "Guest";
  }
}

// Function to get role badge color
export function getRoleBadgeColor(role: string | undefined): string {
  switch (role) {
    case CLERK_ROLES.ADMIN:
      return "bg-red-100 text-red-800";
    case CLERK_ROLES.USER:
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
