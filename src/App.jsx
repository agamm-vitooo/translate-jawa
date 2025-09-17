import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";

import Header from "./components/Header";
import HeaderAdmin from "./pages/admin/components/Header-Admin";
import Home from "./pages/Home";
import AksaraPage from "./pages/Aksara-Jawa";
import TentangPage from "./pages/About";
import Guestbook from "./pages/Guest";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/auth/Auth";
import Guest from "./pages/admin/Guest";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// Komponen Protected Route
function ProtectedRoute({ session, children }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      {location.pathname.startsWith("/admin") ? (
        <HeaderAdmin />
      ) : location.pathname !== "/login" ? (
        <Header />
      ) : null}

      <main className="p-6">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/aksara" element={<AksaraPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/guestbook" element={<Guestbook />} />

          {/* Auth */}
          <Route
            path="/login"
            element={session ? <Navigate to="/admin/dashboard" /> : <Login />}
          />

          {/* Admin (protected) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute session={session}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/guest"
            element={
              <ProtectedRoute session={session}>
                <Guest/>
              </ProtectedRoute>
            }
          />

          {/* Jika path lain, redirect ke home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppWrapper;
