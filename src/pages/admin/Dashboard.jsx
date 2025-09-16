// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { supabase } from "../../supabaseClient";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [perHari, setPerHari] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from("visits")
        .select("created_at")
        .order("created_at", { ascending: true });

      if (!data) return;

      // Group per hari
      const grouped = data.reduce((acc, row) => {
        const day = new Date(row.created_at).toLocaleDateString("id-ID");
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      setTotal(data.length);
      setPerHari(grouped);

      const labels = Object.keys(grouped);
      const values = Object.values(grouped);

      setChartOptions({
        chart: {
          type: "line",
          backgroundColor: "#ffffff",
          height: 350,
        },
        title: { text: "" }, // hilangkan judul chart, sudah ada heading di atas
        xAxis: {
          categories: labels,
          title: { text: "Tanggal" },
          labels: { style: { color: "#374151" } },
          gridLineWidth: 0,
        },
        yAxis: {
          title: { text: "Jumlah Kunjungan" },
          min: 0,
          gridLineColor: "#e5e7eb",
          labels: { style: { color: "#374151" } },
        },
        series: [
          {
            name: "Kunjungan",
            data: values,
            color: "#2563eb",
            lineWidth: 3,
            marker: {
              radius: 5,
              fillColor: "#2563eb",
            },
          },
        ],
        tooltip: {
          backgroundColor: "#1f2937",
          style: { color: "#f9fafb" },
          borderRadius: 6,
          borderWidth: 0,
          formatter: function () {
            return `<strong>${this.x}</strong>: ${this.y} kunjungan`;
          },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        responsive: {
          rules: [
            {
              condition: { maxWidth: 768 },
              chartOptions: {
                xAxis: { labels: { rotation: -45 } },
              },
            },
          ],
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
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition h-[430px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Grafik Kunjungan
            </h3>
            {chartOptions.series ? (
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            ) : (
              <p className="text-gray-400 text-center mt-20">Loading chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
