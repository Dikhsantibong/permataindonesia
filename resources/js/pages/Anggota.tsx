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

                    {/* Placeholder for Map and List */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-gray-100 rounded-xl flex items-center justify-center p-12 min-h-[400px]">
                            {/* Map Placeholder */}
                            <div className="text-center text-gray-400">
                                <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                <p className="font-semibold text-lg">Peta Sebaran Wilayah</p>
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
