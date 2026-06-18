import FrontLayout from '@/layouts/FrontLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    category: 'berita' | 'artikel';
    published_at: string | null;
    created_at: string;
    author?: { name: string } | null;
}

interface Props {
    article: Article;
    related: Article[];
}

export default function ArticleDetail({ article, related }: Props) {
    function formatDate(dateStr: string | null) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
        });
    }

    return (
        <FrontLayout>
            <Head title={`${article.title} | Permata Indonesia`} />

            {/* Hero Cover */}
            {article.cover_image && (
                <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-gray-200 sm:h-[50vh]">
                    <img
                        src={`/storage/${article.cover_image}`}
                        alt={article.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
            )}

            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/media"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-[#0B1727] mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Berita & Artikel
                </Link>

                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-[#FACC15] text-[#0B1727] px-3 py-1 rounded-full text-xs font-bold uppercase">
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(article.published_at || article.created_at)}
                        </span>
                        {article.author && (
                            <span className="flex items-center gap-1.5 text-sm text-gray-400">
                                <User className="h-3.5 w-3.5" />
                                {article.author.name}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-[#0B1727] leading-tight sm:text-4xl">
                        {article.title}
                    </h1>
                    {article.excerpt && (
                        <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-8" />

                {/* Article Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-[#0B1727] prose-a:text-blue-600 prose-img:rounded-xl">
                    {article.content.split('\n').map((paragraph, i) => (
                        paragraph.trim() ? (
                            <p key={i} className="text-gray-700 leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ) : null
                    ))}
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                    <div className="mt-16 border-t border-gray-200 pt-10">
                        <h2 className="text-2xl font-bold text-[#0B1727] mb-6">Artikel Terkait</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map(item => (
                                <Link
                                    key={item.id}
                                    href={`/media/${item.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-gray-200">
                                        {item.cover_image ? (
                                            <img
                                                src={`/storage/${item.cover_image}`}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(item.published_at || item.created_at)}
                                        </div>
                                        <h3 className="font-bold text-sm text-[#0B1727] leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0B1727] group-hover:text-blue-700 transition-colors">
                                            Baca Selengkapnya
                                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FrontLayout>
    );
}
