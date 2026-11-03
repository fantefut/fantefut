// app/kadronu-dene/page.tsx - YENİLENEN HAFIZA DESTEKLİ BAŞLANGIÇ
"use client";

import { useState, useEffect } from 'react'; // useEffect eklendi
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';
import { players } from "@/data/players";

export default function KadronuDenePage() {
  // İlk açılışta tarayıcı hafızasında kadro var mı diye bakıyoruz
  const [myTeam, setMyTeam] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTeam = localStorage.getItem('fantezi_kadrom');
      return savedTeam ? JSON.parse(savedTeam) : [];
    }
    return [];
  });

  // İlk açılışta bütçeyi de hafızadan alıyoruz
  const [budget, setBudget] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedBudget = localStorage.getItem('fantezi_butcem');
      return savedBudget ? Number(savedBudget) : 100;
    }
    return 100;
  });

  // Kadro her değiştiğinde tarayıcı hafızasına otomatik kaydet
  useEffect(() => {
    localStorage.setItem('fantezi_kadrom', JSON.stringify(myTeam));
    localStorage.setItem('fantezi_butcem', budget.toString());
  }, [myTeam, budget]);

  // Üst menü filtre durumları (Tümü varsayılan)
  const [seciliTakim, setSeciliTakim] = useState<string>("Tümü");
  const [seciliPozisyon, setSeciliPozisyon] = useState<string>("Tümü");


  // Filtre düğmeleri için Süper Lig Takımları ve Pozisyonlar
  const TAKIMLAR = ["Tümü", "Alanyaspor", "Amed SF", "Başakşehir", "Beşiktaş", "Çorum FK", "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", "Rizespor", "Samsunspor", "Trabzonspor"];
  const POZISYONLAR = ["Tümü", "KL", "DF", "OS", "FV"];

  // 2-5-5-3 Fantezi Lig Taktiği Sınırları
  const POZISYON_LIMITLERI: { [key: string]: number } = { "KL": 2, "DF": 5, "OS": 5, "FV": 3 };
  const MAKS_TAKIM_OYUNCUSU = 3;

  // Pozisyon karmaşasını çözen otomatik eşleştirme fonksiyonu
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

  // OYUNCU HAVUZUNU FİLTRELEME VE YÜKSEK FİYATTAN DÜŞÜĞE DOĞRU SIRALAMA
  const filtrelenmisVeSiraliPlayers = (players || [])
    .map(p => ({ ...p, normalizedPos: normalizePosition(p.position) })) // Her oyuncuya standart pozisyon ekliyoruz
    .filter(p => {
      const takimKriteri = seciliTakim === "Tümü" || p.team === seciliTakim;
      const pozisyonKriteri = seciliPozisyon === "Tümü" || p.normalizedPos === seciliPozisyon;
      return takimKriteri && pozisyonKriteri;
    })
    .sort((a, b) => Number(b.price) - Number(a.price));

  // Oyuncu ekleme fonksiyonu (Gelişmiş Fantezi Lig Kuralları ile)
  const addPlayer = (player: any) => {
    const targetPos = normalizePosition(player.position);
    const updatedPlayer = { ...player, position: targetPos }; // Takıma eklerken standart pozisyonuyla ekliyoruz

    // 1. Zaten kadroda mı?
    if (myTeam.find((p) => p.id === updatedPlayer.id)) {
      alert("Bu oyuncu zaten kadronuzda var!");
      return;
    }

    // 2. Toplam kadro dolu mu? (2 + 5 + 5 + 3 = 15 oyuncu)
    if (myTeam.length >= 15) {
      alert("Kadronuz maksimum sınır olan 15 kişiye ulaştı!");
      return;
    }

    // 3. Pozisyon limiti doldu mu? (2-5-5-3 Kontrolü)
    const ayniPozisyondakiOyuncular = myTeam.filter((p) => p.position === targetPos).length;
    if (ayniPozisyondakiOyuncular >= POZISYON_LIMITLERI[targetPos]) {
      alert(`${pozisyonAdiniYaz(targetPos)} pozisyonu için limit doldu! (Maks: ${POZISYON_LIMITLERI[targetPos]})`);
      return;
    }

    // 4. Aynı takımdan limit aşılıyor mu? (En fazla 3 oyuncu)
    const ayniTakimdakiOyuncular = myTeam.filter((p) => p.team === updatedPlayer.team).length;
    if (ayniTakimdakiOyuncular >= MAKS_TAKIM_OYUNCUSU) {
      alert(`Bir takımdan en fazla ${MAKS_TAKIM_OYUNCUSU} oyuncu seçebilirsiniz! ${updatedPlayer.team} limiti doldu.`);
      return;
    }

    // 5. Bütçe yeterli mi?
    if (budget < updatedPlayer.price) {
      alert("Yetersiz bütçe!");
      return;
    }

    // Tüm kurallar başarıyla geçildiyse oyuncuyu ekle ve bütçeden düş
    setMyTeam([...myTeam, updatedPlayer]);
    setBudget(Number((budget - updatedPlayer.price).toFixed(1)));
  };

  // Oyuncu çıkarma fonksiyonu
  const removePlayer = (player: any) => {
    setMyTeam(myTeam.filter((p) => p.id !== player.id));
    setBudget(Number((budget + player.price).toFixed(1)));
  };

  // Sahada pozisyon satırlarını oluştururken kadrodaki ilgili oyuncuları çekmek için yardımcı fonksiyon
  const getPlayersByPosition = (pos: string) => {
    return myTeam.filter((p) => p.position === pos);
  };
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
          <strong>Kadro Simülatör Notu:</strong> Oyunlarda kadronuzu kaydetmeden önce, 'FanteFut' bilgileri ve istatistikleri taze iken deneme yapabilmeniz için sizlere yeni hizmetimiz simülatörü sunuyoruz.
        </div>

        {/* ÜST FİLTRELEME ALANI (TAKIM VE POZİSYON SEÇİM DÜĞMELERİ) */}
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


      {/* ANA PANEL: YAN YANA DÜZEN */}
