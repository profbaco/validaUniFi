import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  isActive: boolean;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const socket = io(BACKEND_URL);

function App() {
  // ... rest of the component remains the same
}

export default App;