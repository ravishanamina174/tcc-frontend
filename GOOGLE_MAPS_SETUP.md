# Google Maps API Setup for Live Location Component

## Prerequisites
1. A Google Cloud Platform account
2. A project in Google Cloud Console

## Steps to Get Google Maps API Key

### 1. Enable Google Maps JavaScript API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Maps JavaScript API"
5. Click on it and press "Enable"

### 2. Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 3. Restrict API Key (Recommended)
1. Click on the created API key
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your domain (e.g., `localhost:8080/*` for development)
4. Under "API restrictions", select "Restrict key" and choose "Maps JavaScript API"

### 4. Update Your Code
Replace `'YOUR_GOOGLE_MAPS_API_KEY'` in `src/components/LiveLocationMap.tsx` with your actual API key:

```typescript
const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: 'YOUR_ACTUAL_API_KEY_HERE',
});
```

## Environment Variables (Alternative)
For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

2. Update the component to use the environment variable:
```typescript
googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
```

## Features of the Live Location Component
- ✅ Automatic location detection on component mount
- ✅ Manual location update button
- ✅ Real-time geolocation using browser APIs
- ✅ Interactive Google Map with custom marker
- ✅ Error handling for location permissions
- ✅ Responsive design with Tailwind CSS
- ✅ Toast notifications for user feedback

## Browser Compatibility
- Modern browsers with Geolocation API support
- HTTPS required for production (geolocation doesn't work on HTTP)
- User must grant location permission

## Troubleshooting
- **"Geolocation is not supported"**: Update your browser
- **"Location access denied"**: Check browser location permissions
- **"Location information unavailable"**: Try again or check device GPS
- **Map not loading**: Verify API key and billing setup
