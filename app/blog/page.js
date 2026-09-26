// app/blog/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; // 2 kat yukarı çıkış kök dizine pürüzsüz ulaştırır

export default function BlogListPage() {
  // Listenin en üstündeki grubu otomatik açık başlatır, gerisini katlar.
  const [acikGrupIndex, setAcikGrupIndex] = useState(0);
  
  // Her haftanın kendi içinde ilk yazısının seçili gelmesini sağlayan state
  const [seciliYazilar, setSeciliYazilar] = useState(() => {
    const ilkDurum = {};
    blogsData.forEach((grup, gIndex) => {
      if (grup.yazilar && grup.yazilar.length > 0) {
        ilkDurum[gIndex] = grup.yazilar[0].tip;
      }
    });
    return ilkDurum;
  });

  const yaziSec = (grupIndex, tip) => {
    setSeciliYazilar(prev => ({ ...prev, [grupIndex]: tip }));
  };

  const grupKatlaAc = (index) => {
    setAcikGrupIndex(acikGrupIndex === index ? null : index);
  };

  // Esnek Google AdSense Reklam Şablonumuz
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
      
      <Header altBaslik="Fantezi Lig Haftalık Tüyolar & Analizler" />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Ortak 4-3-3 Menümüz */}
        <Navbar aktifSayfa="blog" />

        {/* 1. ÜST REKLAM ALANI (SABİT - GOOGLE ONAYI İÇİN ŞART) */}
        {renderReklamAlani('Üst')}

        {/* OTOMATİK AKORDEON HAFTALIK LİSTE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          {blogsData.map((grup, grupIndex) => {
            const isAcik = acikGrupIndex === grupIndex;
            const aktifTip = seciliYazilar[grupIndex];
            const aktifYazi = grup.yazilar ? (grup.yazilar.find(y => y.tip === aktifTip) || grup.yazilar[0]) : null;

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
                {/* AKORDEON BAŞLIĞI */}
                <div 
                  onClick={() => grupKatlaAc(grupIndex)}
                  style={{
                    padding: '14px 16px',
                    backgroundColor: isAcik ? '#f8fafc' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderBottom: isAcik ? '1px solid #e2e8f0' : 'none',
                    transition: 'background-color 0.2s ease'
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
                  <div style={{ padding: '16px' }}>
                    
                    {/* MAÇ GÜNLERİ MİNİ SEKME DÜĞMELERİ */}
                    {grup.yazilar && grup.yazilar.length > 1 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '12px' }}>
                        {grup.yazilar.map((yazi) => {
                          const isButonAktif = aktifTip === yazi.tip;
                          return (
                            <button
                              key={yazi.tip}
                              onClick={() => yaziSec(grupIndex, yazi.tip)}
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
                              }}
                            >
                              {yazi.dugmeAdi}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* DİNAMİK YAZI ALANI */}
                    {aktifYazi && (
                      <article>
                        <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '6px', fontFamily: BAŞLIK_FONTU, fontWeight: 'bold', lineHeight: '1.3' }}>
                          {aktifYazi.title}
                        </h3>
                        
                        <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', marginBottom: '14px', lineHeight: '1.4' }}>
                          {aktifYazi.description}
                        </p>

                        <div style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {/* 1. Organik Paragraf */}
                          {aktifYazi.content && aktifYazi.content[0] && (
                            <p style={{ margin: 0 }}>{aktifYazi.content[0]}</p>
                          )}

                          {/* 2. REKLAM ALANI: SADECE YAZI AÇILDIĞINDA İKİ PARAGRAFIN TAM ARASINDA ÇIKAR */}
                          {renderReklamAlani('Yazı İçi Orta')}

                          {/* 3. Organik Paragraf */}
                          {aktifYazi.content && aktifYazi.content[1] && (
                            <p style={{ margin: 0 }}>{aktifYazi.content[1]}</p>
                          )}
                        </div>

                        {/* SEO BAĞLANTI LİNKİ */}
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

        {/* Merkezi ve Sadeleştirilmiş Yeni Otomatik Footer Sistemi */}
        <Footer />

      </div>
    </div>
  );
}
