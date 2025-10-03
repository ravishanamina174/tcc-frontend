import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Locate, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
};

const defaultCenter = {
  lat: 37.7749, // Default to San Francisco coordinates
  lng: -122.4194,
};

interface LiveLocationMapProps {
  className?: string;
}

function LiveLocationMap({ className }: LiveLocationMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Get API key from environment variable or use placeholder
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        
        setUserLocation(newLocation);
        
        // Center the map on user's location
        if (map) {
          map.setCenter(newLocation);
          map.setZoom(15);
        }
        
        toast.success('Location updated successfully!');
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        toast.error(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    // Try to get user location on component mount
    getUserLocation();
  }, []);

  if (loadError) {
    return (
      <div className={`bg-destructive/10 border border-destructive/20 rounded-lg p-8 text-center ${className}`}>
        <MapPin className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-destructive mb-2">Failed to Load Google Maps</h3>
        <p className="text-muted-foreground mb-4">
          {apiKey === 'YOUR_GOOGLE_MAPS_API_KEY' 
            ? 'Please configure your Google Maps API key. See GOOGLE_MAPS_SETUP.md for instructions.'
            : 'There was an error loading Google Maps. Please check your API key and try again.'
          }
        </p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <Locate className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`bg-muted rounded-lg p-8 text-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Google Maps...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Your Live Location
        </h3>
        <Button
          onClick={getUserLocation}
          disabled={isLoadingLocation}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Locate className="h-4 w-4" />
          {isLoadingLocation ? 'Updating...' : 'Update Location'}
        </Button>
      </div>
      
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || defaultCenter}
          zoom={userLocation ? 15 : 10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12),
              }}
              title="Your current location"
            />
          )}
        </GoogleMap>
        
        {!userLocation && (
          <div className="absolute inset-0 bg-muted/80 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Click "Update Location" to show your current position</p>
            </div>
          </div>
        )}
      </div>
      
      {userLocation && (
        <div className="text-sm text-muted-foreground text-center">
          <p>Latitude: {userLocation.lat.toFixed(6)}</p>
          <p>Longitude: {userLocation.lng.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
}

export default LiveLocationMap;
