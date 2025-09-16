import { useState } from "react";

export default function TranslateForm({ kamus, onTranslate }) {
  const [query, setQuery] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTranslating(true);

    if (!kamus || !kamus.carakan) {
      onTranslate("Kamus belum dimuat...");
      setIsTranslating(false);
      return;
    }

    const input = query.trim().toLowerCase();

    if (input.length <= 2 && kamus.carakan[input]) {
      onTranslate(kamus.carakan[input]);
      setIsTranslating(false);
      return;
    }

    let output = "";
    const words = input.split(/(\s+)/);
    words.forEach((word) => {
      if (word.trim() === "") {
        output += " ";
      } else {
        let temp = "", i = 0;
        while (i < word.length) {
          const twoChar = word.substring(i, i + 2);
          if (kamus.carakan[twoChar]) {
            temp += kamus.carakan[twoChar];
            i += 2;
          } else {
            temp += kamus.carakan[word[i]] || word[i];
            i++;
          }
        }
        output += temp;
      }
    });

    onTranslate(output);
    setTimeout(() => setIsTranslating(false), 300);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ketik teks latin..."
        className="w-full p-4 border rounded-lg resize-none h-32"
      />
      <button
        onClick={handleSubmit}
        disabled={!query.trim() || !kamus || isTranslating}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        {isTranslating ? "Menerjemahkan..." : "Konversi ke Aksara"}
      </button>
    </div>
  );
}
