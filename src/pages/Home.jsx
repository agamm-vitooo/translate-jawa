import { useEffect, useState } from "react";
import TranslateForm from "../components/TranslateForm";
import ResultBox from "../components/ResultBox";

export default function Home() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/kamus2.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
