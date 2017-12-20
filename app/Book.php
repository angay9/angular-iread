<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if ($model->publish_date) {
                $model->attributes['publish_date'] = date('Y-m-d', strtotime($model->publish_date));
            }
           
        });
    }


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

    public function setPublishDateAttribue($date)
    {
        $isValidDate = (bool)strtotie($date);
        
        if ($isValidDate) {
            $this->attributes['publish_date'] = $date;
        }
    }

    public function userBooks()
    {
        return $this->hasMany(UserBook::class);
    }

}
