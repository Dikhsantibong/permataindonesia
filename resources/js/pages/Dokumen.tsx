import FrontLayout from '@/layouts/FrontLayout';
import { Head } from '@inertiajs/react';

export default function Dokumen() {
    return (
        <FrontLayout>
            <Head title="Dokumen | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">Dokumen Organisasi</h1>
                
                <div className="mt-8">
                    <p className="text-gray-600 mb-8 max-w-2xl">
                        Kumpulan dokumen resmi, panduan, dan produk hukum yang menjadi pedoman dalam pelaksanaan roda organisasi PERMATA Indonesia.
                    </p>

                    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#0B1727]">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Nama Dokumen
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell">
                                        Deskripsi
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                                        Unduh
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        Belum ada dokumen yang tersedia
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
