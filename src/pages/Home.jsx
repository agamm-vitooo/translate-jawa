import { useEffect, useState } from "react";
import TranslateForm from "../components/TranslateForm";
import ResultBox from "../components/ResultBox";
import { createClient } from "@supabase/supabase-js";

// 🔑 Inisialisasi client Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Home() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  // ⏺️ Log kunjungan
  useEffect(() => {
    async function logVisit() {
      await supabase.from("visits").insert([
        { user_agent: navigator.userAgent }
      ]);
    }
    logVisit();
  }, []);

  // 📖 Ambil kamus JSON
  useEffect(() => {
    fetch("/kamus2.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 🔔 Alert pengembangan */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-xl shadow">
        <p className="font-semibold">⚠️ Website ini sedang dalam tahap pengembangan.</p>
        <p className="text-sm">Beberapa fitur mungkin belum berfungsi dengan sempurna.</p>
      </div>

      {/* Grid Translate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Cari Kata</h2>
          <TranslateForm data={data} onTranslate={setResult} />
        </div>

        {/* Kanan */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Hasil Terjemahan</h2>
          <ResultBox result={result} />
        </div>
      </div>
    </div>
  );
}
