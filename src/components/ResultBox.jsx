export default function ResultBox({ result }) {
  if (!result) {
    return (
      <div className="text-center py-12 text-gray-500">
        Belum ada hasil. Masukkan kata untuk melihat terjemahan.
      </div>
    );
  }

  const translations = [
    { label: "Ngoko", value: result.Ngoko, color: "bg-blue-50 border-blue-200 text-blue-800" },
    { label: "Krama", value: result.Krama, color: "bg-green-50 border-green-200 text-green-800" },
    { label: "Krama Inggil", value: result["Krama Inggil"], color: "bg-purple-50 border-purple-200 text-purple-800" },
    { label: "Bahasa Indonesia", value: result["Bahasa Indonesia"], color: "bg-orange-50 border-orange-200 text-orange-800" }
  ];

  return (
    <div className="space-y-3">
      {translations.map((item, index) =>
        item.value && (
          <div key={index} className={`p-4 rounded-lg border-2 ${item.color} transition-all duration-200 hover:shadow-sm`}>
            <p className="font-semibold text-sm mb-1">{item.label}</p>
            <p className="text-base">{item.value}</p>
          </div>
        )
      )}
    </div>
  );
}
