import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusDot, { SlotStatus } from "@/components/StatusDot";
import { MapPin, Star, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { firebaseParkingService, ParkingSlots } from "@/lib/firebaseService";

export function MaharagamaCard() {
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

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link to="/spots/maharagama" aria-label="Open Maharagama Car Park">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-blue-200">
          <div className="aspect-[16/9] w-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1651346863911-d2d8050eea02?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcGFya3N8ZW58MHx8MHx8fDA%3D"
              alt="Maharagama Car Park image"
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            {/* Real-time indicator */}
            <div className="absolute top-2 right-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isConnected 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isConnected ? 'Live' : 'Offline'}
              </div>
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-tight">
                Maharagama Car Park
                {isLoading && <span className="text-xs text-muted-foreground ml-2">(Loading...)</span>}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-500" />
                <span>4.6</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>High Level Road, Maharagama</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              {(["free", "reserved", "occupied"] as SlotStatus[]).map((key) => (
                <div key={key} className="rounded-lg border p-2">
                  <div className="flex items-center justify-center gap-2">
                    <StatusDot status={key} />
                    <span className="text-xs capitalize text-muted-foreground">{key}</span>
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {isLoading ? '...' : counts[key]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Total: {totalSlots} slots • Real-time updates
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default MaharagamaCard;

