'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [goster, setGoster] = useState(false);

  useEffect(() => {
    // Tarayıcı hafızasını kontrol edip SSR çakışmasını önlemek için useEffect içinde çalıştırıyoruz
    const onay = localStorage.getItem('fantefut_cerez_onay');
    if (!onay) {
      setGoster(true);
    }
  }, []);

  const onayVer = (durum) => {
    localStorage.setItem('fantefut_cerez_onay', durum);
    setGoster(false);
  };

  if (!goster) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(19, 36, 68, 0.96)', 
      color: '#ffffff',
      padding: '6px 12px', 
      borderRadius: '20px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      width: 'calc(100% - 24px)',
      maxWidth: '440px', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      fontSize: '11px'
    }}>
      <span style={{ textAlign: 'left', lineHeight: '1.2' }}>
        Deneyiminiz için çerez kullanıyoruz. <Link href="/gizlilik-politikasi" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Yasal Detaylar</Link>
      </span>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <button 
          onClick={() => onayVer('reddedildi')} 
          style={{
            backgroundColor: 'transparent',
            color: '#93c5fd',
            border: '1px solid #475569',
            padding: '2px 8px', 
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '10px',
            whiteSpace: 'nowrap'
          }}
        >
          Reddet
        </button>
        <button 
          onClick={() => onayVer('kabul_edildi')} 
          style={{
            backgroundColor: '#60a5fa',
            color: '#132444',
            border: 'none',
            padding: '3px 10px', 
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '10px',
            whiteSpace: 'nowrap'
          }}
        >
          Tamam
        </button>
      </div>
    </div>
  );
}
