import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Download, Search, FileText } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Document {
    id: number;
    title: string;
    category: 'organisasi_hukum' | 'jurnal_karya_ilmiah' | 'perpustakaan_digital';
    file_path: string | null;
    file_name: string | null;
    file_size: number | null;
    status: 'draft' | 'published';
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

export default function DocumentsIndex({ documents }: Props) {
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    function handleDelete(id: number) {
        if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
            router.delete(`/admin/documents/${id}`);
        }
    }

    function handleDownload(id: number) {
        window.open(`/admin/documents/${id}/download`, '_blank');
    }

    const filteredDocuments = documents.data.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categoryLabels: Record<string, string> = {
        'organisasi_hukum': 'Organisasi & Hukum',
        'jurnal_karya_ilmiah': 'Jurnal & Karya Ilmiah',
        'perpustakaan_digital': 'Perpustakaan Digital'
    };

    const categoryColors: Record<string, string> = {
        'organisasi_hukum': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'jurnal_karya_ilmiah': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        'perpustakaan_digital': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };

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
        <>
            <Head title="Kelola Dokumen" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Dokumen</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola dokumen organisasi, jurnal, dan perpustakaan digital.
                        </p>
                    </div>
                    <Link
                        href="/admin/documents/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0B1727] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2a3f] dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Dokumen
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Select
                            value={categoryFilter}
                            onValueChange={(value) => setCategoryFilter(value)}
                        >
                            <SelectTrigger className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white w-64">
                                <SelectValue placeholder="Semua Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="organisasi_hukum">Organisasi & Hukum</SelectItem>
                                <SelectItem value="jurnal_karya_ilmiah">Jurnal & Karya Ilmiah</SelectItem>
                                <SelectItem value="perpustakaan_digital">Perpustakaan Digital</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari dokumen..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-64"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Dokumen
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Ukuran File
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {filteredDocuments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                                                <p className="font-medium">Belum ada dokumen</p>
                                                <p className="text-sm">Mulai buat dokumen pertama Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {filteredDocuments.map((document) => (
                                    <tr key={document.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                                    <FileText className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-gray-900 dark:text-white">
                                                        {document.title}
                                                    </p>
                                                    {document.file_name && (
                                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                                            {document.file_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[document.category]}`}>
                                                {categoryLabels[document.category]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {formatFileSize(document.file_size)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                document.status === 'published'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                                {document.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(document.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {document.file_path && (
                                                    <button
                                                        onClick={() => handleDownload(document.id)}
                                                        className="inline-flex items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                                                        title="Download"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <Link
                                                    href={`/admin/documents/${document.id}/edit`}
                                                    className="inline-flex items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(document.id)}
                                                    className="inline-flex items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {documents.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total {documents.total} dokumen
                            </p>
                            <div className="flex gap-1">
                                {documents.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#0B1727] text-white dark:bg-[#FACC15] dark:text-[#0B1727]'
                                                : link.url
                                                    ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                                    : 'cursor-not-allowed text-gray-300 dark:text-gray-600'
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
        </>
    );
}
