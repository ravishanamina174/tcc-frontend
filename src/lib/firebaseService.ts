import { ref, onValue, off, set } from 'firebase/database';
import { database } from '../firebase';

export interface ParkingSlot {
  number: number;
  occupied: boolean;
}

export interface ParkingSlots {
  [key: string]: boolean; // slot number as key, occupied status as value
}

// Firebase service for parking slot management
export class FirebaseParkingService {
  private static instance: FirebaseParkingService;
  private listeners: { [key: string]: () => void } = {};

  static getInstance(): FirebaseParkingService {
    if (!FirebaseParkingService.instance) {
      FirebaseParkingService.instance = new FirebaseParkingService();
    }
    return FirebaseParkingService.instance;
  }

  // Subscribe to real-time updates for Maharagama parking slots
  subscribeToMaharagamaSlots(callback: (slots: ParkingSlots) => void): () => void {
    const slotsRef = ref(database, 'maharagama/slots');
    
    const unsubscribe = onValue(slotsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback(data);
      } else {
        // Initialize with default data if none exists
        this.initializeMaharagamaSlots();
        callback(this.getDefaultSlots());
      }
    }, (error) => {
      console.error('Error listening to Firebase:', error);
    });

    // Store the unsubscribe function
    const listenerId = `maharagama-${Date.now()}`;
    this.listeners[listenerId] = unsubscribe;

    // Return cleanup function
    return () => {
      unsubscribe();
      delete this.listeners[listenerId];
    };
  }

  // Initialize Maharagama slots with default data (5 slots)
  async initializeMaharagamaSlots(): Promise<void> {
    const slotsRef = ref(database, 'maharagama/slots');
    const defaultSlots = this.getDefaultSlots();
    
    try {
      await set(slotsRef, defaultSlots);
      console.log('Maharagama slots initialized with default data');
    } catch (error) {
      console.error('Error initializing Maharagama slots:', error);
    }
  }

  // Get default slot configuration (5 slots, all free initially)
  private getDefaultSlots(): ParkingSlots {
    return {
      '1': false, // free
      '2': false, // free
      '3': false, // free
      '4': false, // free
      '5': false, // free
    };
  }

  // Update a specific slot's status
  async updateSlotStatus(slotNumber: number, occupied: boolean): Promise<void> {
    const slotRef = ref(database, `maharagama/slots/${slotNumber}`);
    
    try {
      await set(slotRef, occupied);
      console.log(`Slot ${slotNumber} updated to ${occupied ? 'occupied' : 'free'}`);
    } catch (error) {
      console.error(`Error updating slot ${slotNumber}:`, error);
    }
  }

  // Clean up all listeners
  cleanup(): void {
    Object.values(this.listeners).forEach(unsubscribe => unsubscribe());
    this.listeners = {};
  }
}

// Export singleton instance
export const firebaseParkingService = FirebaseParkingService.getInstance();

