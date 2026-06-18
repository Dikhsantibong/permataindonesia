<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\GalleryItem;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with statistics.
     */
    public function index(): Response
    {
        $stats = [
            'total_articles' => Article::count(),
            'published_articles' => Article::where('status', 'published')->count(),
            'draft_articles' => Article::where('status', 'draft')->count(),
            'total_gallery_items' => GalleryItem::count(),
            'total_users' => User::count(),
            'recent_articles' => Article::with('author')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
            'recent_gallery_items' => GalleryItem::with('uploader')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
