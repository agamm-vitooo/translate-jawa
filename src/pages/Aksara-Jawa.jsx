import { useState, useEffect } from "react";
import TranslateForm from "../components/Aksara/TranslateForm";
import ResultBox from "../components/Aksara/ResultBox";

export default function AksaraPage() {
  const [result, setResult] = useState("");
  const [kamus, setKamus] = useState(null);

  useEffect(() => {
    fetch("/aksara.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ JSON dimuat:", data);
        setKamus(data);
      })
      .catch((err) => console.error("❌ Gagal load JSON:", err));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Kamus Aksara Jawa
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Translate Form */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Masukkan Teks
          </h2>
          <TranslateForm kamus={kamus} onTranslate={setResult} />
        </div>

        {/* Result Box */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Hasil Terjemahan
          </h2>
          <ResultBox result={result} />
        </div>
      </div>
    </div>
  );
}
