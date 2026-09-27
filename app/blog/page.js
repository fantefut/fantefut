'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; 

export default function BlogListPage() {
  const [acikGrupIndex, setAcikGrupIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // ✅ İOS SAFARI İÇİN DİNAMİK VE GÜVENLİ İLK BAŞLANGIÇ AYARI
  const [seciliYazilar, setSeciliYazilar] = useState({});

  useEffect(() => {
    setMounted(true);
    // Sayfa tarayıcıda yüklendiği an verileri güvenli şekilde eşleştirir (Hydration Error Engellenir)
    const ilkDurum = {};
    blogsData.forEach((grup, gIndex) => {
      if (grup.yazilar && grup.yazilar.length > 0) {
        ilkDurum[gIndex] = grup.yazilar[0].slug;
      }
    });
    setSeciliYazilar(ilkDurum);
  }, []);

  const yaziSec = (grupIndex, slug, e) => {
    if (e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
    }
    setSeciliYazilar(prev => ({ ...prev, [grupIndex]: slug }));
  };

  const grupKatlaAc = (index, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setAcikGrupIndex(acikGrupIndex === index ? null : index);
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

  if (!mounted) {
    return <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}></div>;
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      <Header altBaslik="Süper Lig Haberleri, Fantezi Lig Analizleri" />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <Navbar aktifSayfa="blog" />

        {renderReklamAlani('Üst')}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          {blogsData.map((grup, grupIndex) => {
            const isAcik = acikGrupIndex === grupIndex;
            const aktifSlug = seciliYazilar[grupIndex] || (grup.yazilar && grup.yazilar[0]?.slug);
            const aktifYazi = grup.yazilar ? (grup.yazilar.find(y => y.slug === aktifSlug) || grup.yazilar[0]) : null;

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
                {/* AKORDEON BAŞLIĞI (Büyük Kutu - iOS Tıklama Garantili Etiket Yapısı) */}
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={(e) => grupKatlaAc(grupIndex, e)}
                  onKeyDown={(e) => { if (e.key === 'Enter') grupKatlaAc(grupIndex, e); }}
                  style={{
                    padding: '14px 16px',
                    backgroundColor: isAcik ? '#f8fafc' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderBottom: isAcik ? '1px solid #e2e8f0' : 'none',
                    transition: 'background-color 0.2s ease',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    zIndex: '10'
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.05rem', fontFamily: ICERIK_FONTU }}>
                    {grupIndex === 0 ? `🟢 En Güncel: ${grup.grupAdi}` : `📁 Arşiv: ${grup.grupAdi}`}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>
                    {isAcik ? '▲' : '▼'}
                  </span>
                </div>

                {/* AKORDEON İÇERİĞİ */}
                {isAcik && (
                  <div style={{ padding: '16px', position: 'relative', zIndex: '20' }}>
                    
                    {/* MAVİ VE TURUNCU MİNİ SEKME DÜĞMELERİ (iOS Link Tıklama Yapısı) */}
                    {grup.yazilar && grup.yazilar.length > 1 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '12px' }}>
                        {grup.yazilar.map((yazi) => {
                          const isButonAktif = aktifSlug === yazi.slug;
                          return (
                            <div
                              key={yazi.slug}
                              role="button"
                              tabIndex={0}
                              onClick={(e) => yaziSec(grupIndex, yazi.slug, e)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                border: '1px solid',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                backgroundColor: isButonAktif ? '#fef3c7' : '#ffffff',
                                color: isButonAktif ? '#92400e' : '#64748b',
                                borderColor: isButonAktif ? '#b45309' : '#e2e8f0',
                                WebkitTapHighlightColor: 'transparent',
                                userSelect: 'none',
                                position: 'relative',
                                zIndex: '30'
                              }}
                            >
                              {yazi.dugmeAdi}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* DİNAMİK YAZI ALANI */}
                    {aktifYazi && (
                      <article>
                        <div style={{ marginBottom: '10px' }}>
                          <Link 
                            href={`/blog/${aktifYazi.slug}`} 
                            prefetch={false}
                            style={{ textDecoration: 'none', display: 'inline-block' }}
                          >
                            <h3 style={{ 
                              fontSize: '1.25rem', 
                              color: '#0f172a', 
                              margin: 0, 
                              fontFamily: BAŞLIK_FONTU, 
                              fontWeight: 'bold', 
                              lineHeight: '1.3'
                            }}>
                              {aktifYazi.title}
                            </h3>
                          </Link>
                        </div>
                        
                        <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', marginBottom: '14px', lineHeight: '1.4' }}>
                          {aktifYazi.description}
                        </p>

                        <div style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {aktifYazi.content && aktifYazi.content[0] && (
                            <p style={{ margin: 0 }}>{aktifYazi.content[0]}</p>
                          )}

                          {renderReklamAlani('Yazı İçi Orta')}

                          {aktifYazi.content && aktifYazi.content[1] && (
                            <p style={{ margin: 0 }}>{aktifYazi.content[1]}</p>
                          )}
                        </div>

                        {/* SEO BAĞLANTI LİNKİ */}
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                          <Link 
                            href={`/blog/${aktifYazi.slug}`} 
                            prefetch={false}
                            style={{ 
                              fontSize: '11px', 
                              color: '#b45309', 
                              textDecoration: 'underline', 
                              fontWeight: 'bold', 
                              display: 'inline-block', 
                              padding: '6px'
                            }}
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
