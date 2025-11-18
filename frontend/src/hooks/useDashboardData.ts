import { useState, useEffect, useCallback } from 'react';
// ⚠️ We intentionally DO NOT import from '../lib/api' here to prevent the crash.

// --- SELF-CONTAINED TYPE DEFINITIONS ---
// These match the definitions we previously put in api.ts, ensuring Home.tsx still works.
type Booking = {
  id: string | number;
  type?: string;        
  item?: string;        
  date?: string;        
  time?: string;        
  location?: string;    
};

type Event = {
  id: number;
  title?: string;
  date?: string;
  time?: string;
  volunteers?: number;
  maxVolunteers?: number;
};

type Announcement = {
  id: number;
  title?: string;
  message?: string;
  date?: string;
};

interface DashboardData {
  upcomingBookings: Booking[];
  upcomingEvents: Event[];
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
}
// --- END SELF-CONTAINED TYPES ---

export const useDashboardData = (userId: string | undefined): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    upcomingBookings: [],
    upcomingEvents: [],
    announcements: [],
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!userId) {
      setData((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      // Simulate a network delay (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      // Always return empty arrays for initial rendering
      const fetchedBookings: Booking[] = [];
      const fetchedEvents: Event[] = [];     
      const fetchedAnnouncements: Announcement[] = []; 

      setData({
        upcomingBookings: fetchedBookings,
        upcomingEvents: fetchedEvents,
        announcements: fetchedAnnouncements,
        isLoading: false,
        error: null,
      });

    } catch (err) {
      console.error("Dashboard Hook Failed:", err);
      setData({
        upcomingBookings: [],
        upcomingEvents: [],
        announcements: [],
        isLoading: false,
        error: "Critical render error. Check console.",
      });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setData((prev) => ({ ...prev, isLoading: true }));
      fetchData();
    }
  }, [userId, fetchData]);

  return data;
};