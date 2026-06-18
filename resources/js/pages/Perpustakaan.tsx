import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';
import { Library } from 'lucide-react';

export default function Perpustakaan() {
    return (
        <FrontLayout>
            <Head title="Perpustakaan Digital | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Perpustakaan Digital
                </h1>
                
                <div className="mt-8 text-center bg-gray-50 p-12 rounded-xl border border-gray-100 shadow-sm">
                    <Library className="mx-auto h-16 w-16 text-[#FACC15] mb-4" />
                    <h2 className="text-2xl font-bold text-[#0B1727] mb-2">Pusat Referensi Pertambangan</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Koleksi e-book, modul kuliah, dan referensi ilmu pertambangan akan dapat diakses secara digital melalui halaman ini.
                    </p>
                </div>
            </div>
        </FrontLayout>
    );
}
