// References:
// - https://reactrouter.com/en/main/start/tutorial
// - https://www.w3schools.com/react/react_router.asp

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// Updated import to point to new DashboardLayout
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import Login from './pages/Login.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Updated to use DashboardLayout instead of the old Home component */}
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;