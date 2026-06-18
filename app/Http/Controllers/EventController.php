<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events = Event::with('organizer')
            ->orderBy('event_date', 'desc')
            ->paginate(10);

        return Inertia::render('admin/events/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/events/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string|in:Event,Seminar,Pelatihan,Lainnya',
            'speaker' => 'nullable|string|max:255',
            'event_type' => 'required|in:nasional,regional,lokal',
            'location' => 'nullable|string|max:255',
            'registration_link' => 'nullable|url|max:255',
            'contact_person' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'event_time' => 'nullable|date_format:H:i',
            'is_free' => 'boolean',
            'price' => 'nullable|numeric|min:0',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $counter = 1;

        while (Event::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('events', 'public');
        }

        $validated['organizer_id'] = auth()->id();

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Kegiatan berhasil ditambahkan');
    }

    public function show(Event $event): Response
    {
        $event->load('organizer');

        return Inertia::render('admin/events/Show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event): Response
    {
        $event->load('organizer');

        return Inertia::render('admin/events/Edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string|in:Event,Seminar,Pelatihan,Lainnya',
            'speaker' => 'nullable|string|max:255',
            'event_type' => 'required|in:nasional,regional,lokal',
            'location' => 'nullable|string|max:255',
            'registration_link' => 'nullable|url|max:255',
            'contact_person' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'event_time' => 'nullable|date_format:H:i',
            'is_free' => 'boolean',
            'price' => 'nullable|numeric|min:0',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($event->cover_image) {
                // Delete old image
                $oldImagePath = public_path('storage/' . $event->cover_image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
            $validated['cover_image'] = $request->file('cover_image')->store('events', 'public');
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Kegiatan berhasil diperbarui');
    }

    public function destroy(Event $event)
    {
        if ($event->cover_image) {
            $imagePath = public_path('storage/' . $event->cover_image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Kegiatan berhasil dihapus');
    }
}
