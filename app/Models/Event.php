<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'cover_image',
        'category',
        'speaker',
        'event_type',
        'location',
        'registration_link',
        'contact_person',
        'event_date',
        'event_time',
        'is_free',
        'price',
        'capacity',
        'status',
        'organizer_id',
    ];

    protected $casts = [
        'event_date' => 'date',
        'event_time' => 'datetime',
        'is_free' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming')->orderBy('event_date', 'asc');
    }

    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed')->orderBy('event_date', 'desc');
    }
}
