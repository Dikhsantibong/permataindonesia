import { Link } from '@inertiajs/react';
import { Menu, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

// Helper component for Desktop Dropdowns
function NavItem({ title, href, subItems }: { title: string, href: string, subItems?: {label: string, href: string}[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link href={href} className="flex items-center hover:text-[#FACC15] transition-colors focus:text-[#FACC15] py-4 cursor-pointer">
                {title} {subItems && <span className="ml-1 text-[10px]">▼</span>}
            </Link>
            
            {subItems && (
                <div 
                    className={`absolute left-0 top-full transition-all duration-300 w-64 pt-2 z-50 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                >
                    <div className="rounded-b-md bg-white text-[#0B1727] shadow-xl ring-1 ring-black ring-opacity-5 border-t-2 border-[#FACC15] flex flex-col">
                        {subItems.map((item, idx) => (
                            <Link 
                                key={idx} 
                                href={item.href} 
                                className="block px-4 py-3 text-sm font-semibold hover:bg-gray-100 hover:text-[#0B1727] border-b border-gray-100 last:border-0"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function FrontLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col" id="front-layout-container">
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-[#0B1727] text-white shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo/permata.png" alt="Permata Indonesia" className="h-10 w-10 object-contain" />
                        <div>
                            <h1 className="text-lg font-bold leading-tight tracking-wider">
                                PERMATA INDONESIA
                            </h1>
                            <p className="text-[10px] leading-none text-gray-300">
                                Perhimpunan Mahasiswa Pertambangan Indonesia
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-6 text-sm font-medium md:flex h-full">
                        <NavItem title="BERANDA" href="/" />
                        
                        <NavItem 
                            title="TENTANG KAMI" 
                            href="/tentang-kami" 
                            subItems={[
                                { label: 'Profil Organisasi', href: '/tentang-kami' },
                                { label: 'Struktur Organisasi', href: '/struktur-organisasi' }
                            ]} 
                        />
                        
                        <NavItem 
                            title="ANGGOTA" 
                            href="/anggota" 
                            subItems={[
                                { label: 'Peta & Sebaran Wilayah', href: '/anggota' },
                                { label: 'Pendaftaran Himpunan Baru', href: '/pendaftaran-himpunan' }
                            ]} 
                        />
                        
                        <NavItem 
                            title="KEGIATAN" 
                            href="/kegiatan" 
                            subItems={[
                                { label: 'Event Nasional', href: '/kegiatan' },
                                { label: 'Seminar & Pelatihan', href: '/seminar-pelatihan' }
                            ]} 
                        />
                        
                        <NavItem 
                            title="MEDIA" 
                            href="/media" 
                            subItems={[
                                { label: 'Berita & Artikel', href: '/media' },
                                { label: 'Galeri Kegiatan', href: '/galeri' }
                            ]} 
                        />
                        
                        <NavItem 
                            title="DOKUMEN" 
                            href="/dokumen" 
                            subItems={[
                                { label: 'Dokumen Organisasi & Hukum', href: '/dokumen' },
                                { label: 'Jurnal & Karya Ilmiah', href: '/jurnal' },
                                { label: 'Perpustakaan Digital', href: '/perpustakaan' }
                            ]} 
                        />

                        <NavItem title="KONTAK" href="/kontak" />
                    </div>

                    <div className="hidden md:block">
                        <button className="rounded bg-[#FACC15] px-4 py-2 text-sm font-bold text-[#0B1727] transition-colors hover:bg-yellow-500">
                            JOIN ANGGOTA
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="bg-[#0B1727] px-4 pb-4 md:hidden border-t border-gray-800 pt-4">
                        <div className="flex flex-col space-y-4 text-sm">
                            <Link href="/" className="font-bold hover:text-[#FACC15]">BERANDA</Link>
                            
                            <div className="flex flex-col space-y-2">
                                <Link href="/tentang-kami" className="font-bold hover:text-[#FACC15]">TENTANG KAMI</Link>
                                <div className="pl-4 flex flex-col space-y-2 text-gray-300">
                                    <Link href="/tentang-kami" className="hover:text-white">Profil Organisasi</Link>
                                    <Link href="/struktur-organisasi" className="hover:text-white">Struktur Organisasi</Link>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Link href="/anggota" className="font-bold hover:text-[#FACC15]">ANGGOTA</Link>
                                <div className="pl-4 flex flex-col space-y-2 text-gray-300">
                                    <Link href="/anggota" className="hover:text-white">Peta & Sebaran Wilayah</Link>
                                    <Link href="/pendaftaran-himpunan" className="hover:text-white">Pendaftaran Himpunan Baru</Link>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Link href="/kegiatan" className="font-bold hover:text-[#FACC15]">KEGIATAN</Link>
                                <div className="pl-4 flex flex-col space-y-2 text-gray-300">
                                    <Link href="/kegiatan" className="hover:text-white">Event Nasional</Link>
                                    <Link href="/seminar-pelatihan" className="hover:text-white">Seminar & Pelatihan</Link>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Link href="/media" className="font-bold hover:text-[#FACC15]">MEDIA</Link>
                                <div className="pl-4 flex flex-col space-y-2 text-gray-300">
                                    <Link href="/media" className="hover:text-white">Berita & Artikel</Link>
                                    <Link href="/galeri" className="hover:text-white">Galeri Kegiatan</Link>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Link href="/dokumen" className="font-bold hover:text-[#FACC15]">DOKUMEN</Link>
                                <div className="pl-4 flex flex-col space-y-2 text-gray-300">
                                    <Link href="/dokumen" className="hover:text-white">Dokumen Organisasi & Hukum</Link>
                                    <Link href="/jurnal" className="hover:text-white">Jurnal & Karya Ilmiah</Link>
                                    <Link href="/perpustakaan" className="hover:text-white">Perpustakaan Digital</Link>
                                </div>
                            </div>

                            <Link href="/kontak" className="font-bold hover:text-[#FACC15]">KONTAK</Link>
                            
                            <button className="w-full rounded bg-[#FACC15] px-4 py-3 text-sm font-bold text-[#0B1727] mt-4">
                                JOIN ANGGOTA
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1 mt-16">
                {children}
            </main>

            {/* Professional Footer */}
            <footer className="bg-[#0B1727] text-white mt-auto">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* About Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="/logo/permata.png" alt="Permata Indonesia" className="h-10 w-10 object-contain" />
                                <div>
                                    <h3 className="text-lg font-bold leading-tight tracking-wider">
                                        PERMATA INDONESIA
                                    </h3>
                                    <p className="text-[10px] leading-none text-gray-300">
                                        Perhimpunan Mahasiswa Pertambangan Indonesia
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Wadah Kolaborasi Mahasiswa Pertambangan Indonesia. Bersatu, berkolaborasi, dan berkontribusi untuk kemajuan pertambangan Indonesia yang berkelanjutan.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <a href="#" className="text-gray-400 hover:text-[#FACC15] transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="https://instagram.com/permataindonesiaofficial" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FACC15] transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-[#FACC15] transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-base font-bold text-[#FACC15]">Tautan Cepat</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <Link href="/tentang-kami" className="hover:text-white transition-colors">
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kegiatan" className="hover:text-white transition-colors">
                                        Kegiatan
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/media" className="hover:text-white transition-colors">
                                        Berita & Artikel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/galeri" className="hover:text-white transition-colors">
                                        Galeri
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dokumen" className="hover:text-white transition-colors">
                                        Dokumen
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="space-y-4">
                            <h4 className="text-base font-bold text-[#FACC15]">Sumber Daya</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <Link href="/jurnal" className="hover:text-white transition-colors">
                                        Jurnal & Karya Ilmiah
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/perpustakaan" className="hover:text-white transition-colors">
                                        Perpustakaan Digital
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pendaftaran-himpunan" className="hover:text-white transition-colors">
                                        Pendaftaran Himpunan
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kontak" className="hover:text-white transition-colors">
                                        Hubungi Kami
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h4 className="text-base font-bold text-[#FACC15]">Hubungi Kami</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#FACC15]" />
                                    <span>Indonesia</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#FACC15]" />
                                    <a href="mailto:permataindonesia030992@gmail.com" className="hover:text-white transition-colors">
                                        permataindonesia030992@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#FACC15]" />
                                    <div className="flex flex-col gap-1">
                                        <span>085204665-0376 (Sekretaris Jenderal)</span>
                                        <span>0822-9360-9354 (Sekretaris Eksekutif)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                            <p>&copy; 2026 Permata Indonesia. All rights reserved.</p>
                            <div className="flex gap-6">
                                <Link href="#" className="hover:text-white transition-colors">
                                    Kebijakan Privasi
                                </Link>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Syarat & Ketentuan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
