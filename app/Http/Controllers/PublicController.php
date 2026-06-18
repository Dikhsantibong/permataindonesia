<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\GalleryItem;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
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
}
