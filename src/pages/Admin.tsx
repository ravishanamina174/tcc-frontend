import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Grid3X3, 
  Car, 
  Trash2, 
  RotateCcw, 
  Save, 
  Download,
  Move,
  Settings,
  Plus,
  Minus,
  TrendingUp,
  Clock,
  BarChart3
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Slot {
  id: string;
  x: number;
  y: number;
  type: "car" | "disabled" | "entrance" | "exit";
  width: number;
  height: number;
  isDragging?: boolean;
}

// Sample data for charts
const weeklyPeakData = [
  { day: 'Mon', peak: 85, off: 45 },
  { day: 'Tue', peak: 90, off: 50 },
  { day: 'Wed', peak: 95, off: 55 },
  { day: 'Thu', peak: 88, off: 48 },
  { day: 'Fri', peak: 100, off: 60 },
  { day: 'Sat', peak: 75, off: 40 },
  { day: 'Sun', peak: 60, off: 30 },
];

const weeklyFreeTimeData = [
  { day: 'Mon', free: 65, occupied: 35 },
  { day: 'Tue', free: 60, occupied: 40 },
  { day: 'Wed', free: 55, occupied: 45 },
  { day: 'Thu', free: 62, occupied: 38 },
  { day: 'Fri', free: 50, occupied: 50 },
  { day: 'Sat', free: 70, occupied: 30 },
  { day: 'Sun', free: 80, occupied: 20 },
];

const popularSlotsData = [
  { slot: 'A1', usage: 95, color: '#3B82F6' },
  { slot: 'A2', usage: 88, color: '#8B5CF6' },
  { slot: 'B1', usage: 82, color: '#10B981' },
  { slot: 'B2', usage: 78, color: '#F59E0B' },
  { slot: 'C1', usage: 75, color: '#EF4444' },
  { slot: 'C2', usage: 72, color: '#06B6D4' },
];

