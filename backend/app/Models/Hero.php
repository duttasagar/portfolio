<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
protected $fillable = [
    'name',
    'title',
    'description',
    'cv_link',
    'facebook',
    'instagram',
    'linkedin',
    'image',
];
}
