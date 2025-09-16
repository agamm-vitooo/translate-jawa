// src/components/HeaderAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const handleLogout = async () => {
  try {
    await supabase.auth.signOut();

    // beri waktu sebentar supaya listener di App.jsx update session = null
    setTimeout(() => {
      window.location.href = "/"; // pakai reload untuk bypass ProtectedRoute redirect
    }, 100);
  } catch (error) {
    console.error(error.message);
  }
};

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-end items-center shadow-md">
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
