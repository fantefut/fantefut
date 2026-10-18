'use client';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU } from '../utils';

export default function GizlilikPolitikasiSayfasi() {
  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="Yasal Bilgilendirmeler ve Sözleşmeler" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="gizlilik" />

        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="px-1">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-[#132444] transition-colors group">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Anasayfaya Dön
            </Link>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-2xs text-slate-600 text-[14px] leading-relaxed flex flex-col gap-4">
            <h2 className="text-xl text-[#132444] font-bold border-b border-slate-200 pb-2 mb-1">🔒 Gizlilik Politikası & Çerez Politikası</h2>
            
            <p>
              <strong className="text-slate-800">FanteFut</strong> olarak ziyaretçilerimizin çevrimiçi gizliliğine ve kişisel veri haklarına en üst düzeyde önem veriyoruz. Bu gizlilik politikası metni, platformumuzu ziyaret ettiğinizde toplanan veri türlerini, çerezlerin kullanım amaçlarını ve üçüncü taraf reklam ağlarının veri toplama süreçlerini yasal şeffaflık kuralları çerçevesinde açıklamaktadır.
            </p>

            <h3 className="text-base text-[#132444] font-bold mt-2">1. Log Dosyaları ve Sistem Taramaları</h3>
            <p>
              Birçok standart web sunucusunda olduğu gibi FanteFut da istatistiksel amaçlı log dosyaları tutmaktadır. Bu dosyalar; standart IP adresiniz, internet servis sağlayıcınız (ISP), tarayıcınızın özellikleri, işletim sisteminiz ve siteye giriş-çıkış sayfalarınız gibi temel sistem bilgilerini içerir. Bu veriler kesinlikle kişisel kimlik bilgilerinizle ilişkilendirilmez ve yalnızca kullanıcı deneyimini iyileştirmek amacıyla analiz edilir.
            </p>

            <h3 className="text-base text-[#132444] font-bold mt-2">2. Çerezler (Cookies) ve Üçüncü Taraf Reklam Ağları</h3>
            <p>
              Platformumuz, sayfa geçişlerini hızlandırmak, kullanıcı tercihlerini kaydetmek ve kullanıcıların ilgi alanlarına uygun reklamlar sunabilmek adına çerezler (cookies) kullanmaktadır. Sitemizde yayınlanan reklamlar ve veri toplama süreçleri hakkında daha detaylı bilgi edinmek için dilerseniz resmi <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors">Google Gizlilik ve Şartlar</a> sayfasını inceleyebilirsiniz.
            </p>

            <h3 className="text-base text-[#132444] font-bold mt-2">3. Google AdSense ve DART Çerezleri</h3>
            <p>
              Google, sitemizde reklam yayınlamak için üçüncü taraf bir satıcı olarak çerezlerden (DART çerezleri dahil) yararlanır. Google'ın bu teknolojileri kullanması, kullanıcılarımızın FanteFut platformuna ve internet üzerindeki diğer web sitelerine gerçekleştirdikleri ziyaretleri analiz ederek onlara ilgi alanlarına göre özelleştirilmiş reklamlar sunmasını sağlar. Ziyaretçilerimiz, kişiselleştirilmiş reklam tercihlerini yönetmek veya bu çerezlerin kullanımını diledikleri zaman devre dışı bırakmak için resmi <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors">Google Reklam Ayarları</a> sayfasını ziyaret edebilirler.
            </p>

            <h3 className="text-base text-[#132444] font-bold mt-2">4. Onay ve Kabul</h3>
            <p>
              FanteFut fantezi futbol bilgi platformunu ziyaret ederek ve kullanmaya devam ederek bu gizlilik ve çerez politikası şartlarını resmi olarak kabul etmiş sayılırsınız. Politikalar hakkında her türlü yasal ek bilgilendirme talebi için bizimle kurumsal iletişim adresimiz üzerinden her zaman irtibata geçebilirsiniz.
            </p>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
