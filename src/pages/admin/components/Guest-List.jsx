import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function GuestList({ maxHeight }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div
      className={`overflow-y-auto pr-2 ${maxHeight ? maxHeight : ''} `}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
      }}
    >
      {loading ? (
        <p className="text-gray-500 col-span-full text-center">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">Belum ada pesan</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white p-4 rounded-xl shadow break-words"
            style={{ minHeight: '80px' }}
          >
            <p className="font-semibold text-blue-600">{entry.name}</p>
            {entry.email && <p className="text-sm text-gray-500">{entry.email}</p>}
            <p className="mt-2">{entry.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(entry.created_at).toLocaleString("id-ID")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
