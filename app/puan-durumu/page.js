'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Header, Footer, BAŞLIK_FONTU, ICERIK_FONTU } from '../utils';
import ScrollToTop from '../ScrollToTop';

// 📊 GÜNCELLENMİŞ EN SON VERİ HAVUZU (9. Hafta Açılış Maçı Dahil)
const PUAN_DATA = [
  { sira: 1, takim: "Galatasaray", o: 8, g: 6, b: 1, m: 1, ag: 17, yg: 11, av: 6, p: 19 },
  { sira: 2, takim: "Amed SF", o: 8, g: 5, b: 2, m: 1, ag: 18, yg: 9, av: 9, p: 17 },
  { sira: 3, takim: "Fenerbahçe", o: 8, g: 5, b: 1, m: 2, ag: 22, yg: 6, av: 16, p: 16 },
  { sira: 4, takim: "Trabzonspor", o: 8, g: 5, b: 1, m: 2, ag: 18, yg: 5, av: 13, p: 16 },
  { sira: 5, takim: "Beşiktaş", o: 8, g: 5, b: 0, m: 3, ag: 16, yg: 10, av: 6, p: 15 },
  { sira: 6, takim: "Kocaelispor", o: 9, g: 5, b: 0, m: 4, ag: 11, yg: 9, av: 2, p: 15 }, // 🟢 3 Puan Eklendi & 6. Sıraya Yükseldi!
  { sira: 7, takim: "Çorum FK", o: 8, g: 4, b: 1, m: 3, ag: 18, yg: 13, av: 5, p: 13 },
  { sira: 8, takim: "Kasımpaşa", o: 8, g: 3, b: 4, m: 1, ag: 12, yg: 9, av: 3, p: 13 },
  { sira: 9, takim: "Alanyaspor", o: 9, g: 3, b: 3, m: 3, ag: 9, yg: 11, av: -2, p: 12 }, // 🔴 Mağlubiyetle 9. Sıraya Geriledi
  { sira: 10, takim: "Başakşehir", o: 8, g: 3, b: 2, m: 3, ag: 12, yg: 12, av: 0, p: 11 },
  { sira: 11, takim: "Erzurumspor FK", o: 8, g: 3, b: 2, m: 3, ag: 5, yg: 11, av: -6, p: 11 },
  { sira: 12, takim: "Rizespor", o: 8, g: 3, b: 1, m: 4, ag: 8, yg: 11, av: -3, p: 10 },
  { sira: 13, takim: "Göztepe", o: 8, g: 2, b: 3, m: 3, ag: 17, yg: 16, av: 1, p: 9 },
  { sira: 14, takim: "Gaziantep FK", o: 8, g: 2, b: 2, m: 4, ag: 8, yg: 12, av: -4, p: 8 },
  { sira: 15, takim: "Gençlerbirliği", o: 8, g: 2, b: 2, m: 4, ag: 7, yg: 16, av: -9, p: 8 },
  { sira: 16, takim: "Konyaspor", o: 8, g: 1, b: 2, m: 5, ag: 4, yg: 9, av: -5, p: 5 },
  { sira: 17, takim: "Samsunspor", o: 8, g: 1, b: 1, m: 6, ag: 7, yg: 19, av: -12, p: 4 },
  { sira: 18, takim: "Eyüpspor", o: 8, g: 1, b: 0, m: 7, ag: 2, yg: 22, av: -20, p: 3 }
];

