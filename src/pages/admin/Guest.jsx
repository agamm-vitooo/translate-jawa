import { useState } from "react";
import { supabase } from "../../supabaseClient";
import GuestList from "../../pages/admin/components/Guest-List";

export default function Guest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Nama & Pesan wajib diisi");

    setLoading(true);

    const { error } = await supabase.from("guestbook").insert([
      { name, email, message }
    ]);

    setLoading(false);

    if (!error) {
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Gagal mengirim pesan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Buku Tamu</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <GuestList maxHeight="max-h-[75vh]" />
      </div>
    </div>
  );
}
