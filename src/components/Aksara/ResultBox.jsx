export default function ResultBox({ result }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      console.log("Teks berhasil disalin!");
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

  if (!result) {
    return <div className="text-gray-500 text-center py-12">Belum ada hasil</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Aksara Jawa</h3>
        <button onClick={copyToClipboard} className="px-3 py-1 bg-gray-100 rounded-lg">Salin</button>
      </div>
      <div className="p-6 bg-blue-50 rounded-xl text-center font-['Noto Sans Javanese'] text-3xl">
        {result}
      </div>
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Jumlah karakter: {result.length}</span>
      </div>
    </div>
  );
}
