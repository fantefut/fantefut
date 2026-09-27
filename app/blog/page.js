'use client';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; 

// Next.js 14/15/16 standartlarında arama parametreleri doğrudan prop olarak alınabiliyor
export default function BlogListPage({ searchParams }) {
  
  // URL parametresini useSearchParams kancası olmadan, güvenli ve doğrudan okuyoruz
  const aktifQuerySlug = searchParams?.secili || null;

  const renderReklamAlani = (alanKonumu) => (
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
      margin: '15px auto',
      textAlign: 'center',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      <span>- Reklam Alanı (Google AdSense {alanKonumu}) -</span>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      <Header altBaslik="Süper Lig Haberleri, Fantezi Lig Analizleri" />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Ortak Menü */}
        <Navbar aktifSayfa="blog" />

        {renderReklamAlani('Üst')}

        {/* SAF LINK DESTEKLİ DOĞRUSAL DÜZEN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          {Array.isArray(blogsData) && blogsData.map((grup, grupIndex) => {
            
            // Eğer parametre seçilmediyse listenin ilk yazısını otomatik getiriyoruz
            const varsayilanSlug = grup.yazilar && grup.yazilar.length > 0 ? grup.yazilar[0].slug : null;
            const aktifSlug = aktifQuerySlug || varsayilanSlug;

            // Yazıyı güvenli bulma havuzu
            const aktifYazi = grup.yazilar && Array.isArray(grup.yazilar) && grup.yazilar.length > 0
              ? (grup.yazilar.find(y => y.slug === aktifSlug) || grup.yazilar[0]) 
              : null;

            return (
              <div 
                key={grupIndex} 
                style={{ 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* SABİT HAFTALIK BAŞLIK ALANI */}
                <div 
                  style={{
                    padding: '14px 16px',
                    backgroundColor: grupIndex === 0 ? '#f0fdf4' : '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: grupIndex === 0 ? '#166534' : '#1e293b', fontSize: '1.1rem', fontFamily: BAŞLIK_FONTU }}>
                    {grupIndex === 0 ? `🟢 En Güncel: ${grup.grupAdi}` : `📁 Arşiv: ${grup.grupAdi}`}
                  </span>
                </div>

                {/* İÇERİK BLOĞU */}
                <div style={{ padding: '16px' }}>
                  
                  {/* MAÇ GÜNLERİ SAF LİNK SEKME DÜĞMELERİ (iOS'ta Asla Yutulmaz) */}
                  {grup.yazilar && grup.yazilar.length > 1 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '14px' }}>
                      {grup.yazilar.map((yazi) => {
                        const isButonAktif = aktifSlug === yazi.slug;
                        return (
                          <Link
                            key={yazi.slug}
                            href={`?secili=${yazi.slug}`} // iOS Safari'nin yutamadığı doğal HTML yönlendirmesi
                            scroll={false}              // Sayfanın yukarı zıplamasını engeller
                            style={{
                              padding: '8px 14px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              border: '1px solid',
                              textDecoration: 'none',
                              display: 'inline-block',
                              backgroundColor: isButonAktif ? '#fef3c7' : '#ffffff',
                              color: isButonAktif ? '#92400e' : '#64748b',
                              borderColor: isButonAktif ? '#b45309' : '#e2e8f0',
                              WebkitTapHighlightColor: 'transparent',
                              touchAction: 'manipulation'
                            }}
                          >
                            {yazi.dugmeAdi}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* SEÇİLİ MAÇ GÜNÜNÜN MAKALELERİ */}
                  {aktifYazi && (
                    <article>
                      <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px', fontFamily: BAŞLIK_FONTU, fontWeight: 'bold', lineHeight: '1.3' }}>
                        {aktifYazi.title}
                      </h3>
                      
                      <p style={{ fontSize: '0.92rem', color: '#64748b', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.4' }}>
                        {aktifYazi.description}
                      </p>

                      <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {/* 1. Paragraf */}
                        {aktifYazi.content && aktifYazi.content[0] && (
                          <p style={{ margin: 0 }}>{aktifYazi.content[0]}</p>
                        )}

                        {renderReklamAlani('Yazı İçi Orta')}

                        {/* 2. Paragraf */}
                        {aktifYazi.content && aktifYazi.content[1] && (
                          <p style={{ margin: 0 }}>{aktifYazi.content[1]}</p>
                        )}
                      </div>

                      <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Link 
                          href={`/blog/${aktifYazi.slug}`} 
                          style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'underline', fontWeight: 'bold' }}
                        >
                          🔗 Bu yazının kalıcı bağlantısı (SEO)
                        </Link>
                      </div>
                    </article>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        <Footer />

      </div>
    </div>
  );
}
