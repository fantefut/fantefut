export const BAŞLIK_FONTU = '"Impact", "Arial Black", "Helvetica Neue", sans-serif';
export const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export const getMenuButonStili = (sayfa, aktif) => {
  const bStil = { 
    textDecoration: 'none', 
    fontSize: '11px', 
    fontWeight: aktif ? 'bold' : '500', 
    fontFamily: ICERIK_FONTU, 
    padding: '4px 10px', 
    borderRadius: '15px', 
    display: 'inline-block', 
    border: '1px solid transparent', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)', 
    whiteSpace: 'nowrap' 
  };
  
  if (sayfa === 'eksik') return { ...bStil, backgroundColor: '#eff6ff', color: '#1e40af', borderColor: aktif ? '#1e40af' : '#dbeafe' };
  if (sayfa === 'form') return { ...bStil, backgroundColor: '#f0fdf4', color: '#166534', borderColor: aktif ? '#166534' : '#dcfce7' };
  if (sayfa === 'icdis') return { ...bStil, backgroundColor: '#fff7ed', color: '#9a3412', borderColor: aktif ? '#9a3412' : '#ffedd5' };
  if (sayfa === 'fikstur1') return { ...bStil, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: aktif ? '#6b21a8' : '#f3e8ff' };
  if (sayfa === 'fikstur2') return { ...bStil, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: aktif ? '#9d174d' : '#fce7f3' };
  if (sayfa === 'puan') return { ...bStil, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: aktif ? '#115e59' : '#ccfbf1' };
  if (sayfa === 'krallik') return { ...bStil, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#ffe4e6' };
  if (sayfa === 'yildiz') return { ...bStil, backgroundColor: '#fef3c7', color: '#92400e', borderColor: aktif ? '#92400e' : '#fef3c7' };
  return { ...bStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#fecdd3' };
};

import Link from 'next/link';

// 🔗 TÜM SAYFALARDA OTOMATİK ÇALIŞACAK LOGOLU BAŞLIK BİLEŞENİ
export function Header({ altBaslik }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px', padding: '15px 0 5px 0' }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
        <img 
          src="/logo.png" 
          alt="FanteFut Logo" 
          style={{ 
            width: '90px', 
            height: '90px', 
            objectFit: 'contain', 
            marginBottom: '5px',
            display: 'block',
            margin: '0 auto'
          }} 
        />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0', color: '#132444', fontFamily: BAŞLIK_FONTU, letterSpacing: '1px', lineHeight: '1.1' }}>
          FanteFut
        </h1>
      </Link>
      <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '4px', fontFamily: ICERIK_FONTU, margin: '4px 0 0 0' }}>
        {altBaslik || "Süper Lig"}
      </p>
    </div>
  );
}

export function Navbar({ aktifSayfa }) {
  return (
    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
        <Link href="/" style={getMenuButonStili('eksik', aktifSayfa === 'eksik')}>Eksik Listesi</Link>
        <Link href="/haftanin-yildizlari" style={{ ...getMenuButonStili('yildiz', aktifSayfa === 'yildiz'), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: '#fbcfe8' }}>En İyiler</Link>
        <Link href="/haftanin-analizi" style={{ ...getMenuButonStili('analiz', aktifSayfa === 'analiz'), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>Tüyolar</Link>
        <Link href="/puan-durumu" style={getMenuButonStili('puan', aktifSayfa === 'puan')}>Puan Durumu</Link>
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
        <Link href="/kralliklar" style={getMenuButonStili('krallik', aktifSayfa === 'krallik')}>Gol & Asist</Link>
        <Link href="/form-durumu" style={getMenuButonStili('form', aktifSayfa === 'form')}>Form Durumu</Link>
        <Link href="/ic-dis-saha" style={getMenuButonStili('icdis', aktifSayfa === 'icdis')}>İç-Dış Saha Form</Link>
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/fikstur-ilk-yari" style={{ ...getMenuButonStili('fikstur1', aktifSayfa === 'fikstur1'), backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>Fikstür 1. Yarı</Link>
        <Link href="/fikstur-ikinci-yari" style={getMenuButonStili('fikstur2', aktifSayfa === 'fikstur2')}>Fikstür 2. Yarı</Link>
      </div>
    </div>
  );
}
