import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Nama & Pesan wajib diisi");

    setLoading(true);

    const { error } = await supabase.from("guestbook").insert([
      {
        name,
        email,
        message,
      },
    ]);

    setLoading(false);

    if (!error) {
      setName("");
      setEmail("");
      setMessage("");
      fetchEntries();
    } else {
      alert("Gagal mengirim pesan");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Buku Tamu + Entries */}
          <div className="flex flex-col justify-center items-center lg:items-center min-h-[80vh] space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Buku Tamu</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Bagikan kesan, pesan, atau saran Anda. Kami senang mendengar dari Anda!
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="space-y-6">
            <div className="bg-white backdrop-blur-sm bg-opacity-80 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-blue-900 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">✍️</span>
                  Tulis Pesan Anda
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email <span className="text-gray-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300"
                    placeholder="nama@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Pesan *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300 resize-none"
                    rows={6}
                    placeholder="Bagikan kesan, saran, atau pesan Anda di sini..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Mengirim...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Kirim Pesan</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <span>💝</span>
            <p className="text-sm">
              Terima kasih telah berkunjung dan meninggalkan pesan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
