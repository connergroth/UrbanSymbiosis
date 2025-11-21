// API Client for backend requests

// references:
// https://dmitripavlutin.com/javascript-fetch-async-await/
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

import { useAuth } from '../contexts/AuthContext';

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

export function useApiClient() {
  const { session } = useAuth(); // added wrapping in order to use useAuth() hook
  const token = session?.access_token;

  async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // 4xx, 5xx
        const error: ApiError = await response.json().catch();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error: any) {
      // network errors
      const apiError: ApiError = {
        error: error.message,
      };
      throw apiError;
    }
  }

  return { apiClient };
}

// needed to create a React hook in order to use useAuth()
export function useApi() {
  const { apiClient } = useApiClient();

  // API functions for users
  async function getUsers(): Promise<User[]> {
    return apiClient<User[]>('/users');
  }

  async function getUserById(id: string): Promise<User> {
    return apiClient<User>(`/users/${id}`);
  }

  // API functions for bookings
  async function getBookings(): Promise<Booking[]> {
    return apiClient<Booking[]>('/bookings');
  }

  async function getBookingById(id: string): Promise<Booking> {
    return apiClient<Booking>(`/bookings/${id}`);
  }

  return {
    getUsers,
    getUserById,
    getBookings,
    getBookingById,
  };
}
