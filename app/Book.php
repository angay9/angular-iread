<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\BookAlreadyAddedToShelfException;

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

    public function putOnShelf()
    {
        $user = auth()->user();

        $userBook = UserBook::where([
            'user_id' => $user->id,
            'book_id' => $this->id,
            // 'action_name' => UserBook::ACTION_ADDED_TO_SHELF,
        ])->first();

        if ($userBook) {
            throw new BookAlreadyAddedToShelfException("Book already added to shelf");
        }

        $userBook = UserBook::create(
            [
                'user_id' => $user->id,
                'book_id' => $this->id,
                'action_name' => UserBook::ACTION_ADDED_TO_SHELF,
                'action_value' => 1
            ]
        );

        return $userBook;
    }

    public function userBooks()
    {
        return $this->hasMany(UserBook::class);
    }

    public function read($isRead)
    {
        $userBook = $this->findUserBook(UserBook::ACTION_READ);

        if (!$userBook && $isRead) {
            $userBook = $this->createUserBook(UserBook::ACTION_READ, 1);

            return $userBook;

        } else if ($userBook && !$isRead) {
            $userBook->delete();

            return null;
        }

        return null;
    }

    public function rate($rating)
    {
        $userBook = $this->findUserBook(UserBook::ACTION_RATED);
        $user = auth()->user();

        $data = [
            'user_id' => $user->id,
            'book_id' => $this->id,
            'action_name' => UserBook::ACTION_RATED,
            'action_value' => $rating
        ];

        if ($userBook) {
            $userBook->update($data);

            return null;
        }
        
        $userBook = UserBook::create($data);

        return $userBook;
    }

    public function createUserBook($actionName, $actionValue)
    {
        $user = auth()->user();

        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $this->id,
            'action_name' => $actionName,
            'action_value'  =>  $actionValue
        ]);

        return $userBook;
    }

    public function findUserBook($actionName)
    {
        $user = auth()->user();

        return UserBook::where([
            'user_id' => $user->id,
            'book_id' => $this->id,
            'action_name' => $actionName,
        ])->first();
    }

    public function review($review)
    {
        $user = auth()->user();
        $userBook = $this->findUserBook(UserBook::ACTION_REVIEWED);

        if ($userBook) {
            $userBook->update([
                'action_name' => UserBook::ACTION_REVIEWED,
                'action_value' => $review
            ]);

            return null;
        }

        return $this->createUserBook(UserBook::ACTION_REVIEWED, $review);
    }

}
