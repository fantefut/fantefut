'use client';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

export default function HaftaninAnaliziSayfasi() {
  const renderRek = (tip) => {
    return (
      <div style={{ width: '100%', height: tip === 'ince' ? '60px' : '110px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', margin: '20px 0' }}>
        {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
      </div>
    );
  };

  const renderMevkiBasligi = (text, emoji) => {
    return (
      <h2 style={{ fontSize: '1.25rem', color: '#132444', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '10px', marginTop: '15px', fontFamily: ICERIK_FONTU, fontWeight: 'bold' }}>
        {emoji} {text}
      </h2>
    );
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 Logolu ortak Header yapısı eklendi */}
      <Header altBaslik="Kadro Önerileri ve Tüyolar" />

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Tüyolar aktif) */}
        <Navbar aktifSayfa="analiz" />

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          
          {/* 💰 1. ÜST BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 🧤 KALECİLER BÖLÜMÜ */}
          {renderMevkiBasligi("Kaleciler", "🧤")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Ederson, Okan, Nübel, Uğurcan]
          </div>

          'use client';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, Header, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

export default function HaftaninAnaliziSayfasi() {
  
  // Yenilenmiş ve Ferahlatılmış Reklam Alanı Bileşeni (Tailwind v4)
  const renderRek = (tip) => {
    return (
      <div className={`w-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs italic my-6 transition-all ${
        tip === 'ince' ? 'h-[70px]' : 'h-[140px]'
      }`}>
        {tip === 'ince' ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
      </div>
    );
  };

  // Büyük ve Belirgin Mevki Başlıkları
  const renderMevkiBasligi = (text, emoji) => {
    return (
      <h2 className="text-xl text-[#132444] border-b-2 border-slate-200 pb-2 mb-4 mt-6 font-bold flex items-center gap-2">
        <span>{emoji}</span> {text}
      </h2>
    );
  };

  // Mevki Oyuncu Verileri
  const kaleciler = ["Ederson", "Okan Kocuk", "Alexander Nübel", "Uğurcan Çakır"];
  const defanslar = ["Murillo", "Winck", "Brown", "Tomasson", "Mendes", "Sallai", "Operi", "Ömer Ali"];
  const ortaSahalar = ["Greenwood", "Sara", "Yunus Akgün", "Cengiz Ünder", "Trossard", "Kyziridis"];
  const forvetler = ["Muriqi", "Vlahovic", "Benedyczak", "Ramirez"];

  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      
      {/* 🌟 Logolu ortak Header yapısı */}
      <Header altBaslik="Kadro Önerileri ve Tüyolar" />

      <div className="max-w-[900px] mx-auto">
        
        {/* Ortak Navbar Bileşeni (Tüyolar aktif) */}
        <Navbar aktifSayfa="analiz" />

        {/* Mobil odaklı daraltılmış içerik alanı */}
        <div className="max-w-[400px] mx-auto px-1">
          
          {/* 💰 1. ÜST BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 🧤 KALECİLER BÖLÜMÜ (Yan yana 2, Toplam 2 Satır) */}
          {renderMevkiBasligi("Kaleciler", "🧤")}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {kaleciler.map((player, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center flex items-center justify-center min-h-[70px] shadow-xs">
                <span className="text-lg font-extrabold text-[#132444] leading-tight text-balance">{player}</span>
              </div>
            ))}
          </div>

          {/* Reklam Ferahlığı için İnce Şerit */}
          {renderRek('ince')}

          {/* 🛡️ DEFANSLAR BÖLÜMÜ (Yan yana 3, Maksimum 3 Satır) */}
          {renderMevkiBasligi("Defanslar", "🛡️")}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {defanslar.map((player, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex items-center justify-center min-h-[65px] shadow-xs">
                <span className="text-sm font-extrabold text-[#132444] leading-tight text-balance">{player}</span>
              </div>
            ))}
          </div>

          {/* 🎯 ORTA SAHALAR BÖLÜMÜ (Yan yana 3, Maksimum 3 Satır) */}
          {renderMevkiBasligi("Orta Sahalar", "🎯")}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ortaSahalar.map((player, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex items-center justify-center min-h-[65px] shadow-xs">
                <span className="text-sm font-extrabold text-[#132444] leading-tight text-balance">{player}</span>
              </div>
            ))}
          </div>

          {/* ⚽ FORVETLER BÖLÜMÜ (Yan yana 3, Maksimum 3 Satır) */}
          {renderMevkiBasligi("Forvetler", "⚽")}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {forvetler.map((player, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex items-center justify-center min-h-[65px] shadow-xs">
                <span className="text-sm font-extrabold text-[#132444] leading-tight text-balance">{player}</span>
              </div>
            ))}
          </div>

          {/* 💰 2. ORTA BÜYÜK REKLAM ALANI */}
          {renderRek('buyuk')}

          {/* 📝 GENEL ANALİZ KUTUSU (2026-2027 SEZONU VE SÜREKLİ GÜNCEL SEO REHBERİ) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm font-medium leading-relaxed my-6 shadow-xs">
            <h3 className="text-base text-[#132444] font-bold mb-3">📊 Süper Lig Fantezi Lig Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
            
            <p className="mb-3">
              FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve Süper Lig takipçileri için kurulmuş bağımsız bir strateji, analiz ve tüyo rehberidir. Fantezi lig platformlarında her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon gelişmelerini çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan <strong className="font-bold text-slate-900">Süper Lig güncel sakat ve cezalı oyuncular listesi (Eksik Listesi)</strong>ne göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, fantezi lig bütçenizi ve haftalık puanınızı doğrudan riske atabilir.
            </p>

            <p className="mb-3">
              Bu doğrultuda, fantezi lig menajerlerinin kadrolarını şekillendirmeden önce Süper Lig takımlarının Avrupa mesailerini de göz önünde bulundurması gerekir. Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi gibi yoğun fikstürlerde mücadele eden takımlarımızın, lig maçlarında yapacağı kadro rotasyonları fantezi lig sıralamanızı doğrudan etkiler. Özellikle milli maç aralarının hemen ardından oynanan lig haftalarında, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong className="font-bold text-slate-900">Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi 2026-2027 sezonu Süper Lig kulüplerinin muhtemel 11 haberlerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini fantezi lig dünyasına sunuyoruz.
            </p>

            <p className="m-0">
              Sitemizde yer alan <strong className="font-bold text-slate-900">'Gol & Asist'</strong> ve <strong className="font-bold text-slate-900">'En İyiler'</strong> sekmeleri, fantezi lig katılımcılarının oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. İç ve dış saha form durumları, takımların savunma ve hücum güçleri analiz edilerek kaleci, defans, orta saha ve forvet mevkileri için en optimum oyuncu havuzunu buradaki listelerimizde güncelliyoruz. Diğer platformlarda kadronuzu (ilk 11 ve yedek kulübesi) kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek fantezi lig turlarını kayıpsız geçmenizi sağlayacaktır. FanteFut olarak, Süper Lig eksik listelerini ve fantezi lig tüyolarını en güncel gelişmeler ışığında <strong className="font-bold text-slate-900">sürekli olarak düzenliyor ve anlık güncelliyoruz</strong>. Böylece platformumuzu tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak ayakta tutuyoruz.
            </p>
          </div>

          {/* 💰 3. EN ALT İNCE REKLAM ALANI */}
          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
