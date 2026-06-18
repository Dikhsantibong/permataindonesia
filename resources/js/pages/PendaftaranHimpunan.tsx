import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { FileSignature } from 'lucide-react';

export default function PendaftaranHimpunan() {
    return (
        <FrontLayout>
            <Head title="Pendaftaran Himpunan | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Pendaftaran Himpunan Baru
                </h1>
                
                <div className="mt-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/3 text-center">
                            <FileSignature className="mx-auto h-32 w-32 text-[#FACC15]" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold text-[#0B1727] mb-4">Mari Bergabung Bersama Kami!</h2>
                            <p className="text-gray-600 mb-6">
                                PERMATA Indonesia senantiasa menyambut himpunan mahasiswa pertambangan dari seluruh universitas di Indonesia untuk bergabung dan berkontribusi bersama.
                            </p>
                            <h3 className="font-bold text-[#0B1727] mb-2">Persyaratan Pendaftaran:</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                                <li>Surat Keputusan (SK) Kepengurusan Himpunan yang sah.</li>
                                <li>Surat Rekomendasi dari Ketua Program Studi.</li>
                                <li>Profil lengkap Himpunan Mahasiswa.</li>
                                <li>Mengisi formulir pendaftaran anggota PERMATA Indonesia.</li>
                            </ul>
                            <button className="bg-[#FACC15] text-[#0B1727] font-bold px-6 py-3 rounded hover:bg-yellow-500 transition-colors">
                                Minta Formulir Pendaftaran
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
