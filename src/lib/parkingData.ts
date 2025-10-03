export interface ParkingCenter {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
  counts: {
    free: number;
    reserved: number;
    occupied: number;
  };
}

export const parkingCenters: ParkingCenter[] = [
  {
    id: "1",
    name: "Maharagama Car Park",
    address: "High Level Road, Maharagama",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1651346863911-d2d8050eea02?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcGFya3N8ZW58MHx8MHx8fDA%3D",
    counts: { free: 18, reserved: 6, occupied: 24 },
  },
  {
    id: "2",
    name: "Sampath Bank Car Park",
    address: "Nugegoda branch",
    rating: 4.4,
    image: "https://plus.unsplash.com/premium_photo-1724766409757-340b71bc798f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhciUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
    counts: { free: 10, reserved: 12, occupied: 30 },
  },
  {
    id: "3",
    name: "Supermarket Car Park",
    address: "Cargills Food City",
    rating: 4.2,
    image: "https://plus.unsplash.com/premium_photo-1754269234247-65a89a8257b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    counts: { free: 22, reserved: 4, occupied: 17 },
  },
  {
    id: "4",
    name: "Nugegoda Public Car Park",
    address: "Nugegoda town,next to the bus stand",
    rating: 4.7,
    image: "https://media.istockphoto.com/id/1314155790/photo/cars-in-the-parking-lot.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wf5lVZFiNuwzRJnmJFqjxwn69FP5D6tQaKouCh-u_rM=",
    counts: { free: 8, reserved: 10, occupied: 36 },
  },
  {
    id: "5",
    name: "ODEL Car Park",
    address: "Ward Place, Colombo 07",
    rating: 4.5,
    image: "https://media.istockphoto.com/id/2192154244/photo/parking-space-with-white-markings.webp?a=1&b=1&s=612x612&w=0&k=20&c=IvJBLeW_JYuywBNKd0mUq_gPK_Ig5OLsHSxAbQvQoY8=",
    counts: { free: 15, reserved: 8, occupied: 20 },
  },
  {
    id: "6",
    name: "Liberty Plaza Car Park",
    address: "Colombo 05, near Havelock Town",
    rating: 4.3,
    image: "https://plus.unsplash.com/premium_photo-1724766409767-120f58295b83?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhcmtpbmclMjBzbG90c3xlbnwwfHwwfHx8MA%3D%3D",
    counts: { free: 12, reserved: 6, occupied: 28 },
  },
];

export function getParkingCenterById(id: string): ParkingCenter | undefined {
  return parkingCenters.find(center => center.id === id);
}
