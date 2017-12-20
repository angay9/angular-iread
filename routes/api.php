<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// App\User::create([
//     'name'  =>  'John Doe',
//     'email' =>  'john@doe.com',
//     'password'  =>  bcrypt('password'),
// ]);

Auth::loginUsingId(1);


Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});

Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@register');
Route::post('/logout', 'Auth\LoginController@logout');
Route::get('/auth/check', 'Auth\LoginController@check');

Route::get('/user/books/{userId?}', 'BookController@getUserBooks');
Route::post('/books/read/save/{book}', 'BookController@saveRead');
Route::post('/books/rate/{book}', 'BookController@rate');
Route::post('/books/addToShelf/{book}', 'BookController@addToShelf');

