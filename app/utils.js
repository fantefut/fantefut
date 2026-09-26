import Link from 'next/link';

// Windows'ta Comic Sans, iPhone'da Chalkboard SE, Android'de cursive çalışacak düzen:
export const BAŞLIK_FONTU = '"Comic Sans MS", "Chalkboard SE", "MV Boli", cursive, sans-serif';
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
  if (sayfa === 'fikstur1') return { ...bStil, backgroundColor: '#faf5ff', color: '#6b21a8', borderColor: '#f3e8ff' };
  if (sayfa === 'fikstur2') return { ...bStil, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: '#fce7f3' }; 
  if (sayfa === 'puan') return { ...bStil, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: aktif ? '#115e59' : '#ccfbf1' };
  if (sayfa === 'krallik') return { ...bStil, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#ffe4e6' };
  if (sayfa === 'yildiz') return { ...bStil, backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fef3c7' };
  {/* Yeni elit Blog butonu renk şeması (soft turuncu/kehribar tonda, tüyoların rengiyle harika eşleşiyor) */}
  if (sayfa === 'blog') return { ...bStil, backgroundColor: '#fffbeb', color: '#b45309', borderColor: aktif ? '#b45309' : '#fef3c7' };
  return { ...bStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#fecdd3' };
};

// 🔗 TÜM SAYFALARDA OTOMATİK ÇALIŞACAK KÜÇÜLTÜLMÜŞ VE BAĞLANTILARI DÜZELTİLMİŞ BAŞLIK BİLEŞENİ
export function Header({ altBaslik }) {
  return (
    <div className="site-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '10px 0 5px 0' }}>
      
      {/* 1. Logo Ayrıldı, Küçültüldü (90px -> 60px) ve Linki Kesinleştirildi */}
      <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
        <img 
          src="/logo.png" 
          alt="FanteFut Logo" 
          className="header-logo"
          style={{ 
            width: '60px', 
            height: '60px', 
            objectFit: 'contain', 
            marginBottom: '2px',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </Link>

      {/* 2. FanteFut Yazısı Ayrıldı, Küçültüldü (3.1rem -> 2.2rem) ve Tıklanabilir Yapıldı */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1 className="brand-name" style={{ 
          fontSize: '2.2rem', 
          fontWeight: 'bold', 
          fontStyle: 'italic', 
          margin: '0', 
          color: '#132444', 
          fontFamily: BAŞLIK_FONTU, 
          letterSpacing: '0.5px', 
          lineHeight: '1.1'
        }}>
          FanteFut
        </h1>
      </Link>

      {/* 3. Sayfa Alt Başlığı Boşluğu Azaltılarak Yukarı Taşındı */}
      <h2 className="sub-header" style={{ 
        color: '#132444', 
        fontSize: '1.05rem', 
        fontWeight: 'bold', 
        marginTop: '3px', 
        fontFamily: ICERIK_FONTU, 
        margin: '3px 0 0 0' 
      }}>
        {altBaslik || "Süper Lig"}
      </h2>
    </div>
  );
}

export function Navbar({ aktifSayfa }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '8px', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100%', 
      maxWidth: '650px', 
      margin: '0 auto 16px auto', 
      paddingBottom: '12px', 
      borderBottom: '1px solid #f1f5f9',
      boxSizing: 'border-box'
    }}>
      {/* 1. SATIR: 4'LÜ GRUP (Eksik | En İyiler | Tüyolar | Blog) */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
        <Link href="/" style={getMenuButonStili('eksik', aktifSayfa === 'eksik')}>Eksik Listesi</Link>
        <Link href="/haftanin-yildizlari" style={{ ...getMenuButonStili('yildiz', aktifSayfa === 'yildiz'), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: aktifSayfa === 'yildiz' ? '#db2777' : '#fbcfe8' }}>En İyiler</Link>
        <Link href="/haftanin-analizi" style={{ ...getMenuButonStili('analiz', aktifSayfa === 'analiz'), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: aktifSayfa === 'analiz' ? '#7c3aed' : '#ddd6fe' }}>Tüyolar</Link>
        <Link href="/blog" style={getMenuButonStili('blog', aktifSayfa === 'blog')}>Blog 📰</Link>
      </div>

      {/* 2. SATIR: 3'LÜ GRUP (Puan Durumu | Gol & Asist | Form Durumu) */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
        <Link href="/puan-durumu" style={getMenuButonStili('puan', aktifSayfa === 'puan')}>Puan Durumu</Link>
        <Link href="/kralliklar" style={getMenuButonStili('krallik', aktifSayfa === 'krallik')}>Gol & Asist</Link>
        <Link href="/form-durumu" style={getMenuButonStili('form', aktifSayfa === 'form')}>Form Durumu</Link>
      </div>

      {/* 3. SATIR: 3'LÜ GRUP (İç-Dış Saha Form | Fikstür 1. Yarı | Fikstür 2. Yarı) */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
        <Link href="/ic-dis-saha" style={getMenuButonStili('icdis', aktifSayfa === 'icdis')}>İç-Dış Saha Form</Link>
        <Link href="/fikstur-ilk-yari" style={{ ...getMenuButonStili('fikstur1', aktifSayfa === 'fikstur1'), backgroundColor: '#ecfdf5', color: '#059669', borderColor: aktifSayfa === 'fikstur1' ? '#059669' : '#a7f3d0' }}>Fikstür 1. Yarı</Link>
        <Link href="/fikstur-ikinci-yari" style={getMenuButonStili('fikstur2', aktifSayfa === 'fikstur2')}>Fikstür 2. Yarı</Link>
      </div>
    </div>
  );
}

// 🏢 ADASENSE VE YASAL UYUMLU SADELİŞTİRİLMİŞ MERKEZİ FOOTER BİLEŞENİ
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      textAlign: 'center', 
      marginTop: '40px', 
      paddingTop: '20px', 
      paddingBottom: '20px', 
      borderTop: '1px solid #f1f5f9',
      fontFamily: ICERIK_FONTU,
      boxSizing: 'border-box'
    }}>
      {/* Tek ve Net Yasal Sayfa Linki */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '10px' 
      }}>
        <Link href="/site-hakkinda" style={{ textDecoration: 'none', color: '#64748b', fontSize: '12px', fontWeight: 'bold', fontFamily: ICERIK_FONTU }}>
          ℹ️ Site Hakkında & Künye (Gizlilik & İletişim)
        </Link>
      </div>
      
      {/* Altyapı ve Telif Hakkı Damgası */}
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px', fontFamily: ICERIK_FONTU }}>
        © {currentYear} FanteFut. Tüm Hakları Saklıdır. Veriler lokal havuzdan beslenmektedir.
      </p>
    </footer>
  );
}
