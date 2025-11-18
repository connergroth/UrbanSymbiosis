// API Client for backend requests

import { supabase } from './supabase';

// Base API URL - use Vite proxy in dev, env var in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// --- Type definitions for Data Structures used by the UI ---

export interface User {
  // Base properties expected by the DashboardLayout
  id: string;
  email: string;
  full_name?: string; 
  display_name?: string; 
}

export interface Booking {
  // Properties required for the UI display in Home.tsx
  id: string;
  type: string;        // e.g., "Trailer Rental" or "Workshop Space"
  item: string;        // e.g., "Cargo Trailer" or "Woodworking Shop"
  date: string;        // e.g., "Nov 12, 2025"
  time: string;        // e.g., "10:00 AM - 2:00 PM"
  location: string;    // e.g., "Main Hub"
  
  // Standard Backend properties
  space_id: string;
  user_id: string;
  start_time: string; // ISO timestamp
  end_time: string; // ISO timestamp
}

export interface Event {
  // Properties required for the Upcoming Volunteer Shifts card
  id: number;
  title: string;
  date: string;
  time: string;
  volunteers: number;
  maxVolunteers: number;
}

export interface Announcement {
  // Properties required for the Community Updates sidebar
  id: number;
  title: string;
  message: string;
  date: string;
}

// API Error response type
export interface ApiError {
  error: string;
  message?: string;
}

// --- End Type definitions ---

// Base API client function
async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // TODO: Implement fetch wrapper with JWT token handling, error handling, etc.
  throw new Error('Not implemented');
}

// API functions for users
export async function getUsers(): Promise<User[]> {
  // TODO: Call GET /users endpoint
  throw new Error('Not implemented');
}

export async function getUserById(id: string): Promise<User> {
  // TODO: Call GET /users/:id endpoint
  throw new Error('Not implemented');
}

// API functions for bookings
export async function getBookings(): Promise<Booking[]> {
  // TODO: Call GET /bookings endpoint
  throw new Error('Not implemented');
}

export async function getBookingById(id: string): Promise<Booking> {
  // TODO: Call GET /bookings/:id endpoint
  throw new Error('Not implemented');
}