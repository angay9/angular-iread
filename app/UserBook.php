<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
{
    const ACTION_READ = 'read';
    const ACTION_IN_PROGRESS = 'in_progress';
    const ACTION_RATED = 'rated';
    const ACTION_ADDED_TO_SHELF = 'added_to_shelf';

    protected $guarded = [];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
