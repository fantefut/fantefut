'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; 

export default function BlogListPage() {
  const [acikGrupIndex, setAcikGrupIndex] = useState(0);
  
  const [seciliYazilar, setSeciliYazilar] = useState(() => {
    const ilkDurum = {};
    if (Array.isArray(blogsData)) {
      blogsData.forEach((grup, gIndex) => {
        if (grup && Array.isArray(grup.yazilar) && grup.yazilar.length > 0) {
          ilkDurum[String(gIndex)] = grup.yazilar.slug; 
        }
      });
    }
    return ilkDurum;
  });

  const yaziSec = (grupIndex, slug) => {
    setSeciliYazilar(prev => ({ ...prev, [String(grupIndex)]: slug }));
  };

  const grupKatlaAc = (index) => {
    setAcikGrupIndex(prevIndex => (prevIndex === index ? null : index));
  };

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
        
        <Navbar aktifSayfa="blog" />

        {renderReklamAlani('Üst')}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          {Array.isArray(blogsData) && blogsData.map((grup, grupIndex) => {
            const isAcik = acikGrupIndex === grupIndex;
            const aktifSlug = seciliYazilar[String(grupIndex)];
            
            const aktifYazi = grup.yazilar && Array.isArray(grup.yazilar) && grup.yazilar.length > 0
              ? (grup.yazilar.find(y => y.slug === aktifSlug) || grup.yazilar) 
              : null;

            return (
              <div 
                key={grupIndex} 
                style={{ 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* AKORDEON BAŞLIĞI - SAFARI HTML ENJEKSİYONLU VE DOĞRUDAN EVENT YAPISI */}
                <button 
                  type="button"
                  onClick={() => grupKatlaAc(grupIndex)}
                  data-onclick-safari="true" // Safari delegasyonunu bypass etmek için özel data attr
                  style={{
                    display: 'block',
                    width: '100%',
                    border: 'none',
                    margin: 0,
                    outline: 'none',
                    padding: '14px 16px',
                    backgroundColor: isAcik ? '#f8fafc' : '#ffffff',
                    cursor: 'pointer',
                    borderBottom: isAcik ? '1px solid #e2e8f0' : 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    pointerEvents: 'auto',
                    WebkitUserSelect: 'none',
                    userSelect: 'none' // iOS'ta uzun basarak tıklama yutmayı engeller
                  }}
                >
                  <div style={{ display: 'flex', justifyIcontent: 'space-between', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.05rem', fontFamily: ICERIK_FONTU, textAlign: 'left' }}>
                      {grupIndex === 0 ? `🟢 En Güncel: ${grup.grupAdi}` : `📁 Arşiv: ${grup.grupAdi}`}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>
                      {isAcik ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {isAcik && (
                  <div style={{ padding: '16px' }}>
                    
                    {/* MAÇ GÜNLERİ MİNİ SEKME DÜĞMELERİ */}
                    {grup.yazilar && grup.yazilar.length > 1 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '12px' }}>
                        {grup.yazilar.map((yazi) => {
                          const isButonAktif = aktifSlug === yazi.slug;
                          return (
                            <button
                              key={yazi.slug}
                              type="button"
                              onClick={() => yaziSec(grupIndex, yazi.slug)}
                              data-onclick-safari="true"
                              style={{
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                border: '1px solid',
                                cursor: 'pointer',
                                backgroundColor: isButonAktif ? '#fef3c7' : '#ffffff',
                                color: isButonAktif ? '#92400e' : '#64748b',
                                borderColor: isButonAktif ? '#b45309' : '#e2e8f0',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                appearance: 'none',
                                WebkitTapHighlightColor: 'transparent',
                                touchAction: 'manipulation',
                                pointerEvents: 'auto',
                                WebkitUserSelect: 'none',
                                userSelect: 'none'
                              }}
                            >
                              {yazi.dugmeAdi}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {aktifYazi && (
                      <article>
                        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '6px', fontFamily: BAŞLIK_FONTU, fontWeight: 'bold', lineHeight: '1.3' }}>
                          {aktifYazi.title}
                        </h3>
                        
                        <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', marginBottom: '14px', lineHeight: '1.4' }}>
                          {aktifYazi.description}
                        </p>

                        <div style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {aktifYazi.content && aktifYazi.content && (
                            <p style={{ margin: 0 }}>{aktifYazi.content}</p>
                          )}

                          {renderReklamAlani('Yazı İçi Orta')}

                          {aktifYazi.content && aktifYazi.content && (
                            <p style={{ margin: 0 }}>{aktifYazi.content}</p>
                          )}
                        </div>

                        <div style={{ marginTop: '15px', textAlign: 'right' }}>
                          <Link 
                            href={`/blog/${aktifYazi.slug}`} 
                            style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'underline', fontWeight: '500' }}
                          >
                            🔗 Bu yazının kalıcı bağlantısı (SEO)
                          </Link>
                        </div>
                      </article>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Footer />

      </div>
    </div>
  );
}
