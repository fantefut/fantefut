// app/blog/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar, Header, ICERIK_FONTU, BAŞLIK_FONTU } from '../../utils';
import { blogsData } from '../..data/blogs';

// 🔍 SEO ARAMA MOTORU AYARLARI (Dinamik Meta Verisi Üretici)
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // Tüm gruplardaki yazıları tara ve slug eşleşen yazıyı bul
  let bulunanYazi = null;
  for (const grup of blogsData) {
    const yazi = grup.yazilar.find(y => y.slug === slug);
    if (yazi) {
      bulunanYazi = yazi;
      break;
    }
  }

  if (!bulunanYazi) {
    return { title: 'İçerik Bulunamadı - FanteFut' };
  }

  return {
    title: `${bulunanYazi.title} - FanteFut Tüyolar`,
    description: bulunanYazi.description,
    alternates: {
      canonical: `https://fantefut.com{slug}`,
    }
  };
}

// 🎯 SAYFA ARABİRİMİ
export default function BlogDetailPage({ params }) {
  const { slug } = params;

  // Veri havuzundan yazıyı çek
  let aktifYazi = null;
  for (const grup of blogsData) {
    const yazi = grup.yazilar.find(y => y.slug === slug);
    if (yazi) {
      aktifYazi = yazi;
      break;
    }
  }

  // Eğer URL'deki slug veride yoksa otomatik 404 sayfasına fırlatır
  if (!aktifYazi) {
    notFound();
  }

  // Detay sayfası esnek reklam alanı
  const renderReklamAlani = (konum) => (
    <div style={{
      width: '100%',
      maxWidth: '728px',
      minHeight: '90px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
      fontSize: '11px',
      fontStyle: 'italic',
      margin: '20px auto',
      textAlign: 'center',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      <span>- Reklam Alanı (Google AdSense Detay {konum}) -</span>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      <Header altBaslik="Fantezi Lig Gündem Detayı" />

      <div style={{ maxWidth: '728px', margin: '0 auto' }}>
        
        {/* Ortak 4-3-3 Menümüz */}
        <Navbar aktifSayfa="blog" />

        {/* ÜST REKLAM ALANI */}
        {renderReklamAlani('Üst')}

        {/* MAKALE ALANI */}
        <article style={{ marginTop: '20px' }}>
          <h1 style={{ 
            fontSize: '1.6rem', 
            color: '#0f172a', 
            marginBottom: '10px', 
            fontFamily: BAŞLIK_FONTU, 
            fontWeight: 'bold',
            lineHeight: '1.3' 
          }}>
            {aktifYazi.title}
          </h1>

          <p style={{ 
            fontSize: '0.95rem', 
            color: '#64748b', 
            fontStyle: 'italic', 
            marginBottom: '20px',
            lineHeight: '1.5',
            borderLeft: '3px solid #cbd5e1',
            paddingLeft: '10px'
          }}>
            {aktifYazi.description}
          </p>

          {/* 1. Paragraf */}
          <p style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            {aktifYazi.content[0]}
          </p>

          {/* PARAGRAF ORTASI (EN ÇOK KAZANDIRAN) REKLAM ALANI */}
          {renderReklamAlani('Yazı İçi Orta')}

          {/* 2. Paragraf (Eğer varsa) */}
          {aktifYazi.content[1] && (
            <p style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              {aktifYazi.content[1]}
            </p>
          )}
        </article>

        {/* ALT REKLAM ALANI VE GERİ DÖNÜŞ LİNKİ */}
        {renderReklamAlani('Alt')}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
          <Link href="/blog" style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: 'bold' }}>
            ← Tüm Tüyolara Geri Dön
          </Link>
          
          <Link href="/site-hakkinda" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>
            ℹ️ Site Hakkında (Künye)
          </Link>
        </div>

      </div>
    </div>
  );
}
