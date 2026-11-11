'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// 🏆 SEÇKİN TAKIM İSTATİSTİK VERİ HAVUZU (Savunma Odaklı xGA ve Yenilenen Sıralama)
const TAKIM_ISTATISTIK_DATA = {
  "xG (Gol Beklentisi)": [
    { takim: "Fenerbahçe", deger: "23,1", ekBilgi: "LS:6" },
    { takim: "Galatasaray", deger: "22,7", ekBilgi: "LS:1" },
    { takim: "Amed SF", deger: "20,8", ekBilgi: "LS:3" },
    { takim: "Beşiktaş", deger: "20,8", ekBilgi: "LS:4" },
    { takim: "Göztepe", deger: "20,6", ekBilgi: "LS:10" }
  ],
  "xGA (Verilen Gol Beklentisi)": [
    { takim: "Beşiktaş", deger: "9,1", ekBilgi: "LS:4" },
    { takim: "Amed SF", deger: "10,0", ekBilgi: "LS:3" },
    { takim: "Galatasaray", deger: "11,0", ekBilgi: "LS:1" },
    { takim: "Fenerbahçe", deger: "13,0", ekBilgi: "LS:6" },
    { takim: "Kasımpaşa", deger: "13,3", ekBilgi: "LS:5" }
  ],
  "Topla Oynama": [
    { takim: "Beşiktaş", deger: "%62,5", ekBilgi: "LS:4" },
    { takim: "Galatasaray", deger: "%59,5", ekBilgi: "LS:1" },
    { takim: "Fenerbahçe", deger: "%55,4", ekBilgi: "LS:6" },
    { takim: "Rizespor", deger: "%54,0", ekBilgi: "LS:11" },
    { takim: "Trabzonspor", deger: "%53,9", ekBilgi: "LS:2" }
  ],
  "Karşılıklı Gol": [
    { takim: "Göztepe", deger: "%73", ekBilgi: "dep Erzurumspor" },
    { takim: "Amed SF", deger: "%64", ekBilgi: "ev Rizespor" },
    { takim: "Kasımpaşa", deger: "%64", ekBilgi: "ev Alanyaspor" },
    { takim: "Başakşehir", deger: "%55", ekBilgi: "ev Çorum FK" },
    { takim: "Çorum FK", deger: "%55", ekBilgi: "dep Başakşehir" }
  ]
};

