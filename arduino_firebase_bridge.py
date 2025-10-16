#!/usr/bin/env python3
"""
Arduino Firebase Bridge
Connects your existing Arduino code to Firebase by reading serial output
and converting it to the format expected by the web app.

Your Arduino outputs: "FR" (Free), "OC" (Occupied), "--" (Unknown)
Web app expects: true (Occupied), false (Free)
"""

import serial
import time
import requests
import json
import re
from datetime import datetime

# Configuration - UPDATE THESE VALUES
SERIAL_PORT = 'COM3'  # Windows: COM3, COM4, etc. | Mac/Linux: /dev/ttyUSB0, /dev/ttyACM0
BAUD_RATE = 115200
FIREBASE_URL = "https://parknet-parking-default-rtdb.asia-southeast1.firebasedatabase.app/maharagama/slots.json"

# Optional: Add authentication if needed
FIREBASE_AUTH_TOKEN = ""  # Leave empty if not using authentication

class ArduinoFirebaseBridge:
    def __init__(self):
        self.serial_connection = None
        self.last_status = {}
        
    def connect_arduino(self):
        """Connect to Arduino via serial port"""
        try:
            self.serial_connection = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
            print(f"✅ Connected to Arduino on {SERIAL_PORT}")
            return True
        except Exception as e:
            print(f"❌ Failed to connect to Arduino: {e}")
            print(f"Available ports: {self.list_serial_ports()}")
            return False
    
    def list_serial_ports(self):
        """List available serial ports"""
        import serial.tools.list_ports
        ports = serial.tools.list_ports.comports()
        return [port.device for port in ports]
    
    def parse_arduino_output(self, line):
        """Parse Arduino serial output to extract slot status"""
        # Your Arduino outputs: "S1: 25.3 cm → FR"
        # Extract slot number and status
        pattern = r'S(\d+):\s*[\d.]+\s*cm\s*→\s*(\w+)'
        match = re.search(pattern, line)
        
        if match:
            slot_number = int(match.group(1))
            status = match.group(2)
            
            # Convert Arduino status to Firebase format
            if status == "OC":
                return slot_number, True   # Occupied
            elif status == "FR":
                return slot_number, False  # Free
            else:  # "--" or unknown
                return None, None
        
        return None, None
    
    def update_firebase(self, slot_data):
        """Update Firebase with new slot data"""
        try:
            headers = {
                'Content-Type': 'application/json'
            }
            
            # Add auth token if provided
            if FIREBASE_AUTH_TOKEN:
                headers['Authorization'] = f'Bearer {FIREBASE_AUTH_TOKEN}'
            
            # Convert slot data to Firebase format
            firebase_data = {}
            for slot_num, is_occupied in slot_data.items():
                firebase_data[str(slot_num)] = is_occupied
            
            response = requests.put(FIREBASE_URL, json=firebase_data, headers=headers)
            
            if response.status_code == 200:
                print(f"✅ Firebase updated: {firebase_data}")
                return True
            else:
                print(f"❌ Firebase update failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Firebase update error: {e}")
            return False
    
    def run(self):
        """Main loop to read Arduino output and update Firebase"""
        if not self.connect_arduino():
            return
        
        print("🔄 Starting Arduino-Firebase bridge...")
        print("📡 Reading Arduino output and updating Firebase...")
        print("Press Ctrl+C to stop")
        
        try:
            while True:
                if self.serial_connection.in_waiting > 0:
                    line = self.serial_connection.readline().decode('utf-8').strip()
                    
                    if line:
                        print(f"📥 Arduino: {line}")
                        
                        # Parse the line
                        slot_num, is_occupied = self.parse_arduino_output(line)
                        
                        if slot_num is not None and is_occupied is not None:
                            # Update our local status
                            self.last_status[slot_num] = is_occupied
                            
                            # Update Firebase every time we get new data
                            self.update_firebase(self.last_status)
                
                time.sleep(0.1)  # Small delay to prevent excessive CPU usage
                
        except KeyboardInterrupt:
            print("\n🛑 Bridge stopped by user")
        except Exception as e:
            print(f"❌ Error: {e}")
        finally:
            if self.serial_connection:
                self.serial_connection.close()
                print("🔌 Arduino connection closed")

def main():
    print("🚗 ParkNet Arduino-Firebase Bridge")
    print("==================================")
    print(f"📡 Serial Port: {SERIAL_PORT}")
    print(f"🌐 Firebase URL: {FIREBASE_URL}")
    print()
    
    # Check if requests library is available
    try:
        import requests
    except ImportError:
        print("❌ Error: 'requests' library not found")
        print("Install it with: pip install requests")
        return
    
    # Check if pyserial library is available
    try:
        import serial
    except ImportError:
        print("❌ Error: 'pyserial' library not found")
        print("Install it with: pip install pyserial")
        return
    
    bridge = ArduinoFirebaseBridge()
    bridge.run()

if __name__ == "__main__":
    main()

