'use client';
import { useState } from 'react';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

// 📊 GÜNCELLENMİŞ EN SON VERİ HAVUZU
const PUAN_DATA = [
  { sira: 1, takim: "Amed SF", o: 6, g: 4, b: 1, m: 1, ag: 15, yg: 7, av: 8, p: 13 },
  { sira: 2, takim: "Galatasaray", o: 6, g: 4, b: 1, m: 1, ag: 13, yg: 10, av: 3, p: 13 },
  { sira: 3, takim: "Beşiktaş", o: 6, g: 4, b: 0, m: 2, ag: 14, yg: 7, av: 7, p: 12 },
  { sira: 4, takim: "Kocaelispor", o: 6, g: 4, b: 0, m: 2, ag: 7, yg: 4, av: 3, p: 12 },
  { sira: 5, takim: "Alanyaspor", o: 6, g: 3, b: 2, m: 1, ag: 8, yg: 6, av: 2, p: 11 },
  { sira: 6, takim: "Fenerbahçe", o: 6, g: 3, b: 1, m: 2, ag: 16, yg: 6, av: 10, p: 10 },
  { sira: 7, takim: "Trabzonspor", o: 6, g: 3, b: 1, m: 2, ag: 13, yg: 5, av: 8, p: 10 },
  { sira: 8, takim: "Kasımpaşa", o: 6, g: 2, b: 4, m: 0, ag: 7, yg: 5, av: 2, p: 10 },
  { sira: 9, takim: "Rizespor", o: 6, g: 3, b: 1, m: 2, ag: 7, yg: 6, av: 1, p: 10 },
  { sira: 10, takim: "Gaziantep FK", o: 6, g: 2, b: 2, m: 2, ag: 7, yg: 7, av: 0, p: 8 },
  { sira: 11, takim: "Çorum FK", o: 6, g: 2, b: 1, m: 3, ag: 13, yg: 12, av: 1, p: 7 },
  { sira: 12, takim: "Başakşehir", o: 6, g: 2, b: 1, m: 3, ag: 10, yg: 11, av: -1, p: 7 },
  { sira: 13, takim: "Gençlerbirliği", o: 6, g: 2, b: 1, m: 3, ag: 5, yg: 13, av: -8, p: 7 },
  { sira: 14, takim: "Erzurumspor FK", o: 6, g: 2, b: 1, m: 3, ag: 3, yg: 11, av: -8, p: 7 },
  { sira: 15, takim: "Konyaspor", o: 6, g: 1, b: 1, m: 4, ag: 4, yg: 8, av: -4, p: 4 },
  { sira: 16, takim: "Samsunspor", o: 6, g: 1, b: 1, m: 4, ag: 6, yg: 12, av: -6, p: 4 },
  { sira: 17, takim: "Göztepe", o: 6, g: 0, b: 3, m: 3, ag: 11, yg: 15, av: -4, p: 3 },
  { sira: 18, takim: "Eyüpspor", o: 6, g: 1, b: 0, m: 5, ag: 2, yg: 16, av: -14, p: 3 }
];

