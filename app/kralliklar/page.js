'use client';
import { useState } from 'react';
import { Navbar, Header, ICERIK_FONTU } from '../utils';

// TFF & Transfermarkt 2026-2027 Sezonu 6. Hafta Güncel Verileri (10'lu Düzen)
const GOL_KRALLIGI = [
  { sira: 1, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 7 },
  { sira: 2, oyuncu: "Gift Orban", takim: "Amed SF", istatistik: 7 },
  { sira: 3, oyuncu: "Vedat Muriqi", takim: "Fenerbahçe", istatistik: 6 },
  { sira: 4, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 6 },
  { sira: 5, oyuncu: "Eldor Shomurodov", takim: "Başakşehir", istatistik: 6 },
  { sira: 6, oyuncu: "Dusan Vlahovic", takim: "Beşiktaş", istatistik: 5 },
  { sira: 7, oyuncu: "Adrian Benedyczak", takim: "Kasımpaşa", istatistik: 4 },
  { sira: 8, oyuncu: "Ramirez", takim: "Çorum", istatistik: 4 },
  { sira: 9, oyuncu: "Greenwood", takim: "Fenerbahçe", istatistik: 4 },
  { sira: 10, oyuncu: "Juan", takim: "Göztepe", istatistik: 4 }
];

const ASIST_KRALLIGI = [
  { sira: 1, oyuncu: "İrfan Can Kahveci", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 2, oyuncu: "Gabriel Sara", takim: "Galatasaray", istatistik: 2 },
  { sira: 3, oyuncu: "Lucas Torreira", takim: "Galatasaray", istatistik: 2 },
  { sira: 4, oyuncu: "Orkun Kökçü", takim: "Beşiktaş", istatistik: 2 },
  { sira: 5, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 2 },
  { sira: 6, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 2 },
  { sira: 7, oyuncu: "Fredy", takim: "Çorum", istatistik: 2 },
  { sira: 8, oyuncu: "Maxim", takim: "Gaziantep", istatistik: 2 },
  { sira: 9, oyuncu: "Mithat", takim: "Rizespor", istatistik: 2 },
  { sira: 10, oyuncu: "Hadergjonaj", takim: "Alanya", istatistik: 2 }
];

export default function KralliklarSayfasi() {
  const [golVerileri] = useState(GOL_KRALLIGI);
  const [asistVerileri] = useState(ASIST_KRALLIGI);

  // Yenilenmiş ve Ferahlatılmış Reklam Alanı Bileşeni (Tailwind v4)
  const renderRek = (tip) => {
    return (
      <div className={`w-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs italic my-4 transition-all ${
        tip === 'ince' ? 'h-[70px]' : 'h-[140px]'
      }`}>
        {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense Orta Şerit) -'}
      </div>
    );
  };

  // İlk 3 Oyuncu İçin Podyum Renk Kombinasyonları
  const getSiraStili = (sira: number) => {
    if (sira === 1) return "bg-amber-500 text-white shadow-xs";
    if (sira === 2) return "bg-slate-400 text-white shadow-xs";
    if (sira === 3) return "bg-amber-700 text-white shadow-xs";
    return "text-slate-500 font-bold";
  };

  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      
      {/* 🚀 Yenilenmiş, küçük ve linki çalışan merkezi Header bileşeni */}
      <Header altBaslik="Süper Lig Gol ve Asist Krallığı" />

      <div className="max-w-[900px] mx-auto">
        <Navbar aktifSayfa="krallik" />

        {/* Mobil odaklı daraltılmış ve esnek dikey alan */}
        <div className="max-w-[400px] mx-auto flex flex-col gap-5 px-1">
          
          {/* 💰 1. ÜST BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* ⚽ 10 Satırlık Genişletilmiş ve Büyütülmüş Gol Krallığı Tablosu */}
          <div className="shadow-xs rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="bg-slate-50 p-3 font-extrabold text-[#132444] border-b-2 border-slate-200 text-center text-base">
              ⚽ Gol Krallığı
            </div>
            <table className="w-full border-collapse text-left bg-white text-sm">
              <tbody>
                {golVerileri.map((veri, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 w-10 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${getSiraStili(veri.sira)}`}>
                        {veri.sira}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-800 text-base leading-tight">{veri.oyuncu}</div>
                      <div className="text-xs text-slate-400 font-semibold mt-0.5">{veri.takim}</div>
                    </td>
                    <td className="p-3 text-right font-black text-emerald-600 text-xl pr-5">
                      {veri.istatistik}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 💰 2. ORTA BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 🅰️ 10 Satırlık Genişletilmiş ve Büyütülmüş Asist Krallığı Tablosu */}
          <div className="shadow-xs rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="bg-slate-50 p-3 font-extrabold text-[#132444] border-b-2 border-slate-200 text-center text-base">
              🅰️ Asist Krallığı
            </div>
            <table className="w-full border-collapse text-left bg-white text-sm">
              <tbody>
                {asistVerileri.map((veri, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 w-10 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${getSiraStili(veri.sira)}`}>
                        {veri.sira}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-800 text-base leading-tight">{veri.oyuncu}</div>
                      <div className="text-xs text-slate-400 font-semibold mt-0.5">{veri.takim}</div>
                    </td>
                    <td className="p-3 text-right font-black text-emerald-600 text-xl pr-5">
                      {veri.istatistik}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 💰 3. EN ALT İNCE REKLAM ALANI */}
          {renderRek('ince')}

        </div>
      </div>
    </div>
  );
}
