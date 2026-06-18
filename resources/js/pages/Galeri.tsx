import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

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

export default function Galeri({ items }: Props) {
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    return (
        <FrontLayout>
            <Head title="Galeri Kegiatan | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Galeri Kegiatan
                </h1>

                {/* Empty State */}
                {items.data.length === 0 && (
                    <div className="mt-8 text-center bg-gray-50 p-16 rounded-xl border border-gray-100 shadow-sm">
                        <ImageIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-xl font-bold text-gray-400 mb-2">Belum ada foto</h2>
                        <p className="text-gray-400 text-sm max-w-md mx-auto">
                            Dokumentasi kegiatan PERMATA Indonesia akan segera ditampilkan di sini.
                        </p>
                    </div>
                )}

                {/* Gallery Grid */}
                {items.data.length > 0 && (
                    <>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {items.data.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setLightbox(item)}
                                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={`/storage/${item.image_path}`}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="p-4 text-white">
                                            <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.title}</h3>
                                            {item.event_name && (
                                                <p className="mt-1 text-xs text-gray-300">{item.event_name}</p>
                                            )}
                                            {item.event_date && (
                                                <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                                                    <Calendar className="h-2.5 w-2.5" />
                                                    {new Date(item.event_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'short', year: 'numeric'
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {items.last_page > 1 && (
                            <div className="flex justify-center gap-1 pt-8">
                                {items.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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
                        )}
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div
                        className="max-h-[90vh] max-w-5xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={`/storage/${lightbox.image_path}`}
                            alt={lightbox.title}
                            className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
                        />
                        <div className="mt-4 text-center text-white">
                            <h3 className="text-lg font-bold">{lightbox.title}</h3>
                            {lightbox.description && (
                                <p className="mt-1 text-sm text-gray-300">{lightbox.description}</p>
                            )}
                            {lightbox.event_name && (
                                <p className="mt-2 text-xs text-[#FACC15]">
                                    {lightbox.event_name}
                                    {lightbox.event_date && ` — ${new Date(lightbox.event_date).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </FrontLayout>
    );
}
