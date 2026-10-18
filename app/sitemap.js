// app/sitemap.js
import { blogsData } from '../data/blogs';

export default async function sitemap() {
  const baseUrl = 'https://fantefut.com';

  // 1. STATİK, KURUMSAL VE YASAL SAYFALAR (Stratejik öncelik ve sıklık ayarları yapıldı)
  const statikSayfalar = [
    '', // Ana Sayfa (Eksik Listesi)
    '/blog', // Ana Blog Listesi
    '/haftanin-analizi', // 🔥 Oyuncu önerileri ve değerlerinin olduğu altın sayfa
    '/oyuncular', // ⚽ YENİ: xG, xA ve Kaleci kurtarış istatistikleri altın sayfası
    '/form-durumu',
    '/puan-durumu',
    '/kralliklar',
    '/fikstur-ilk-yari',
    '/fikstur-ikinci-yari',
    '/haftanin-yildizlari',
    '/ic-dis-saha',
    '/site-hakkinda',
    '/gizlilik-politikasi', // 🔒 YENİ: Zorunlu Gizlilik Politikası Sayfası
    '/iletisim', // ✉️ YENİ: Bağımsız Resmi İletişim Sayfası
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0], // YYYY-MM-DD formatı
    
    // ✅ GÜNLÜK VE HAFTALIK TARAMA AYRIMI
    changeFrequency: 
      route === '' || 
      route === '/blog' || 
      route === '/haftanin-analizi' || 
      route === '/form-durumu' || 
      route === '/puan-durumu' || 
      route === '/kralliklar' 
        ? 'daily' 
        : 'weekly', // /site-hakkinda, /gizlilik-politikasi ve /iletisim yasal sayfaları haftalık taramaya dahil edildi.
        
    // ✅ STRATEJİK ÖNCELİK DENGESİ: Ana sayfa 1.0; Blog ve Analizler 0.9; Yasal/Kurumsal Sayfalar 0.5; Diğerleri 0.8
    priority: 
      route === '' 
        ? 1.0 
        : route === '/blog' || route === '/haftanin-analizi' || route === '/oyuncular'
          ? 0.9 
          : route === '/site-hakkinda' || route === '/gizlilik-politikasi' || route === '/iletisim' // Yasal sayfalara kurumsal temiz öncelik verdik
            ? 0.5 
            : 0.8,
  }));

  // 2. DİNAMİK BLOG SAYFALARI (Haftada 3 gün güncellenecek yazılar)
  const dinamikYazilar = [];

  for (const grup of blogsData) {
    if (grup.yazilar) {
      for (const yazi of grup.yazilar) {
        if (yazi.slug) {
          dinamikYazilar.push({
            url: `${baseUrl}/blog/${yazi.slug}`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'daily', // ✅ Haftada 3 gün güncelleme için günlük tarama emir kipi
            priority: 0.8, // Arama sonuçlarında doğrudan makalelerin öne çıkması için ideal puan
          });
        }
      }
    }
  }

  // 3. İki listeyi birleştirip tek bir profesyonel site haritası olarak döndürüyoruz
  return [...statikSayfalar, ...dinamikYazilar];
}
