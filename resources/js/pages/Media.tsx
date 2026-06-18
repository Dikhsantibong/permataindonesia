import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';

export default function Media() {
    return (
        <FrontLayout>
            <Head title="Media | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Berita & Artikel</h1>
                
                <div className="mt-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        <button className="px-4 py-2 rounded-full font-bold text-sm bg-[#0B1727] text-white">Semua</button>
                        <button className="px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 text-gray-600 hover:border-[#0B1727]">Organisasi</button>
                        <button className="px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 text-gray-600 hover:border-[#0B1727]">Pertambangan</button>
                        <button className="px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 text-gray-600 hover:border-[#0B1727]">Pendidikan</button>
                        <button className="px-4 py-2 rounded-full font-semibold text-sm border border-gray-300 text-gray-600 hover:border-[#0B1727]">Opini</button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Featured News (spans 2 columns) */}
                        <div className="lg:col-span-2 group cursor-pointer">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                                <img
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Munas"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#FACC15] mb-2">
                                        <span>ORGANISASI</span>
                                        <span className="h-1 w-1 rounded-full bg-white"></span>
                                        <span className="text-gray-300">12 Mei 2026</span>
                                    </div>
                                    <h2 className="text-2xl font-bold leading-tight">
                                        Munas Permata Indonesia 2026 Siap Digelar di Makassar
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Smaller News Items */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className="w-1/3 aspect-square overflow-hidden rounded-lg bg-gray-200 shrink-0">
                                        <img
                                            src={`https://images.unsplash.com/photo-${1500000000000 + i * 100}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                                            alt="Thumbnail"
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-sm font-bold leading-snug text-[#0B1727] group-hover:text-blue-700 line-clamp-2">
                                            Seminar Nasional: 50 Tahun Regulasi Pertambangan Indonesia
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#FACC15] mt-2">
                                            <span>PERTAMBANGAN</span>
                                            <span className="text-gray-500">10 Mei 2026</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button className="bg-[#0B1727] text-white px-6 py-2 rounded font-bold text-sm">LIHAT SEMUA BERITA</button>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
