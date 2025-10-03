import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusDot, { SlotStatus } from "@/components/StatusDot";
import { MapPin } from "lucide-react";
import { getParkingCenterById } from "@/lib/parkingData";




export default function SpotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the actual parking center data based on the ID
  const center = getParkingCenterById(id || "");
  
  // If center not found, show error or redirect
  if (!center) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-red-600">Parking center not found</h1>
        <p className="mt-2 text-muted-foreground">The parking center you're looking for doesn't exist.</p>
      </div>
    );
  }

  const slots = useMemo(() => {
    const statuses: SlotStatus[] = ["free", "reserved", "occupied"];
    const seed = (id?.charCodeAt(0) || 1) + (id?.length || 0);
    return Array.from({ length: 12 }, (_, i) => {
      const status = statuses[(seed + i) % statuses.length];
      return { number: i + 1, status } as { number: number; status: SlotStatus };
    });
  }, [id]);

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
        centerId: center.id,
        centerName: center.name,
        centerAddress: center.address,
        slotNumber: slot.number,
        status: slot.status,
        timerSeconds: 0, // Start timer at 0
      },
    });
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{center.name} | ParkNet</title>
        <meta name="description" content="Parking spot details with visual slot grid and reservation options." />
        <link rel="canonical" href={`/spots/${id}`} />
      </Helmet>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <img src={center.image} alt={`${center.name} photo`} className="w-full rounded-lg border" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{center.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{center.address}</span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2"><StatusDot status="free" /><span className="text-xs text-muted-foreground">Free</span></div>
                <div className="mt-1 text-2xl font-semibold">{center.counts.free}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2"><StatusDot status="reserved" /><span className="text-xs text-muted-foreground">Reserved</span></div>
                <div className="mt-1 text-2xl font-semibold">{center.counts.reserved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex justify-center gap-2"><StatusDot status="occupied" /><span className="text-xs text-muted-foreground">Occupied</span></div>
                <div className="mt-1 text-2xl font-semibold">{center.counts.occupied}</div>
              </CardContent>
            </Card>
          </div>

          <section className="mt-6" aria-label="Available slots">
            <h2 className="text-lg font-semibold">Select a Slot</h2>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {slots.map((slot) => {
                const isClickable = slot.status === "free";
                return (
                  <button
                    key={slot.number}
                    type="button"
                    onClick={() => onSelectSlot(slot)}
                    style={styleFor(slot.status)}
                    className={`rounded-lg border p-3 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                      isClickable 
                        ? "hover:opacity-90 cursor-pointer" 
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    aria-label={`Slot ${slot.number} - ${slot.status}`}
                    disabled={!isClickable}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <StatusDot status={slot.status} />
                      <span className="text-xs capitalize text-muted-foreground">{slot.status}</span>
                    </div>
                    <div className="mt-1 text-xl font-semibold">#{slot.number}</div>
                    {!isClickable && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {slot.status === "reserved" ? "Reserved" : "Occupied"}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Only green (free) slots can be selected for reservation.
            </div>
          </section>

          <div className="mt-6 flex gap-3">
            <Button>Reserve a Slot</Button>
            <Button variant="outline">Navigate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
