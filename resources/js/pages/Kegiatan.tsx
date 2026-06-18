import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';

export default function Kegiatan() {
    return (
        <FrontLayout>
            <Head title="Kegiatan | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Event Nasional</h1>
                
                <div className="mt-8">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        <button className="px-6 py-3 font-bold text-sm text-[#0B1727] border-b-2 border-[#0B1727]">TIMTI</button>
                        <button className="px-6 py-3 font-semibold text-sm text-gray-500 hover:text-[#0B1727]">MUNAS</button>
                        <button className="px-6 py-3 font-semibold text-sm text-gray-500 hover:text-[#0B1727]">Seminar Nasional</button>
                        <button className="px-6 py-3 font-semibold text-sm text-gray-500 hover:text-[#0B1727]">Pelatihan</button>
                    </div>

                    {/* Featured Event */}
                    <div className="bg-[#0B1727] text-white rounded-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="p-8 md:w-1/2 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-4">TIMTI (Temu Ilmiah Mahasiswa Tambang Indonesia)</h2>
                            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                                Forum ilmiah nasional tahunan sebagai wadah bagi mahasiswa pertambangan untuk mempresentasikan karya ilmiah, berdiskusi mengenai isu terkini industri pertambangan, dan berinovasi.
                            </p>
                            <div>
                                <button className="bg-[#FACC15] text-[#0B1727] px-6 py-2 rounded font-bold text-sm hover:bg-yellow-500 transition-colors">
                                    SELENGKAPNYA
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img 
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="TIMTI Event" 
                                className="w-full h-full object-cover min-h-[300px]"
                            />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-[#0B1727] mb-8">Sejarah TIMTI</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <div className="text-xl font-bold text-[#FACC15] mb-2">2025</div>
                                <div className="text-sm font-semibold text-gray-800">Padang</div>
                            </div>
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <div className="text-xl font-bold text-[#FACC15] mb-2">2024</div>
                                <div className="text-sm font-semibold text-gray-800">Balikpapan</div>
                            </div>
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <div className="text-xl font-bold text-[#FACC15] mb-2">2023</div>
                                <div className="text-sm font-semibold text-gray-800">Yogyakarta</div>
                            </div>
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <div className="text-xl font-bold text-[#FACC15] mb-2">2022</div>
                                <div className="text-sm font-semibold text-gray-800">Bangka Belitung</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
