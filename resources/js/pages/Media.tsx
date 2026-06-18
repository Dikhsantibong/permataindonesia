import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { useState } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    category: 'berita' | 'artikel';
    status: string;
    published_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    articles: {
        data: Article[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Media({ articles }: Props) {
    const [activeTab, setActiveTab] = useState<'semua' | 'berita' | 'artikel'>('semua');

    const filtered = activeTab === 'semua'
        ? articles.data
        : articles.data.filter(a => a.category === activeTab);

    const featured = filtered[0];
    const rest = filtered.slice(1);

    function formatDate(dateStr: string | null) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
        });
    }

    return (
        <FrontLayout>
            <Head title="Berita & Artikel | Permata Indonesia" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0B1727] mb-6 border-b-2 border-[#FACC15] pb-2 inline-block">
                    Berita & Artikel
                </h1>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 mt-6">
                    {(['semua', 'berita', 'artikel'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                                activeTab === tab
                                    ? 'bg-[#0B1727] text-white shadow-md'
                                    : 'border border-gray-300 text-gray-600 hover:border-[#0B1727] hover:text-[#0B1727]'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                        <Newspaper className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-xl font-bold text-gray-400 mb-2">Belum ada konten</h2>
                        <p className="text-gray-400 text-sm">
                            {activeTab === 'semua'
                                ? 'Belum ada berita atau artikel yang dipublikasikan.'
                                : `Belum ada ${activeTab} yang dipublikasikan.`}
                        </p>
                    </div>
                )}

                {/* Content */}
                {filtered.length > 0 && (
                    <div className="space-y-10">
                        {/* Featured Article */}
                        {featured && (
                            <Link href={`/media/${featured.slug}`} className="group block">
                                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg">
                                    {featured.cover_image ? (
                                        <img
                                            src={`/storage/${featured.cover_image}`}
                                            alt={featured.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-[#0B1727] to-[#1a3a5c]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
                                        <div className="flex items-center gap-3 text-xs font-bold mb-3">
                                            <span className="bg-[#FACC15] text-[#0B1727] px-2.5 py-1 rounded-full uppercase">
                                                {featured.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-300">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(featured.published_at || featured.created_at)}
                                            </span>
                                        </div>
                                        <h2 className="text-xl sm:text-3xl font-bold leading-tight mb-2">
                                            {featured.title}
                                        </h2>
                                        {featured.excerpt && (
                                            <p className="text-sm text-gray-300 line-clamp-2 max-w-2xl hidden sm:block">
                                                {featured.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Grid */}
                        {rest.length > 0 && (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map(article => (
                                    <Link
                                        key={article.id}
                                        href={`/media/${article.slug}`}
                                        className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-gray-200">
                                            {article.cover_image ? (
                                                <img
                                                    src={`/storage/${article.cover_image}`}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                                            )}
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-[#FACC15] text-[#0B1727] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col p-5">
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(article.published_at || article.created_at)}
                                            </div>
                                            <h3 className="font-bold text-[#0B1727] leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                                                {article.title}
                                            </h3>
                                            {article.excerpt && (
                                                <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0B1727] group-hover:text-blue-700 transition-colors">
                                                Baca Selengkapnya
                                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {articles.last_page > 1 && (
                            <div className="flex justify-center gap-1 pt-4">
                                {articles.links.map((link, i) => (
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
                    </div>
                )}
            </div>
        </FrontLayout>
    );
}
