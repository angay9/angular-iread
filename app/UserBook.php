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

    protected $appends = ['human_action_name'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function getHumanActionNameAttribute()
    {   
        $action = $this->attributes['action_name'];

        switch ($action) {
            case static::ACTION_READ:
                return 'Read';

            case static::ACTION_IN_PROGRESS:
                return 'In Progress';

            case static::ACTION_RATED:
                return 'Rated';

            case static::ACTION_ADDED_TO_SHELF:
                return 'Added to shelf';
            
            default:
                return '';
        }
    }
}
