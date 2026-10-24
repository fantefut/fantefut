'use client';
import { useState } from 'react';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// TFF ve Oyuncu Performans Verileri Sezonu Güncel Verileri
const GOL_KRALLIGI = [
  { sira: 1, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 8 },
  { sira: 2, oyuncu: "Gift Orban", takim: "Amed SF", istatistik: 8 },
  { sira: 3, oyuncu: "Vedat Muriqi", takim: "Fenerbahçe", istatistik: 7 },
  { sira: 4, oyuncu: "Eldor Shomurodov", takim: "Başakşehir", istatistik: 7 },
  { sira: 5, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 6 },
  { sira: 6, oyuncu: "Dusan Vlahovic", takim: "Beşiktaş", istatistik: 6 },
  { sira: 7, oyuncu: "Adrian Benedyczak", takim: "Kasımpaşa", istatistik: 6 },
  { sira: 8, oyuncu: "Juan", takim: "Göztepe", istatistik: 5 },
  { sira: 9, oyuncu: "Dia Saba", takim: "Amed SF", istatistik: 5 },
  { sira: 10, oyuncu: "Mason Greenwood", takim: "Fenerbahçe", istatistik: 4 }
];

const ASIST_KRALLIGI = [
  { sira: 1, oyuncu: "Kzyridis", takim: "Çorum FK", istatistik: 4 },
  { sira: 2, oyuncu: "Victor Osimhen", takim: "Galatasaray", istatistik: 3 },
  { sira: 3, oyuncu: "Mohamed Salah", takim: "Trabzonspor", istatistik: 3 },
  { sira: 4, oyuncu: "Oğuz Aydın", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 5, oyuncu: "İrfan Can Kahveci", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 6, oyuncu: "Kerem", takim: "Fenerbahçe", istatistik: 3 },
  { sira: 7, oyuncu: "Orban", takim: "Amed SF", istatistik: 3 },
  { sira: 8, oyuncu: "Hadergjonaj", takim: "Alanyaspor", istatistik: 2 },
  { sira: 9, oyuncu: "Maxim", takim: "Gaziantep FK", istatistik: 2 },
  { sira: 10, oyuncu: "Mithat", takim: "Rizespor", istatistik: 2 }
];

export default function KralliklarSayfasi() {
  const [golVerileri] = useState(GOL_KRALLIGI);
  const [asistVerileri] = useState(ASIST_KRALLIGI);

  // İlk 3 Podyum Satır Renklendirmesi (Mavi, Yeşil, Pembe Pastel Tonlar)
  const getPodyumSatirStili = (sira) => {
    if (sira === 1) return { backgroundColor: '#eff6ff' }; 
    if (sira === 2) return { backgroundColor: '#f0fdf4' }; 
    if (sira === 3) return { backgroundColor: '#fdf2f8' }; 
    return { backgroundColor: '#ffffff' };
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      {/* Tailwind v4 responsive genişletme sarmalayıcısı */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="krallik" />

        {/* 🎯 SEO ve ADSENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Gol ve Asist Krallıkları
          </h1>
        </div>

        {/* GÖRSEL TUTARLILIK İÇİN GÜNCELLENEN STANDART YEŞİL KUTU */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '20px',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#166534',
          fontFamily: ICERIK_FONTU,
          width: '100%'
        }}>
          <strong>Gol ve Asist Krallığı İstatistik Notu:</strong> Hücum kurgularınızı şekillendirirken fark yaratacak güncel gol ve asist liderleri listesi aşağıda sunulmuştur. Kadro mühendisliğinizi iyileştirmek adına buradaki skorer oyuncuların durumlarını inceleyebilirsiniz.
        </div>

        {/* ⚽ 10 Satırlık Genişletilmiş Gol Krallığı Tablosu */}
        <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>⚽ Gol Krallığı</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
            <tbody>
              {golVerileri.map((veri, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', ...getPodyumSatirStili(veri.sira) }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{veri.sira}</td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ fontWeight: '700', color: '#334155', fontSize: veri.sira <= 3 ? '16px' : '14px', letterSpacing: '-0.2px' }}>{veri.oyuncu}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{veri.takim}</div>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: veri.sira <= 3 ? '1.4rem' : '1.1rem', paddingRight: '20px' }}>{veri.istatistik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🅰️ 10 Satırlık Genişletilmiş Asist Krallığı Tablosu */}
        <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', textAlign: 'center', fontSize: '1rem' }}>🅰️ Asist Krallığı</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
            <tbody>
              {asistVerileri.map((veri, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', ...getPodyumSatirStili(veri.sira) }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center' }}>{veri.sira}</td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ fontWeight: '700', color: '#334155', fontSize: veri.sira <= 3 ? '16px' : '14px', letterSpacing: '-0.2px' }}>{veri.oyuncu}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{veri.takim}</div>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: veri.sira <= 3 ? '1.4rem' : '1.1rem', paddingRight: '20px' }}>{veri.istatistik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🚀 GOOGLE BOT DOSTU ZENGİN SEO AÇIKLAMA METNİ */}
        <div style={{ 
          marginTop: '30px', 
          marginBottom: '10px', 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          fontFamily: ICERIK_FONTU
        }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>
            Süper Lig Güncel Gol ve Asist Krallığı İstatistik Analizleri
          </h2>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut krallıklar sayfasında, sezona damga vuran en skorer oyuncuların ve asist liderlerinin güncel verilerini takip edebilirsiniz. Katılımcıların haftalık kadro planlaması yaparken, en çok gol atan veya gol pası veren oyuncuları listelemesi stratejik transfer adımları atmak demektir. Bu sayfayı diğer niş istatistiklerimizle harmanlayarak haftalık puanlarınızı maksimum seviyeye çıkarabilir, fantezi futbol liginizde fark yaratacak stratejiler geliştirebilirsiniz. Orban attığı golle Salah'ı yakalarken, Dia Saba'ya verdiği pasla onu gol krallığı listesine kendisini de asist krallığına soktu. Berkan Kutlu listede olmayan dört gollüler takımına eklendi. Asist krallığında ise Kzyridis zirvede tek.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
