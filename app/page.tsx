'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from './utils';

const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  "Alanyaspor": "Maestro - Sakat - Adale - Ekim Ayı", "Amed Sportif Faaliyetler": "Yira Sor - Sakat - Adale - Ekim ayı\nCisse - Cezalı - Sarı kart - 8. hafta", "Başakşehir": "Visca - Sakat - Belli değil - Belli değil", "Beşiktaş": "Vlahovic - Sakat - Milli takım - Ekim ayı\nTrossard - Sakat - Ayak - Ekim ayı", "Çorum FK": "", 
  "Erzurumspor FK": "", "Eyüpspor": "Sabiri - Sakat - Adale - Ekim ayı", 
  "Fenerbahçe": "Jayden Oosterwolde - Liste dışı - Ameliyat oldu - Aralık\nMert Müldür - Sakat - Menisküs - Kasım sonu\nAmara Diouf - Liste dışı - Özel program - Belli değil",
  "Galatasaray": "Günay - Sakat - Diz - Belli değil\nOsimhen - Sakat - Adale - Milli Ara\nLemina - Sakat - Kasık - Ekim ayı\nSingo - Sakat - Uyluk - Belli değil\nLesley - Cezalı - Kırmızı kart - 9. hafta", "Gaziantep FK": "Fuat Bavuk - Sakat - Adale - Belli değil\nNazım Sangare - Sakat - Adale - Belli değil", 
  "Gençlerbirliği": "K. Rodrigues - Sakat - Adale - Belli değil\nNiasse - Sakat - Adale - Belli değil\nTraore - Şüpheli - Belli değil - Belli değil", 
  "Göztepe": "Sabra - Sakat  - Belli değil - Belli değil\nLuka - Kadro dışı - Soruşturma - Belli değil\nSundberg - Sakat - Adale - Belli değil\nGodoi - Sakat - Adale - Belli değil\nFurkan B. - Sakat - Adale - Belli değil\nGökdeniz - Sakat - Adale - Belli değil", 
  "Kasımpaşa": "Kamil Ahmet - Sakat - Aşil - Kasım ayı\nBenedyczak - Sakat - Bilek - Belli değil\nBen Ouanes - Sakat - Adale - Ekim ayı", "Kocaelispor": "Jovanovic - Sakat - Diz - Ekim ayı\nPetkovic - Sakat - Belli değil - Belli değil\nHaidara - Sakat - Tendon - 2027\nZoukrou - Sakat - Hamstring - Aralık ayı", "Konyaspor": "M. İbrahimoğlu - Sakat - Adale - Belli değil", "Rizespor": "Alikulov - Sakat - Çapraz bağ - Belli değil\nMihaila - Cezalı - Kırmızı kart - 8. hafta\nLaci - Şüpheli - Belli değil - Belli değil", "Samsunspor": "Assoumou - Sakat - Adale - Bilinmiyor\nElayis - Sakat - Adale - Belli değil\nJarju - Şüpheli - Belli değil - Belli değil\nSousa - Sakat - Belli değil - Belli değil", "Trabzonspor": "Okay - Sakat - Adale - Belli değil\nMalinovskyi - Sakat - Ameliyat oldu - Belli Değil"
};

