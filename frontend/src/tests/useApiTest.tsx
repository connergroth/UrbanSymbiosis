/* 
  This file is to test the useApiClient in api.ts for user and booking routes
*/

import { useEffect } from 'react';
import { useApi } from '../lib/api.ts';

export function TestComponent() {
  const { getUsers, getUserById, getBookings, getBookingById } = useApi();

  useEffect(() => {
    async function test() {
      // GET /users
      try {
        const users = await getUsers();
        console.log('Users:', users);
      } catch (err: any) {
        console.error('Error fetching users:', err.message);
      }

      // GET /users/:id
      try {
        const usersById = await getUserById('1');
        console.log('Users by ID:', usersById);
      } catch (err: any) {
        console.error('Error fetching users by ID:', err.message);
      }

      // GET /bookings
      try {
        const bookings = await getBookings();
        console.log('Bookings:', bookings);
      } catch (err: any) {
        console.error('Error fetching bookings:', err.message);
      }

      // GET /booking/:id
      try {
        const bookingsById = await getBookingById('bookingID');
        console.log('Bookings by ID:', bookingsById);
      } catch (err: any) {
        console.error('Error fetching bookings by ID:', err.message);
      }
    }
    test();
  }, [getUsers, getUserById, getBookings, getBookingById]);

  return null;
}
