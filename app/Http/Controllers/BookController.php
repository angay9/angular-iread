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
        
        $user = $auth->user();
        $isRead = (bool)$request->get('isRead');

        $userBook = UserBook::where([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'action_name' => UserBook::ACTION_READ,
        ])->first();

        if (!$userBook && $isRead) {
            $userBook = UserBook::create([
                'user_id' => $user->id,
                'book_id' => $book->id,
                'action_name' => UserBook::ACTION_READ,
                'action_value' => 1
            ]);
            return [
                'success' => true,
                'user_book' => $userBook
            ];
        } else if ($userBook && !$isRead) {
            $userBook->delete();

            return [
                'success'   =>  true
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
        
        $user = $auth->user();

        $userBook = UserBook::where(
            [
                'user_id' => $user->id,
                'book_id' => $book->id,
                'action_name' => UserBook::ACTION_RATED,
            ])->first()
        ;
        $data = [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'action_name' => UserBook::ACTION_RATED,
            'action_value' => (int)$request->get('rating')
        ];

        if ($userBook) {
            $userBook->update($data);

            return [
                'success' => true
            ];
        }
        
        $userBook = UserBook::create($data);

        return [
            'success' => true,
            'user_book' =>  $userBook
        ];
    }

    public function getUserBooks(Guard $auth, $userId = null)
    {
        $user = $userId ? User::findOrFail($userId) : $auth->user();

        $bookIds = UserBook::where('user_id', $user->id)->distinct()->pluck('book_id');
        
        $books = Book::whereIn('id', function ($query) use($user) {
                $query->from(with(new UserBook)->getTable())
                    ->where('user_id', $user->id)
                    ->distinct()
                    ->select('book_id')
                ;
            })
            ->with(['userBooks' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->get()
        ;

        
        return [
            'books' => $books 
        ];
    }

    public function addToShelf(Request $request, Guard $auth, $bookExtId)
    {
        $book = Book::firstOrCreate(
            ['external_id' => $bookExtId],
            $request->get('book')
        );

        $user = $auth->user();

        $userBook = UserBook::where([
            'user_id' => $user->id,
            'book_id' => $book->id,
            // 'action_name' => UserBook::ACTION_ADDED_TO_SHELF,
        ])->first();

        if ($userBook) {
            throw new BookAlreadyAddedToShelfException("Book already added to shelf");
        }
        
        $userBook = UserBook::create(
            [
                'user_id' => $user->id,
                'book_id' => $book->id,
                'action_name' => UserBook::ACTION_ADDED_TO_SHELF,
                'action_value' => 1
            ]
        );

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
