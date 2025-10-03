import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusDot, { SlotStatus } from "@/components/StatusDot";
import { MapPin, Wifi, WifiOff, ArrowLeft, RefreshCw } from "lucide-react";
import { firebaseParkingService, ParkingSlots } from "@/lib/firebaseService";

export default function MaharagamaDetails() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<ParkingSlots>({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = firebaseParkingService.subscribeToMaharagamaSlots((data) => {
      setSlots(data);
      setIsConnected(true);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Calculate counts from slots data
  const counts = {
    free: Object.values(slots).filter(occupied => !occupied).length,
    reserved: 0, // No reservations in this simple setup
    occupied: Object.values(slots).filter(occupied => occupied).length,
  };

  const totalSlots = Object.keys(slots).length || 5;

  // Convert Firebase slots to display format
  const displaySlots = Object.entries(slots).map(([slotNumber, occupied]) => ({
    number: parseInt(slotNumber),
    status: occupied ? "occupied" as SlotStatus : "free" as SlotStatus
  })).sort((a, b) => a.number - b.number);

  const styleFor = (status: SlotStatus): React.CSSProperties => {
    const colorVar = `var(--status-${status})`;
    return {
      background: `hsl(${colorVar} / 0.12)`,
      borderColor: `hsl(${colorVar} / 0.45)`,
    } as React.CSSProperties;
  };

  const onSelectSlot = (slot: { number: number; status: SlotStatus }) => {
    // Only allow clicking on free slots
    if (slot.status !== "free") {
      return;
    }
    
    navigate("/reservations", {
      state: {
        centerId: "maharagama",
        centerName: "Maharagama Car Park",
        centerAddress: "High Level Road, Maharagama",
        slotNumber: slot.number,
        status: slot.status,
        timerSeconds: 0, // Start timer at 0
      },
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // The subscription will automatically update when Firebase data changes
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>Maharagama Car Park | ParkNet</title>
        <meta name="description" content="Real-time parking slot availability at Maharagama Car Park with live updates from sensors." />
        <link rel="canonical" href="/spots/maharagama" />
      </Helmet>

      {/* Header with back button and connection status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Maharagama Car Park</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>High Level Road, Maharagama</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {isConnected ? 'Live Data' : 'Offline'}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1651346863911-d2d8050eea02?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcGFya3N8ZW58MHx8MHx8fDA%3D" 
            alt="Maharagama Car Park photo" 
            className="w-full rounded-lg border" 
          />
        </div>
        
        <div>
          {/* Real-time status cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <StatusDot status="free" />
                  <span className="text-xs text-muted-foreground">Free</span>
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {isLoading ? '...' : counts.free}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <StatusDot status="reserved" />
                  <span className="text-xs text-muted-foreground">Reserved</span>
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {isLoading ? '...' : counts.reserved}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <StatusDot status="occupied" />
                  <span className="text-xs text-muted-foreground">Occupied</span>
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {isLoading ? '...' : counts.occupied}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parking slots grid - 2 rows: 3 slots in first row, 2 in second */}
          <section className="mt-6" aria-label="Available slots">
            <h2 className="text-lg font-semibold mb-4">Parking Slots (Real-time)</h2>
            <div className="space-y-4">
              {/* First row - 3 slots */}
              <div className="grid grid-cols-3 gap-3">
                {displaySlots.slice(0, 3).map((slot) => {
                  const isClickable = slot.status === "free";
                  return (
                    <button
                      key={slot.number}
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      style={styleFor(slot.status)}
                      className={`rounded-lg border p-4 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        isClickable 
                          ? "hover:opacity-90 cursor-pointer" 
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      aria-label={`Slot ${slot.number} - ${slot.status}`}
                      disabled={!isClickable}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <StatusDot status={slot.status} />
                        <span className="text-xs capitalize text-muted-foreground">{slot.status}</span>
                      </div>
                      <div className="text-xl font-semibold">#{slot.number}</div>
                      {!isClickable && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {slot.status === "reserved" ? "Reserved" : "Occupied"}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Second row - 2 slots centered */}
              <div className="grid grid-cols-3 gap-3">
                <div></div> {/* Empty space */}
                {displaySlots.slice(3, 5).map((slot) => {
                  const isClickable = slot.status === "free";
                  return (
                    <button
                      key={slot.number}
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      style={styleFor(slot.status)}
                      className={`rounded-lg border p-4 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        isClickable 
                          ? "hover:opacity-90 cursor-pointer" 
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      aria-label={`Slot ${slot.number} - ${slot.status}`}
                      disabled={!isClickable}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <StatusDot status={slot.status} />
                        <span className="text-xs capitalize text-muted-foreground">{slot.status}</span>
                      </div>
                      <div className="text-xl font-semibold">#{slot.number}</div>
                      {!isClickable && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {slot.status === "reserved" ? "Reserved" : "Occupied"}
                        </div>
                      )}
                    </button>
                  );
                })}
                <div></div> {/* Empty space */}
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>• Green slots are available for reservation</p>
              <p>• Red slots are currently occupied by vehicles</p>
              <p>• Data updates in real-time from parking sensors</p>
            </div>
          </section>

          <div className="mt-6 flex gap-3">
            <Button disabled={counts.free === 0}>
              Reserve a Slot ({counts.free} available)
            </Button>
            <Button variant="outline">Navigate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

