import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Presentation, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EventProps {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    event_date: string | null;
    location: string | null;
    category: string;
}

interface Props {
    events: {
        data: EventProps[];
        links: any[];
    };
}

export default function SeminarPelatihan({ events }: Props) {
    return (
        <FrontLayout>
            <Head title="Seminar & Pelatihan | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Seminar & Pelatihan
                </h1>
                
                <div className="mt-8 text-center bg-gray-50 p-12 rounded-xl border border-gray-100 shadow-sm mb-12">
                    <Presentation className="mx-auto h-16 w-16 text-[#FACC15] mb-4" />
                    <h2 className="text-2xl font-bold text-[#0B1727] mb-2">Program Pengembangan Kompetensi</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Jadwal seminar nasional, lokakarya (workshop), dan pelatihan *software* pertambangan akan diperbarui di halaman ini secara berkala.
                    </p>
                </div>

                {events.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.data.map((event) => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                <div className="h-48 bg-gray-200 relative">
                                    {event.cover_image ? (
                                        <img src={`/storage/${event.cover_image}`} alt={event.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <Presentation className="h-12 w-12" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-[#FACC15] text-[#0B1727] text-xs font-bold px-3 py-1 rounded-full">
                                        {event.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                                    
                                    <div className="space-y-2 mb-4 mt-2">
                                        {event.event_date && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span>{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        )}
                                        {event.location && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                        {event.description || 'Tidak ada deskripsi singkat.'}
                                    </p>
                                    
                                    <div className="mt-auto">
                                        <Link 
                                            href={`/kegiatan/${event.slug}`}
                                            className="inline-flex items-center text-[#0B1727] font-semibold hover:text-yellow-600 transition-colors text-sm"
                                        >
                                            Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        Belum ada data seminar atau pelatihan yang tersedia saat ini.
                    </div>
                )}
            </div>
        </FrontLayout>
    );
}
