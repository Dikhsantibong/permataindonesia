import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload, X, Info, AlertCircle } from 'lucide-react';
import { type FormEvent, useState, useRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Props {
    article?: {
        id: number;
        title: string;
        excerpt: string | null;
        content: string;
        cover_image: string | null;
        category: 'berita' | 'artikel';
        status: 'draft' | 'published';
        tags?: string;
    };
}

export default function ArticleForm({ article }: Props) {
    const isEditing = !!article;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        article?.cover_image ? `/storage/${article.cover_image}` : null
    );

    const { data, setData, post, put, processing, errors } = useForm({
        title: article?.title || '',
        excerpt: article?.excerpt || '',
        content: article?.content || '',
        cover_image: null as File | null,
        category: article?.category || 'berita',
        status: article?.status || 'draft',
        tags: article?.tags || '',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/articles/${article.id}`, {
                forceFormData: true,
                headers: { 'X-HTTP-Method-Override': 'PUT' },
            });
        } else {
            post('/admin/articles', { forceFormData: true });
        }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    function removeImage() {
        setData('cover_image', null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    return (
        <>
            <Head title={isEditing ? 'Edit Artikel' : 'Tambah Artikel'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/articles"
                        className="inline-flex items-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isEditing ? 'Perbarui konten artikel Anda.' : 'Buat konten berita atau artikel baru.'}
                        </p>
                    </div>
                </div>

                {/* Writing Guidelines */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Panduan Penulisan Standar</h3>
                            <ul className="space-y-1.5 list-disc list-inside">
                                <li><strong>Berita:</strong> Faktual, objektif, berdasarkan kejadian nyata, gunakan gaya bahasa jurnalistik (inverted pyramid)</li>
                                <li><strong>Artikel:</strong> Analisis mendalam, opini terstruktur, edukatif, gunakan sub-heading untuk pembagian topik</li>
                                <li>Gunakan bahasa baku, hindari slang atau singkatan yang tidak umum</li>
                                <li>Sertakan sumber atau referensi jika mengutip data atau pernyataan</li>
                                <li>Minimal 300 karakter untuk konten agar optimal untuk SEO</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content - 2 cols */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Title */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Judul Artikel <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                placeholder="Contoh: PERMATA Indonesia Gelar MUNAS 2026 di Jakarta"
                                maxLength={200}
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{data.title.length}/200 karakter</span>
                                <div className="flex items-center gap-1 text-blue-600">
                                    <Info className="h-3 w-3" />
                                    <span>Gunakan judul yang jelas, informatif, dan mengandung kata kunci utama</span>
                                </div>
                            </div>
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Excerpt */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Ringkasan / Excerpt
                            </label>
                            <textarea
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={3}
                                placeholder="Tulis ringkasan singkat yang menarik pembaca untuk membaca selengkapnya..."
                                maxLength={500}
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{data.excerpt.length}/500 karakter</span>
                                <div className="flex items-center gap-1 text-blue-600">
                                    <Info className="h-3 w-3" />
                                    <span>Ringkasan harus menjawab: apa, siapa, kapan, di mana, mengapa</span>
                                </div>
                            </div>
                            {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
                        </div>

                        {/* Content */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Konten <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={15}
                                placeholder="Tulis konten artikel dengan struktur yang baik:&#10;&#10;1. Pendahuluan - Jelaskan latar belakang dan tujuan&#10;2. Isi - Bagi menjadi sub-bagian dengan heading&#10;3. Kesimpulan - Ringkas poin-poin penting&#10;&#10;Gunakan bahasa yang jelas, objektif, dan mudah dipahami."
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{data.content.length} karakter</span>
                                <div className="flex items-center gap-1 text-blue-600">
                                    <Info className="h-3 w-3" />
                                    <span>Minimal 300 karakter. Gunakan paragraf pendek dan heading untuk kemudahan membaca</span>
                                </div>
                            </div>
                            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                        </div>
                    </div>

                    {/* Sidebar - 1 col */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Gambar Cover {!isEditing && <span className="text-red-500">*</span>}
                            </label>
                            {imagePreview ? (
                                <div className="relative mb-3">
                                    <img src={imagePreview} alt="Preview" className="w-full rounded-lg object-cover" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-[#FACC15] hover:bg-gray-50 dark:border-gray-600 dark:hover:border-[#FACC15] dark:hover:bg-gray-800"
                                >
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Klik untuk upload</p>
                                        <p className="text-xs text-gray-400">PNG, JPG, WEBP (max 2MB)</p>
                                    </div>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {errors.cover_image && <p className="mt-1 text-sm text-red-500">{errors.cover_image}</p>}
                        </div>

                        {/* Category & Status */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value as 'berita' | 'artikel')}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="berita">Berita</SelectItem>
                                            <SelectItem value="artikel">Artikel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="mt-2 flex items-start gap-1 text-xs text-gray-500">
                                        <Info className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0" />
                                        <span>
                                            <strong>Berita:</strong> Laporan kejadian aktual, faktual, dan terkini<br/>
                                            <strong>Artikel:</strong> Tulisan opini, analisis, atau edukasi yang lebih mendalam
                                        </span>
                                    </div>
                                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value as 'draft' | 'published')}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="mt-2 flex items-start gap-1 text-xs text-gray-500">
                                        <Info className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0" />
                                        <span>
                                            <strong>Draft:</strong> Simpan sebagai draf untuk diedit nanti<br/>
                                            <strong>Published:</strong> Langsung tayang di website
                                        </span>
                                    </div>
                                    {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="contoh: munas, pertambangan, mahasiswa"
                                    />
                                    <div className="mt-2 flex items-start gap-1 text-xs text-gray-500">
                                        <Info className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0" />
                                        <span>Pisahkan dengan koma. Gunakan 3-5 tags yang relevan untuk SEO</span>
                                    </div>
                                    {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-[#0B1727] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2a3f] disabled:opacity-50 dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                            >
                                {processing ? 'Menyimpan...' : isEditing ? 'Perbarui Artikel' : 'Simpan Artikel'}
                            </button>
                            <Link
                                href="/admin/articles"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
