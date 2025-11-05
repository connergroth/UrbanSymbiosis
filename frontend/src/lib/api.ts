// API Client for backend requests

import { supabase } from './supabase';

// Base API URL - use Vite proxy in dev, env var in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Type definitions for API responses
// TODO: Update these based on actual database schema from DATABASE_SCHEMA.md (I will get this set up soon, so you can leave these types for now)
export interface User {
  id: string;
  email: string;
  full_name?: string;
  display_name?: string;
  // TODO: Add more fields from profiles table
}

export interface Booking {
  id: string;
  space_id: string;
  user_id: string;
  start_time: string; // ISO timestamp
  end_time: string; // ISO timestamp
  // TODO: Add more fields from space_bookings table
}

// API Error response type
export interface ApiError {
  error: string;
  message?: string;
}

// Base API client function
// TODO: Implement fetch wrapper with:
// - JWT token handling from AuthContext
// - Error handling (network errors, 4xx, 5xx)
// - Proper headers (Content-Type, Authorization)
// - CORS handling
async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // TODO: Get JWT token from supabase session
  // const session = await supabase.auth.getSession();
  // const token = session.data.session?.access_token;

  // TODO: Implement fetch with error handling
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