export default function TakimlarIstatistikSayfasi() {
  const [istatistikler] = useState(TAKIM_ISTATISTIK_DATA);

  const renderTablo = (baslik, liste, emoji, ozelAnahtar, altBilgiMetni, seoMetni) => (
    <div key={ozelAnahtar} style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', fontWeight: 'bold', color: '#132444', borderBottom: '2px solid #e2e8f0', fontSize: '0.95rem' }}>
        {emoji} {baslik}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', backgroundColor: '#ffffff' }}>
        <tbody>
          {liste.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#64748b', width: '25px', textAlign: 'center', fontSize: '13px' }}>
                {i + 1}
              </td>
              <td style={{ padding: '10px 12px' }}>
                <div style={{ fontWeight: '700', color: '#334155', fontSize: '14px', letterSpacing: '-0.2px' }}>
                  {v.takim}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px' }}>
                  {altBilgiMetni} • <span style={{ color: '#b45309', fontWeight: 'bold' }}>{v.ekBilgi}</span>
                </div>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '850', color: '#132444', fontSize: '1.05rem', paddingRight: '20px' }}>
                {v.deger}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{
        padding: '10px 12px',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        fontSize: '11px',
        lineHeight: '1.4',
        color: '#475569',
        fontFamily: 'Verdana, sans-serif',
      }}>
        {seoMetni}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />
      
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="takim-istatistikleri" />

        {/* STANDART BOŞLUKLU BAŞLIK BLOKU */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Takım İstatistikleri
          </h1>
        </div>

        {/* YENİ EKLENEN STANDART YEŞİL KUTU */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '16px',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#166534',
          fontFamily: ICERIK_FONTU,
          width: '100%'
        }}>
          <strong>Takım Analiz Notu:</strong> Fantezi liglerde sadece oyuncu seçimi değil, oyuncuların formasını giydiği takımların oyun üstünlükleri ve zafiyetleri de önemlidir. Başarılı kadrolar kurmak adına takım istatistiklerini göz önünde bulundurmanızın faydalı olacağını düşünüyoruz. Tablolardaki LS: lig sıralaması, dep ve ev ise karşılaşacakları takımlarla maçların nerede oynanacağıdır. Oyuncu istatistikleri için alttan ilgili düğmeye basıp diğer sayfaya geçebilirsiniz.
        </div>

        {/* 🔄 İSTATİSTİKLER ALT SAYFA GEÇİŞ DÜĞMELERİ */}
        <div className="flex justify-center items-center gap-2 mb-5 w-full">
          <Link href="/oyuncular" style={{
            fontSize: '11.5px',
            fontFamily: ICERIK_FONTU,
            padding: '6px 16px',
            borderRadius: '14px',
            backgroundColor: '#f0f9ff',
            color: '#0369a1',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #bae6fd',
            display: 'inline-block',
            WebkitTapHighlightColor: 'transparent'
          }}>
            Oyuncu İstatistikleri
          </Link>
          <Link href="/takim-istatistikleri" style={{
            fontSize: '11.5px',
            fontFamily: ICERIK_FONTU,
            padding: '6px 16px',
            borderRadius: '14px',
            backgroundColor: '#0369a1',
            color: '#ffffff',
            fontWeight: 'bold',
            textDecoration: 'none',
            border: '1px solid #075985',
            display: 'inline-block',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            WebkitTapHighlightColor: 'transparent'
          }}>
            Takım İstatistikleri
          </Link>
        </div>
        {/* 1. ⚽ xG TABLOSU */}
        {renderTablo(
          "En Çok xG (Gol Beklentisi) Üreten Takımlar", 
          istatistikler["xG (Gol Beklentisi)"], 
          "⚽", 
          "ist-takimxg",
          "Güncel Sıralama",
          "Takımların girdikleri gol pozisyonlarının kalitesini belirleyen gelişmiş gol beklentisi (xG) verisi. Maç başına hücum üretkenliği en yüksek kulüpler burada listelenmektedir. Hücum gücü yüksek olan ekiplerin as forvetlerine yönelmek fantezi lig puanlarınızı doğrudan artıracaktır. Ligde 6. sırada olmasına rağmen Fenerbahçe bu alanda lider."
        )}

        {/* 2. 🧱 xGA (VERİLEN GOL BEKLENTİSİ) TABLOSU - EN DÜŞÜK DEĞER ODDAKLI */}
        {renderTablo(
          "Kalesinde En Az Gol Beklentisi Veren Takımlar (En Düşük xGA)", 
          istatistikler["xGA (Verilen Gol Beklentisi)"], 
          "🧱", 
          "ist-takimxga",
          "Güncel Sıralama",
          "Kalesinde rakiplerine en az net gol şansı tanıyan, savunma disiplini en yüksek takımların listesidir. Fantezi lig kadrolarınıza kaleci ve savunma oyuncusu transfer ederken bu tablonun üst sıralarındakilerden tercih etmek kalesini gole kapatma (Clean Sheet) puanı alma ihtimalinizi en üste çıkarır. Beşiktaşın oyun anlayışı bu listede neden zirvede olduğunun göstergesi."
        )}

        {/* 3. 👟 TOPLA OYNAMA TABLOSU */}
        {renderTablo(
          "Ortalama Topla Oynama Yüzdesi (%) En Yüksek Takımlar", 
          istatistikler["Topla Oynama"], 
          "👟", 
          "ist-toplaoynama",
          "Güncel Sıralama",
          "Maç içerisinde topa daha fazla hükmeden takımlar, fantezi futbolda orta saha oyuncularınız için ekstra puan potansiyeli taşır. Büyük bütçeli ekipler topa yön verme konusunda ligin liderliğini üstlenirken, Recep Uçar ile Rizespor yakın takibini sürdürüyor."
        )}
        
        {/* 4. 🤝 KARŞILIKLI GOL (KG) TABLOSU */}
        {renderTablo(
          "Karşılıklı Gol (KG) Oranı En Yüksek Takımlar", 
          istatistikler["Karşılıklı Gol"], 
          "🤝", 
          "ist-takimkg",
          "Gelecek Maç",
          "Hem üretken olan hem de kalesini kapatmakta zorlanan, yani maçları bol gollü geçen ekiplerin Karşılıklı Gol Var yüzdeleridir. Bu takımların sıradaki rakiplerine bakarak hem hücum hattından oyuncu seçebilir hem de kaleci tercihlerinizde bu ekiplerden uzak durabilirsiniz."
        )}

        {/* 📝 SEO UYUMLU DETAYLI BİLGİLENDİRME METNİ */}
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
          <strong>Fantezi Lig Takım İstatistikleri:</strong> Başarılı bir fantezi lig oyunu katılımcısı olmak, oyuncuların bireysel yeteneklerinin yanı sıra takım stratejilerini de analiz etmeyi gerektirir. Sayfamızda yer alan gelişmiş gol beklentileri (xG), rakiplere şans tanımayan en iyi savunmaların verilen gol beklentileri (xGA), ortalama topla oynama yüzdeleri ve takımların maçlarındaki karşılıklı gol (KG) istatistikleri fantezi futbol kadro kurulumlarınızda size rehberlik edebilir. Veriler tarafsız analiz süreçleri adına global sağlayıcılardan alınıp süper lig değişkenleri ile harmanlanarak bilgilendirme ve en yararlı transfer seçimlerini yapabilmeniz için özelleştirilmiştir.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
