import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { MapPin, Mail, Phone, Globe, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

export default function Kontak() {
    return (
        <FrontLayout>
            <Head title="Kontak | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Kontak Kami</h1>
                
                <div className="mt-8 grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-xl font-bold text-[#0B1727] mb-6">Sekretariat Nasional PERMATA INDONESIA</h2>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1"><MapPin className="text-[#FACC15] w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Alamat Kesekretariatan</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Jl. Prof. Sudarto, SH.<br />
                                        Tembalang, Semarang 50275<br />
                                        Jawa Tengah, Indonesia
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="mt-1"><Mail className="text-[#FACC15] w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-sm text-gray-600 mt-1">sekretariat@permata-indonesia.org</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="mt-1"><Phone className="text-[#FACC15] w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Telepon / WhatsApp</h3>
                                    <p className="text-sm text-gray-600 mt-1">+62 812-3456-7890</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1"><Globe className="text-[#FACC15] w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
                                    <p className="text-sm text-gray-600 mt-1">Senin - Jumat (08:00 - 17:00 WIB)</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-[#0B1727] mb-4 mt-12">Media Sosial</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0B1727]">
                                <Instagram className="w-5 h-5 text-pink-600" />
                                <span className="text-sm font-medium">@permata.indonesia</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0B1727]">
                                <Youtube className="w-5 h-5 text-red-600" />
                                <span className="text-sm font-medium">PERMATA Indonesia</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0B1727]">
                                <Twitter className="w-5 h-5 text-blue-400" />
                                <span className="text-sm font-medium">@Permata_Indo</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#0B1727]">
                                <Facebook className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium">PERMATA Indonesia</span>
                            </a>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px] shadow-inner">
                        {/* Map or Building Image Placeholder */}
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Office Building" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
