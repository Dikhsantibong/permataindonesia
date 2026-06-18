import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    MapPin,
    School,
    Users,
    Navigation
} from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    category: string;
    published_at: string;
}

interface Props {
    recentArticles: Article[];
}

export default function Welcome({ recentArticles }: Props) {
    return (
        <FrontLayout>
            <Head title="Beranda | Permata Indonesia" />
            
            {/* Hero Section */}
            <section className="relative h-[500px] w-full bg-gray-900 lg:h-[600px] mt-[-64px]">
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 bg-[#0B1727]">
                    <img
                        src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Miners"
                        className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1727] via-[#0B1727]/80 to-transparent"></div>
                </div>

                <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="max-w-2xl text-white">
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            PERMATA <br />
                            <span className="text-[#FACC15]">INDONESIA</span>
                        </h2>
                        <p className="mt-4 max-w-lg text-lg font-medium text-gray-200 sm:text-xl">
                            Wadah Kolaborasi Mahasiswa Pertambangan Indonesia
                        </p>
                        <p className="mt-4 max-w-lg text-sm text-gray-300">
                            Bersatu, berkolaborasi, dan berkontribusi untuk kemajuan pertambangan Indonesia yang berkelanjutan.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/tentang-kami" className="rounded bg-[#FACC15] px-6 py-3 text-sm font-bold text-[#0B1727] transition-colors hover:bg-yellow-500">
                                TENTANG KAMI
                            </Link>
                            <Link href="/kegiatan" className="rounded border-2 border-white bg-transparent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0B1727]">
                                KEGIATAN NASIONAL →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-[#0B1727] p-6 text-white shadow-xl lg:p-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-gray-700">
                        <div className="flex flex-col items-center justify-center text-center">
                            <School className="mb-2 h-8 w-8 text-[#FACC15]" />
                            <span className="text-2xl font-bold">100+</span>
                            <span className="text-xs text-gray-400">Kampus Anggota</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <MapPin className="mb-2 h-8 w-8 text-[#FACC15]" />
                            <span className="text-2xl font-bold">38</span>
                            <span className="text-xs text-gray-400">Provinsi Terlibat Aktif</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <Users className="mb-2 h-8 w-8 text-[#FACC15]" />
                            <span className="text-2xl font-bold">10.000+</span>
                            <span className="text-xs text-gray-400">Mahasiswa Tambang<br/>Bersatu untuk Maju</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <Navigation className="mb-2 h-8 w-8 text-[#FACC15]" />
                            <span className="text-2xl font-bold">5</span>
                            <span className="text-xs text-gray-400">Wilayah Koordinasi<br/>Nasional</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-xs font-medium text-gray-500">#SatuLangkahBersamaPERMATA</p>
                    </div>
                </div>
            </section>

            {/* Agenda Terdekat Section */}
            <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between border-b-2 border-gray-100 pb-2">
                    <h3 className="text-xl font-bold uppercase text-[#0B1727]">
                        Agenda Terdekat
                    </h3>
                    <Link href="/kegiatan" className="flex items-center text-sm font-semibold text-gray-500 hover:text-[#0B1727]">
                        LIHAT SEMUA <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="group overflow-hidden rounded-xl bg-[#0B1727] text-white shadow-md transition-transform hover:-translate-y-1">
                        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                            <img
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Munas"
                                className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                            />
                            <div className="absolute top-4 left-4 rounded bg-[#FACC15] px-2 py-1 text-xs font-bold text-[#0B1727]">
                                MUNAS
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="mb-4 text-lg font-bold">
                                MUNAS <br /> PERMATA INDONESIA <br /> 2026
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#FACC15]" />
                                    <span>Juni 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#FACC15]" />
                                    <span>Makassar, Sulawesi Selatan</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group overflow-hidden rounded-xl bg-[#0B1727] text-white shadow-md transition-transform hover:-translate-y-1">
                        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                            <img
                                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="TIMTI"
                                className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                            />
                            <div className="absolute top-4 left-4 rounded bg-[#FACC15] px-2 py-1 text-xs font-bold text-[#0B1727]">
                                TIMTI
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="mb-4 text-lg font-bold">
                                TIMTI <br /> 2026 <br /> &nbsp;
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#FACC15]" />
                                    <span>September 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#FACC15]" />
                                    <span>Jambi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group overflow-hidden rounded-xl bg-[#0B1727] text-white shadow-md transition-transform hover:-translate-y-1">
                        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                            <img
                                src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Seminar"
                                className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                            />
                            <div className="absolute top-4 left-4 rounded bg-[#FACC15] px-2 py-1 text-xs font-bold text-[#0B1727]">
                                SEMINAR
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="mb-4 text-lg font-bold">
                                SEMINAR <br /> NASIONAL <br /> &nbsp;
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#FACC15]" />
                                    <span>Oktober 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#FACC15]" />
                                    <span>Yogyakarta</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Berita Terbaru Section */}
            <section className="mx-auto mt-16 mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between border-b-2 border-gray-100 pb-2">
                    <h3 className="text-xl font-bold uppercase text-[#0B1727]">
                        Berita Terbaru
                    </h3>
                    <Link href="/media" className="flex items-center text-sm font-semibold text-gray-500 hover:text-[#0B1727]">
                        LIHAT SEMUA <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    {recentArticles.length > 0 ? (
                        recentArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/media/${article.slug}`}
                                className="group cursor-pointer"
                            >
                                <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                                    {article.cover_image ? (
                                        <img
                                            src={`/storage/${article.cover_image}`}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-300">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#FACC15]">
                                    <span>{article.category.toUpperCase()}</span>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <span className="text-gray-500">
                                        {new Date(article.published_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <h4 className="mt-2 text-sm font-bold leading-tight text-[#0B1727] group-hover:text-blue-700">
                                    {article.title}
                                </h4>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-4 text-center py-8 text-gray-500">
                            Belum ada berita yang diterbitkan
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}
