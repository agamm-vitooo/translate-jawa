// src/pages/TentangPage.jsx
import { useEffect } from "react";

export default function TentangPage() {
  useEffect(() => {
    document.title = "Tentang | Kamus Bahasa Jawa";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Tentang Inovasi</h1>

        {/* Tujuan Inovasi */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            🎯 Tujuan Inovasi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Inovasi pembelajaran Bahasa Jawa ini bertujuan untuk membantu siswa
            SD mengenal dan melestarikan aksara Jawa dengan cara yang lebih
            menyenangkan dan interaktif.  
            <br />
            <br />
            Melalui aplikasi ini, siswa dapat langsung menerjemahkan kata ke
            aksara Jawa, serta memahami budaya dan bahasa daerah dengan cara
            modern.
          </p>
        </section>

        {/* Lokasi SD */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">📍 Lokasi SD</h2>
          <div className="w-full h-80 rounded-xl overflow-hidden shadow">
            <iframe
              title="Lokasi SDN 1 Guno"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.03113213559!2d111.16098957455566!3d-7.891811778508897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7981bda304c7a1%3A0x5f3d1acff9ef1a03!2sSDN%201%20GUNO!5e0!3m2!1sid!2sid!4v1757998363318!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
