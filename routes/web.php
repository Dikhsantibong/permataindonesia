<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('admin/articles', ArticleController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::resource('admin/events', EventController::class)->names('admin.events');
    Route::resource('admin/documents', DocumentController::class);
});

Route::inertia('/tentang-kami', 'TentangKami')->name('tentang-kami');
Route::inertia('/struktur-organisasi', 'StrukturOrganisasi')->name('struktur-organisasi');
Route::inertia('/anggota', 'Anggota')->name('anggota');
Route::inertia('/pendaftaran-himpunan', 'PendaftaranHimpunan')->name('pendaftaran-himpunan');
Route::get('/kegiatan', [PublicController::class, 'kegiatan'])->name('kegiatan');
Route::get('/kegiatan/{slug}', [PublicController::class, 'eventShow'])->name('event.show');
Route::get('/seminar-pelatihan', [PublicController::class, 'seminarPelatihan'])->name('seminar-pelatihan');
Route::get('/media', [PublicController::class, 'media'])->name('media');
Route::get('/media/{slug}', [PublicController::class, 'articleShow'])->name('article.show');
Route::get('/galeri', [PublicController::class, 'galeri'])->name('galeri');
Route::get('/dokumen', [PublicController::class, 'documents'])->name('dokumen');
Route::get('/jurnal', [PublicController::class, 'journals'])->name('jurnal');
Route::get('/perpustakaan', [PublicController::class, 'library'])->name('perpustakaan');
Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
Route::inertia('/kontak', 'Kontak')->name('kontak');

require __DIR__.'/settings.php';
