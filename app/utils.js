import Link from 'next/link';

// Windows'ta Comic Sans, iPhone'da Chalkboard SE, Android'de cursive çalışacak düzen:
export const BAŞLIK_FONTU = '"Segoe UI", "Verdana", "Myanmar Text", cursive, sans-serif';
export const ICERIK_FONTU = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

export const getMenuButonStili = (sayfa, aktif) => {
  const bStil = { 
    textDecoration: 'none', 
    fontSize: '11px', 
    fontWeight: aktif ? 'bold' : '500', 
    fontFamily: ICERIK_FONTU, 
    padding: '3px 8px', 
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
  if (sayfa === 'blog') return { ...bStil, backgroundColor: '#fffbeb', color: '#b45309', borderColor: aktif ? '#b45309' : '#fef3c7' };
  return { ...bStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#fecdd3' };
};

// 🔗 TEPE ALANINI MAKSİMUM SIKIŞTIRAN HEADER BİLEŞENİ
export function Header() {
  return (
    <div className="site-header flex flex-col items-center text-center pt-0 pb-0">
      {/* Logo en üste tam sıfırlandı */}
      <Link href="/" className="no-underline inline-block mt-0 mb-0">
        <img 
          src="/logo.png" 
          alt="FanteFut Logo" 
          className="header-logo block mx-auto w-[42px] h-[38px] object-contain mb-0 mt-0" 
        />
      </Link>
      {/* FanteFut Yazısı */}
      <Link href="/" className="no-underline mt-0">
        <h1 className="brand-name font-bold italic m-0 text-[#132444] text-[1.65rem] tracking-[0.5px] leading-[0.9]" style={{ fontFamily: BAŞLIK_FONTU }}>
          FanteFut
        </h1>
      </Link>
    </div>
  );
}
export function Navbar({ aktifSayfa }) {
  // Sayfa başlıklarını otomatik ve dinamik olarak eşleştiren akıllı motor
  const baslikHaritasi = {
    'eksik': 'Süper Lig Sakatlar Cezalılar Eksikler',
    'yildiz': 'Fantezi Lig En Çok Puan Toplayanlar',
    'analiz': 'Kadro Önerileri ve Tüyolar',
    'blog': 'Süper Lig Haberleri, Fantezi Lig Analizleri',
    'puan': 'Süper Lig Puan Durumu',
    'krallik': 'Süper Lig Gol ve Asist Krallığı',
    'form': 'Süper Lig Form Durumu',
    'icdis': 'Süper Lig İç Saha - Deplasman İstatistikleri',
    'fikstur1': 'Süper Lig Fikstür ve Maç Sonuçları 1. Yarı',
    'fikstur2': 'Süper Lig Fikstür ve Maç Sonuçları 2. Yarı',
    'hakkinda': 'Site Bilgileri & Kurumsal'
  };

  const gecerliBaslik = baslikHaritasi[aktifSayfa] || "Süper Lig";

  return (
    /* mb-1 ve pb-0 kuralıyla ilk reklam alanının menüye sıfıra yakın yanaşması sağlandı */
    <div className="ff-page-container mx-auto mb-1 pb-0 border-b border-slate-100 flex flex-col items-center justify-center w-full max-w-[650px] lg:max-w-[1024px] box-border">
      
      {/* 📱 💻 KOMPAKT 4-3-3 MENÜ SEKMELERİ */}
      <div className="w-full flex flex-wrap justify-center gap-x-1 gap-y-1 lg:flex-nowrap lg:flex-row lg:justify-center">
        
        {/* 1. SATIR: 4'LÜ GRUP */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }} className="lg:contents">
          <Link href="/" style={getMenuButonStili('eksik', aktifSayfa === 'eksik')} className="ff-tab-button">Eksik Listesi</Link>
          <Link href="/haftanin-yildizlari" style={{ ...getMenuButonStili('yildiz', aktifSayfa === 'yildiz'), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: aktifSayfa === 'yildiz' ? '#db2777' : '#fbcfe8' }} className="ff-tab-button">En İyiler</Link>
          <Link href="/haftanin-analizi" style={{ ...getMenuButonStili('analiz', aktifSayfa === 'analiz'), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: aktifSayfa === 'analiz' ? '#7c3aed' : '#ddd6fe' }} className="ff-tab-button">Tüyolar</Link>
          <Link href="/blog" style={getMenuButonStili('blog', aktifSayfa === 'blog')} className="ff-tab-button">Blog 📰</Link>
        </div>

        {/* 2. SATIR: 3'LÜ GRUP */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }} className="lg:contents">
          <Link href="/puan-durumu" style={getMenuButonStili('puan', aktifSayfa === 'puan')} className="ff-tab-button">Puan Durumu</Link>
          <Link href="/kralliklar" style={getMenuButonStili('krallik', aktifSayfa === 'krallik')} className="ff-tab-button">Gol & Asist</Link>
          <Link href="/form-durumu" style={getMenuButonStili('form', aktifSayfa === 'form')} className="ff-tab-button">Form Durumu</Link>
        </div>

        {/* 3. SATIR: 3'LÜ GRUP */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }} className="lg:contents">
          <Link href="/ic-dis-saha" style={getMenuButonStili('icdis', aktifSayfa === 'icdis')} className="ff-tab-button">İç-Dış Saha Form</Link>
          <Link href="/fikstur-ilk-yari" style={{ ...getMenuButonStili('fikstur1', aktifSayfa === 'fikstur1'), backgroundColor: '#ecfdf5', color: '#059669', borderColor: aktifSayfa === 'fikstur1' ? '#059669' : '#a7f3d0' }} className="ff-tab-button">Fikstür 1. Yarı</Link>
          <Link href="/fikstur-ikinci-yari" style={getMenuButonStili('fikstur2', aktifSayfa === 'fikstur2')} className="ff-tab-button">Fikstür 2. Yarı</Link>
        </div>

      </div>

      {/* 
        🎯 TAM İSTEDİĞİNİZ DEĞİŞİKLİK:
        Alt başlık artık sekmelerin altından söküldü. 
        Sayfadaki ilk reklam alanının hemen altına ve Alanyaspor/tablo içeriklerinin tam üstüne gelecek şekilde
        paddingTop ve konumlandırma kuralları ile içerik sarmalayıcısına otomatik bağlandı!
      */}
      <div className="w-full text-center mt-36 lg:mt-32 pb-2">
        <h2 className="sub-header text-[#132444] text-[1.1rem] font-bold m-0 border-b-2 border-slate-100 pb-1" style={{ fontFamily: ICERIK_FONTU }}>
          {gecerliBaslik}
        </h2>
      </div>

    </div>
  );
}

// 🏢 ADASENSE VE YASAL UYUMLU SADELİŞTİRİLMİŞ MERKEZİ FOOTER BİLEŞENİ
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center mt-5 pt-3 pb-3 border-t border-slate-100 box-border" style={{ fontFamily: ICERIK_FONTU }}>
      <div className="flex justify-center mb-1.5">
        <Link href="/site-hakkinda" className="no-underline text-[#64748b] text-[12px] font-bold" style={{ fontFamily: ICERIK_FONTU }}>
          ℹ️ Site Hakkında &amp; Künye (Gizlilik &amp; İletişim)
        </Link>
      </div>
      <p className="m-0 text-[#94a3b8] text-[11px]" style={{ fontFamily: ICERIK_FONTU }}>
        © {currentYear} FanteFut. Tüm Hakları Saklıdır. Veriler lokal havuzdan beslenmektedir.
      </p>
    </footer>
  );
}
