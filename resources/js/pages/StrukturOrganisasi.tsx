import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function StrukturOrganisasi() {
    return (
        <FrontLayout>
            <Head title="Struktur Organisasi | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Struktur Organisasi
                </h1>
                
                <div className="mt-8 text-center bg-gray-50 p-12 rounded-xl border border-gray-100 shadow-sm">
                    <Users className="mx-auto h-16 w-16 text-[#FACC15] mb-4" />
                    <h2 className="text-2xl font-bold text-[#0B1727] mb-2">Bagan Kepengurusan</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Halaman ini sedang dalam tahap penyusunan. Bagan struktur organisasi dan daftar pengurus PERMATA Indonesia periode 2026 akan segera ditampilkan di sini.
                    </p>
                </div>
            </div>
        </FrontLayout>
    );
}
