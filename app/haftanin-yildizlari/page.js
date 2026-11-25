'use client';
import { useState } from 'react';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import Link from 'next/link';
import ScrollToTop from '../ScrollToTop';

// 🏆 1. VERİ HAVUZU: GEÇEN HAFTANIN EN İYİLERİ
const GEÇEN_HAFTA_DATA = {
  "Kaleciler": [
    { oyuncu: "Arda", takim: "Göztepe", puan: 10 },
    { oyuncu: "Zafer", takim: "Rizespor", puan: 9 },
    { oyuncu: "İrfan", takim: "Gençlerbirliği", puan: 8 }
  ],
  "Defanslar": [
    { oyuncu: "Pina", takim: "Trabzonspor", puan: 12 },
    { oyuncu: "Maglica", takim: "Kocaelispor", puan: 10 },
    { oyuncu: "Hadergjonaj", takim: "Alanyaspor", puan: 9 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Traore", takim: "Gençlerbirliği", puan: 11 },
    { oyuncu: "Berkan", takim: "Kocaelispor", puan: 10 },
    { oyuncu: "Ozan", takim: "Trabzonspor", puan: 10 }
  ],
  "Forvetler": [
    { oyuncu: "Bertuğ", takim: "Başakşehir", puan: 16 },
    { oyuncu: "Ali Sowe", takim: "Rizespor", puan: 13 },
    { oyuncu: "Vlahovic", takim: "Beşiktaş", puan: 13 }
  ]
};

// 📊 2. VERİ HAVUZU: TOPLAM OYUNCU PUANLARI
const GENEL_TOPLAM_DATA = {
  "Kaleciler": [
    { oyuncu: "Onana", takim: "Trabzonspor", puan: 74 },
    { oyuncu: "Ederson", takim: "Fenerbahçe", puan: 61 },
    { oyuncu: "Serhat", takim: "Kocaelispor", puan: 58 }
  ],
  "Defanslar": [
    { oyuncu: "Pina", takim: "Trabzonspor", puan: 68 },
    { oyuncu: "Winck", takim: "Kasımpaşa", puan: 62 },
    { oyuncu: "Skriniar", takim: "Fenerbahçe", puan: 60 }
  ],
  "Orta Sahalar": [
    { oyuncu: "Salah", takim: "Trabzonspor", puan: 99 },
    { oyuncu: "Berkan", takim: "Kocaelispor", puan: 77 },
    { oyuncu: "Dia Saba-Greenwood", takim: "Amd-Fen", puan: 71 }
  ],
  "Forvetler": [
    { oyuncu: "Orban", takim: "Amed SF", puan: 86 },
    { oyuncu: "Benedyczak", takim: "Kasımpaşa", puan: 84 },
    { oyuncu: "Shomurodov", takim: "Başakşehir", puan: 77 }
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
  <strong>Veri Güncelleme Notu:</strong> Fantezi lig haftalık ve toplam en çok puan kazananlar tablolarımız, maçlardan sonra puanlar kesinleşince ve hafta bitiminde resmi bilgilendirmeler doğrultusunda düzenli olarak işlenmektedir. Bu veriler ışığında hem haftalık çıkış yakalayan sürpriz isimleri hem de sezon boyunca istikrarını koruyan güvenilir oyuncuları tek ekranda karşılaştırabilirsiniz..
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
          🎯 Kaotik, sürprizlerle dolu 12. haftanın en iyi oyuncularından ikisi, 'Tüyolar' sekmesindeki analizlerimizde yer buldu. <strong>Arda Özçimen ve Benedyczak</strong> seçeneklerimizi değerlendiren fantezi futbol severler kritik puanlar kazandı. Kaleci tercihlerimizden <strong>Onana</strong> ile savunmada güvendiğimiz <strong>Savic ile Arda Okan</strong> haftayı gol yemeden kapatırken, forvet hattındaki diğer seçimlerimiz <strong>Shomurodov ve Juan</strong> görevini başarıyla tamamladı. Orta sahada iş yapar dediğimiz oyunculardan <strong>Trossard skor yapıp 9 puan,</strong> Hajradinovic ve Sara asist yaparak 5'er puan alarak yine zirve yarışında fark yaratmamıza yardımcı oldular, Salah ise herkes gibi bizi de yaktı. On ikinci haftayı geride bırakırken, on üçüncü hafta için güncel kadro analizleri ve önerileri sistemimizde aktif olarak yayınlanmaya devam edecektir.
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
          <strong>Salah</strong>, bu hafta herkesi yıksa da en yüksek puan toplayan oyuncu konumunda ve orta sahadaki liderliğini bu hafta da koruyor. Kalecilerde değişiklik yok ilk üçte. En iyi forvetler sıralamasına Orban zirvede yer alıyor. Kaleciler bölümünde, yüksek kurtarış yüzdelerine sahip eldivenlerin performansları puan tablosuna da doğrudan yansırken, savunma hattının lideri ise Pina oldu. Genel toplam tabloları sezon başından bu yana istikrarını koruyan en güvenilir kaptan adaylarını belirlemeniz için büyük önem taşır. Sitemizin diğer sekmelerindeki haberler ve oyuncu durumları ile buradaki genel istatistikleri harmanlayarak fantezi futbol kadrolarınızı en doğru verilere dayalı olarak optimize edebilirsiniz.
        </div>

{/* 🎯 KADRO YÖNLENDİRME */}
<div style={{
  marginTop: '16px',
  padding: '12px 16px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  fontFamily: ICERIK_FONTU
}}>
  <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>
    En İyilerle Kadronu Oluştur →
  </span>
  <Link
    href="/kadronu-dene"
    style={{
      padding: '6px 14px',
      backgroundColor: '#fffbeb',
      color: '#b45309',
      border: '1px solid #f59e0b',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }}
  >
    Kadrom
  </Link>
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
          <strong>Fantezi Lig En İyiler Analizi:</strong> Süper Lig'de geride kalan haftanın en yüksek performans ve skor katkısı gösteren oyuncuları ile mevkilerine göre dağılımları bu sayfada listelenmektedir. Kaleci, defans, orta saha ve forvet oyuncularının topladığı haftalık puanların yanı sıra genel toplamdaki en başarılı isimleri inceleyebilir, fantezi futbol kadrolarınızı bu istatistikler doğrultusunda oluşturabilirsiniz. En yüksek puanı toplayan oyuncuları tek bir kadroda buluşturmak bütçe sınırı nedeniyle her zaman mümkün olmayabileceğinden, en iyiler tablosundaki istikrarlı yıldızları kadronuzda tutup kalan bütçeyi fiyat-performans oranı yüksek yükselen isimlere ayırmak uzun vadede en dengeli stratejiyi sunar. Dönemsel form grafiklerini yakalamak adına güncel <strong>Blog</strong> analizlerimizi de takip listenize ekleyebilirsiniz.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
