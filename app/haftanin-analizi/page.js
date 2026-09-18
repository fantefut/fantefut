'use client';
import Link from 'next/link';
// Ortak utils bileşenlerini ve fontları dışarıdan dahil ediyoruz
import { Navbar, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';

export default function HaftaninAnaliziSayfasi() {
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
        <p style={{ color: '#132444', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2px', fontFamily: ICERIK_FONTU }}>Süper Lig</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-2 Düzenindeki Yeni Navbar Bileşeni (Tüyolar aktif) */}
        <Navbar aktifSayfa="analiz" />

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

          {/* 🧤 2. GÜNCELLEME: KALECİLER BÖLÜMÜ */}
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
