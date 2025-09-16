// src/components/HeaderAdmin.jsx
import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();

      // reload untuk bypass ProtectedRoute
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <nav className="space-x-4">
          <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/guest"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Guest List
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        disabled={loading}
        className={`bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}
