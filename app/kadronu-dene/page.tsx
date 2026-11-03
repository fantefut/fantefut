// app/kadronu-dene/page.tsx - PARÇA 1
"use client";

import { useState, useEffect } from 'react';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';
import { players } from "@/data/players";

export default function KadronuDenePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [myTeam, setMyTeam] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedTeam = window.localStorage.getItem('fantezi_kadrom');
      if (savedTeam) {
        try {
          setMyTeam(JSON.parse(savedTeam));
        } catch (e) {
          console.error("Kadro yükleme hatası", e);
        }
      }
    }
  }, []);

  const TOPLAM_BUTCE = 100;
  const harcananTutar = myTeam.reduce((toplam, player) => toplam + (Number(player.price) || 0), 0);
  const budget = Number((TOPLAM_BUTCE - harcananTutar).toFixed(1));

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      window.localStorage.setItem('fantezi_kadrom', JSON.stringify(myTeam));
      window.localStorage.setItem('fantezi_butcem', budget.toString());
    }
  }, [myTeam, budget, isMounted]);

  const [seciliTakim, setSeciliTakim] = useState<string>("Tümü");
  const [seciliPozisyon, setSeciliPozisyon] = useState<string>("Tümü");

  const TAKIMLAR = ["Tümü", "Alanyaspor", "Amed SF", "Başakşehir", "Beşiktaş", "Çorum FK", "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", "Rizespor", "Samsunspor", "Trabzonspor"];
  const POZISYONLAR = ["Tümü", "KL", "DF", "OS", "FV"];

  const POZISYON_LIMITLERI: { [key: string]: number } = { "KL": 2, "DF": 5, "OS": 5, "FV": 3 };
  const MAKS_TAKIM_OYUNCUSU = 3;

  const normalizePosition = (pos: string): string => {
    if (!pos) return "FV";
    const p = pos.trim().toUpperCase();
    if (p === "KL" || p === "KALECİ" || p === "GK") return "KL";
    if (p === "DF" || p === "DEFANS" || p === "DEF") return "DF";
    if (p === "OS" || p === "ORTA SAHA" || p === "MID") return "OS";
    if (p === "FV" || p === "FORVET" || p === "FOR" || p === "ATT") return "FV";
    return "FV";
  };

  const pozisyonAdiniYaz = (pos: string) => {
    const normalized = normalizePosition(pos);
    if (normalized === "KL") return "Kaleci";
    if (normalized === "DF") return "Defans";
    if (normalized === "OS") return "Orta Saha";
    if (normalized === "FV") return "Forvet";
    return pos;
  };
// app/kadronu-dene/page.tsx - PARÇA 2

  const filtrelenmisVeSiraliPlayers = (players || [])
    .map(p => ({ ...p, normalizedPos: normalizePosition(p.position) }))
    .filter(p => {
      const takimKriteri = seciliTakim === "Tümü" || p.team === seciliTakim;
      const pozisyonKriteri = seciliPozisyon === "Tümü" || p.normalizedPos === seciliPozisyon;
      return takimKriteri && pozisyonKriteri;
    })
    .sort((a, b) => Number(b.price) - Number(a.price));

  const addPlayer = (player: any) => {
    const targetPos = normalizePosition(player.position);
    const updatedPlayer = { ...player, position: targetPos };

    if (myTeam.find((p) => p.id === updatedPlayer.id)) {
      alert("Bu oyuncu zaten kadronuzda var!");
      return;
    }

    if (myTeam.length >= 15) {
      alert("Kadronuz maksimum sınır olan 15 kişiye ulaştı!");
      return;
    }

    const ayniPozisyondakiOyuncular = myTeam.filter((p) => p.position === targetPos).length;
    if (ayniPozisyondakiOyuncular >= POZISYON_LIMITLERI[targetPos]) {
      alert(`${pozisyonAdiniYaz(targetPos)} pozisyonu için limit doldu! (Maks: ${POZISYON_LIMITLERI[targetPos]})`);
      return;
    }

    const ayniTakimdakiOyuncular = myTeam.filter((p) => p.team === updatedPlayer.team).length;
    if (ayniTakimdakiOyuncular >= MAKS_TAKIM_OYUNCUSU) {
      alert(`Bir takımdan en fazla ${MAKS_TAKIM_OYUNCUSU} oyuncu seçebilirsiniz! ${updatedPlayer.team} limiti doldu.`);
      return;
    }

    if (budget < Number(updatedPlayer.price)) {
      alert("Yetersiz bütçe!");
      return;
    }

    setMyTeam([...myTeam, updatedPlayer]);
  };

  const removePlayer = (player: any) => {
    setMyTeam(myTeam.filter((p) => p.id !== player.id));
  };

  const getPlayersByPosition = (pos: string) => {
    return myTeam.filter((p) => p.position === pos);
  };

  if (!isMounted) {
    return null;
  }
