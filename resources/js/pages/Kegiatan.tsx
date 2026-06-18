import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, ArrowRight, Activity } from 'lucide-react';

interface EventProps {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    event_date: string | null;
    location: string | null;
    category: string;
    event_type: string;
}

interface Props {
    events: {
        data: EventProps[];
        links: any[];
    };
    filters: {
        type?: string;
    };
}

export default function Kegiatan({ events, filters }: Props) {
    return (
        <FrontLayout>
            <Head title="Kegiatan | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Kegiatan Organisasi
                </h1>
                
                <div className="mt-8">
                    {/* Tabs / Filters */}
                    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        <Link 
                            href="/kegiatan"
                            className={`px-6 py-3 font-semibold text-sm whitespace-nowrap ${!filters.type ? 'font-bold text-[#0B1727] border-b-2 border-[#0B1727]' : 'text-gray-500 hover:text-[#0B1727]'}`}
                        >
                            Semua Kegiatan
                        </Link>
                        <Link 
                            href="/kegiatan?type=nasional"
                            className={`px-6 py-3 font-semibold text-sm whitespace-nowrap ${filters.type === 'nasional' ? 'font-bold text-[#0B1727] border-b-2 border-[#0B1727]' : 'text-gray-500 hover:text-[#0B1727]'}`}
                        >
                            Nasional
                        </Link>
                        <Link 
                            href="/kegiatan?type=regional"
                            className={`px-6 py-3 font-semibold text-sm whitespace-nowrap ${filters.type === 'regional' ? 'font-bold text-[#0B1727] border-b-2 border-[#0B1727]' : 'text-gray-500 hover:text-[#0B1727]'}`}
                        >
                            Regional
                        </Link>
                        <Link 
                            href="/kegiatan?type=lokal"
                            className={`px-6 py-3 font-semibold text-sm whitespace-nowrap ${filters.type === 'lokal' ? 'font-bold text-[#0B1727] border-b-2 border-[#0B1727]' : 'text-gray-500 hover:text-[#0B1727]'}`}
                        >
                            Lokal
                        </Link>
                    </div>

                    {events.data.length > 0 ? (
                        <div className="space-y-8">
                            {events.data.map((event) => (
                                <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                                    <div className="md:w-1/3 bg-gray-100 relative min-h-[250px]">
                                        {event.cover_image ? (
                                            <img 
                                                src={`/storage/${event.cover_image}`} 
                                                alt={event.title} 
                                                className="w-full h-full object-cover absolute inset-0"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 absolute inset-0 bg-gray-50">
                                                <Activity className="h-12 w-12 mb-2 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-[#FACC15] text-[#0B1727] text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {event.event_type}
                                        </div>
                                    </div>
                                    <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                        <h2 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h2>
                                        
                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                            {event.event_date && (
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2 text-[#0B1727]" />
                                                    <span>{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                </div>
                                            )}
                                            {event.location && (
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2 text-[#0B1727]" />
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                                            {event.description || 'Tidak ada deskripsi singkat.'}
                                        </p>
                                        
                                        <div className="mt-auto">
                                            <Link 
                                                href={`/kegiatan/${event.slug}`}
                                                className="inline-flex items-center justify-center bg-[#0B1727] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1a2a3f] transition-colors"
                                            >
                                                SELENGKAPNYA <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
                            <Activity className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Belum Ada Kegiatan</h3>
                            <p className="text-gray-500">Belum ada data kegiatan yang sesuai dengan filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </FrontLayout>
    );
}
