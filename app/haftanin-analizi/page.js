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

  // Orijinal Veri Listeleri
  const kaleciler = ["Ederson", "Okan", "Nübel", "Uğurcan"];
  const defanslar = ["Murillo", "Winck", "Brown", "Tomasson", "Mendes", "Sallai", "Operi", "Ömer Ali"];
  const ortaSahalar = ["Greenwood", "Sara", "Yunus", "Cengiz", "Trossard", "Kyziridis"];
  const forvetler = ["Muriqi", "Vlahovic", "Benedyczak", "Ramirez"];

  // Kutular için Ortak Şık Stil Tanımı (Büyük fontlu ve ferah)
  const kutuStili = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '12px 8px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#132444',
    fontSize: '16px',
    fontWeight: '800',
    minHeight: '65px',
    lineHeight: '1.2'
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
          {/* Yan yana 2'li düzenle toplam 2 satır (4 oyuncu kapasiteli) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px', marginBottom: '15px' }}>
            {kaleciler.map((player, idx) => (
              <div key={idx} style={kutuStili}>{player}</div>
            ))}
          </div>

          {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
          {renderMevkiBasligi("Defanslar", "🛡️")}
          {/* Yan yana 3'lü düzenle toplam 3 satır (9 oyuncu kapasiteli) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginBottom: '15px' }}>
            {defanslar.map((player, idx) => (
              <div key={idx} style={{ ...kutuStili, fontSize: '13px' }}>{player}</div>
            ))}
          </div>

          {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
          {renderMevkiBasligi("Orta Sahalar", "🎯")}
          {/* Yan yana 3'lü düzenle toplam 3 satır (9 oyuncu kapasiteli) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginBottom: '15px' }}>
            {ortaSahalar.map((player, idx) => (
              <div key={idx} style={{ ...kutuStili, fontSize: '13px' }}>{player}</div>
            ))}
          </div>

          {/* ⚽ FORVETLER BÖLÜMÜ */}
          {renderMevkiBasligi("Forvetler", "⚽")}
          {/* Yan yana 3'lü düzenle toplam 3 satır (9 oyuncu kapasiteli) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginBottom: '15px' }}>
            {forvetler.map((player, idx) => (
              <div key={idx} style={{ ...kutuStili, fontSize: '13px' }}>{player}</div>
            ))}
          </div>

          {/* 💰 2. ORTA BÜYÜK REKLAM ALANI (GÜVENLİ VE ŞIK YENİ YERİ: FORVETLERİN ALTI) */}
          {renderRek('buyuk')}

          {/* 📝 GENEL ANALİZ KUTUSU */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', color: '#1e293b', fontSize: '14px', fontWeight: '500', lineHeight: '1.6', marginBottom: '25px', marginTop: '25px' }}>
            <p style={{ margin: '0 0 8px 0' }}>FanteFut fantezi futbol tüyolarına hoş geldiniz.</p>
            <p style={{ margin: '0 0 8px 0' }}>Bu sayfada fantezi futbol kadronuz için site tarafından önerilen oyuncuları göreceksiniz.</p>
            <p style={{ margin: '0 0 8px 0' }}>Ana sayfada bulunan (aynı zamanda 'Eksik Listesi' sekmesi) Süper Lig sakat ve cezalı oyuncular listesini kontrol etmeyi unutmayın.</p>
            <p style={{ margin: '0 0 8px 0' }}>'Gol & Asist ve En İyiler' sekmelerinde, fantezi futbol teknik direktörlerinin seveceği bilgiler mevcut.</p>
            <p style={{ margin: '0' }}>Oyunda kadro (ilk 11ler ve yedekler) kurmadan önce, Şampiyonlar Ligi, UEFA Avrupa Ligi, UEFA Konferans Ligi maçlarına çıkan takımlarımızın rotasyonlarını ve takımların muhtemel 11lerini takip etmek kritik öneme sahip olabilr. Milli maç aralarına dikkat. Süper Lig'de yeni hafta başlarken takımların resmi yayın organlarını ve muhabirlerin Alanyaspor, Amed Sportif Faaliyetler, Başakşehir, Beşiktaş, Çaykur Rizespor, Çorum FK, Erzurumspor FK, Eyüpspor, Fenerbahçe, Galatasaray, Gaziantep FK, Gençlerbirliği, Göztepe, Kasımpaşa, Kocaelispor, Konyaspor, Samsunspor, Trabzonspor muhtemel 11 haberlerini ve son dakika gelişmelerini takip ediyoruz. Kadro dışı, eksik, sakat and cezalı oyuncuları takip ediyoruz. Buna göre sitenin fantezi futbol tüyolarını en güncel bilgiler ışığında haftalık olarak düzenliyoruz.</p>
          </div>

          {/* 💰 3. EN ALT İNCE REKLAM ALANI */}
          {renderRek('ince')}
        </div>
      </div>
    </div>
  );
}
