  return (
    <div style={{ padding: '10px', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="analiz" />

        {/* 🎯 BAŞLIK ALANI */}
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '12px' }}>
          <h1 style={{ fontSize: '1.00rem', color: '#1e293b', fontWeight: 'bold', fontFamily: BAŞLIK_FONTU, margin: 0 }}>
            Fantezi Lig Oyuncu Önerileri ve Tüyoları
          </h1>
        </div>

        <h2 style={{ 
          fontSize: '0.95rem', color: '#64748b', marginBottom: '12px', marginTop: '0px',
          fontFamily: ICERIK_FONTU, fontWeight: 'bold', 
          letterSpacing: '0.5px', textAlign: 'left', width: '100%' 
        }}>
          Fantezi Lig 7. Hafta Kadronuz İçin Oyuncu Önerileri ve Kaptan Seçimi
        </h2>

        {/* 1. Üst Reklam: Başlıkların tam altında, kurallara uygun 16px üst - 24px alt boşlukla yerleşti */}
        {renderRek({ marginTop: '16px', marginBottom: '24px' })}

        {/* 🧤 KALECİLER BÖLÜMÜ */}
        {renderMevkiTablosu("Kaleci", onerilenOyuncular["Kaleci"], "🧤", "t_k")}

        {/* 🛡️ DEFANSLAR BÖLÜMÜ */}
        {renderMevkiTablosu("Defans", onerilenOyuncular["Defans"], "🛡️", "t_d")}

        {/* 2. Orta Reklam: Defans ve Orta saha gruplarının tam arasına, 24px-24px boşluk kuralıyla yerleşti */}
        {renderRek({ marginTop: '24px', marginBottom: '24px' })}

        {/* 🎯 ORTA SAHALAR BÖLÜMÜ */}
        {renderMevkiTablosu("Orta Saha", onerilenOyuncular["Orta Saha"], "🎯", "t_o")}

        {/* ⚽ FORVETLER BÖLÜMÜ */}
        {renderMevkiTablosu("Forvet", onerilenOyuncular["Forvet"], "⚽", "t_f")}
        {/* 🎯 KISA SEO METNİ: Forvet tablosunun hemen bitiminde Google botlarını karşılamak için yerleşti */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginTop: '24px',
          marginBottom: '12px',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#475569',
          fontFamily: ICERIK_FONTU
        }}>
          <strong>Haftanın Fantezi Futbol Tüyoları:</strong> Süper Lig'de bu hafta kadrolarınıza dahil edebileceğiniz en formda ve bütçe dostu oyuncu önerileri listelenmektedir. Kaleci, defans, orta saha ve forvet mevkileri için özel olarak hazırlanan bu rehberde; oyuncuların takımları, oyun içi fiyatları (değerleri) yer almaktadır. Haftalık kadro güncellemelerinizi yapmadan önce tüyolarımıza mutlaka göz atın.
        </div>

        {/* 📝 GENEL ANALİZ KUTUSU (UZUN SEO REHBERİ): Kısa SEO metninin hemen altında peş peşe konumlandırıldı */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '18px', color: '#1e293b', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.65', marginBottom: '25px', marginTop: '0px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#132444', fontWeight: 'bold', marginBottom: '12px', marginTop: '0' }}>📊 Süper Lig Fantezi Lig Tüyo Strateji ve Eksik Analiz Rehberi (2026-2027 Sezonu)</h3>
          
          <p style={{ margin: '0 0 12px 0' }}>
            FanteFut, popüler fantezi lig uygulamalarında mücadele eden teknik direktörler ve Süper Lig takipçileri için kurulmuş bağımsız bir bilgi, strateji, analiz ve tüyo rehberidir. Bu platformlarda her hafta zirveye oynamanın ve en yüksek puanları toplamanın sırrı, sadece formda oyuncuları kadroya katmaktan değil, arka planda yaşanan sakatlık, ceza ve rotasyon durumlarını çok sıkı takip etmekten geçer. Sitemizin ana sayfasında yer alan <strong>Süper Lig güncel sakat ve cezalı oyuncular listesi (Eksik Listesi)</strong>ne göz atmak, fantezi lig platformlarında kadrolarınızı kurarken yapacağınız ilk ve en kritik hamledir. Maç saatine dakikalar kala kadro dışı kalan veya son antrenmanda sakatlanan bir yıldız oyuncu, fantezi lig bütçenizi ve haftalık puanınızı doğrudan etkiler.
          </p>

          <p style={{ margin: '0 0 12px 0' }}>
            Bu doğrultuda, menajerlerin kadrolarını şekillendirmeden önce Süper Lig takımlarının Avrupa mesailerini de göz önünde bulundurması gerekir. Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi gibi yoğun fikstürlerde mücadele eden takımlarımızın, Türkiye ligi veya Avrupa maçları için yapacağı rotasyonlar, oyuncu dinlendirmeleri ve kadro değişiklikleri fantezi lig sıralamanızı doğrudan etkiler. Sizin için, özellikle milli maç aralarının hemen ardından oynanan lig haftaları dahil olmakla birlikte her hafta, takımların resmi yayın organlarını, kulüp muhabirlerinin son dakika haberlerini ve antrenman raporlarını yakından inceliyoruz. <strong>Galatasaray, Beşiktaş, Fenerbahçe, Trabzonspor, Amed Sportif Faaliyetler, Kocaelispor, Alanyaspor, Kasımpaşa SK, Çaykur Rizespor, Gaziantep FK, Çorum FK, İstanbul Başakşehir FK, Gençlerbirliği, Erzurumspor FK, Konyaspor, Samsunspor, Göztepe ve Eyüpspor</strong> gibi 2026-2027 sezonu Süper Lig kulüplerinin muhtemel 11 haberlerini, dinlendirilecek ve oynayacak oyuncular bilgilerini süzgeçten geçirerek en güncel tüyoları ve eksik listelerini fantezi lig dünyasına sunuyoruz.
          </p>

          <p style={{ margin: '0' }}>
            Sitemizde yer alan <strong>'Gol & Asist'</strong> ve <strong>'En İyiler'</strong> sekmeleri, katılımcıların oyuncu tercihlerinde çok yararlandığı istatistik merkezleridir. <strong>'Tüyolar'</strong> sekmesinde, takımların iç ve dış saha form durumları, savunma ve hücum güçleri, sakat ve cezalı oyuncuları, önceki maçlardaki ilk 11'leri analiz edilerek o haftanın en çok puan alacak kadrosunu kurmanıza yardımcı olmak için mevkilerine göre kaleci, defans, orta saha ve forvet oyuncuları önerilerini, bütçenize göre değerlendirebilesiniz diye oyun için futbolcu fiyatını (değerini) da göz önüne alarak sürekli güncelliyoruz. Kadronuzu (ilk 11 ve yedekler) kurarken bütçe yönetimini dengeli yapmak, cezalı duruma düşme riski yüksek olan agresif oyunculardan kaçınmak ve gol/asist beklentisi yüksek olan hücumculara yönelmek, haftaları minimum kayıpla geçmenizi sağlayacaktır. FanteFut olarak, Süper Lig eksik listelerini ve fantezi lig tüyolarını en güncel gelişmeler ışığında <strong>sürekli olarak düzenliyor ve anlık güncelliyoruz</strong>. Böylece platformumuzu tamamen organik, güncel ve rehber niteliğinde bir fantezi lig bilgi üssü olarak ayakta tutuyoruz.
          </p>
        </div>

        {/* 4. Eski en alt şerit reklam alanı tamamen temizlendi. */}

        <Footer />
      </div>
    </div>
  );
}
