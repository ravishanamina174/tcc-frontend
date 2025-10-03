# Clerk Authentication Setup Guide

## Setting Up Role-Based Access Control

### 1. Clerk Dashboard Configuration

1. **Go to your Clerk Dashboard**: https://dashboard.clerk.com/
2. **Select your application**
3. **Navigate to Users** in the left sidebar
4. **Select a user** you want to make an admin
5. **Click on "Metadata"** tab
6. **Add Public Metadata**:
   - Key: `role`
   - Value: `admin`

### 2. Setting Roles via Clerk API (Alternative)

You can also set user roles programmatically using Clerk's API:

```typescript
// Example: Setting admin role for a user
// This would typically be done in a backend service or Clerk webhook

const response = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    publicMetadata: {
      role: 'admin'
    }
  })
});
```

### 3. User Role Values

- **`admin`**: Full access to all routes including `/admin` and `/settings`
- **`user`** (or any other value): Normal user access to `/dashboard`, `/my-reservations`, `/contact`
- **No role set**: Treated as normal user

### 4. Testing Role-Based Access

1. **Create a test user** in Clerk dashboard
2. **Set their role** to `admin` in public metadata
3. **Sign in** with that user
4. **Navigate to** `/admin` or `/settings` - should work
5. **Change role** to `user` or remove it
6. **Try accessing** `/admin` - should redirect to `/dashboard`

### 5. Environment Variables

Make sure you have these environment variables set:

```env
# .env.local
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# For backend operations (if needed)
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 6. Vercel Deployment

For Vercel deployment, add the environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `VITE_CLERK_PUBLISHABLE_KEY` with your Clerk publishable key

### 7. Troubleshooting

**Common Issues:**

1. **404 Errors**: Make sure your Clerk domain is properly configured in Vercel
2. **Role Not Working**: Check that the `role` metadata is set as `publicMetadata` (not `privateMetadata`)
3. **Redirect Loops**: Ensure your route protection logic is correct

**Debug Role Access:**

```typescript
import { useAuth } from '@/hooks/useAuth';

function DebugComponent() {
  const { userRole, isAdmin, isNormalUser } = useAuth();
  
  console.log('User Role:', userRole);
  console.log('Is Admin:', isAdmin);
  console.log('Is Normal User:', isNormalUser);
  
  return <div>Current Role: {userRole || 'No role set'}</div>;
}
```

### 8. Security Notes

- **Client-side role checks** are for UX only
- **Always validate roles** on your backend API endpoints
- **Use Clerk's webhooks** to sync user data with your database
- **Consider implementing** additional server-side role validation

### 9. Production Considerations

- **Set up Clerk webhooks** for user creation/updates
- **Implement server-side role validation** for API endpoints
- **Use environment-specific** Clerk keys (development vs production)
- **Monitor authentication logs** in Clerk dashboard
