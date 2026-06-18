import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';

export default function TentangKami() {
    return (
        <FrontLayout>
            <Head title="Tentang Kami | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Tentang Kami</h1>
                
                <div className="grid md:grid-cols-2 gap-12 mt-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">SEJARAH PERMATA INDONESIA</h2>
                        <p className="text-gray-600 mb-4">
                            PERMATA Indonesia (Persatuan Mahasiswa Pertambangan Indonesia) merupakan wadah bagi mahasiswa pertambangan dari seluruh perguruan tinggi di Indonesia yang bertujuan mempererat persatuan, meningkatkan kompetensi, serta berkontribusi terhadap kemajuan pertambangan nasional.
                        </p>
                        <button className="bg-[#FACC15] text-[#0B1727] px-4 py-2 rounded font-bold text-sm">SEJARAH LENGKAP</button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-16 font-bold text-[#FACC15]">1987</div>
                            <div className="flex-1 pb-4 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">Gagasan awal pembentukan PERMATA Indonesia</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 font-bold text-[#FACC15]">1990</div>
                            <div className="flex-1 pb-4 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">MUNAS I dan pembentukan organisasi secara nasional</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 font-bold text-[#FACC15]">1998</div>
                            <div className="flex-1 pb-4 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">Perubahan AD/ART pertama</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 font-bold text-[#FACC15]">2010</div>
                            <div className="flex-1 pb-4 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">Penguatan sistem wilayah</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16 bg-gray-50 p-8 rounded-xl">
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-[#0B1727] mb-4">VISI</h3>
                        <p className="text-sm text-gray-600">Menjadi organisasi mahasiswa pertambangan terdepan dalam kolaborasi dan kontribusi untuk pertambangan Indonesia yang berkelanjutan.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-[#0B1727] mb-4">MISI</h3>
                        <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-2">
                            <li>Memperkuat solidaritas nasional</li>
                            <li>Meningkatkan kualitas akademik dan profesionalisme</li>
                            <li>Mendorong inovasi dan riset pertambangan</li>
                            <li>Menjalin kemitraan strategis dengan industri dan pemerintah</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-[#0B1727] mb-4">NILAI ORGANISASI</h3>
                        <ul className="text-sm text-gray-600 text-left space-y-3">
                            <li className="flex items-center gap-2"><span className="text-[#FACC15]">★</span> Integritas</li>
                            <li className="flex items-center gap-2"><span className="text-[#FACC15]">★</span> Profesionalisme</li>
                            <li className="flex items-center gap-2"><span className="text-[#FACC15]">★</span> Kolaborasi</li>
                            <li className="flex items-center gap-2"><span className="text-[#FACC15]">★</span> Inovasi</li>
                        </ul>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
