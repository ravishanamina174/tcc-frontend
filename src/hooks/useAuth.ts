import { useUser } from "@clerk/clerk-react";

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();

  const userRole = user?.publicMetadata?.role as string | undefined;
  const isAdmin = userRole === "admin";
  const isNormalUser = isSignedIn && !isAdmin;

  return {
    user,
    isLoaded,
    isSignedIn,
    userRole,
    isAdmin,
    isNormalUser,
  };
}
