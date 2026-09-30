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
    /* 🎯 DÜĞME KÜÇÜLTME: İç dikey boşluk 4px'den 3px'e, yatay boşluk 10px'den 8px'e çekilerek sekmeler daraltıldı */
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
  if (sayfa === 'fikstur1') return { ...bStil, backgroundColor: '#ecfdf5', color: '#059669', borderColor: aktif ? '#059669' : '#a7f3d0' };
  if (sayfa === 'fikstur2') return { ...bStil, backgroundColor: '#fdf2f8', color: '#9d174d', borderColor: aktif ? '#9d174d' : '#fce7f3' }; 
  if (sayfa === 'puan') return { ...bStil, backgroundColor: '#f0fdfa', color: '#115e59', borderColor: aktif ? '#115e59' : '#ccfbf1' };
  if (sayfa === 'krallik') return { ...bStil, backgroundColor: '#fff1f2', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#ffe4e6' };
  if (sayfa === 'yildiz') return { ...bStil, backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fef3c7' };
  if (sayfa === 'blog') return { ...bStil, backgroundColor: '#fffbeb', color: '#b45309', borderColor: aktif ? '#b45309' : '#fef3c7' };
  return { ...bStil, backgroundColor: '#fecdd3', color: '#9f1239', borderColor: aktif ? '#9f1239' : '#fecdd3' };
};

// 🔗 LOGO/YAZI BOYUTUNU KORUYAN, SADECE DIKEY BOŞLUKLARI SIFIRLAYAN HEADER BİLEŞENİ
export function Header({ altBaslik }) {
  return (
    <div className="site-header flex flex-col items-center text-center pt-0.5 pb-0">
      <Link href="/" className="no-underline inline-block">
        <img 
          src="/logo.png" 
          alt="FanteFut Logo" 
          className="header-logo block mx-auto w-[60px] h-[60px] object-contain mb-0" 
        />
      </Link>
      <Link href="/" className="no-underline">
        <h1 className="brand-name font-bold italic m-0 text-[#132444] text-[2.2rem] tracking-[0.5px] leading-[1.0]" style={{ fontFamily: BAŞLIK_FONTU }}>
          FanteFut
        </h1>
      </Link>
    </div>
  );
}

export function Navbar({ aktifSayfa }) {
  return (
    <div className="ff-page-container mx-auto mb-1 pb-1 border-b border-slate-100 flex flex-col items-center justify-center w-full max-w-[650px] lg:max-w-[1024px] box-border" style={{ marginTop: '12px' }}>
      
      {/* 
        Masaüstünde (lg:) yan yana tek satır düzeni aynen korunur.
        Mobilde ise gap-y-2 ile dikeyde sadece 2 temiz satıra sığacak akıllı flex yapısı kuruldu.
      */}
      <div className="w-full flex flex-wrap justify-center gap-x-1.5 gap-y-2 lg:flex-nowrap lg:flex-row lg:justify-center">
        
        {/* 📱 SATIR 1: SOL GRUP (Mobilde her zaman görünür) */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <Link href="/" style={getMenuButonStili('eksik', aktifSayfa === 'eksik')} className="ff-tab-button">Eksik Listesi</Link>
          <Link href="/haftanin-yildizlari" style={{ ...getMenuButonStili('yildiz', aktifSayfa === 'yildiz'), backgroundColor: '#fdf2f8', color: '#db2777', borderColor: aktifSayfa === 'yildiz' ? '#db2777' : '#fbcfe8' }} className="ff-tab-button">En İyiler</Link>
          <Link href="/haftanin-analizi" style={{ ...getMenuButonStili('analiz', aktifSayfa === 'analiz'), backgroundColor: '#f5f3ff', color: '#7c3aed', borderColor: aktifSayfa === 'analiz' ? '#7c3aed' : '#ddd6fe' }} className="ff-tab-button">Tüyolar</Link>
          <Link href="/blog" style={getMenuButonStili('blog', aktifSayfa === 'blog')} className="ff-tab-button">Blog 📰</Link>
        </div>

        {/* 📱 SATIR 2 / MASAÜSTÜ DEVAMI: SAĞ GRUP VE BİRLEŞTİRİLMİŞ MOBİL BUTONLAR */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <Link href="/puan-durumu" style={getMenuButonStili('puan', aktifSayfa === 'puan')} className="ff-tab-button">Puan Durumu</Link>
          <Link href="/kralliklar" style={getMenuButonStili('krallik', aktifSayfa === 'krallik')} className="ff-tab-button">Gol & Asist</Link>
          
          {/* 🔄 FORM DURUMU BİRLEŞTİRME MANTIĞI */}
          {/* Mobilde sadece tek buton gözükür, İç-Dış veya Normal Form durumunda yeşil yanar */}
          <span className="inline-block lg:hidden">
            <Link href="/form-durumu" style={getMenuButonStili('form', aktifSayfa === 'form' || aktifSayfa === 'icdis')} className="ff-tab-button">Form Durumu</Link>
          </span>
          {/* Masaüstünde eski iki ayrı buton düzeni bozulmadan korunur */}
          <span className="hidden lg:contents">
            <Link href="/form-durumu" style={getMenuButonStili('form', aktifSayfa === 'form')} className="ff-tab-button">Form Durumu</Link>
            <Link href="/ic-dis-saha" style={getMenuButonStili('icdis', aktifSayfa === 'icdis')} className="ff-tab-button">İç-Dış Saha Form</Link>
          </span>

          {/* 🔄 FİKSTÜR BİRLEŞTİRME MANTIĞI */}
          {/* Mobilde sadece tek buton gözükür, Fikstür 1 veya 2 açıkken zümrüt yeşili yanar */}
          <span className="inline-block lg:hidden">
            <Link href="/fikstur-ilk-yari" style={getMenuButonStili('fikstur1', aktifSayfa === 'fikstur1' || aktifSayfa === 'fikstur2')} className="ff-tab-button">Fikstür</Link>
          </span>
          {/* Masaüstünde eski iki ayrı buton düzeni bozulmadan korunur */}
          <span className="hidden lg:contents">
            <Link href="/fikstur-ilk-yari" style={getMenuButonStili('fikstur1', aktifSayfa === 'fikstur1')} className="ff-tab-button">Fikstür 1. Yarı</Link>
            <Link href="/fikstur-ikinci-yari" style={getMenuButonStili('fikstur2', aktifSayfa === 'fikstur2')} className="ff-tab-button">Fikstür 2. Yarı</Link>
          </span>
        </div>

      </div>
    </div>
  );
}

// 🎯 ONAY SÜRECİ İÇİN ESNEK ÜST REKLAM BİLEŞENİ
export function UstReklamAlani() {
  return (
    <div 
      className="reklam-alani-ust w-full mx-auto"
      style={{ 
        marginTop: '16px', 
        marginBottom: '24px', 
        minHeight: '50px', 
        maxHeight: '100px',
        maxWidth: '1024px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}
    >
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', height: '100%' }}
           data-ad-client="ca-pub-8150936873067102" // Kendi ads.txt'indeki numarayı buraya yapıştır
           data-ad-format="horizontal"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

// 🎯 ONAY SÜRECİ İÇİN ESNEK ORTA REKLAM BİLEŞENİ
export function OrtaReklamAlani() {
  return (
    <div 
      className="reklam-alani-orta w-full mx-auto"
      style={{ 
        marginTop: '24px', 
        marginBottom: '24px', 
        minHeight: '50px', 
        maxHeight: '100px',
        maxWidth: '1024px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}
    >
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', height: '100%' }}
           data-ad-client="ca-pub-8150936873067102" // Kendi ads.txt'indeki numarayı buraya yapıştır
           data-ad-format="horizontal" 
           data-full-width-responsive="true"></ins>
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
