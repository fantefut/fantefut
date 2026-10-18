'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU, BAŞLIK_FONTU } from '../utils';
import { blogsData } from '../../data/blogs'; 
import ScrollToTop from '../ScrollToTop';

export default function BlogListPage() {
  const [tumBloglar] = useState(blogsData);

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="blog" />

        {/* 🏆 GOOGLE SEO VE ADSENSE DOSTU ORTAK BLOG ANA BAŞLIĞI */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Haberleri ve Fantezi Lig Blogu
          </h1>
        </div>

        {/* GÖRSEL TUTARLILIK İÇİN GÜNCELLENEN STANDART YEŞİL KUTU */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '20px',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#166534',
          fontFamily: ICERIK_FONTU,
          width: '100%'
        }}>
          <strong>Fantezi Futbol Blog Raporu:</strong> Süper Lig haftaları öncesinde kadro mühendisliği stratejileri, teknik direktör rotasyonları ve son dakika futbol gelişmeleri açık analiz kartları halinde aşağıda listelenmiştir.
        </div>

        {/* 🔄 MODERN AÇIK KART MİMARİSİ HAFTALIK LİSTE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '10px' }}>
          {tumBloglar.map((grup, grupIndex) => (
            <div 
              key={grupIndex} 
              style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                backgroundColor: '#ffffff',
                padding: '16px'
              }}
            >
              {/* HAFTA GRUP BAŞLIĞI (DOĞRUDAN AÇIK VE GÖRÜNÜR) */}
              <div style={{
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '2px solid #cbd5e1',
                marginBottom: '16px'
              }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.05rem', fontFamily: ICERIK_FONTU }}>
                  {grupIndex === 0 ? `🟢 En Güncel: ${grup.grupAdi}` : `📁 Arşiv: ${grup.grupAdi}`}
                </span>
              </div>

              {/* İÇERİKLERİN LİSTELENDİĞİ TAŞMA YAPMAYAN AÇIK KART IZGARASI (GRID) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
                {grup.yazilar && grup.yazilar.map((yazi, yaziIndex) => (
                  <article 
                    key={yaziIndex} 
                    style={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0', 
                      padding: '16px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)' 
                    }}
                  >
                    <div>
                      {/* Alt Düğme Adı Etiketi (Örn: Muhtemel 11'ler, Son Sakatlıklar) */}
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        {yazi.dugmeAdi}
                      </span>

                      {/* Sabit Başlık Dengesi (Sitenin Altın Standardı: 1.0rem) */}
                      <h3 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                        {yazi.title}
                      </h3>
                      
                      {/* Botların İlk Saniyede Okuyabileceği Açık Özet Metni */}
                      <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                        {yazi.description}
                      </p>
                    </div>
                    {/* Kart Altı Dinamik İç Bağlantı Alanı */}
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed #f1f5f9' }}>
                      <Link 
                        href={`/blog/${yazi.slug}`}
                        style={{ 
                          fontSize: '13px', 
                          fontWeight: 'bold', 
                          color: '#2563eb', 
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: ICERIK_FONTU
                        }}
                      >
                        Devamını Oku
                        <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                  </article>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* 3. 🎯 SEO METNİ EN ALTA ALINDI */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Süper Lig ve Fantezi Futbol Günlüğü:</strong> Süper Lig takımlarının son durumları, haftalık kulüp analizleri, sakatlık raporlarının taktiksel etkileri ve fantezi lig stratejileri blog sayfamızda yer almaktadır. Sitemizin hazırladığı haftalık değerlendirmeler ve arşiv yazıları sayesinde kadro tercihlerinizi derinlemesine analiz edebilir, futbol dünyasındaki güncel gelişmeleri yakından takip edebilirsiniz.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
