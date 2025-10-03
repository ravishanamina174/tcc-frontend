# Firebase Setup for ParkNet

This document explains how to set up Firebase Realtime Database for the ParkNet parking management system.

## Prerequisites

1. A Firebase project (create one at https://console.firebase.google.com/)
2. Firebase Realtime Database enabled
3. Node.js and npm installed

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `parknet-parking` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Realtime Database

1. In your Firebase project, go to "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose "Start in test mode" for development
4. Select a location (choose closest to your users)
5. Click "Done"

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon) → General tab
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`) to add a web app
4. Enter app nickname: `parknet-frontend`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Firebase configuration:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   ```

### 5. Database Structure

The Firebase Realtime Database should have this structure:

```json
{
  "maharagama": {
    "slots": {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false
    }
  }
}
```

### 6. Database Rules (Security)

Update your database rules in Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "maharagama": {
      "slots": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**Note**: These rules allow public read/write access. For production, implement proper authentication.

### 7. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/dashboard`
3. Click on "Maharagama Car Park" card
4. You should see the real-time parking slots page
5. The slots should show as "Free" (green) initially

### 8. Hardware Integration

To connect your ESP32 parking prototype:

1. Install Firebase Arduino library in Arduino IDE
2. Use this code structure in your ESP32:

```cpp
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

// Firebase configuration
#define API_KEY "your_firebase_api_key"
#define DATABASE_URL "https://your-project-default-rtdb.firebaseio.com/"

// Sensor pins
#define SENSOR_1_PIN 2
#define SENSOR_2_PIN 3
// ... more sensors

void setup() {
  // Initialize WiFi and Firebase
  // Set up ultrasonic sensors
}

void loop() {
  // Read sensor values
  bool slot1_occupied = readUltrasonicSensor(SENSOR_1_PIN);
  bool slot2_occupied = readUltrasonicSensor(SENSOR_2_PIN);
  // ... more slots
  
  // Update Firebase
  Firebase.RTDB.setBool(&fbdo, "maharagama/slots/1", slot1_occupied);
  Firebase.RTDB.setBool(&fbdo, "maharagama/slots/2", slot2_occupied);
  // ... more slots
  
  delay(1000); // Update every second
}
```

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Check that all environment variables are set correctly
   - Verify the Firebase configuration object

2. **"Permission denied" error**
   - Check database rules in Firebase Console
   - Ensure read/write permissions are enabled

3. **Real-time updates not working**
   - Check browser console for errors
   - Verify Firebase project is active
   - Check network connectivity

4. **Slots not showing**
   - Manually add data to Firebase Console
   - Check the database structure matches expected format

### Manual Data Entry

To manually test the system:

1. Go to Firebase Console → Realtime Database
2. Click on the database URL
3. Add this structure:
   ```json
   {
     "maharagama": {
       "slots": {
         "1": false,
         "2": true,
         "3": false,
         "4": true,
         "5": false
       }
     }
   }
   ```

This will show slots 2 and 4 as occupied (red) and slots 1, 3, and 5 as free (green).

## Production Considerations

1. **Security Rules**: Implement proper authentication and authorization
2. **Data Validation**: Add validation rules for slot data
3. **Error Handling**: Implement robust error handling and retry logic
4. **Monitoring**: Set up Firebase monitoring and alerts
5. **Backup**: Configure automatic database backups

## Support

For issues with this setup, check:
- Firebase Console for database errors
- Browser developer console for JavaScript errors
- Network tab for failed requests

