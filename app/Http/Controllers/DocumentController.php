<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentController extends Controller
{
    /**
     * Display a listing of documents.
     */
    public function index(): Response
    {
        $documents = Document::orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/documents/Index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Show the form for creating a new document.
     */
    public function create(): Response
    {
        return Inertia::render('admin/documents/Create', [
            'categories' => ['organisasi_hukum', 'jurnal_karya_ilmiah', 'perpustakaan_digital'],
        ]);
    }

    /**
     * Store a newly created document.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:organisasi_hukum,jurnal_karya_ilmiah,perpustakaan_digital'],
            'description' => ['nullable', 'string'],
            'file' => ['required', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'status' => ['required', 'in:draft,published'],
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('documents', $fileName, 'public');
            
            $validated['file_path'] = $filePath;
            $validated['file_name'] = $file->getClientOriginalName();
            $validated['file_size'] = $file->getSize();
        }

        Document::create($validated);

        return redirect()->route('documents.index')
            ->with('success', 'Dokumen berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified document.
     */
    public function edit(Document $document): Response
    {
        return Inertia::render('admin/documents/Edit', [
            'document' => $document,
            'categories' => ['organisasi_hukum', 'jurnal_karya_ilmiah', 'perpustakaan_digital'],
        ]);
    }

    /**
     * Update the specified document.
     */
    public function update(Request $request, Document $document): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:organisasi_hukum,jurnal_karya_ilmiah,perpustakaan_digital'],
            'description' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'status' => ['required', 'in:draft,published'],
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if it exists
            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('documents', $fileName, 'public');
            
            $validated['file_path'] = $filePath;
            $validated['file_name'] = $file->getClientOriginalName();
            $validated['file_size'] = $file->getSize();
        }

        $document->update($validated);

        return redirect()->route('documents.index')
            ->with('success', 'Dokumen berhasil diperbarui.');
    }

    /**
     * Remove the specified document.
     */
    public function destroy(Document $document): RedirectResponse
    {
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('documents.index')
            ->with('success', 'Dokumen berhasil dihapus.');
    }

    /**
     * Download the specified document.
     */
    public function download(Document $document): StreamedResponse
    {
        if (!$document->file_path) {
            abort(404, 'File tidak ditemukan');
        }

        return Storage::disk('public')->download($document->file_path, $document->file_name);
    }
}
