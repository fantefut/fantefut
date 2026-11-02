'use client';
import { useState } from 'react';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// 🏆 1. VERİ HAVUZU: GEÇEN HAFTANIN EN İYİLERİ
const GEÇEN_HAFTA_DATA = {
  "Kaleciler": [
    { oyuncu: "İrfan", takim: "Gençlerbirliği", puan: 11 },
    { oyuncu: "Serhat", takim: "Kocaelispor", puan: 10 },
    { oyuncu: "Zafer", takim: "Rizespor", puan: 10 }
  ],
  "Defanslar": [
    { oyuncu: "Savic", takim: "Trabzonspor", puan: 15 },
    { oyuncu: "Çağlar", takim: "Çorum FK", puan: 10 },
    { oyuncu: "Winck", takim: "Kasımpaşa", puan: 10 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Ballet", takim: "Amed SF", puan: 17 },
    { oyuncu: "Tongya", takim: "Gençlerbirliği", puan: 17 },
    { oyuncu: "Gouveia", takim: "Gençlerbirliği", puan: 15 }
  ],
  "Forvetler": [
    { oyuncu: "Ramirez", takim: "Çorum FK", puan: 13 },
    { oyuncu: "Orban", takim: "Amed SF", puan: 11 },
    { oyuncu: "Vlahovic", takim: "Beşiktaş", puan: 8 }
  ]
};

// 📊 2. VERİ HAVUZU: TOPLAM OYUNCU PUANLARI
const GENEL_TOPLAM_DATA = {
  "Kaleciler": [
    { oyuncu: "Onana", takim: "Trabzonspor", puan: 61 },
    { oyuncu: "Bahadır", takim: "Konyaspor", puan: 54 },
    { oyuncu: "Ederson", takim: "Fenerbahçe", puan: 51 }
  ],
  "Defanslar": [
    { oyuncu: "Giorbelidze", takim: "Erzurumspor", puan: 54 },
    { oyuncu: "Winck", takim: "Fenerbahçe", puan: 53 },
    { oyuncu: "Skriniar", takim: "Fenerbahçe", puan: 46 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Salah", takim: "Trabzonspor", puan: 86 },
    { oyuncu: "Dia Saba", takim: "Amed SF", puan: 59 },
    { oyuncu: "Berkan", takim: "Kocaelispor", puan: 56 }
  ],
  "Forvetler": [
    { oyuncu: "Orban", takim: "Amed SF", puan: 79 },
    { oyuncu: "Osimhen", takim: "Galatasaray", puan: 70 },
    { oyuncu: "Shomurodov", takim: "Başakşehir", puan: 67 }
  ]
};

export default function HaftaninYildizlariSayfasi() {
  const [haftalikYildizlar] = useState(GEÇEN_HAFTA_DATA);
  const [genelYildizlar] = useState(GENEL_TOPLAM_DATA);

  const renderMevki = (mName, liste, emoji, uniqueKey) => (
    <div key={uniqueKey} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '15px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>{emoji} {mName}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center', fontSize: '13px' }}>{i+1}</td>
              <td style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: '700', color: '#334155', fontSize: '14px', letterSpacing: '-0.2px' }}>{v.oyuncu}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{v.takim}</div>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: '#132444', fontSize: '1.05rem', paddingRight: '20px' }}>{v.puan} P</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="yildiz" />

{/* STANDART BOŞLUKLU BAŞLIK BLOKU */}
<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
  <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
    Fantezi Lig Haftalık ve Toplam Puanlar
  </h1>
</div>

{/* STANDART YEŞİL BİLGİLENDİRME KUTUSU */}
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
  <strong>Veri Güncelleme Notu:</strong> Süper Lig fantezi futbol performans ve oyuncu istatistik havuzumuz, resmi bilgilendirmeler doğrultusunda her hafta düzenli olarak işlenmektedir.
