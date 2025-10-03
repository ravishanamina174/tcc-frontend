// Firebase connection test utility
// This file can be used to test Firebase connectivity during development

import { firebaseParkingService } from '../lib/firebaseService';

export const testFirebaseConnection = () => {
  console.log('🧪 Testing Firebase connection...');
  
  // Test subscription
  const unsubscribe = firebaseParkingService.subscribeToMaharagamaSlots((data) => {
    console.log('✅ Firebase connection successful!');
    console.log('📊 Received data:', data);
    unsubscribe(); // Clean up after test
  });

  // Test initialization
  firebaseParkingService.initializeMaharagamaSlots()
    .then(() => {
      console.log('✅ Firebase initialization successful!');
    })
    .catch((error) => {
      console.error('❌ Firebase initialization failed:', error);
    });
};

// Test slot update
export const testSlotUpdate = async (slotNumber: number, occupied: boolean) => {
  console.log(`🧪 Testing slot ${slotNumber} update to ${occupied ? 'occupied' : 'free'}...`);
  
  try {
    await firebaseParkingService.updateSlotStatus(slotNumber, occupied);
    console.log('✅ Slot update successful!');
  } catch (error) {
    console.error('❌ Slot update failed:', error);
  }
};

// Run tests if this file is imported directly
if (import.meta.hot) {
  // Only run in development
  console.log('🔧 Firebase test utilities loaded. Use testFirebaseConnection() to test.');
}

