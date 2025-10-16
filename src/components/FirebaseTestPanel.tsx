import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { firebaseParkingService, ParkingSlots } from '@/lib/firebaseService';
import { Wifi, WifiOff, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function FirebaseTestPanel() {
  const [slots, setSlots] = useState<ParkingSlots>({});
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = firebaseParkingService.subscribeToMaharagamaSlots((data) => {
      setSlots(data);
      setIsConnected(true);
      setLastUpdate(new Date());
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTestUpdate = async () => {
    setIsLoading(true);
    try {
      // Test updating slot 1 to occupied
      await firebaseParkingService.updateSlotStatus(1, true);
      setTimeout(async () => {
        // Then set it back to free after 3 seconds
        await firebaseParkingService.updateSlotStatus(1, false);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Test update failed:', error);
      setIsLoading(false);
    }
  };

  const getSlotStatus = (slotNumber: number) => {
    return slots[slotNumber.toString()] ? 'occupied' : 'free';
  };

  const getStatusColor = (status: string) => {
    return status === 'occupied' ? 'bg-red-500' : 'bg-green-500';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Firebase Real-time Test Panel
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            isConnected 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm">
              Firebase Connection: {isConnected ? 'Active' : 'Inactive'}
            </span>
          </div>
          {lastUpdate && (
            <span className="text-xs text-muted-foreground">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Test Button */}
        <div className="flex gap-2">
          <Button 
            onClick={handleTestUpdate}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Test Update (Slot 1)
          </Button>
        </div>

        {/* Current Slot Status */}
        <div>
          <h3 className="text-sm font-medium mb-2">Current Slot Status:</h3>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((slotNumber) => {
              const status = getSlotStatus(slotNumber);
              return (
                <div key={slotNumber} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-1 ${getStatusColor(status)}`} />
                  <div className="text-xs font-medium">Slot {slotNumber}</div>
                  <Badge variant={status === 'occupied' ? 'destructive' : 'default'} className="text-xs">
                    {status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Raw Data Display */}
        <div>
          <h3 className="text-sm font-medium mb-2">Raw Firebase Data:</h3>
          <pre className="bg-muted p-3 rounded text-xs overflow-auto">
            {JSON.stringify(slots, null, 2)}
          </pre>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Instructions:</strong></p>
          <p>• Green dots = Free slots</p>
          <p>• Red dots = Occupied slots</p>
          <p>• Click "Test Update" to simulate Arduino sensor data</p>
          <p>• Data updates automatically when Arduino sends new values</p>
        </div>
      </CardContent>
    </Card>
  );
}