export default function Admin() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTool, setSelectedTool] = useState<"car" | "disabled" | "entrance" | "exit">("car");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSlot: Slot = {
      id: `slot-${Date.now()}`,
      x,
      y,
      type: selectedTool,
      width: 80,
      height: 60,
    };
    
    setSlots([...slots, newSlot]);
  };

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleSlotMouseDown = (e: React.MouseEvent, slot: Slot) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - slot.x;
    const offsetY = e.clientY - rect.top - slot.y;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    setSelectedSlot(slot);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedSlot || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    // Keep slot within canvas bounds
    const maxX = rect.width - selectedSlot.width;
    const maxY = rect.height - selectedSlot.height;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));
    
    setSlots(prev => prev.map(s => 
      s.id === selectedSlot.id 
        ? { ...s, x: clampedX, y: clampedY }
        : s
    ));
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleDeleteSlot = () => {
    if (selectedSlot) {
      setSlots(slots.filter(s => s.id !== selectedSlot.id));
      setSelectedSlot(null);
    }
  };

  const handleReset = () => {
    setSlots([]);
    setSelectedSlot(null);
  };

  const getSlotIcon = (type: Slot["type"]) => {
    switch (type) {
      case "car":
        return <Car className="h-4 w-4" />;
      case "disabled":
        return <Grid3X3 className="h-4 w-4" />;
      case "entrance":
        return <Move className="h-4 w-4" />;
      case "exit":
        return <Move className="h-4 w-4 rotate-180" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  const getSlotColor = (type: Slot["type"]) => {
    switch (type) {
      case "car":
        return "bg-blue-500/20 border-blue-500/50";
      case "disabled":
        return "bg-gray-500/20 border-gray-500/50";
      case "entrance":
        return "bg-green-500/20 border-green-500/50";
      case "exit":
        return "bg-red-500/20 border-red-500/50";
      default:
        return "bg-blue-500/20 border-blue-500/50";
    }
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>Admin | ParkNet</title>
        <meta name="description" content="Admin tools to design and manage parking slot layouts." />
        <link rel="canonical" href="/admin" />
      </Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Parking Layout Designer</h1>
          <p className="mt-2 text-muted-foreground">
            Drag and drop to create your parking layout. Click on the canvas to place slots.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Layout
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* Tools Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold">Tools</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedTool === "car" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool("car")}
                className="flex items-center gap-2"
              >
                <Car className="h-4 w-4" />
                Car Slot
              </Button>
              <Button
                variant={selectedTool === "disabled" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool("disabled")}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Disabled
              </Button>
              <Button
                variant={selectedTool === "entrance" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool("entrance")}
                className="flex items-center gap-2"
              >
                <Move className="h-4 w-4" />
                Entrance
              </Button>
              <Button
                variant={selectedTool === "exit" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool("exit")}
                className="flex items-center gap-2"
              >
                <Move className="h-4 w-4 rotate-180" />
                Exit
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Slot</h4>
              {selectedSlot ? (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Type: {selectedSlot.type}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Position: ({Math.round(selectedSlot.x)}, {Math.round(selectedSlot.y)})
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Size: {selectedSlot.width} × {selectedSlot.height}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Width:</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSlots(prev => prev.map(s => 
                          s.id === selectedSlot.id 
                            ? { ...s, width: Math.max(40, s.width - 10) }
                            : s
                        ))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs min-w-[2rem] text-center">{selectedSlot.width}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSlots(prev => prev.map(s => 
                          s.id === selectedSlot.id 
                            ? { ...s, width: s.width + 10 }
                            : s
                        ))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Height:</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSlots(prev => prev.map(s => 
                          s.id === selectedSlot.id 
                            ? { ...s, height: Math.max(30, s.height - 10) }
                            : s
                        ))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs min-w-[2rem] text-center">{selectedSlot.height}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSlots(prev => prev.map(s => 
                          s.id === selectedSlot.id 
                            ? { ...s, height: s.height + 10 }
                            : s
                        ))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSlot}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Slot
                  </Button>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  No slot selected
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Layout Canvas</h3>
              <div className="text-sm text-muted-foreground">
                {slots.length} slots placed
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              ref={canvasRef}
              className="relative w-full h-[600px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair"
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            >
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`absolute border-2 rounded-lg p-2 flex items-center justify-center cursor-move transition-all hover:scale-105 ${
                    selectedSlot?.id === slot.id ? "ring-2 ring-primary ring-offset-2" : ""
                  } ${getSlotColor(slot.type)} ${isDragging && selectedSlot?.id === slot.id ? "z-10" : ""}`}
                  style={{
                    left: slot.x,
                    top: slot.y,
                    width: slot.width,
                    height: slot.height,
                    userSelect: "none",
                  }}
                  onMouseDown={(e) => handleSlotMouseDown(e, slot)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlotClick(slot);
                  }}
                >
                  {getSlotIcon(slot.type)}
                </div>
              ))}
              
              {slots.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Grid3X3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Click anywhere to place a slot</p>
                    <p className="text-sm">Use the tools panel to select slot types</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Dashboard Analytics Section */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Parking Analytics Dashboard</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Weekly Peak Parking Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                Weekly Peak Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyPeakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="peak" stroke="#3B82F6" strokeWidth={2} name="Peak Hours" />
                  <Line type="monotone" dataKey="off" stroke="#10B981" strokeWidth={2} name="Off Hours" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Free Time Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Free Time Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weeklyFreeTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="free" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Free Slots" />
                  <Area type="monotone" dataKey="occupied" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Occupied Slots" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Most Popular Parking Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                Popular Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={popularSlotsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="slot" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Slot Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Grid3X3 className="h-5 w-5 text-orange-500" />
                Slot Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Car Slots', value: 65, color: '#3B82F6' },
                      { name: 'Disabled', value: 15, color: '#6B7280' },
                      { name: 'Entrance', value: 10, color: '#10B981' },
                      { name: 'Exit', value: 10, color: '#EF4444' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: 'Car Slots', value: 65, color: '#3B82F6' },
                      { name: 'Disabled', value: 15, color: '#6B7280' },
                      { name: 'Entrance', value: 10, color: '#10B981' },
                      { name: 'Exit', value: 10, color: '#EF4444' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Occupancy Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Daily Occupancy Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weeklyFreeTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
                  <Area 
                    type="monotone" 
                    dataKey="occupied" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3} 
                    name="Occupancy Rate" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
//1234
