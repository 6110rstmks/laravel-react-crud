<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_path',
    ];

    public function categories()
    {
        return $this->belongsToMany(Subcategory::class);
    }
}
