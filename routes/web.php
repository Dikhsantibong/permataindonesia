<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashboardController;
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
Route::inertia('/dokumen', 'Dokumen')->name('dokumen');
Route::inertia('/jurnal', 'Jurnal')->name('jurnal');
Route::inertia('/perpustakaan', 'Perpustakaan')->name('perpustakaan');
Route::inertia('/kontak', 'Kontak')->name('kontak');

require __DIR__.'/settings.php';
