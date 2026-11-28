'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from './utils';
import ScrollToTop from './ScrollToTop';

// Süper Lig takımları ve ilk oyuncu verileri (Sakatlık, ceza ve durum bilgileri) tanımlanmıştır.
const SUPER_LIG_TAKIMLARI = [
  "Alanyaspor", "Amed Sportif Faaliyetler", "Başakşehir", "Beşiktaş", "Çorum FK", 
  "Erzurumspor FK", "Eyüpspor", "Fenerbahçe", "Galatasaray", "Gaziantep FK", 
  "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kocaelispor", "Konyaspor", 
  "Rizespor", "Samsunspor", "Trabzonspor"
];

const ILK_OYUNCULAR = {
  "Alanyaspor": "", "Amed Sportif Faaliyetler": "Ballet - Cezalı - Kırmızı kart - 14. hafta\nDellova - Sakat - Belli değil - Aralık ayı\nKrasniqi - Şüpheli - Darbe - Belli değil\nAli Turap - Şüpheli - Belli değil - Belli değil\nDiagne - Ayrıldı - Bilinmiyor - Fesih", "Başakşehir": "Emin - Sakat - Ameliyat - Sezon sonu\nOperi - Sakat - Ameliyat - Mart ayı\nYusuf - Sakat - Menisküs - Aralık sonu\nFayzullayev - Şüpheli - Belli değil - Belli değil\nBa - Şüpheli - Belli değil - Belli değil", "Beşiktaş": "", "Çorum FK": "Berat - Sakat - Adale - Ocak ayı\nCengiz - Şüpheli - Adale - Belli değil\nArda - Şüpheli - Adale - Belli değil\nGökhan - Şüpheli - Adale - Belli değil", 
  "Erzurumspor FK": "Orhan - Sakat - Kasık - Aralık ayı\nEbosele - Sakat - Hamstring - Ocak ayı", "Eyüpspor": "Moldovan - Kadro dışı - Yönetim - Transfer\nEl Yamiq - Kadro dışı - Yönetim - Transfer\nSabiri - Kadro dışı - Yönetim - Transfer\nPintor - Şüpheli - Belli değil - Belli değil\nBoutobba - Kadro dışı - Yönetim - Transfer\nTalha - Şüpheli - Belli değil - TD kararı\nGiordano - Şüpheli - Belli değil - Belli değil", 
  "Fenerbahçe": "Oosterwolde - Liste dışı - Ameliyat oldu - Aralık\nAke - Sakat - Adale - Aralık ayı\nAsensio - Sakat - Diz - Ocak sonu\nAmara Diouf - Liste dışı - Özel program - Belli değil",
  "Galatasaray": "Leao - Sakat - Adale - Aralık ayı", "Gaziantep FK": "Fuat Bavuk - Sakat - Ayak b. - Belli değil\nStewart - Şüpheli - Belli değil - Belli değil\nAbena - Şüpheli - Kafa - Belli değil\nSylla - Şüpheli - Belli değil - Belli değil", 
  "Gençlerbirliği": "Pedro P. - Şüpheli - Belli değil - Belli değil\nTongya - Şüpheli - Belli değil - Belli değil\nK. Rodrigues - Sakat - Adale - Belli değil\nGoutas - Sakat - Çapraz bağ - Sezon sonu\nThalisson - Sakat - Belli değil - Belli değil\nEnsar - Sakat - Belli değil - Kasım sonu\nAbdurrahim - Sakat - Belli değil - Aralık ayı\nGökhan - Sakat - Belli değil - Belli değil", 
  "Göztepe": "Luka - Kadro dışı - Soruşturma - Belli değil\nAndre - Şüpheli - Kafa - 14. hafta\nFurkan B. - Sakat - Belli değil - Belli değil", 
  "Kasımpaşa": "Ali Yavuz - Cezalı - Sarı kart - 14. hafta\nKamil Ahmet - Sakat - Aşil - Sezon sonu\nMouanga - Şüpheli - Belli değil - Belli değil\nDiabate - Şüpheli - Darbe - Belli değil", "Kocaelispor": "Show - Şüpheli - Adale - Belli değil\nPetkovic - Şüpheli - Maç ritmi - Belli değil\nHaidara - Sakat - Tendon - 2027\nZoukrou - Şüpheli - Hamstring - Belli değil", "Konyaspor": "Adil - Sakat - Çapraz bağ - Sezon sonu\nAwaziem - Sakat - Hamstring - Belli değil\nBahadır - Şüpheli - Belli değil - Belli değil", "Rizespor": "Alikulov - Şüpheli - Maç ritmi - TD kararı\nCan - Sakat - Fbf - Ocak ayı\nMihaila - Şüpheli - Belli değil - Belli değil\nTaha - Şüpheli - Belli değil - Belli değil\nFofana - Şüpheli - Belli değil - Belli değil", "Samsunspor": "Celil - Şüpheli - Uyluk - Belli değil", "Trabzonspor": "Okay - Sakat - Bireysel - 2027\nDju - Şüpheli - Uyluk - 14. hafta\nAral - Şüpheli - Adale - 14. hafta\nBatagov - Şüpheli - Antrenman - 14. hafta\nFolcarelli - Şüpheli - Belli değil - 14. hafta"
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

  const renderTakimKutusu = (takimAdi) => {
    const oyuncuListesi = satirlariParcala(oyuncuVerileri[takimAdi] || "");
    return (
      <div key={takimAdi} style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.0rem', color: '#1e293b', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px', marginBottom: '6px', fontFamily: ICERIK_FONTU, fontWeight: 'bold' }}>{takimAdi}</h2>
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
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="eksik" />

{/* STANDART BOŞLUKLU BAŞLIK BLOKU */}
<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
  <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
    Süper Lig Sakat ve Cezalılar ile Eksikler
  </h1>
</div>

{/* STANDART YEŞİL BİLGİLENDİRME KUTUSU */}
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
  <strong>Eksik Listesi Analizi:</strong> Süper Lig'de her hafta yeni heyecan başlarken, fantezi futbol kadrolarında değişikliğe gidecek katılımcılar için sakat ve cezalı oyuncular büyük önem taşıyor. Beklenmedik puan kayıpları yaşamamak adına, takımların güncel eksiklerini aşağıdan inceleyebilirsiniz. Sarı kart sınırındaki oyuncular, eksik listesinin altına eklendi. Havuzumuzdaki veriler resmi açıklamalar doğrultusunda anlık güncellenmektedir. Son güncelleme: 28.11.2026 20:52
</div>

        {/* Tüm takımların listelendiği ana döngü */}
        {SUPER_LIG_TAKIMLARI.map((takim) => renderTakimKutusu(takim))}

      {/* 🟨 SARI KART SINIRINDAKİLER */}
      <div style={{
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        marginTop: '24px',
        fontFamily: ICERIK_FONTU
      }}>
        <h2 style={{
          fontSize: '1.0rem',
          fontFamily: BAŞLIK_FONTU, // Sitenin ana başlık fontu
          color: '#1e293b',
          borderBottom: '2px solid #cbd5e1',
          paddingBottom: '6px',
          margin: '0 0 14px 0',
          fontWeight: 'bold'
        }}>
          Süper Lig 12. Hafta Sarı Kart Sınırındaki Oyuncular
        </h2>

        <ul style={{
          margin: 0,
          paddingLeft: '2px',
          fontSize: '0.85rem',
          lineHeight: '1.45',
          color: '#475569',
          fontFamily: ICERIK_FONTU,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px' // Takımlar arasındaki dikey boşluk (6px-10px arası değiştirebilirsin)
        }}>
          <li><strong style={{ color: '#1e293b' }}>Alanyaspor:</strong> Aliti, Lima, Elia</li>
          <li><strong style={{ color: '#1e293b' }}>Amed Sportif Faaliyetler:</strong> Orban, Ermal Krasniqi, Dia Saba, Rayan Raveloson, Lafont, Furkan, Umut</li>
          <li><strong style={{ color: '#1e293b' }}>Başakşehir:</strong> Ousseynou Ba, Oliver Kemen, Umut Güneş</li>
          <li><strong style={{ color: '#1e293b' }}>Beşiktaş:</strong> Emirhan Topçu, Murillo, Leandro Trossard</li>
          <li><strong style={{ color: '#1e293b' }}>Çorum FK:</strong> Diomande</li>
          <li><strong style={{ color: '#1e293b' }}>Erzurumspor FK:</strong> Kart sınırında oyuncu bulunmamaktadır.</li>
          <li><strong style={{ color: '#1e293b' }}>Eyüpspor:</strong> Anıl Yaşar</li>
          <li><strong style={{ color: '#1e293b' }}>Fenerbahçe:</strong> Milan Skriniar, Nélson Semedo</li>
          <li><strong style={{ color: '#1e293b' }}>Galatasaray:</strong> Davinson Sánchez, Roland Sallai, Rafael Leão</li>
          <li><strong style={{ color: '#1e293b' }}>Gaziantep FK:</strong> Kacper Kozłowski, Camara, Meleke</li>
          <li><strong style={{ color: '#1e293b' }}>Gençlerbirliği:</strong> Kart sınırında oyuncu bulunmamaktadır.</li>
          <li><strong style={{ color: '#1e293b' }}>Göztepe:</strong> Alex Matos, Arda Okan Kurtulan, Alexis Antunes, Juan</li>
          <li><strong style={{ color: '#1e293b' }}>Kasımpaşa:</strong> Kerem Demirbay, Cláudio Winck, Baldursson, Arous</li>
          <li><strong style={{ color: '#1e293b' }}>Kocaelispor:</strong> Emir Ortakaya, Mahamadou Susoho, Tayfur Bingöl</li>
          <li><strong style={{ color: '#1e293b' }}>Konyaspor:</strong> Marko Jevtović, Melih İbrahimoğlu, Adil Demirbağ</li>
          <li><strong style={{ color: '#1e293b' }}>Rizespor:</strong> Mithat Pala, Zakaria Ariss, Attila Mocsi</li>
          <li><strong style={{ color: '#1e293b' }}>Samsunspor:</strong> Watt</li>
          <li><strong style={{ color: '#1e293b' }}>Trabzonspor:</strong> Stefan Savić, Fabinho</li>
        </ul>
      </div>


{/* 🎯 KADRO YÖNLENDİRME */}
<div style={{
  marginTop: '16px',
  padding: '12px 16px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  fontFamily: ICERIK_FONTU
}}>
  <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>
    Eksiklere Göre Kadronu Dene →
  </span>
  <Link
    href="/kadronu-dene"
    style={{
      padding: '6px 14px',
      backgroundColor: '#fffbeb',
      color: '#b45309',
      border: '1px solid #f59e0b',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }}
  >
    Kadrom
  </Link>
</div>



        {/* 🔄 REHBER METNİ */}
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <h3 style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            Süper Lig Eksik Listesi ve Fantezi Futbol Kadro Planlama Rehberi
          </h3>
          <p style={{ margin: '0 0 12px 0' }}>
            Süper Lig eksik listeleri, fantezi lig maratonunda rakiplerinin önüne geçmek ve transfer bütçesini doğru yönetmek isteyen menajerler için en kritik strateji kaynağıdır. Özellikle hücum ve savunma kurgularında haftalık transfer haklarını kullanırken, oyuncuların sakatlık nedenlerini, kart sınırlarını ve tahmini dönüş sürelerini analiz etmek uzun vadeli başarı getirir.
          </p>

          <h4 style={{ margin: '14px 0 6px 0', fontSize: '1.05em' }}>
            13. Hafta Öncesi Öne Çıkan Sakat ve Cezalı Oyuncular
          </h4>
          <p style={{ margin: '0 0 12px 0' }}>
            İçinde bulunduğumuz haftadaki güncel gelişmelere baktığımızda; Gaziantep FK'den Abena, kafa travması nedeniyle Gençlerbirliği maçında ambulansla oyundan çıktı, Diabate devrede değişti. Leao'nun sakatlığı sürüyor. Cezalı oyunculara baktığımızda ise Amed SF'den Ballet göze çarpıyor. Krasniqi, Rizespor maçının devre arasında yerini Cisse'ye bıraktı. Skriniar, Camara, Umut gördükleri kartlar ile sınıra ulaştılar. Göztepe'de Andre sakatlanıp sedyeyle çıktı. Ayberk maçta sarı kart görüp cezalı duruma duruma düştü. Başakşehir'de ise Emin Bayram maçın başlarında oyundan çıktı, muhtemelen sezonu kapattı. Erzurumspor'da Ebosele ve Orhan Ovacıklı birkaç hafta forma giyemeyecek.
          </p>

          <h4 style={{ margin: '14px 0 6px 0', fontSize: '1.05em' }}>
            Eksik Listesi Fantezi Kadronuzda Nasıl Avantaja Çevrilir?
          </h4>
          <p style={{ margin: '0 0 12px 0' }}>
            Kadro kurulum süreçlerinde sadece popüler isimlere yönelmek yerine, yıldız oyuncuların yokluğunda formayı devralacak düşük bütçeli alternatifleri tespit etmek size büyük bir puan avantajı sağlar. Örneğin, as forveti veya oyun kurucusu sakatlanan bir takımın yedek oyuncusu, uygun maliyetiyle kadronuzun diğer bölgelerine yıldız isimler almanıza olanak tanır. Aynı şekilde, savunma hattında önemli eksikleri bulunan takımların rakiplerinden hücum oyuncusu seçmek haftalık puan potansiyelinizi artıracaktır.
          </p>

          <h4 style={{ margin: '14px 0 6px 0', fontSize: '1.05em' }}>
            Rotasyon Riski ve Maç Takvimi Takibi
          </h4>
          <p style={{ margin: 0 }}>
            Takımların Avrupa kupalarındaki yoğun maç takvimlerini ve teknik direktörlerin olası rotasyon tercihlerini hesaba katmanız fantezi takımınızın istikrarı açısından oldukça önemlidir. Sayfamızda yer alan sakatlık ve ceza verileri düzenli periyotlarla taranarak, kadro kilidi kapanmadan önce en doğru hamleleri yapmanıza katkı sağlamayı amaçlamaktadır.
          </p>

        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
