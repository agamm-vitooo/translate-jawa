import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import Chart from "chart.js/auto";

export default function Dashboard() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [perHari, setPerHari] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from("visits")
        .select("created_at")
        .order("created_at", { ascending: true });

      const grouped = data.reduce((acc, row) => {
        const day = new Date(row.created_at).toLocaleDateString("id-ID");
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      setTotal(data.length);
      setPerHari(grouped);

      const labels = Object.keys(grouped);
      const values = Object.values(grouped);

      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Kunjungan per Hari",
              data: values,
              borderColor: "#2563eb",
              backgroundColor: "rgba(37, 99, 235, 0.2)",
              tension: 0.4,
              fill: true,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y} kunjungan`,
              },
            },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">📊 Statistik Kunjungan</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistik Tertulis */}
        <div className="space-y-6">
          <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Kunjungan</p>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>

          <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Hari Terakhir</p>
            <p className="text-xl font-semibold text-green-600">
              {Object.values(perHari).slice(-1)[0] || 0} kunjungan
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Hari Teramai</p>
            <p className="text-xl font-semibold text-purple-600">
              {Object.keys(perHari).length
                ? `${Object.keys(perHari).reduce((a, b) =>
                    perHari[a] > perHari[b] ? a : b
                  )} (${Math.max(...Object.values(perHari))} kunjungan)`
                : "-"}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition h-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Grafik Kunjungan
            </h3>
            <div className="w-full h-80">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
