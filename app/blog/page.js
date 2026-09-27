'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; 

export default function BlogListPage() {
  // 🟢 iOS KİLİTLENMESİNİ BİTİREN RE-RENDER SİHİRBAZI:
  // Her haftalık grubun aktif olarak gösterilecek yazı slug'ını tutan saf state yapısı
  const [seciliYazilar, setSeciliYazilar] = useState(() => {
    const ilkDurum = {};
    if (Array.isArray(blogsData)) {
      blogsData.forEach((grup, gIndex) => {
        if (grup && Array.isArray(grup.yazilar) && grup.yazilar.length > 0) {
          // İlk açılışta listenin en güncel ilk yazısını otomatik seçili başlatır
          ilkDurum[String(gIndex)] = grup.yazilar[0].slug; 
        }
      });
    }
    return ilkDurum;
  });

  // Butona basıldığında durumu güncelleyip hem Windows hem iOS'ta anlık re-render zorlar
  const yaziSec = (grupIndex, slug) => {
    setSeciliYazilar(prev => ({ ...prev, [String(grupIndex)]: slug }));
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
        
        {/* Ortak Üst Menü */}
        <Navbar aktifSayfa="blog" />

        {renderReklamAlani('Üst')}

        {/* SAF VE DOĞRUSAL YERLEŞİM BLOCKLARI (iOS Safari'nin asla donduramayacağı düz düzen) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          {Array.isArray(blogsData) && blogsData.map((grup, grupIndex) => {
            const aktifSlug = seciliYazilar[String(grupIndex)];
            
            // Seçili slug değerine göre makaleyi diziden anında ayıklar
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
                {/* SABİT HAFTALIK GRUP BAŞLIĞI */}
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

                {/* MAÇ GÜNLERİ VE METİN İÇERİĞİ */}
                <div style={{ padding: '16px' }}>
                  
                  {/* MAÇ GÜNLERİ MİNİ SEKME DÜĞMELERİ */}
                  {grup.yazilar && grup.yazilar.length > 1 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '14px' }}>
                      {grup.yazilar.map((yazi) => {
                        const isButonAktif = aktifSlug === yazi.slug;
                        return (
                          <button
                            key={yazi.slug}
                            type="button"
                            onClick={() => yaziSec(grupIndex, yazi.slug)} // Saf JavaScript tetiklemesi
                            style={{
                              padding: '8px 14px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              border: '1px solid',
                              cursor: 'pointer',
                              backgroundColor: isButonAktif ? '#fef3c7' : '#ffffff',
                              color: isButonAktif ? '#92400e' : '#64748b',
                              borderColor: isButonAktif ? '#b45309' : '#e2e8f0',
                              // --- iOS SAFARI DONMA VE TIKLAMA YUTMA DEFANSLARI ---
                              transition: 'none', // Animasyon kilitlenmesini engeller
                              WebkitAppearance: 'none',
                              appearance: 'none',
                              WebkitTapHighlightColor: 'transparent',
                              touchAction: 'manipulation'
                            }}
                          >
                            {yazi.dugmeAdi}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* DİNAMİK METİN ALANI */}
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
