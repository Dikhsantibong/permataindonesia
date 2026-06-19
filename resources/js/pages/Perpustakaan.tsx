import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Download, FileText } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    description: string | null;
    file_path: string | null;
    file_name: string | null;
    file_size: number | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    documents: {
        data: Document[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Perpustakaan({ documents }: Props) {
    function formatFileSize(bytes: number | null): string {
        if (!bytes) return '-';
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    return (
        <FrontLayout>
            <Head title="Perpustakaan Digital | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Perpustakaan Digital
                </h1>

                <div className="mt-8">
                    <p className="text-gray-600 mb-8 max-w-2xl">
                        Koleksi e-book, modul kuliah, dan referensi ilmu pertambangan untuk mendukung pembelajaran dan penelitian mahasiswa.
                    </p>

                    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#0B1727]">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Judul
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell">
                                        Deskripsi
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell">
                                        Ukuran
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                                        Unduh
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-8 w-8 text-gray-300" />
                                                <p>Belum ada referensi yang tersedia</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {documents.data.map((document) => (
                                    <tr key={document.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{document.title}</div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                                {document.description || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="text-sm text-gray-500">
                                                {formatFileSize(document.file_size)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {document.file_path && (
                                                <Link
                                                    href={`/documents/${document.id}/download`}
                                                    className="inline-flex items-center gap-2 rounded bg-[#FACC15] px-4 py-2 text-sm font-semibold text-[#0B1727] hover:bg-yellow-400 transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Unduh
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {documents.last_page > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-500">
                                Total {documents.total} referensi
                            </p>
                            <div className="flex gap-1">
                                {documents.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#0B1727] text-white'
                                                : link.url
                                                    ? 'text-gray-600 hover:bg-gray-100'
                                                    : 'cursor-not-allowed text-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveScroll
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontLayout>
    );
}
