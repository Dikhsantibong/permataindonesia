import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { type FormEvent, useState, useRef } from 'react';

export default function GalleryCreate() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        event_name: '',
        event_date: '',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/admin/gallery', { forceFormData: true });
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    function removeImage() {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    return (
        <>
            <Head title="Tambah Foto Galeri" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/gallery"
                        className="inline-flex items-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Foto Baru</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Upload dokumentasi kegiatan organisasi.</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6">
                    {/* Image Upload */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Foto <span className="text-red-500">*</span>
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
                                className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-colors hover:border-[#FACC15] hover:bg-gray-50 dark:border-gray-600 dark:hover:border-[#FACC15] dark:hover:bg-gray-800"
                            >
                                <Upload className="h-10 w-10 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Klik untuk upload foto</p>
                                    <p className="text-xs text-gray-400">PNG, JPG, WEBP (max 5MB)</p>
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
                        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    </div>

                    {/* Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Judul Foto <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                placeholder="Contoh: Pembukaan MUNAS 2026"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={3}
                                placeholder="Deskripsi singkat tentang foto ini (opsional)..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Nama Kegiatan
                                </label>
                                <input
                                    type="text"
                                    value={data.event_name}
                                    onChange={(e) => setData('event_name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    placeholder="Contoh: MUNAS 2026"
                                />
                                {errors.event_name && <p className="mt-1 text-sm text-red-500">{errors.event_name}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Tanggal Kegiatan
                                </label>
                                <input
                                    type="date"
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                />
                                {errors.event_date && <p className="mt-1 text-sm text-red-500">{errors.event_date}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-lg bg-[#0B1727] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2a3f] disabled:opacity-50 dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                        >
                            {processing ? 'Mengupload...' : 'Simpan Foto'}
                        </button>
                        <Link
                            href="/admin/gallery"
                            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
