import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const wilayahData = {
    1: ["PERMATA FT UNSRI", "HIMATA ISTP", "HMTP FT UNP", "HIMATA UBB", "HIMATA STTIND", "HMTT UMB", "HMTP USK", "HMTP UNJA", "HMTA ITERA", "HMPS MATARATU PAP"],
    2: ["HMT-ITB", "HMTP UNISBA", "HMTA UPN", "HMTT USAKTI", "HMTPM AGP (D3)", "HIMATETA ITATS", "HMTA ITNY", "HMTP UNDANA", "HIMETA ITSB", "HITAM UIN", "HMTP ITY", "HMT-UMTAS", "HMTA UMMAT", "HMT UMMAT (D3)", "HMT UNDOVA", "HMTP PEP (D3)", "HIMATA UNEJ", "HMTT STTMI (D3)", "PERMATA UTS"],
    3: ["HMTP UNMUL", "HMTP UNIKARTA", "HIMASAPTA ULM", "HMTP UPR", "INTAN POLIBAN", "HIMATA FT UNTAN", "HMJTSP POLITAP", "HMTP POLISAFARIS"],
    4: ["HMTP UPRI Makassar", "HMTP UMI", "HMTP USN Kolaka", "PERMATA FT-UH", "HMTP UHO", "HMTP UNIDAYAN", "HMTP UM Kendari", "HMTP UNIBOS", "PERMATA UST"],
    5: ["HMTP USTJ", "HMTP UNCEN", "HMTP UMMU", "HMTP UNIPA", "HMTP UNKHAIR", "HMTP PAT"]
};

const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

export default function Anggota() {
    const [activeWilayah, setActiveWilayah] = useState<number>(4);

    return (
        <FrontLayout>
            <Head title="Anggota | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Himpunan Anggota</h1>
                
                <div className="mt-8">
                    <p className="text-gray-600 mb-8 max-w-2xl">
                        PERMATA Indonesia menaungi himpunan mahasiswa pertambangan yang tersebar di 5 wilayah koordinasi di seluruh Indonesia.
                    </p>

                    {/* Map and List */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative md:col-span-2 bg-gray-100 rounded-xl flex items-center justify-center p-8 min-h-[400px]">
                            <img
                                src={`/peta/Wilayah_${activeWilayah}_NoBG.png`}
                                alt={`Peta Wilayah ${romanNumerals[activeWilayah - 1]}`}
                                className="max-w-full max-h-[500px] object-contain"
                            />
                            {/* Floating logo himpunan di atas peta (sisi bawah) */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-2 bg-white/40 backdrop-blur-sm p-3 rounded-xl mx-8">
                                {wilayahData[activeWilayah as keyof typeof wilayahData].map((himpunan, i) => (
                                    <div key={i} className="bg-white p-1 rounded shadow-sm hover:-translate-y-1 transition-transform cursor-help" title={himpunan}>
                                        <img 
                                            src={`/logo-himpunan/wilayah${activeWilayah}/${himpunan}.png`} 
                                            alt={himpunan} 
                                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded" 
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (!target.src.includes('ui-avatars')) {
                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(himpunan)}&background=FACC15&color=0B1727&bold=true&size=64`;
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex flex-col h-[400px]">
                            <h3 className="text-xl font-bold text-[#0B1727] mb-4 shrink-0">Anggota di Wilayah {romanNumerals[activeWilayah - 1]}</h3>
                            <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                                <ul className="space-y-3 pb-2">
                                    {wilayahData[activeWilayah as keyof typeof wilayahData].map((himpunan, i) => (
                                        <li key={i} className="bg-white border border-gray-200 p-3 rounded shadow-sm text-sm font-medium text-gray-700 hover:border-[#FACC15] cursor-pointer transition-colors">
                                            {himpunan}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Regions Tabs */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        {[1, 2, 3, 4, 5].map((wilayah) => (
                            <button
                                key={wilayah}
                                onClick={() => setActiveWilayah(wilayah)}
                                className={`px-6 py-3 rounded font-bold text-sm border-2 transition-all duration-200 ${
                                    activeWilayah === wilayah
                                        ? 'bg-[#FACC15] border-[#FACC15] text-[#0B1727] shadow-md scale-105'
                                        : 'bg-transparent border-gray-300 text-gray-600 hover:border-[#0B1727] hover:text-[#0B1727]'
                                }`}
                            >
                                WILAYAH {romanNumerals[wilayah - 1]}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </FrontLayout>
    );
}
