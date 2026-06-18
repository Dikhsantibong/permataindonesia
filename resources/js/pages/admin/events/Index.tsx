import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    event_type: string;
    location: string | null;
    event_date: string | null;
    event_time: string | null;
    status: string;
    organizer: {
        name: string;
    };
    created_at: string;
}

interface Props {
    events: {
        data: Event[];
        links: any[];
        meta: any;
    };
}

export default function EventIndex({ events }: Props) {
    const getStatusBadge = (status: string) => {
        const badges: Record<string, { color: string; label: string }> = {
            upcoming: { color: 'bg-blue-100 text-blue-800', label: 'Akan Datang' },
            ongoing: { color: 'bg-green-100 text-green-800', label: 'Sedang Berlangsung' },
            completed: { color: 'bg-gray-100 text-gray-800', label: 'Selesai' },
            cancelled: { color: 'bg-red-100 text-red-800', label: 'Dibatalkan' },
        };
        return badges[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    };

    const getEventTypeBadge = (type: string) => {
        const badges: Record<string, { color: string; label: string }> = {
            nasional: { color: 'bg-purple-100 text-purple-800', label: 'Nasional' },
            regional: { color: 'bg-orange-100 text-orange-800', label: 'Regional' },
            lokal: { color: 'bg-teal-100 text-teal-800', label: 'Lokal' },
        };
        return badges[type] || { color: 'bg-gray-100 text-gray-800', label: type };
    };

    return (
        <>
            <Head title="Kelola Kegiatan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Kegiatan</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Kelola semua kegiatan dan event organisasi</p>
                    </div>
                    <Link
                        href="/admin/events/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0B1727] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a2a3f] dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Kegiatan
                    </Link>
                </div>

                {/* Events List */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                                        Kegiatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                                        Tipe & Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                                        Waktu & Lokasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                                        Penyelenggara
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {events.data.length > 0 ? (
                                    events.data.map((event) => {
                                        const statusBadge = getStatusBadge(event.status);
                                        const typeBadge = getEventTypeBadge(event.event_type);
                                        return (
                                            <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        {event.cover_image && (
                                                            <img
                                                                src={`/storage/${event.cover_image}`}
                                                                alt={event.title}
                                                                className="h-16 w-16 rounded-lg object-cover"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                                {event.title}
                                                            </div>
                                                            {event.description && (
                                                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                                    {event.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadge.color}`}>
                                                            {typeBadge.label}
                                                        </span>
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge.color}`}>
                                                            {statusBadge.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                        {event.event_date && (
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                            </div>
                                                        )}
                                                        {event.event_time && (
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4" />
                                                                <span>{event.event_time}</span>
                                                            </div>
                                                        )}
                                                        {event.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>{event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {event.organizer?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link
                                                            href={`/admin/events/${event.id}`}
                                                            className="inline-flex items-center justify-center rounded p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                            title="Lihat Detail"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/events/${event.id}/edit`}
                                                            className="inline-flex items-center justify-center rounded p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                                            title="Edit"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
                                                                    // Implement delete functionality
                                                                }
                                                            }}
                                                            className="inline-flex items-center justify-center rounded p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            Belum ada kegiatan yang tersedia
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {events.links && events.links.length > 3 && (
                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Menampilkan {events.meta.from} - {events.meta.to} dari {events.meta.total} kegiatan
                            </div>
                            <div className="flex gap-2">
                                {events.links.map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`rounded px-3 py-1 text-sm ${
                                                link.active
                                                    ? 'bg-[#0B1727] text-white dark:bg-[#FACC15] dark:text-[#0B1727]'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="rounded px-3 py-1 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
