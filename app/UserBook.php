<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
{
    const ACTION_READ = 'read';
    const ACTION_IN_PROGRESS = 'in_progress';

    protected $guarded = [];
}
