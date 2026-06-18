import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload, X, Calendar, Clock, MapPin, Info, AlertCircle } from 'lucide-react';
import { type FormEvent, useState, useRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function EventCreate() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        content: '',
        cover_image: null as File | null,
        category: 'Event',
        speaker: '',
        event_type: 'nasional',
        location: '',
        registration_link: '',
        contact_person: '',
        event_date: '',
        event_time: '',
        is_free: true,
        price: '',
        capacity: '',
        status: 'upcoming',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/admin/events', { forceFormData: true });
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
            <Head title="Tambah Kegiatan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/events"
                        className="inline-flex items-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Kegiatan Baru</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Buat dan kelola kegiatan organisasi baru</p>
                    </div>
                </div>

                {/* Writing Guidelines */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Panduan Penulisan Kegiatan</h3>
                            <ul className="space-y-1.5 list-disc list-inside">
                                <li>Judul harus jelas, spesifik, dan mencerminkan jenis kegiatan</li>
                                <li>Deskripsi singkat untuk preview di halaman daftar kegiatan</li>
                                <li>Konten detail dapat mencakup agenda, peserta, dan informasi tambahan</li>
                                <li>Tentukan tipe kegiatan: Nasional, Regional, atau Lokal</li>
                                <li>Status: Upcoming (akan datang), Ongoing (berlangsung), Completed (selesai), Cancelled (dibatalkan)</li>
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
                                Judul Kegiatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                placeholder="Contoh: MUNAS PERMATA Indonesia 2026"
                                maxLength={200}
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{data.title.length}/200 karakter</span>
                                <div className="flex items-center gap-1 text-blue-600">
                                    <Info className="h-3 w-3" />
                                    <span>Gunakan judul yang jelas dan informatif</span>
                                </div>
                            </div>
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={3}
                                placeholder="Deskripsi singkat untuk preview di halaman daftar kegiatan..."
                                maxLength={500}
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{data.description.length}/500 karakter</span>
                            </div>
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Registration Link & Contact Person */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Link Pendaftaran
                                </label>
                                <input
                                    type="url"
                                    value={data.registration_link}
                                    onChange={(e) => setData('registration_link', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    placeholder="Contoh: https://forms.gle/..."
                                />
                                {errors.registration_link && <p className="mt-1 text-sm text-red-500">{errors.registration_link}</p>}
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Narahubung (Contact Person)
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                    placeholder="Contoh: Budi (08123456789)"
                                />
                                {errors.contact_person && <p className="mt-1 text-sm text-red-500">{errors.contact_person}</p>}
                            </div>
                        </div>

                        {/* Speaker */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Narasumber / Pembicara
                            </label>
                            <input
                                type="text"
                                value={data.speaker}
                                onChange={(e) => setData('speaker', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                placeholder="Contoh: Dr. Ir. H. Joko Widodo"
                            />
                            {errors.speaker && <p className="mt-1 text-sm text-red-500">{errors.speaker}</p>}
                        </div>

                        {/* Content */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Konten Detail
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                rows={15}
                                placeholder="Tulis detail kegiatan seperti agenda, peserta, syarat, dan informasi penting lainnya..."
                            />
                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                <Info className="h-3 w-3 text-blue-600" />
                                <span>Gunakan struktur yang jelas dengan paragraf untuk kemudahan membaca</span>
                            </div>
                            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                        </div>
                    </div>

                    {/* Sidebar - 1 col */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Gambar Cover
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

                        {/* Event Details */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Event">Event</SelectItem>
                                            <SelectItem value="Seminar">Seminar</SelectItem>
                                            <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Cakupan Wilayah <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={data.event_type}
                                        onValueChange={(value) => setData('event_type', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih cakupan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nasional">Nasional</SelectItem>
                                            <SelectItem value="regional">Regional</SelectItem>
                                            <SelectItem value="lokal">Lokal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.event_type && <p className="mt-1 text-sm text-red-500">{errors.event_type}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Akan Datang</SelectItem>
                                            <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                                            <SelectItem value="completed">Selesai</SelectItem>
                                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Tanggal Kegiatan
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="date"
                                            value={data.event_date}
                                            onChange={(e) => setData('event_date', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>
                                    {errors.event_date && <p className="mt-1 text-sm text-red-500">{errors.event_date}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Waktu Kegiatan
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="time"
                                            value={data.event_time}
                                            onChange={(e) => setData('event_time', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>
                                    {errors.event_time && <p className="mt-1 text-sm text-red-500">{errors.event_time}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Lokasi
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                            placeholder="Contoh: Jakarta Convention Center"
                                        />
                                    </div>
                                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                                </div>

                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_free}
                                            onChange={(e) => setData('is_free', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                                        />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kegiatan Gratis</span>
                                    </label>
                                    
                                    {!data.is_free && (
                                        <div className="mt-3">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Biaya Pendaftaran
                                            </label>
                                            <input
                                                type="number"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                                placeholder="Contoh: 50000"
                                                min="0"
                                            />
                                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Kuota Peserta (Opsional)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-[#FACC15] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="Contoh: 100"
                                        min="1"
                                    />
                                    {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
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
                                {processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
                            </button>
                            <Link
                                href="/admin/events"
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
