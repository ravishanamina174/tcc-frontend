import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusDot, { SlotStatus } from "@/components/StatusDot";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { type ParkingCenter } from "@/lib/parkingData";

export function ParkingCard({ center }: { center: ParkingCenter }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link to={`/spots/${center.id}`} aria-label={`Open ${center.name}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src={center.image}
              alt={`${center.name} parking center image`}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-tight">
                {center.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-500" />
                <span>{center.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{center.address}</span>
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
                    {center.counts[key]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ParkingCard;
