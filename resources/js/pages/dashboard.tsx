import { Head } from '@inertiajs/react';
import { Newspaper, Image, Users, FileText, Clock, Calendar } from 'lucide-react';
import { dashboard } from '@/routes';

interface Stats {
    total_articles: number;
    published_articles: number;
    draft_articles: number;
    total_gallery_items: number;
    total_users: number;
    recent_articles: Array<{
        id: number;
        title: string;
        status: string;
        created_at: string;
        author: { name: string };
    }>;
    recent_gallery_items: Array<{
        id: number;
        title: string;
        event_name: string | null;
        created_at: string;
        uploader: { name: string };
    }>;
}

interface DashboardProps {
    stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Selamat datang di panel admin Permata Indonesia</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Artikel</p>
                                <p className="text-2xl font-bold text-foreground">{stats.total_articles}</p>
                            </div>
                            <Newspaper className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Artikel Terbit</p>
                                <p className="text-2xl font-bold text-foreground">{stats.published_articles}</p>
                            </div>
                            <FileText className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Galeri</p>
                                <p className="text-2xl font-bold text-foreground">{stats.total_gallery_items}</p>
                            </div>
                            <Image className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Pengguna</p>
                                <p className="text-2xl font-bold text-foreground">{stats.total_users}</p>
                            </div>
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                </div>

                {/* Recent Content */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Articles */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Artikel Terbaru
                        </h2>
                        <div className="space-y-3">
                            {stats.recent_articles.length > 0 ? (
                                stats.recent_articles.map((article: Stats['recent_articles'][number]) => (
                                    <div
                                        key={article.id}
                                        className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm">{article.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Oleh {article.author.name} • {new Date(article.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                article.status === 'published'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}
                                        >
                                            {article.status === 'published' ? 'Terbit' : 'Draft'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Belum ada artikel</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Gallery Items */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Galeri Terbaru
                        </h2>
                        <div className="space-y-3">
                            {stats.recent_gallery_items.length > 0 ? (
                                stats.recent_gallery_items.map((item: Stats['recent_gallery_items'][number]) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Diunggah oleh {item.uploader.name} • {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                            {item.event_name && (
                                                <p className="text-xs text-primary mt-1">{item.event_name}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Belum ada item galeri</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Draft Articles Warning */}
                {stats.draft_articles > 0 && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            ⚠️ Ada {stats.draft_articles} artikel draft yang belum diterbitkan
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
