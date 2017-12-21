<?php

namespace App\Http\Controllers;

use App\Book;
use App\UserBook;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use App\Exceptions\BookAlreadyAddedToShelfException;

class BookController extends Controller
{
    public function saveRead(Request $request, Guard $auth, $bookExtId)
    {
        $book = Book::firstOrCreate(
            ['external_id' => $bookExtId],
            $request->get('book')
        );
        
        $isRead = (bool)$request->get('isRead');
        $userBook = $book->read($isRead);

        if ($userBook) {
            return [
                'success'   =>  true,
                'user_book' =>  $userBook
            ];
        }

        return [
            'success'   =>  true
        ];

    }

    public function rate(Request $request, Guard $auth, $bookExtId)
    {
        $book = Book::firstOrCreate(
            ['external_id' => $bookExtId],
            $request->get('book')
        );

        $userBook = $book->rate((int)$request->get('rating'));
        
        // Updated
        if (!$userBook) {

            return [
                'success' => true,
                // 'user_book' => $userBook
            ];
        }

        return [
            'success' => true,
            'user_book' =>  $userBook
        ];
    }

    public function getUserBooks(Guard $auth, $userId = null)
    {
        $user = $userId ? User::findOrFail($userId) : $auth->user();

        return [
            'books' => $user->getBooks() 
        ];
    }

    public function addToShelf(Request $request, $bookExtId)
    {
        $book = Book::firstOrCreate(
            ['external_id' => $bookExtId],
            $request->get('book')
        );

        $userBook = $book->putOnShelf();

        return [
            'success' => true
        ];
    }

    public function getActivity()
    {
        $user = auth()->user();

        return [
            'success'   =>  true,
            'data'  =>  $user->latestActivity(20)
        ];
    }
}