export default function PuanDurumuSayfasi() {
  const [puanVerileri] = useState(PUAN_DATA);

  const getSatirStili = (s) => {
    if (s === 1) return { backgroundColor: '#1e3a8a', color: '#ffffff' }; 
    if (s === 2) return { backgroundColor: '#fef08a', color: '#132444' }; 
    if (s === 3) return { backgroundColor: '#f3e8ff', color: '#6b21a8' }; 
    if (s === 4) return { backgroundColor: '#dcfce7', color: '#166534' }; 
    if (s >= 16) return { backgroundColor: '#fee2e2', color: '#991b1b' }; 
    return { backgroundColor: '#ffffff', color: '#334155' };
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />
      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="puan" />

        {/* 🎯 SEO & ADSENSE DOSTU ORTAK H1 ANA BAŞLIK */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.0rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Süper Lig Puan Durumu
          </h1>
        </div>

        {/* GÖRSEL TUTARLILIK İÇİN EKLENEN STANDART YEŞİL KUTU */}
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
          <strong>Puan Durumu Notu:</strong> Fantezi futbol kadronuzu kurarken oyuncularını ilk sıralarda yazacağınız takımların, ligdeki durumunu, gol yollarındaki etkinliğini, savunma gücü yada zafiyetini, kritik haftalarda Avrupa için rekabeti ve düşmeme mücadelelerini yansıtan güncel puan tablosu aşağıda listelenmiştir. Oyun içi taktiklerinizi şekillendirirken bu verilerden yararlanabilirsiniz.
        </div>
{/* 📱 GÜNCEL PUAN CETVELİ TABLOSU */}
        <div style={{ width: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '2px solid #e2e8f0', fontSize: '11px' }}>
                <th style={{ padding: '10px 4px', width: '30px' }}>#</th>
                <th style={{ padding: '10px 6px', textAlign: 'left' }}>Takım</th>
                <th style={{ padding: '10px 4px', width: '35px' }}>O</th>
                <th style={{ padding: '10px 4px', width: '35px' }}>G</th>
                <th style={{ padding: '10px 4px', width: '35px' }}>B</th>
                <th style={{ padding: '10px 4px', width: '35px' }}>M</th>
                <th style={{ padding: '10px 4px', width: '40px', fontWeight: 'bold' }}>AG</th>
                <th style={{ padding: '10px 4px', width: '40px', fontWeight: 'bold' }}>YG</th>
                <th style={{ padding: '10px 4px', width: '40px', fontWeight: 'bold' }}>AV</th>
                <th style={{ padding: '10px 6px', fontWeight: 'bold', color: '#132444', width: '45px' }}>P</th>
              </tr>
            </thead>
            <tbody>
              {puanVerileri.map((v) => {
                const st = getSatirStili(v.sira);
                const isLider = v.sira === 1;
                const puanRengi = isLider ? '#fbbf24' : (v.sira >= 16 ? st.color : '#132444');

                return (
                  <tr key={v.sira} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: st.backgroundColor, color: st.color }}>
                    <td style={{ padding: '10px 4px', fontWeight: '500' }}>{v.sira}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'left', fontWeight: '700', whiteSpace: 'nowrap' }}>{v.takim}</td>
                    <td style={{ padding: '10px 4px' }}>{v.o}</td>
                    <td style={{ padding: '10px 4px' }}>{v.g}</td>
                    <td style={{ padding: '10px 4px' }}>{v.b}</td>
                    <td style={{ padding: '10px 4px' }}>{v.m}</td>
                    <td style={{ padding: '10px 4px' }}>{v.ag}</td>
                    <td style={{ padding: '10px 4px' }}>{v.yg}</td>
                    <td style={{ padding: '10px 4px' }}>{v.av > 0 ? `+${v.av}` : v.av}</td>
                    <td style={{ padding: '10px 6px', fontWeight: '800', fontSize: '13.5px', color: puanRengi }}>{v.p}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ℹ Notlar & Kısaltmalar */}
        <div style={{ width: '100%', margin: '15px auto 0 auto', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.4' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e3a8a' }}></span> ŞL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fef08a' }}></span> ŞL Elm</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f3e8ff' }}></span> AL</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dcfce7' }}></span> KL Elm</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fee2e2' }}></span> Küme Düşme Hattı</span>
          </div>
          
          <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: ICERIK_FONTU }}>
            <strong>Puan Cetveli Kısaltmaları:</strong> 
            <span style={{ marginLeft: '4px' }}><strong>O:</strong> Oynadığı Maç Sayısı |</span>
            <span style={{ marginLeft: '4px' }}><strong>G:</strong> Galibiyet |</span>
            <span style={{ marginLeft: '4px' }}><strong>B:</strong> Beraberlik |</span>
            <span style={{ marginLeft: '4px' }}><strong>M:</strong> Mağlubiyet |</span>
            <span style={{ marginLeft: '4px' }}><strong>AG:</strong> Atılan Gol |</span>
            <span style={{ marginLeft: '4px' }}><strong>YG:</strong> Yenen Gol |</span>
            <span style={{ marginLeft: '4px' }}><strong>AV:</strong> Averaj |</span>
            <span style={{ marginLeft: '4px' }}><strong>P:</strong> Toplam Puan</span>
          </div>
        </div>

        {/* 2. 🎯 SEO METNİ EN ALTA ALINDI */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '20px',
          marginBottom: '20px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Güncel Puan Durumu ve Fantezi Lig Analizi:</strong> Takımların oynadıkları maç sayısı, galibiyet, beraberlik, mağlubiyet sayıları ile birlikte attıkları, yedikleri goller, averaj verileri ve güncel lig sıralamaları bu sayfada anlık olarak listelenmektedir. Avrupa kotası ve küme düşme potasını gösteren renkli göstergelerimiz sayesinde ligdeki son durumu takip edebilirsiniz. Fantezi futbol kadrolarınızı kurarken puan durumundaki sıralamaları, takımların gol yollarındaki performanslarını ve savunma güçlerini analiz etmek kritik önem taşır. Haftalık kadro kurulumlarınızı genel form, iç saha - deplasman grafiklerini yansıtan tablolar ile birlikte buradaki güncel puan durumu verileri ışığında güvenle yapabilir, fantezi futbol liginizde fark yaratacak stratejiler geliştirebilirsiniz. Bu hafta, Galatasaray 88'de liderliği kurtardı. Düşme potasında ise Konyaspor, Samsunspor ve Eyüpspor var. Derbide galip gelen Trabzonspor 4.lüğe yükselirken, Beşiktaş'ı 5.liğe itti.
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
