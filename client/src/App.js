import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>

    </Router>
  );
}

export default App;
