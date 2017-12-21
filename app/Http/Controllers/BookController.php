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
            return $this->respondSuccess([
                'user_book' => $userBook
            ]);
        }

        return $this->respondSuccess();

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

            return $this->respondSuccess();
        }

        return $this->respondSuccess([
            'user_book' => $userBook
        ]);
    }

    public function getUserBooks(Guard $auth, $userId = null)
    {
        $user = $userId ? User::findOrFail($userId) : $auth->user();

        return $this->respondSuccess([
            'books' => $user->getBooks() 
        ]);
    }

    public function addToShelf(Request $request, $bookExtId)
    {
        $book = Book::firstOrCreate(
            ['external_id' => $bookExtId],
            $request->get('book')
        );

        $userBook = $book->putOnShelf();

        return $this->respondSuccess();
    }

    public function getActivity()
    {
        $user = auth()->user();

        return $this->respondSuccess([
            'data'  =>  $user->latestActivity(20)
        ]);
    }
}
