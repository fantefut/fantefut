'use client';
import Link from 'next/link';
import { Navbar, Header, Footer, ICERIK_FONTU } from '../utils';

export default function IletisimSayfasi() {
  return (
    <div className="p-3 bg-white min-h-screen text-slate-800 antialiased" style={{ fontFamily: ICERIK_FONTU }}>
      <Header altBaslik="Resmi İletişim ve Destek" />

      <div className="w-full mx-auto max-w-[650px] lg:max-w-[1024px]" style={{ fontFamily: ICERIK_FONTU }}>
        <Navbar aktifSayfa="iletisim" />

        <div className="w-full flex flex-col gap-4">
          
          {/* SİTENİN GÖRSEL STANDARTLARINA GÖRE HİZALANMIŞ ÜST ALAN BOŞLUĞU */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '16px' }}>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-[#132444] transition-colors group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Anasayfaya Dön
            </Link>
          </div>

          {/* ✉️ RESMİ İLETİŞİM ALANI */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-2xs">
            <h2 className="text-xl text-[#132444] font-bold mb-3">✉️ Bize Ulaşın</h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed mb-4">
              FanteFut bilgi platformu hakkındaki tüm geri bildirimleriniz, içerik düzeltme talepleriniz, veri ortaklığı önerileriniz veya kurumsal reklam iş birlikleriniz için bizimle doğrudan resmi e-posta adresimiz üzerinden irtibata geçebilirsiniz. Ekibimiz tüm mesajları titizlikle incelemektedir.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-100 flex flex-col gap-2">
              <p className="m-0 text-slate-700 text-[14.5px]">
                <strong className="text-slate-900 font-bold">Kurumsal E-posta:</strong> info.fantefut@gmail.com
              </p>
              <p className="m-0 text-slate-500 text-[13px] italic">
                * Güvenliğiniz için lütfen mesajlarınızda hesap şifresi gibi kişisel verilerinizi paylaşmayınız.
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
