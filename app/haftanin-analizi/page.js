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

          {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
          {renderMevkiBasligi("Defanslar", "🛡️")}
          <div style={{ color: '#132444', fontSize: '14px', fontWeight: 'bold', paddingLeft: '5px', paddingRight: '5px', lineHeight: '1.5', minHeight: '40px', marginBottom: '15px' }}>
            [Murillo, Winck, Brown, Tomasson, Mendes, Sallai, Operi, Ömer Ali]
          </div>

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

          {/* 💰 2. ORTA BÜYÜK REKLAM ALANI (GÜVENLİ VE ŞIK YENİ YERİ: FORVETLERİN ALTI) */}
          {renderRek('buyuk')}

          {/* 📝 GENEL ANALİZ KUTUSU (2026-2027 SEZONU VE SÜREKLİ GÜNCEL SEO REHBERİ) */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', color: '#1e293b', fontSize: '13px', fontWeight: '500', lineHeight: '1.6', marginBottom: '25px', marginTop: '25px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#132444', fontWeight: 'bold', marginBottom: '10px', marginTop: '0' }}>📊 Süper Lig Fantezi Lig Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
            
            <p style={{ margin: '0 0 12px 0' }}>
              FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve Süper Lig takipçileri için kurulmuş bağımsız bir strateji, analiz ve tüyo rehberidir. Fantezi lig platformlarında her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon gelişmelerini çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan <strong>Süper Lig güncel sakat ve cezalı oyuncular listesi (Eksik Listesi)</strong>ne göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, fantezi lig bütçenizi ve haftalık puanınızı doğrudan riske atabilir.
            </p>

            <p style={{ margin: '0 0 12px 0' }}>
              Bu doğrultuda, fantezi lig menajerlerinin kadrolarını şekillendirmeden önce Süper Lig takımlarının Avrupa mesailerini de göz önünde bulundurması gerekir. Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi gibi yoğun fikstürlerde mücadele eden takımlarımızın, lig maçlarında yapacağı kadro rotasyonları fantezi lig sıralamanızı doğrudan etkiler. Özellikle milli maç aralarının hemen ardından oynanan lig haftalarında, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong>Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi 2026-2027 sezonu Süper Lig kulüplerinin muhtemel 11 haberlerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini fantezi lig dünyasına sunuyoruz.
            </p>

            <p style={{ margin: '0 0 12px 0' }}>
              Sitemizde yer alan <strong>'Gol & Asist'</strong> ve <strong>'En İyiler'</strong> sekmeleri, fantezi lig katılımcılarının oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. İç ve dış saha form durumları, takımların savunma ve hücum güçleri analiz edilerek kaleci, defans, orta saha ve forvet mevkileri için en optimum oyuncu havuzunu buradaki listelerimizde güncelliyoruz. Diğer platformlarda kadronuzu (ilk 11 ve yedek kulübesi) kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek fantezi lig turlarını kayıpsız geçmenizi sağlayacaktır. FanteFut olarak, Süper Lig eksik listelerini ve fantezi lig tüyolarını en güncel gelişmeler ışığında <strong>sürekli olarak düzenliyor ve anlık güncelliyoruz</strong>. Böylece platformumuzu tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak ayakta tutuyoruz.
            </p>
          </div>

          {/* 💰 3. EN ALT İNCE REKLAM ALANI */}
          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