<div className="flex flex-row gap-2 md:gap-5" style={{ marginBottom: '24px' }}>

  {/* GÖRSEL FUTBOL SAHASI */}
<div
  className="flex-1 lg:flex-[1.3]"
  style={{
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  }}
>
  <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', fontWeight: 'bold', display: 'flex', justifyContent: 'between' }}>
    {/* 3. Madde uyarınca başlığı sadeleştirdik */}
    <span>Kadro 2-3-3-5</span>
    {/* Kalan Bütçe alanı buraya gelecek */}
  </div>

            {/* YEŞİL SAHA ALANI (Yedek kulübesiz direkt 15 kişi) */}
  <div style={{
    background: 'linear-gradient(to bottom, #15803d, #166534)',
    padding: '20px 10px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    position: 'relative', 
    minHeight: '480px', // Reklam için güvenli alan
    justifyContent: 'space-around' // Satırları sahaya dengeli dağıtması için koruduk
  }}>
              
             {/* 1. Satır: Forvet Satırı (Maks 3 Oyuncu) */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
  {getPlayersByPosition("FV").map((p) => (
    <div key={p.id} style={{ textAlign: 'center', width: '65px' }}>
      {/* Baş harf alanı kalktı, yerine sabit ⚽ emojisi geldi */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '16px', width: '65px', height: '40px', borderRadius: '8px' }}>
        ⚽
      </div>
      
      {/* Oyuncu İsmi */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 3px', borderRadius: '4px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {p.name}
      </div>
      
      {/* Fiyat Alanı */}
      <div style={{ color: '#fef08a', fontSize: '9px', fontWeight: 'bold', marginTop: '1px' }}>{p.price}M</div>
      
      {/* Kaldır Butonu */}
      <button 
        onClick={() => removePlayer(p)} 
        style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '8px', padding: '1px 4px', borderRadius: '4px', marginTop: '2px', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Kaldır
      </button>
    </div>
  ))}

  {/* Boş Forvet Alanları (Genişlik ve Yükseklik Dolu Kartlarla Birebir Eşitlendi) */}
  {Array.from({ length: 3 - getPlayersByPosition("FV").length }).map((_, i) => (
    <div
      key={i}
      onClick={() => setSeciliPozisyon("FV")}
      style={{ 
        border: '2px dashed rgba(255,255,255,0.35)', 
        borderRadius: '8px', 
        width: '65px', 
        height: '75px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#ffffff', 
        fontSize: '9px', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        backgroundColor: 'rgba(0,0,0,0.2)' 
      }}
    >
      <span>+ FV</span>
    </div>
  ))}
</div>


              {/* 2. Satır: Orta Saha Satırı (Maks 5 Oyuncu) */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
  {getPlayersByPosition("OS").map((p) => (
    <div key={p.id} style={{ textAlign: 'center', width: '65px' }}>
      {/* Baş harf yuvarlağı kalktı, yerine tam isabet 🎯 emojisi geldi */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '16px', width: '65px', height: '40px', borderRadius: '8px' }}>
        🎯
      </div>
      
      {/* Oyuncu İsmi */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 3px', borderRadius: '4px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {p.name}
      </div>
      
      {/* Fiyat Alanı */}
      <div style={{ color: '#fef08a', fontSize: '9px', fontWeight: 'bold', marginTop: '1px' }}>{p.price}M</div>
      
      {/* Kaldır Butonu */}
      <button 
        onClick={() => removePlayer(p)} 
        style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '8px', padding: '1px 4px', borderRadius: '4px', marginTop: '2px', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Kaldır
      </button>
    </div>
  ))}

  {/* Boş Orta Saha Alanları (Boyutlar ve genişlik 65px olarak eşitlendi) */}
  {Array.from({ length: 5 - getPlayersByPosition("OS").length }).map((_, i) => (
    <div
      key={i}
      onClick={() => setSeciliPozisyon("OS")}
      style={{ 
        border: '2px dashed rgba(255,255,255,0.35)', 
        borderRadius: '8px', 
        width: '65px', 
        height: '75px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#ffffff', 
        fontSize: '9px', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        backgroundColor: 'rgba(0,0,0,0.2)' 
      }}
    >
      <span>+ OS</span>
    </div>
  ))}
</div>



              {/* 3. Satır: Defans Satırı (Maks 5 Oyuncu) */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
  {getPlayersByPosition("DF").map((p) => (
    <div key={p.id} style={{ textAlign: 'center', width: '65px' }}>
      {/* Baş harf yuvarlağı yerine koruyucu 🛡️ emojisi ve eşitlenmiş kart alanı */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '16px', width: '65px', height: '40px', borderRadius: '8px' }}>
        🛡️
      </div>
      
      {/* Oyuncu İsmi */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 3px', borderRadius: '4px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {p.name}
      </div>
      
      {/* Fiyat Alanı */}
      <div style={{ color: '#fef08a', fontSize: '9px', fontWeight: 'bold', marginTop: '1px' }}>{p.price}M</div>
      
      {/* Kaldır Butonu */}
      <button 
        onClick={() => removePlayer(p)} 
        style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '8px', padding: '1px 4px', borderRadius: '4px', marginTop: '2px', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Kaldır
      </button>
    </div>
  ))}

  {/* Boş Defans Alanları (Genişlik ve boyutlar diğer satırlarla birebir eşitlendi) */}
  {Array.from({ length: 5 - getPlayersByPosition("DF").length }).map((_, i) => (
    <div
      key={i}
      onClick={() => setSeciliPozisyon("DF")}
      style={{ 
        border: '2px dashed rgba(255,255,255,0.35)', 
        borderRadius: '8px', 
        width: '65px', 
        height: '75px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#ffffff', 
        fontSize: '9px', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        backgroundColor: 'rgba(0,0,0,0.2)' 
      }}
    >
      <span>+ DF</span>
    </div>
  ))}
</div>



              {/* 4. Satır: Kaleci Satırı (Maks 2 Oyuncu) */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
  {getPlayersByPosition("KL").map((p) => (
    <div key={p.id} style={{ textAlign: 'center', width: '65px' }}>
      {/* Baş harf yuvarlağı yerine koruyucu 🧤 emojisi ve eşitlenmiş kart alanı */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#ffffff', fontSize: '16px', width: '65px', height: '40px', borderRadius: '8px' }}>
        🧤
      </div>
      
      {/* Oyuncu İsmi */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 3px', borderRadius: '4px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {p.name}
      </div>
      
      {/* Fiyat Alanı */}
      <div style={{ color: '#fef08a', fontSize: '9px', fontWeight: 'bold', marginTop: '1px' }}>{p.price}M</div>
      
      {/* Kaldır Butonu */}
      <button 
        onClick={() => removePlayer(p)} 
        style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', fontSize: '8px', padding: '1px 4px', borderRadius: '4px', marginTop: '2px', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Kaldır
      </button>
    </div>
  ))}

  {/* Boş Kaleci Alanları (Genişlik ve boyutlar diğer tüm pozisyonlarla tamamen aynı) */}
  {Array.from({ length: 2 - getPlayersByPosition("KL").length }).map((_, i) => (
    <div
      key={i}
      onClick={() => setSeciliPozisyon("KL")}
      style={{ 
        border: '2px dashed rgba(255,255,255,0.35)', 
        borderRadius: '8px', 
        width: '65px', 
        height: '75px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#ffffff', 
        fontSize: '9px', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        backgroundColor: 'rgba(0,0,0,0.2)' 
      }}
    >
      <span>+ KL</span>
    </div>
  ))}
</div>



            </div>
          </div>

         {/* SAĞ TARAF: FİYATA GÖRE AZALAN OYUNCU HAVUZU */}
<div className="flex-1 style={{backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}">
  <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>
    {/* 3. Madde: Başlığı daha kurumsal ve temiz hale getirdik */}
    🏃‍♂️ Oyuncu Seçimi ({filtrelenmisVeSiraliPlayers.length} Oyuncu)
  </div>

  {/* Yüksekliği sol kutuyla (yeşil saha) birebir eşitlemek için 480px yaptık */}
  <div style={{ maxHeight: '480px', overflowY: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
      <tbody>
        {filtrelenmisVeSiraliPlayers.map((player) => {
          const isAdded = myTeam.find((p) => p.id === player.id);
          return (
            <tr key={player.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isAdded ? '#f8fafc' : '#ffffff', transition: 'all 0.2s ease' }}>
              {/* SOL SÜTUN: Oyuncu Bilgileri, Takım, Pozisyon ve Fiyat */}
              <td style={{ padding: '8px 6px' }}>
                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>
                  {player.name}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  <span>{player.team}</span>
                  <span>•</span>
                  <span style={{ color: '#b45309', fontWeight: '700' }}>{player.position}</span>
                  <span>•</span>
                  <span style={{ color: '#b45309', fontWeight: '800', backgroundColor: '#fef3c7', padding: '1px 4px', borderRadius: '4px', fontSize: '9px' }}>{player.price}M</span>
                </div>
              </td>
              
              {/* SAĞ SÜTUN: Buton Alanı */}
              <td style={{ padding: '8px 4px', textAlign: 'right', width: '70px' }}>
                <button
                  onClick={() => addPlayer(player)}
                  disabled={isAdded}
                  style={{
                    backgroundColor: isAdded ? '#e2e8f0' : '#1e3a8a',
                    color: isAdded ? '#94a3b8' : '#ffffff',
                    border: 'none',
                    padding: '5px 0px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: isAdded ? 'not-allowed' : 'pointer',
                    width: '60px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isAdded ? "Eklendi" : "Ekle"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


        </div>

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