</div>


        {/* 🏆 1. SET: GEÇEN HAFTANIN EN İYİLERİ */}
        <h2 style={{ fontSize: '0.95rem', color: '#132444', marginBottom: '8px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #f59e0b', paddingLeft: '8px' }}>
          🏆 Geçen Haftanın En İyileri
        </h2>

        {renderMevki("Kaleciler", haftalikYildizlar["Kaleciler"], "🧤", "k1")}
        {renderMevki("Defanslar", haftalikYildizlar["Defanslar"], "🛡️", "d1")}
        {renderMevki("Orta Sahalar", haftalikYildizlar["Orta Sahalar"], "🎯", "o1")}
        {renderMevki("Forvetler", haftalikYildizlar["Forvetler"], "⚽", "f1")}

        {/* ✍️ HAFTALIK FORVETLER ALTINA EKLENEN YAZI ALANI (Organik SEO Formatı) */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginTop: '-5px',
          marginBottom: '15px',
          fontSize: '12.5px',
          lineHeight: '1.6',
          color: '#334155',
          fontFamily: ICERIK_FONTU
        }}>
          🎯 10. haftanın en iyi sekiz oyuncusundan dördü, 'Tüyolar' sekmesindeki analizlerimizde yer buldu. <strong>Ballet, Batrakov, Muçi ve kaptanımız Orban</strong> seçeneklerimizi değerlendiren fantezi futbol severler kritik puanlar kazandı. Kaleci tercihlerimiz <strong>Serhat, Onana, Uğurcan</strong> ile savunmada güvendiğimiz <strong>Dijksteel, Pina, Cabral, Sallai</strong> haftayı gol yemeden kapatırken, forvet hattındaki diğer seçimlerimiz <strong>Osimhen ve Shomurodov</strong> görevini başarıyla tamamladı. Orta sahada iş yapar dediğimiz diğer oyunculardan <strong>Olsen 9, Barış 6, Salah 3 puan</strong> alarak yine zirve yarışında fark yaratmamıza yardımcı oldular. Onuncu haftayı geride bırakırken, on birinci hafta için güncel kadro analizleri ve önerileri sistemimizde aktif olarak yayınlanmaya devam edecektir.
        </div>

        {/* 📊 2. SET: TOPLAM OYUNCU PUANLARI */}
        <h2 style={{ fontSize: '0.95rem', color: '#132444', marginBottom: '8px', fontFamily: ICERIK_FONTU, fontWeight: 'bold', borderLeft: '4px solid #10b981', paddingLeft: '8px' }}>
          📊 Toplam Oyuncu Puanları
        </h2>

        {renderMevki("Kaleciler", genelYildizlar["Kaleciler"], "🧤", "k2")}
        {renderMevki("Defanslar", genelYildizlar["Defanslar"], "🛡️", "d2")}
        {renderMevki("Orta Sahalar", genelYildizlar["Orta Sahalar"], "🎯", "o2")}
        {renderMevki("Forvetler", genelYildizlar["Forvetler"], "⚽", "f2")}

        {/* ✍️ GENEL FORVETLER ALTINA EKLENEN YAZI ALANI (Organik SEO Formatı) */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginTop: '-5px',
          marginBottom: '15px',
          fontSize: '12.5px',
          lineHeight: '1.6',
          color: '#334155',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Salah</strong>, istikrarlı skor katkısıyla en yüksek puan toplayan oyuncu konumunda ve orta sahadaki liderliğini bu hafta da koruyor. En iyi forvetler sıralamasında ise zirvedeki ilk 3 isim yerini sağlamlaştırmış durumda. Kaleciler bölümünde, yüksek kurtarış yüzdelerine sahip eldivenlerin performansları puan tablosuna da doğrudan yansıyor fakat yediği iki golle Bahadır yerini Onana'ya devretti.. Savunma hattında ise liderliğini sürdüren isim Giorbelidze. Sitemizin diğer sekmelerindeki haberler, oyuncu durumları ile buradaki genel istatistikleri harmanlayarak fantezi futbol kadrolarınızı en doğru verilere dayalı olarak optimize edebilirsiniz. Dönemsel form grafiklerini yakalamak adına güncel <strong>Blog</strong> analizlerimizi de takip listenize ekleyebilirsiniz.
        </div>

        {/* 3. 🎯 SEO METNİ EN ALTA ALINDI */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Fantezi Lig En İyiler Analizi:</strong> Süper Lig'de geride kalan haftanın en yüksek performans - skor katkısı gösteren oyuncuları ve mevkilerine göre dağılımları bu sayfada listelenmektedir. Kaleci, defans, orta saha ve forvet oyuncularının topladığı haftalık puanların yanı sıra genel toplamdaki en başarılı isimleri inceleyebilir, fantezi futbol kadrolarınızı bu istatistikler doğrultusunda oluşturabilirsiniz.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
