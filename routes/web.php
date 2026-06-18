<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::inertia('/tentang-kami', 'TentangKami')->name('tentang-kami');
Route::inertia('/struktur-organisasi', 'StrukturOrganisasi')->name('struktur-organisasi');
Route::inertia('/anggota', 'Anggota')->name('anggota');
Route::inertia('/pendaftaran-himpunan', 'PendaftaranHimpunan')->name('pendaftaran-himpunan');
Route::inertia('/kegiatan', 'Kegiatan')->name('kegiatan');
Route::inertia('/seminar-pelatihan', 'SeminarPelatihan')->name('seminar-pelatihan');
Route::inertia('/media', 'Media')->name('media');
Route::inertia('/galeri', 'Galeri')->name('galeri');
Route::inertia('/dokumen', 'Dokumen')->name('dokumen');
Route::inertia('/jurnal', 'Jurnal')->name('jurnal');
Route::inertia('/perpustakaan', 'Perpustakaan')->name('perpustakaan');
Route::inertia('/kontak', 'Kontak')->name('kontak');

require __DIR__.'/settings.php';
