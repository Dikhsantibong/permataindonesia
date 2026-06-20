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

export default function StrukturOrganisasi() {
    const [activeWilayah, setActiveWilayah] = useState<number | null>(null);

    const toggleWilayah = (id: number) => {
        setActiveWilayah(activeWilayah === id ? null : id);
    };

    return (
        <FrontLayout>
            <Head title="Struktur Organisasi | Permata Indonesia" />
            <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/bg-anggota.png')" }}>
                {/* Light overlay to ensure the chart is readable */}
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 overflow-x-auto relative z-10 min-h-screen">
                <div className="min-w-[1000px] flex flex-col items-center pb-20">
                    <h1 className="text-2xl font-bold text-primary mb-8 text-center uppercase tracking-wider">
                        Struktur Organisasi
                    </h1>

                    {/* Root */}
                    <div className="relative flex flex-col items-center w-full">
                        {/* Sekretaris Jenderal */}
                        <div className="bg-primary text-primary-foreground border-2 border-primary/20 rounded-lg px-6 py-4 font-bold text-center z-10 w-64 shadow-sm text-sm uppercase">
                            Sekretaris Jenderal
                        </div>

                        {/* Main Vertical Line Top */}
                        <div className="w-[3px] h-12 bg-gray-400 dark:bg-gray-500"></div>

                        {/* Level 2: Sekum & Bendum */}
                        <div className="relative w-full max-w-4xl flex justify-center">
                            {/* Horizontal Line */}
                            <div className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-gray-400 dark:bg-gray-500"></div>
                            {/* Center Vertical Line passing through */}
                            <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -ml-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                            
                            {/* Left Side: Sekretaris Eksekutif */}
                            <div className="w-1/2 flex flex-col items-center relative">
                                <div className="absolute top-0 left-1/2 w-[3px] h-6 -ml-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                <div className="mt-6 flex flex-col items-center gap-4 relative">
                                    <div className="bg-primary text-primary-foreground border-2 border-primary/20 rounded-lg px-4 py-3 font-bold text-center w-56 shadow-sm text-xs uppercase z-10 relative">
                                        Sekretaris Eksekutif 1
                                        {/* Connector to SE 2 */}
                                        <div className="absolute top-full left-1/2 w-[3px] h-4 -ml-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                    </div>
                                    <div className="bg-primary text-primary-foreground border-2 border-primary/20 rounded-lg px-4 py-3 font-bold text-center w-56 shadow-sm text-xs uppercase z-10">
                                        Sekretaris Eksekutif 2
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Bendahara */}
                            <div className="w-1/2 flex flex-col items-center relative">
                                <div className="absolute top-0 left-1/2 w-[3px] h-6 -ml-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                <div className="mt-6 flex flex-col items-center gap-4 relative">
                                    <div className="bg-primary text-primary-foreground border-2 border-primary/20 rounded-lg px-4 py-3 font-bold text-center w-56 shadow-sm text-xs uppercase z-10 relative">
                                        Bendahara 1
                                        {/* Connector to Ben 2 */}
                                        <div className="absolute top-full left-1/2 w-[3px] h-4 -ml-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                    </div>
                                    <div className="bg-primary text-primary-foreground border-2 border-primary/20 rounded-lg px-4 py-3 font-bold text-center w-56 shadow-sm text-xs uppercase z-10">
                                        Bendahara 2
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main vertical line segment continuing down */}
                        <div className="w-[3px] h-12 bg-gray-400 dark:bg-gray-500 relative z-0"></div>

                        {/* Level 3: Departments */}
                        <div className="relative w-full flex justify-between px-4">
                            {/* Horizontal Line connecting Departments */}
                            {/* It starts from the middle of the first department to the middle of the last department */}
                            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-[3px] bg-gray-400 dark:bg-gray-500 z-0"></div>
                            {/* Center vertical line continuing down past departments to wilayah */}
                            <div className="absolute top-0 bottom-[-48px] left-1/2 w-[3px] -ml-[1.5px] bg-gray-400 dark:bg-gray-500 z-0"></div>

                            {/* Departemen 1: Hubungan Masyarakat */}
                            <div className="w-1/4 flex flex-col items-center relative z-10">
                                <div className="w-[3px] h-6 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="bg-secondary text-secondary-foreground border-2 border-secondary/50 rounded-lg px-2 py-3 font-bold text-center w-[90%] shadow-sm text-[11px] leading-tight uppercase flex items-center justify-center min-h-[60px]">
                                    Departemen Hubungan Masyarakat
                                </div>
                                {/* Divisi list */}
                                <div className="relative mt-4 self-start ml-6">
                                    {/* Vertical line connecting divisions */}
                                    <div className="absolute top-[-16px] bottom-6 left-0 w-[3px] bg-gray-400 dark:bg-gray-500"></div>
                                    <div className="flex flex-col gap-3 pl-4">
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Internal
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Eksternal
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Media dan Informasi
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Departemen 2: Penelitian dan Pengembangan */}
                            <div className="w-1/4 flex flex-col items-center relative z-10">
                                <div className="w-[3px] h-6 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="bg-secondary text-secondary-foreground border-2 border-secondary/50 rounded-lg px-2 py-3 font-bold text-center w-[90%] shadow-sm text-[11px] leading-tight uppercase flex items-center justify-center min-h-[60px]">
                                    Departemen Penelitian dan Pengembangan
                                </div>
                                {/* Divisi list */}
                                <div className="relative mt-4 self-start ml-6">
                                    <div className="absolute top-[-16px] bottom-6 left-0 w-[3px] bg-gray-400 dark:bg-gray-500"></div>
                                    <div className="flex flex-col gap-3 pl-4">
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Kajian
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Pelatihan dan Pengembangan
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[9px] shadow-sm uppercase leading-tight">
                                                Divisi Temu Ilmiah Mahasiswa Tambang Indonesia
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Advokasi
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Departemen 3: Sosial dan Lingkungan */}
                            <div className="w-1/4 flex flex-col items-center relative z-10">
                                <div className="w-[3px] h-6 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="bg-secondary text-secondary-foreground border-2 border-secondary/50 rounded-lg px-2 py-3 font-bold text-center w-[90%] shadow-sm text-[11px] leading-tight uppercase flex items-center justify-center min-h-[60px]">
                                    Departemen Sosial dan Lingkungan
                                </div>
                                {/* Divisi list */}
                                <div className="relative mt-4 self-start ml-6">
                                    <div className="absolute top-[-16px] bottom-6 left-0 w-[3px] bg-gray-400 dark:bg-gray-500"></div>
                                    <div className="flex flex-col gap-3 pl-4">
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Sosial
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 -left-4 w-4 h-[3px] -mt-[1.5px] bg-gray-400 dark:bg-gray-500"></div>
                                            <div className="bg-accent text-accent-foreground border-2 border-border rounded-lg px-2 py-2 font-bold text-center w-40 text-[10px] shadow-sm uppercase">
                                                Divisi Lingkungan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Departemen 4: Kewirausahaan */}
                            <div className="w-1/4 flex flex-col items-center relative z-10">
                                <div className="w-[3px] h-6 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="bg-secondary text-secondary-foreground border-2 border-secondary/50 rounded-lg px-2 py-3 font-bold text-center w-[90%] shadow-sm text-[11px] leading-tight uppercase flex items-center justify-center min-h-[60px]">
                                    Departemen Kewirausahaan
                                </div>
                            </div>
                        </div>

                        {/* Spacer for the line to continue down to Wilayah */}
                        <div className="h-12 w-full"></div>

                        {/* Level 4: Wilayah */}
                        <div className="relative w-full max-w-5xl flex justify-between mt-0 z-10 items-start pb-8">
                            {/* Horizontal Line connecting Wilayah */}
                            <div className="absolute top-0 left-[10%] right-[10%] h-[3px] bg-gray-400 dark:bg-gray-500"></div>
                            
                            {/* Wilayah 1-5 */}
                            {[1, 2, 3, 4, 5].map((wilayahId) => (
                                <div key={wilayahId} className="flex flex-col items-center w-[19%] relative">
                                    <div className="w-[3px] h-6 bg-gray-400 dark:bg-gray-500"></div>
                                    <button 
                                        onClick={() => toggleWilayah(wilayahId)}
                                        className={`border-2 rounded-lg px-2 py-3 font-bold text-center w-full shadow-sm text-[11px] uppercase z-10 transition-all duration-200 cursor-pointer ${
                                            activeWilayah === wilayahId 
                                                ? 'bg-primary text-primary-foreground border-primary scale-105' 
                                                : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                        }`}
                                    >
                                        Wilayah {wilayahId}
                                        <div className="text-[9px] font-normal mt-1 opacity-70 normal-case tracking-wide">
                                            {activeWilayah === wilayahId ? 'Tutup Daftar' : 'Lihat Himpunan'}
                                        </div>
                                    </button>

                                    {/* Dropdown List */}
                                    <div 
                                        className={`w-full flex flex-col items-center transition-all duration-300 origin-top overflow-hidden ${
                                            activeWilayah === wilayahId ? 'max-h-[800px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
                                        }`}
                                    >
                                        <div className="w-[3px] h-4 bg-gray-400 dark:bg-gray-500"></div>
                                        <div className="bg-card text-card-foreground border-2 border-border/50 rounded-lg p-3 w-full shadow-sm text-[9px] font-semibold text-center flex flex-col gap-2 leading-tight">
                                            {wilayahData[wilayahId as keyof typeof wilayahData].map((himpunan, index) => (
                                                <span key={index} className="pb-1.5 border-b border-border/30 last:border-0 last:pb-0">
                                                    {himpunan}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </FrontLayout>
    );
}
