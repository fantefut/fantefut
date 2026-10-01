import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../../utils';
import { blogsData } from '../../../data/blogs'; 

export async function generateStaticParams() {
  const paramsArray = [];
  if (Array.isArray(blogsData)) {
    for (const grup of blogsData) {
      if (grup && Array.isArray(grup.yazilar)) {
        for (const yazi of grup.yazilar) {
          if (yazi && yazi.slug) {
            paramsArray.push({
              slug: yazi.slug,
            });
          }
        }
      }
    }
  }
  return paramsArray;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  let bulunanYazi = null;
  if (Array.isArray(blogsData)) {
    for (const grup of blogsData) {
      if (grup && Array.isArray(grup.yazilar)) {
        const yazi = grup.yazilar.find(y => y.slug === slug);
        if (yazi) {
          bulunanYazi = yazi;
          break;
        }
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
      canonical: `https://fantefut.com{slug}`,
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let aktifYazi = null;
  if (Array.isArray(blogsData)) {
    for (const grup of blogsData) {
      if (grup && Array.isArray(grup.yazilar)) {
        const yazi = grup.yazilar.find(y => y.slug === slug);
        if (yazi) {
          aktifYazi = yazi;
          break;
        }
      }
    }
  }

  if (!aktifYazi) {
    notFound();
  }

  // Google AdSense onayını kolaylaştıran, taşma korumalı ortak reklam alanı
  const renderReklamAlani = (ozelStil = {}) => (
    <div style={{
      width: '100%',
      maxWidth: '100%', // Mobilde sağa taşmaları engeller
      minHeight: '50px', // Onay süreci için talep edilen alt sınır
      maxHeight: '100px', // Onay süreci için talep edilen üst sınır
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
      fontSize: '11px',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '10px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...ozelStil
    }}>
      <span style={{ display: 'block', width: '100%' }}>- Reklam Alanı (Google AdSense) -</span>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        <Navbar aktifSayfa="blog" />

        <article style={{ marginTop: '20px' }}>
          {/* Makale Başlığı (H1) */}
          <h1 style={{ 
            fontSize: '1.4rem', 
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

          {/* 🛡️ AdDensity ihlalini ve ekran çakışmasını önlemek için üst reklam alanı bu bölgeden tamamen söküldü. */}

          {/* Makale İçerik 1. Parça */}
          {aktifYazi.content && aktifYazi.content[0] && (
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: '1.65', margin: '0 0 16px 0' }}>
              {aktifYazi.content[0]}
            </p>
          )}

          {/* 2. Orta Reklam: İlk paragraf bittikten sonra tam kurallara uygun 24px-24px boşluk kuralıyla yerleşti */}
          {renderReklamAlani({ marginTop: '24px', marginBottom: '24px' })}

          {/* Makale İçerik 2. Parça */}
          {aktifYazi.content && aktifYazi.content[1] && (
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: '1.65', margin: '0 0 16px 0' }}>
              {aktifYazi.content[1]}
            </p>
          )}
        </article>

        {/* 🚀 GOOGLE BOT DOSTU ZENGİN SEO AÇIKLAMA METNİ (Thin Content Önleyici) */}
        <div style={{ 
          marginTop: '30px', 
          marginBottom: '10px', 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          fontFamily: ICERIK_FONTU
        }}>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            FanteFut Süper Lig haberleri ve fantezi lig ile ilgili konularda bilgi derleme sayfasındasınız. Kadrolarınızı değiştirirken, takımların en güncel rotasyon, ceza ve ilk 11 gelişmelerini bu blog içerikleri üzerinden inceleyebilir, fantezi lig sıralamasında rakiplerinizin önüne geçebilirsiniz.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', marginBottom: '20px' }}>
          <Link href="/blog" style={{ textDecoration: 'none', color: '#16a34a', fontSize: '13px', fontWeight: 'bold' }}>
            ← Blog Ana Sayfasına Geri Dön
          </Link>
        </div>

        <Footer />

      </div>
    </div>
  );
}
