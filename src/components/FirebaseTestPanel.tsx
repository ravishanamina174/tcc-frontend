import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { firebaseParkingService } from '@/lib/firebaseService';

export function FirebaseTestPanel() {
  const [slots, setSlots] = useState<{ [key: string]: boolean }>({});
  const [isConnected, setIsConnected] = useState(false);

  // Subscribe to real-time updates
  const handleSubscribe = () => {
    const unsubscribe = firebaseParkingService.subscribeToMaharagamaSlots((data) => {
      setSlots(data);
      setIsConnected(true);
    });
    return unsubscribe;
  };

  // Update slot status
  const handleSlotToggle = async (slotNumber: number, occupied: boolean) => {
    try {
      await firebaseParkingService.updateSlotStatus(slotNumber, occupied);
      console.log(`Slot ${slotNumber} updated to ${occupied ? 'occupied' : 'free'}`);
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  // Initialize slots
  const handleInitialize = async () => {
    try {
      await firebaseParkingService.initializeMaharagamaSlots();
      console.log('Slots initialized');
    } catch (error) {
      console.error('Error initializing slots:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Firebase Test Panel</CardTitle>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleSubscribe} variant="outline" size="sm">
            Subscribe
          </Button>
          <Button onClick={handleInitialize} variant="outline" size="sm">
            Initialize
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Parking Slots</Label>
          {[1, 2, 3, 4, 5].map((slotNumber) => (
            <div key={slotNumber} className="flex items-center justify-between">
              <Label htmlFor={`slot-${slotNumber}`} className="text-sm">
                Slot {slotNumber}
              </Label>
              <Switch
                id={`slot-${slotNumber}`}
                checked={slots[slotNumber.toString()] || false}
                onCheckedChange={(checked) => handleSlotToggle(slotNumber, checked)}
              />
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Use this panel to test Firebase connectivity and update slot statuses.
          Changes will be reflected in real-time on the Maharagama page.
        </div>
      </CardContent>
    </Card>
  );
}

export default FirebaseTestPanel;

