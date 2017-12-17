<?php

namespace App\Http\Controllers;

use App\Book;
use App\UserBook;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;

class BookController extends Controller
{
    public function saveRead(Request $request, Guard $auth, $bookExtId)
    {
        $book = Book::where(['external_id' => $bookExtId])->first();

        if (!$book) {
            $book = Book::create($request->get('book'));
        }
        
        $user = $auth->user();

        $userBook = UserBook::updateOrCreate(
            [
                'user_id' => $user->id,
                'book_id'   =>  $book->id,
                'action_name' => UserBook::ACTION_READ,
            ],
            [
                'user_id' => $user->id,
                'book_id' => $book->id,
                'action_name'   =>  UserBook::ACTION_READ,
                'action_value'  =>  1
            ]
        );

        return [
            'success'   =>  true
        ];

    }   
}
