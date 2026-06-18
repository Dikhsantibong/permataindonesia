<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of gallery items.
     */
    public function index(): Response
    {
        $items = GalleryItem::with('uploader')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('admin/gallery/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new gallery item.
     */
    public function create(): Response
    {
        return Inertia::render('admin/gallery/Create');
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['required', 'image', 'max:5120'],
            'event_name' => ['nullable', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
        ]);

        $validated['image_path'] = $request->file('image')->store('gallery', 'public');
        $validated['uploaded_by'] = auth()->id();

        // Remove the 'image' key since the column is 'image_path'
        unset($validated['image']);

        GalleryItem::create($validated);

        return redirect()->route('gallery.index')
            ->with('success', 'Item galeri berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified gallery item.
     */
    public function edit(GalleryItem $galleryItem): Response
    {
        return Inertia::render('admin/gallery/Edit', [
            'item' => $galleryItem,
        ]);
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['nullable', 'image', 'max:5120'],
            'event_name' => ['nullable', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($galleryItem->image_path) {
                Storage::disk('public')->delete($galleryItem->image_path);
            }

            $validated['image_path'] = $request->file('image')->store('gallery', 'public');
        }

        // Remove the 'image' key since the column is 'image_path'
        unset($validated['image']);

        $galleryItem->update($validated);

        return redirect()->route('gallery.index')
            ->with('success', 'Item galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery item.
     */
    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        if ($galleryItem->image_path) {
            Storage::disk('public')->delete($galleryItem->image_path);
        }

        $galleryItem->delete();

        return redirect()->route('gallery.index')
            ->with('success', 'Item galeri berhasil dihapus.');
    }
}
