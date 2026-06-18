import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import { useState } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    category: 'berita' | 'artikel';
    status: 'draft' | 'published';
    cover_image: string | null;
    published_at: string | null;
    created_at: string;
    author?: { name: string };
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

export default function ArticlesIndex({ articles }: Props) {
    const [search, setSearch] = useState('');

    function handleDelete(id: number) {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(`/admin/articles/${id}`);
        }
    }

    return (
        <>
            <Head title="Kelola Berita & Artikel" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Berita & Artikel</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola seluruh konten berita dan artikel organisasi.
                        </p>
                    </div>
                    <Link
                        href="/admin/articles/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0B1727] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a2a3f] dark:bg-[#FACC15] dark:text-[#0B1727] dark:hover:bg-yellow-400"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Artikel
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Artikel
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {articles.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <Search className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                                                <p className="font-medium">Belum ada artikel</p>
                                                <p className="text-sm">Mulai buat artikel pertama Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {articles.data.map((article) => (
                                    <tr key={article.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {article.cover_image ? (
                                                    <img
                                                        src={`/storage/${article.cover_image}`}
                                                        alt={article.title}
                                                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-gray-900 dark:text-white">
                                                        {article.title}
                                                    </p>
                                                    {article.excerpt && (
                                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                                            {article.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                article.category === 'berita'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                            }`}>
                                                {article.category === 'berita' ? 'Berita' : 'Artikel'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                article.status === 'published'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                                {article.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(article.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="inline-flex items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="inline-flex items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {articles.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total {articles.total} artikel
                            </p>
                            <div className="flex gap-1">
                                {articles.links.map((link, index) => (
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
            </div>
        </>
    );
}
