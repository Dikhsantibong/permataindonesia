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
                                {[
                                    { kat: 'AD/ART', nama: 'AD/ART PERMATA Indonesia', desc: 'Anggaran Dasar dan Anggaran Rumah Tangga' },
                                    { kat: 'GBHO', nama: 'GBHO PERMATA Indonesia', desc: 'Garis Besar Haluan Organisasi PERMATA Indonesia' },
                                    { kat: 'SOP', nama: 'SOP Organisasi', desc: 'Standar Operasional Prosedur PERMATA Indonesia' },
                                    { kat: 'Tata Tertib', nama: 'Tata Tertib Organisasi', desc: 'Tata Tertib dalam Pelaksanaan Kegiatan Organisasi' }
                                ].map((doc, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {doc.kat}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-900">{doc.nama}</div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">
                                            {doc.desc}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <a href="#" className="text-[#0B1727] hover:text-[#FACC15] inline-flex items-center">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
