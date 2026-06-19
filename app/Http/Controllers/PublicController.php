<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Document;
use App\Models\GalleryItem;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function index(): Response
    {
        $recentArticles = Article::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->limit(4)
            ->get();

        $upcomingEvents = Event::whereIn('status', ['upcoming', 'ongoing'])
            ->orderBy('event_date', 'asc')
            ->limit(3)
            ->get();

        return Inertia::render('welcome', [
            'recentArticles' => $recentArticles,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }

    public function media(): Response
    {
        $articles = Article::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return Inertia::render('Media', [
            'articles' => $articles,
        ]);
    }

    public function galeri(): Response
    {
        $items = GalleryItem::orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Galeri', [
            'items' => $items,
        ]);
    }

    public function articleShow(string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->with('author')
            ->firstOrFail();

        $related = Article::where('status', 'published')
            ->where('id', '!=', $article->id)
            ->where('category', $article->category)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('ArticleDetail', [
            'article' => $article,
            'related' => $related,
        ]);
    }

    public function kegiatan(\Illuminate\Http\Request $request): Response
    {
        $query = Event::whereIn('status', ['upcoming', 'ongoing'])
            ->where('category', 'Event');

        if ($request->has('type')) {
            $query->where('event_type', $request->type);
        }

        $events = $query->orderBy('event_date', 'asc')->paginate(10);

        return Inertia::render('Kegiatan', [
            'events' => $events,
            'filters' => $request->only(['type']),
        ]);
    }

    public function seminarPelatihan(): Response
    {
        $events = Event::whereIn('status', ['upcoming', 'ongoing'])
            ->whereIn('category', ['Seminar', 'Pelatihan'])
            ->orderBy('event_date', 'asc')
            ->paginate(12);

        return Inertia::render('SeminarPelatihan', [
            'events' => $events,
        ]);
    }

    public function eventShow(string $slug): Response
    {
        $event = Event::where('slug', $slug)
            ->with('organizer')
            ->firstOrFail();

        return Inertia::render('EventDetail', [
            'event' => $event,
        ]);
    }

    public function documents(): Response
    {
        $documents = Document::published()
            ->category('organisasi_hukum')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dokumen', [
            'documents' => $documents,
        ]);
    }

    public function journals(): Response
    {
        $documents = Document::published()
            ->category('jurnal_karya_ilmiah')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Jurnal', [
            'documents' => $documents,
        ]);
    }

    public function library(): Response
    {
        $documents = Document::published()
            ->category('perpustakaan_digital')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Perpustakaan', [
            'documents' => $documents,
        ]);
    }
}
