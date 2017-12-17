<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $guarded = [];

    public function getAuthorsAttribute() 
    {
        return explode(',', $this->attributes['authors']);
    }

    public function setAuthorsAttribute($authors)
    {
        if (is_array($authors)) {
            $this->attributes['authors'] = implode(',', $authors);
            return;
        }

        $this->attributes['authors'] = $authors;
    }

    public function getCategoriesAttribute() 
    {
        return explode(',', $this->attributes['categories']);
    }

    public function setCategoriesAttribute($categories)
    {
        if (is_array($categories)) {
            $this->attributes['categories'] = implode(',', $categories);
            return;
        }

        $this->attributes['categories'] = $categories;
    }

}