// app/kadronu-dene/page.tsx - PARÇA 3

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="" />

        {/* BAŞLIK BLOKU */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0, letterSpacing: '0.5px' }}>
            Fantezi Lig Kadro Simülatörü
          </h1>
        </div>

        {/* NOT KUTUSU */}
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
          <strong>Kadro Simülatör Notu:</strong> Oyunlarda kadronuzu kaydetmeden önce, 'FanteFut' bilgileri ve istatistikleri taze iken deneme yapabilmeniz için sizlere yeni hizmetimiz simülatörü sunuyoruz.
        </div>

        {/* FİLTRELEME ALANI */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          {/* Takım Filtre Satırı */}
          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#132444', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>TAKIM SEÇİMİ</span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', whiteSpace: 'nowrap', scrollbarWidth: 'thin' }}>
              {TAKIMLAR.map((takim) => (
                <button
                  key={takim}
                  onClick={() => setSeciliTakim(takim)}
                  style={{
                    padding: '6px 14px', borderRadius: '30px', fontSize: '11px', fontWeight: '700', border: '1px solid #e2e8f0', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: seciliTakim === takim ? '#1e3a8a' : '#f8fafc',
                    color: seciliTakim === takim ? '#ffffff' : '#475569'
                  }}
                >
                  {takim}
                </button>
              ))}
            </div>
          </div>

          {/* Pozisyon Filtre Satırı */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#132444', display: 'block', marginBottom: '8px', letterSpacing: '0' }}>
              POZİSYON SEÇİMİ
            </span>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {POZISYONLAR.map((poz) => (
                <button
                  key={poz}
                  onClick={() => setSeciliPozisyon(poz)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: seciliPozisyon === poz ? '#1e3a8a' : '#f8fafc',
                    color: seciliPozisyon === poz ? '#ffffff' : '#475569'
                  }}
                >
                  {poz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANA PANEL: YAN YANA %70 - %30 DÜZEN */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', marginBottom: '24px', alignItems: 'stretch' }}>

          {/* SOL TARAF: YEŞİL FUTBOL SAHASI (%70) */}
          <div
            style={{
              width: '70%',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* ÜST BAŞLIK ALANI */}
            <div style={{ backgroundColor: '#0b1a30', color: '#ffffff', padding: '12px 16px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
              <span style={{ fontSize: '14px' }}>Kadro 2-5-5-3</span>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8' }}>Kalan Bütçe: {budget}M</span> 
            </div>
            
            {/* YEŞİL SAHA ALANI (380px SABİT BOYUT) */}
            <div style={{
              background: 'linear-gradient(to bottom, #15803d, #166534)',
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'row-reverse', 
              overflowX: 'hidden',
              gap: '8px',
              position: 'relative',
              height: '380px',
              justifyContent: 'space-between',
              flexGrow: 1
            }}>
              
              {/* 1. Sütun: Forvet Sütunu (FV) */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', width: '22%' }}>
                {getPlayersByPosition("FV").map((p) => (
                  /* Oyuncu eklendiğinde sola bakması için transform verilmedi (ya da 0deg) */
                  <div key={p.id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', writingMode: 'vertical-rl', margin: '0 auto' }}>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 2px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ color: '#fef08a', fontSize: '10px', fontWeight: 'bold', margin: '2px 0' }}>{p.price}M</div>
                    <button onClick={() => removePlayer(p)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '9px', padding: '4px 2px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Kaldır</button>
                  </div>
                ))}
                {Array.from({ length: 3 - getPlayersByPosition("FV").length }).map((_, i) => (
                  /* Boş pozisyon harfleri sağa bakmaya devam ediyor (rotate(180deg)) */
                  <div key={i} onClick={() => setSeciliPozisyon("FV")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '4px', height: '45px' }}>
                    <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>FV</span>
                  </div>
                ))}
              </div>

              {/* 2. Sütun: Orta Saha Sütunu (OS) */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', width: '22%' }}>
                {getPlayersByPosition("OS").map((p) => (
                  <div key={p.id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', writingMode: 'vertical-rl', margin: '0 auto' }}>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 2px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ color: '#fef08a', fontSize: '10px', fontWeight: 'bold', margin: '2px 0' }}>{p.price}M</div>
                    <button onClick={() => removePlayer(p)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '9px', padding: '4px 2px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Kaldır</button>
                  </div>
                ))}
                {Array.from({ length: 5 - getPlayersByPosition("OS").length }).map((_, i) => (
                  <div key={i} onClick={() => setSeciliPozisyon("OS")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '4px', height: '45px' }}>
                    <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>OS</span>
                  </div>
                ))}
              </div>

              {/* 3. Sütun: Defans Sütunu (DF) */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', width: '22%' }}>
                {getPlayersByPosition("DF").map((p) => (
                  <div key={p.id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', writingMode: 'vertical-rl', margin: '0 auto' }}>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 2px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ color: '#fef08a', fontSize: '10px', fontWeight: 'bold', margin: '2px 0' }}>{p.price}M</div>
                    <button onClick={() => removePlayer(p)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '9px', padding: '4px 2px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Kaldır</button>
                  </div>
                ))}
                {Array.from({ length: 5 - getPlayersByPosition("DF").length }).map((_, i) => (
                  <div key={i} onClick={() => setSeciliPozisyon("DF")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '4px', height: '45px' }}>
                    <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>DF</span>
                  </div>
                ))}
              </div>

              {/* 4. Sütun: Kaleci Sütunu (KL) */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', width: '22%' }}>
                {getPlayersByPosition("KL").map((p) => (
                  <div key={p.id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', writingMode: 'vertical-rl', margin: '0 auto' }}>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 2px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ color: '#fef08a', fontSize: '10px', fontWeight: 'bold', margin: '2px 0' }}>{p.price}M</div>
                    <button onClick={() => removePlayer(p)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '9px', padding: '4px 2px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Kaldır</button>
                  </div>
                ))}
                {Array.from({ length: 2 - getPlayersByPosition("KL").length }).map((_, i) => (
                  <div key={i} onClick={() => setSeciliPozisyon("KL")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '4px', height: '45px' }}>
                    <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>KL</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* SAĞ TARAF: DARALTILMIŞ OYUNCU HAVUZU (%30) */}
          <div 
            style={{ 
              width: '30%', 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* SAĞ BAŞLIK ALANI */}
            <div style={{ backgroundColor: '#f8fafc', padding: '12px 10px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '13px' }}>
              Oyuncu Seçimi
            </div>

            {/* YÜKSEKLİK SOL KUTUYLA EŞİTLENDİ (380px) */}
            <div style={{ height: '380px', overflowY: 'auto', flexGrow: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px', backgroundColor: '#ffffff' }}>
                <tbody>
                  {filtrelenmisVeSiraliPlayers.map((player) => {
                    const isAdded = myTeam.find((p) => p.id === player.id);
                    return (
                      <tr key={player.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isAdded ? '#f8fafc' : '#ffffff', transition: 'all 0.2s ease' }}>
                        <td style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          
                          {/* Üstte Oyuncu İsmi */}
                          <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {player.name}
                          </div>
                          
                          {/* Altında Takım - Pozisyon - Fiyat */}
                          <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            <span>{player.team} - <span style={{ color: '#b45309', fontWeight: '700' }}>{player.position}</span></span>
                            <span style={{ color: '#166534', fontWeight: '800', fontSize: '10px', marginTop: '1px' }}>{player.price}M</span>
                          </div>
                          
                          {/* En Altta Yarı Genişlikte Sol Altta Konumlanan Ekle Butonu */}
                          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                            <button
                              onClick={() => addPlayer(player)}
                              disabled={isAdded}
                              style={{
                                backgroundColor: isAdded ? '#e2e8f0' : '#1e3a8a',
                                color: isAdded ? '#94a3b8' : '#ffffff',
                                border: 'none',
                                padding: '4px 0px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                cursor: isAdded ? 'not-allowed' : 'pointer',
                                width: '50%', // Genişlik yarıya indirildi
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                marginTop: '2px'
                              }}
                            >
                              {isAdded ? "Eklendi" : "Ekle"}
                            </button>
                          </div>

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div> {/* ANA PANEL KAPANIŞI */}

        {/* REHBER VE SEO METNİ BLOKU */}
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <h3 style={{ fontSize: '0.95rem', color: '#132444', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Kadro Deneme Stratejileri ve Bütçe Planlaması
          </h3>
          <p style={{ margin: 0 }}>
            Fantezi futbol liglerinde başarı yakalamak için sitemizdeki verileri inceledikten sonra bütçe denemesi yapmanıza yarayan 2-5-5-3 şeklinde kurgulanan 15 kişilik kadro simülatörü hizmetinizde. 100M bütçeyi as ve yedek oyuncular arasında dengeli paylaştırmak, aynı Süper Lig takımından en fazla 3 oyuncu kuralına dikkat ederek simüle etmek size kolaylık sağlayacaktır. Bol şanslar.
          </p>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
