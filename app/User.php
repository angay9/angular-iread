<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function userBooks()
    {
        return $this->hasMany(UserBook::class);
    }

    public function books()
    {
        return $this->belongsToMany(
            Book::class,
            'user_books'
        );
    }

    public function getBooks()
    {
        $bookIds = UserBook::where('user_id', $this->id)->distinct()->pluck('book_id');

        $books = Book::whereIn('id', function ($query) {
                $query->from(with(new UserBook)->getTable())
                    ->where('user_id', $this->id)
                    ->distinct()
                    ->select('book_id');
            })
            ->with(['userBooks' => function ($query) {
                $query->where('user_id', $this->id);
            }])
            ->get()
        ;

        return $books;
    }

    public function latestActivity($recordsLimit = 20)
    {
        return $this
            ->userBooks()
            ->with('book')
            ->orderBy('updated_at', 'DESC')
            ->take($recordsLimit)
            ->get()
        ;
    }
}
