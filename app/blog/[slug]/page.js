// app/blog/[slug]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../../utils';
import { blogsData } from '../../../data/blogs'; 

// 🚀 1. CANLIDA 404 HATASINI ÇÖZEN EN KRİTİK FONKSİYON (SSG DERLEYİCİ)
export async function generateStaticParams() {
  const paramsArray = [];

  for (const grup of blogsData) {
    if (grup.yazilar) {
      for (const yazi of grup.yazilar) {
        if (yazi.slug) {
          paramsArray.push({
            slug: yazi.slug,
          });
        }
      }
    }
  }

  return paramsArray;
}

// 🔍 SEO ARAMA MOTORU AYARLARI (Dinamik Meta Verisi Üretici)
export async function generateMetadata({ params }) {
  // ✅ NEXT.JS 14+ ÇÖZÜMÜ: params asenkron olarak bekleniyor
  const { slug } = await params;
  
  let bulunanYazi = null;
  for (const grup of blogsData) {
    if (grup.yazilar) {
      const yazi = grup.yazilar.find(y => y.slug === slug);
      if (yazi) {
        bulunanYazi = yazi;
        break;
      }
    }
  }

  if (!bulunanYazi) {
    return { title: 'İçerik Bulunamadı - FanteFut' };
  }

  return {
    title: `${bulunanYazi.title} - FanteFut Tüyolar`,
    description: bulunanYazi.description,
    alternates: {
      canonical: `https://fantefut.com/blog/${slug}`,
    }
  };
}

// 🎯 SAYFA ARABİRİMİ
// ✅ NEXT.JS 14+ ÇÖZÜMÜ: Fonksiyon async hale getirildi
export default async function BlogDetailPage({ params }) {
  // ✅ NEXT.JS 14+ ÇÖZÜMÜ: params asenkron olarak bekleniyor
  const { slug } = await params;

  let aktifYazi = null;
  for (const grup of blogsData) {
    if (grup.yazilar) {
      const yazi = grup.yazilar.find(y => y.slug === slug);
      if (yazi) {
        aktifYazi = yazi;
        break;
      }
    }
  }

  if (!aktifYazi) {
    notFound();
  }

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
          {aktifYazi.content && aktifYazi.content[0] && (
            <p style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              {aktifYazi.content[0]}
            </p>
          )}

          {/* PARAGRAF ORTASI REKLAM ALANI */}
          {renderReklamAlani('Yazı İçi Orta')}

          {/* 2. Paragraf */}
          {aktifYazi.content && aktifYazi.content[1] && (
            <p style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              {aktifYazi.content[1]}
            </p>
          )}
        </article>


        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', marginBottom: '20px' }}>
          <Link href="/blog" style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: 'bold' }}>
            ← Tüm Tüyolara Geri Dön
          </Link>
        </div>

        {/* Projenin yeni merkezi Footer bileşeni */}
        <Footer />

      </div>
    </div>
  );
}
