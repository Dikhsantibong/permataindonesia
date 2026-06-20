import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    categories?: string[];
}

export default function DocumentCreate({ categories = ['organisasi_hukum', 'jurnal_karya_ilmiah', 'perpustakaan_digital'] }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'organisasi_hukum',
        description: '',
        file: null as File | null,
        status: 'draft',
    });

    const [filePreview, setFilePreview] = useState<string | null>(null);

    const categoryLabels: Record<string, string> = {
        'organisasi_hukum': 'Organisasi & Hukum',
        'jurnal_karya_ilmiah': 'Jurnal & Karya Ilmiah',
        'perpustakaan_digital': 'Perpustakaan Digital'
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/documents', data as any);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            setFilePreview(file.name);
        }
    }

    return (
        <>
            <Head title="Tambah Dokumen" />
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
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Dokumen</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Unggah dokumen baru ke perpustakaan digital.
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
                                    <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="file" className="relative cursor-pointer rounded-md font-medium text-[#0B1727] hover:text-[#1a2a3f] dark:text-[#FACC15] dark:hover:text-yellow-400 focus-within:outline-none">
                                                    <span>Upload file</span>
                                                    <input
                                                        id="file"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="sr-only"
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                                        required
                                                    />
                                                </label>
                                                <p className="pl-1">atau drag and drop</p>
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
                                    {processing ? 'Menyimpan...' : 'Simpan Dokumen'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