export default function PuanDurumuSayfasi() {
  const [puanVerileri] = useState(PUAN_DATA);

  // Yenilenmiş ve Ferahlatılmış Reklam Alanı Bileşeni (Tailwind v4)
  const renderRek = (tip: 'ince' | 'buyuk') => {
    return (
      <div className={`w-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs italic my-4 transition-all ${
        tip === 'ince' ? 'h-[70px]' : 'h-[140px]'
      }`}>
        {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
      </div>
    );
  };

  // Dinamik Satır Renklendirmesi (Küme Düşme Hattı Son 3 Takım Olarak Düzeltildi!)
  const getSatirStili = (s: number) => {
    if (s === 1) return "bg-blue-900 text-white font-bold"; 
    if (s === 2) return "bg-yellow-100 text-blue-950 font-semibold"; 
    if (s === 3) return "bg-purple-100 text-purple-900 font-semibold"; 
    if (s === 4) return "bg-green-100 text-green-900 font-semibold"; 
    if (s >= 16) return "bg-red-50 text-red-700 font-semibold"; // Son 3 takım: 16, 17, 18
    return "bg-white text-slate-700";
  };

  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 Ortak Logolu Başlık Bileşeni */}
      <Header altBaslik="Süper Lig Puan Durumu" />

      {/* 🎯 ANA KAPSAYICI KUTU */}
      <div className="max-w-[900px] mx-auto">
        
        {/* Ortak Navbar Bileşeni (Puan Durumu aktif) */}
        <Navbar aktifSayfa="puan" />

        {/* 📋 Mobil odaklı daraltılmış ve esnek dikey alan */}
        <div className="max-w-[400px] mx-auto flex flex-col px-1">
          
          {/* 💰 1. ÜST REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 📱 GÜNCEL PUAN CETVELİ TABLOSU */}
          <div className="shadow-xs rounded-xl border border-slate-200 overflow-hidden bg-white">
            <table className="w-full border-collapse bg-white text-center text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b-2 border-slate-200 text-[11px] font-bold">
                  <th className="p-2 w-6">#</th>
                  <th className="p-2 text-left w-28">Takım</th>
                  <th className="p-2 w-6">O</th>
                  <th className="p-2 w-6">G</th>
                  <th className="p-2 w-6">B</th>
                  <th className="p-2 w-6">M</th>
                  <th className="p-2 w-7 font-extrabold">AG</th>
                  <th className="p-2 w-7 font-extrabold">YG</th>
                  <th className="p-2 w-7 font-extrabold">AV</th>
                  <th className="p-2 font-black text-[#132444] w-8 text-sm">P</th>
                </tr>
              </thead>
              <tbody>
                {puanVerileri.map((v) => (
                  <tr 
                    key={v.sira} 
                    className={`border-b border-slate-100 last:border-0 hover:opacity-95 transition-opacity ${getSatirStili(v.sira)}`}
                  >
                    <td className="p-2.5 font-medium">{v.sira}</td>
                    <td className="p-2.5 text-left font-extrabold whitespace-nowrap">{v.takim}</td>
                    <td className="p-2.5 opacity-90">{v.o}</td>
                    <td className="p-2.5 opacity-90">{v.g}</td>
                    <td className="p-2.5 opacity-90">{v.b}</td>
                    <td className="p-2.5 opacity-90">{v.m}</td>
                    <td className="p-2.5 font-bold">{v.ag}</td>
                    <td className="p-2.5 font-bold">{v.yg}</td>
                    <td className="p-2.5 font-bold">{v.av > 0 ? `+${v.av}` : v.av}</td>
                    <td className="p-2.5 font-black text-sm">{v.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ℹ Notlar & Kısaltmalar Açıklama Kutusu */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex flex-col gap-2.5 leading-relaxed shadow-2xs">
            <div className="flex gap-x-3 gap-y-1.5 flex-wrap border-b border-slate-200 pb-2 font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span> ŞL</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> ŞL Elm</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> AL</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-400"></span> KL Elm</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Küme Düşme</span>
            </div>
            
            <div className="text-[11px] text-slate-400 font-medium">
              <strong className="text-slate-600 font-bold">Puan Cetveli Kısaltmaları:</strong> 
              <span className="ml-1"><strong className="text-slate-500 font-bold">O:</strong> Maç |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">G:</strong> Galibiyet |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">B:</strong> Beraberlik |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">M:</strong> Mağlubiyet |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">AG:</strong> Atılan |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">YG:</strong> Yenen |</span>
              <span className="ml-1"><strong className="text-slate-500 font-bold">AV:</strong> Averaj |</span>
              <span className="ml-1"><strong className="text-slate-600 font-bold">P:</strong> Puan</span>
            </div>
          </div>

          {/* 💰 2. EN ALT REKLAM ALANI */}
          {renderRek('ince')}

        </div>
      </div>
    </div>
  );
}
