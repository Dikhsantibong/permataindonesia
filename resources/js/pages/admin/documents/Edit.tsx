import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Document {
    id: number;
    title: string;
    category: 'organisasi_hukum' | 'jurnal_karya_ilmiah' | 'perpustakaan_digital';
    description: string;
    file_path: string | null;
    file_name: string | null;
    file_size: number | null;
    status: 'draft' | 'published';
}

interface Props {
    document: Document;
    categories?: string[];
}

export default function DocumentEdit({ document, categories = ['organisasi_hukum', 'jurnal_karya_ilmiah', 'perpustakaan_digital'] }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: document.title,
        category: document.category,
        description: document.description || '',
        file: null as File | null,
        status: document.status,
    });

    const [filePreview, setFilePreview] = useState<string | null>(document.file_name);

    const categoryLabels: Record<string, string> = {
        'organisasi_hukum': 'Organisasi & Hukum',
        'jurnal_karya_ilmiah': 'Jurnal & Karya Ilmiah',
        'perpustakaan_digital': 'Perpustakaan Digital'
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/documents/${document.id}`, data as any);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            setFilePreview(file.name);
        }
    }

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
            <Head title="Edit Dokumen" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/documents"
                        className="inline-flex items-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Dokumen</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Edit informasi dokumen yang ada.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <div className="p-6 space-y-6">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Judul Dokumen
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="Masukkan judul dokumen"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Kategori
                                    </label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value as any)}
                                    >
                                        <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {categoryLabels[category] || category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="Deskripsi singkat tentang dokumen"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        File Dokumen
                                    </label>
                                    {document.file_path && (
                                        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                File saat ini: <span className="font-medium">{document.file_name}</span>
                                                <span className="text-gray-500 dark:text-gray-400 ml-2">({formatFileSize(document.file_size)})</span>
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="file" className="relative cursor-pointer rounded-md font-medium text-[#0B1727] hover:text-[#1a2a3f] dark:text-[#FACC15] dark:hover:text-yellow-400 focus-within:outline-none">
                                                    <span>Upload file baru</span>
                                                    <input
                                                        id="file"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="sr-only"
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                                    />
                                                </label>
                                                <p className="pl-1">(opsional)</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (Max 10MB)
                                            </p>
                                            {filePreview && (
                                                <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                                                    File terpilih: {filePreview}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {errors.file && (
                                        <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value as any)}
                                    >
                                        <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15] dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                                <Link
                                    href="/admin/documents"
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#0B1727] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a2a3f] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
