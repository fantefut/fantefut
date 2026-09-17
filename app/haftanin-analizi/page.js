'use client';
import Link from 'next/link';

const BAŞLIK_FONTU = '"Kristen ITC", "Comic Sans MS", cursive, sans-serif';
const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export default function HaftaninAnaliziSayfasi() {
  const getBtn = (s, akt) => {
    const b = { textDecoration: 'none', fontSize: '11px', fontWeight: akt ? 'bold' : '500', fontFamily: ICERIK_FONTU, padding: '4px 10px', borderRadius: '15px', display: 'inline-block', border: '1px solid transparent', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', whiteSpace: 'nowrap' };
    if (s === 'eksik') return { ...b, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: akt ? '#1e40af' : '#dbeafe' };
    if (s === 'form') return { ...b, backgroundColor: '#f0fdf4', color: '#166534', borderColor: akt ? '#166534' : '#dcfce7' };
    if (s === 'icdis') return { ...b, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: akt ? '#9a3412' : '#ffedd5' };
    if (s === 'fikstur1') return { ...b, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: akt ? '#6b21a8' : '#f3e8ff' };
    if (s === 'fikstur2') return { ...b, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: akt ? '#9d174d' : '#fce7f3' };
    if (s === 'puan') return { ...b, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: akt ? '#115e59' : '#ccfbf1' };
    if (s === 'krallik') return { ...b, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: akt ? '#9f1239' : '#ffe4e6' };
    if (s === 'yildiz') return { ...b, backgroundColor: '#fef3c7', color: '#92400e', borderColor: akt ? '#92400e' : '#fef3c7' };
    return { ...b, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: akt ? '#9f1239' : '#fecdd3' };
  };

  const renderRek = (tip) => (
    <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
      {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
    </div>
  );

  const renderMevkiBasligi = (text, emoji) => (
    <h2 style={{ fontSize: '1.25rem', color: '#132444', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px', marginTop: '15px', fontFamily: ICERIK_FONTU, fontWeight: 'bold' }}>
      {emoji} {text}
    </h2>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#132444', fontFamily: BAŞLIK_FONTU, margin: '0' }}>FanteFut</h1>
        </Link>
        <p style={{ color: '#64748b', fontSize: '1.2rem', fontFamily: ICERIK_FONTU, marginTop: '2px' }}>Haftanın Analizi</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        {/* 📱 TÜYOLAR SAYFASI İÇİN 3 SATIRLI PİRAMİT MENÜ */}
<div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
  {/* 1. Satır: 4 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/" style={getBtn('eksik', false)}>Eksik Listesi</Link>
    <Link href="/haftanin-yildizlari" style={{ ...getBtn('yildizlar', false), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: '#fbcfe8' }}>En İyiler</Link>
    <Link href="/haftanin-analizi" style={getBtn('analiz', true)}>Tüyolar</Link>
    <Link href="/puan-durumu" style={getBtn('puan', false)}>Puan Durumu</Link>
  </div>
  {/* 2. Satır: 3 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
    <Link href="/kralliklar" style={getBtn('krallik', false)}>Gol & Asist</Link>
    <Link href="/form-durumu" style={getBtn('form', false)}>Form Durumu</Link>
    <Link href="/ic-dis-saha" style={getBtn('icdis', false)}>İç-Dış Saha Form</Link>
  </div>
  {/* 3. Satır: 2 Sekme */}
  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Link href="/fikstur-ilk-yari" style={{ ...getBtn('fiksturl', false), backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>Fikstür 1. Yarı</Link>
    <Link href="/fikstur-ikinci-yari" style={getBtn('fikstur2', false)}>Fikstür 2. Yarı</Link>
  </div>
</div>


        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {renderRek('buyuk')}

          {/* 📝 1. GÜNCELLEME: NETLEŞTİRİLMİŞ 5 SATIRLIK GENEL ANALİZ KUTUSU */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', color: '#1e293b', fontSize: '14px', fontWeight: '500', lineHeight: '1.6', marginBottom: '25px' }}>
            <p style={{ margin: '0 0 8px 0' }}>Bu alanda fantezi futbol kadronuz için site tarafından önerilen oyuncuları göreceksiniz.</p>
            <p style={{ margin: '0 0 8px 0' }}>Son dakika gelişmeleri, bazı önemli bilgiler ve muhtemel 11 ler zaman zaman burada yer alabilir.</p>
            <p style={{ margin: '0 0 8px 0' }}>Ana sayfada bulunan Süper Lig sakat ve cezalı oyuncular listesini kontrol etmeyi unutmayın.</p>
            <p style={{ margin: '0 0 8px 0' }}>Gol & Asist ve Yıldızlar sekmelerinde, fantezi futbol oyuncularının seveceği bilgiler mevcut.</p>
            <p style={{ margin: '0' }}>İlk 11 de başlayacak oyuncuları bulmak, oyunda yüksek puan kazanmak için çok kritik. Bu yüzden Avrupa'da maç yapan takımlarımızın rotasyonunu dikkatli takip etmek gerekir. Rize'nin deplasman, Amed'in iç saha formu önemli.</p>
          </div>

          {/* 🧤 2. GÜNCELLEME: KALECİLER BÖLÜMÜ (Büyük, Kalın ve Net Yazı Tipi) */}
          {renderMevkiBasligi("Kaleciler", "🧤")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Ederson, Okan, Nübel, Uğurcan]
          </div>

          {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
          {renderMevkiBasligi("Defanslar", "🛡️")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Murillo, Winck, Brown, Tomasson, Mendes, Sallai, Operi, Ömer Ali]
          </div>

          {renderRek('buyuk')}

          {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
          {renderMevkiBasligi("Orta Sahalar", "🎯")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Greenwood, Sara, Yunus, Cengiz, Trossard, Kyziridis]
          </div>

          {/* ⚽ FORVETLER BÖLÜMÜ */}
          {renderMevkiBasligi("Forvetler", "⚽")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Muriqi, Vlahovic, Benedyczak, Ramirez]
          </div>

          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
