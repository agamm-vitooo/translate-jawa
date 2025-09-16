import { useState } from "react";

export default function TranslateForm({ data, onTranslate }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Array.isArray(data)) {
      console.error("Data bukan array!");
      onTranslate(null);
      return;
    }

    const found = data.find((item) =>
      [item.Ngoko, item.Krama, item["Krama Inggil"], item["Bahasa Indonesia"]]
        .filter(Boolean)
        .some((word) => word.toLowerCase() === query.toLowerCase())
    );

    onTranslate(found || null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Masukkan kata dalam bahasa Jawa atau Indonesia..."
          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!query.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        Cari Terjemahan
      </button>

      {query && (
        <p className="text-sm text-gray-500">Pencarian: "{query}"</p>
      )}
    </div>
  );
}