export default function Home() {
  const [oyuncuVerileri] = useState(ILK_OYUNCULAR);

  const satirlariParcala = (metin) => {
    if (!metin) return [];
    return metin.split('\n').map(s => s.trim()).filter(s => s.length > 0).map(s => {
      const p = s.split('-').map(i => i.trim());
      return p.length >= 2 ? { isim: p[0], durum: p[1], neden: p[2], donus: p[3] } : null;
    }).filter(item => item !== null);
  };

  const getEtiketStili = (durum) => {
    const anaStil = { padding: '3px 6px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', fontFamily: ICERIK_FONTU, whiteSpace: 'nowrap', display: 'inline-block' };
    const temizDurum = durum ? durum.toLowerCase().trim() : '';
    if (temizDurum === 'sakat') return { ...anaStil, backgroundColor: '#fef3c7', color: '#1e3a8a' };
    if (temizDurum === 'cezalı') return { ...anaStil, backgroundColor: '#ef4444', color: '#ffffff' };
    if (temizDurum === 'liste dışı') return { ...anaStil, backgroundColor: '#e0f2fe', color: '#064e3b' };
    if (temizDurum === 'kadro dışı') return { ...anaStil, backgroundColor: '#064e3b', color: '#fef3c7' };
    return { ...anaStil, backgroundColor: '#f1f5f9', color: '#475569' };
  };

  const renderReklamAlani = (boyutTip) => {
    const isAltSerit = boyutTip === 'ince';
    return (
      <div style={{
        width: '100%',
        minHeight: isAltSerit ? '50px' : '90px',
        maxHeight: isAltSerit ? '100px' : '280px',
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
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <span style={{ display: 'block', width: '100%' }}>
          {isAltSerit ? '- Reklam Alanı (Google AdSense Alt Şerit) -' : '- Reklam Alanı (Google AdSense) -'}
        </span>
      </div>
    );
  };
const renderTakimKutusu = (takimAdi) => {
    const oyuncuListesi = satirlariParcala(oyuncuVerileri[takimAdi] || "");
    return (
      <div key={takimAdi} style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1e293b', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '6px', fontFamily: ICERIK_FONTU, fontWeight: 'bold' }}>{takimAdi}</h2>
        {oyuncuListesi.length > 0 ? (
          <div style={{ overflowX: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', textAlign: 'left', fontFamily: ICERIK_FONTU, tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11px' }}>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '35%', fontWeight: 'bold' }}>Oyuncu</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '22%', fontWeight: 'bold' }}>Durum</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '25%', fontWeight: 'bold' }}>Neden</th>
                  <th style={{ padding: '8px 6px', borderBottom: '1px solid #e2e8f0', width: '18%', fontWeight: 'bold' }}>Dönüş</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '12px' }}>
                {oyuncuListesi.map((oyuncu, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 6px', fontWeight: 'bold', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{oyuncu.isim}</td>
                    <td style={{ padding: '8px 6px' }}><span style={getEtiketStili(oyuncu.durum)}>{oyuncu.durum}</span></td>
                    <td style={{ padding: '8px 6px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{oyuncu.neden}</td>
                    <td style={{ padding: '8px 6px', color: '#059669', fontWeight: 'bold' }}>{oyuncu.donus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic', margin: '3px 0 0 4px', fontFamily: ICERIK_FONTU }}>Bu takımda güncel sakat veya cezalı oyuncu bulunmuyor.</p>
        )}
      </div>
    );
  };

    return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      
      {/* TypeScript hatasını çözmek için boş bir string gönderdik */}
      <Header altBaslik="" />

      {/* 
        Tailwind v4 tabanlı responsive genişletme sarmalayıcısı:
        - Mobilde max-w-[650px] sınırıyla eski düzeni kusursuz korur.
        - Masaüstünde (lg:) max-w-[1024px] seviyesine açılarak reklamı ve tabloları genişletir.
      */}
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        
        {/* Ortak 4-3-3 Düzenindeki Yeni Navbar Bileşeni */}
        <Navbar aktifSayfa="eksik" />

        {renderReklamAlani('buyuk')}

        {/* Yeni Eklenen Ortalı Başlık - Reklamın altında, Alanyaspor'un üstünde */}
        <div style={{ textAlign: 'center', margin: '20px 0 15px 0' }}>
          <h1 style={{ fontSize: '1.4rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU }}>
            Süper Lig Sakatlar Cezalılar Eksikler
          </h1>
        </div>

        {SUPER_LIG_TAKIMLARI.slice(0, 8).map((takim) => renderTakimKutusu(takim))}
        {renderReklamAlani('buyuk')}
        {SUPER_LIG_TAKIMLARI.slice(8).map((takim) => renderTakimKutusu(takim))}
        {renderReklamAlani('ince')}

        {/* Central ve AdSense Uyumlu Yeni Otomatik Footer Sistemi */}
        <Footer />

      </div>
    </div>
  );
}
