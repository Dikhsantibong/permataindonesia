import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, Calendar, ImageIcon } from 'lucide-react';

interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    event_name: string | null;
    event_date: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    items: {
        data: GalleryItem[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function GalleryIndex({ items }: Props) {
    function handleDelete(id: number) {
        if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
            router.delete(`/admin/gallery/${id}`);
        }
    }

    return (
        <>
            <Head title="Kelola Galeri Kegiatan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galeri Kegiatan</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola foto dan dokumentasi kegiatan organisasi.
                        </p>
                    </div>
                    <Link
                        href="/admin/gallery/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0B1727] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2a3f] dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Foto
                    </Link>
                </div>

                {/* Grid */}
                {items.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white py-20 dark:border-gray-700 dark:bg-gray-900">
                        <ImageIcon className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <div className="text-center">
                            <p className="font-medium text-gray-500 dark:text-gray-400">Belum ada foto</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">Mulai upload dokumentasi kegiatan pertama Anda.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {items.data.map((item) => (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={`/storage/${item.image_path}`}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Link
                                            href={`/admin/gallery/${item.id}/edit`}
                                            className="rounded-lg bg-white p-2 text-gray-700 transition-colors hover:bg-gray-100"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    {item.event_name && (
                                        <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                                            {item.event_name}
                                        </p>
                                    )}
                                    {item.event_date && (
                                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(item.event_date).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {items.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total {items.total} foto
                        </p>
                        <div className="flex gap-1">
                            {items.links.map((link, index) => (
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
        </>
    );
}
