<?php

namespace App\Http\Controllers\Auth;

use JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest')->except('logout');
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        $this->validateLogin($request);
        
        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(
                    [
                        'success' => false, 
                        'message' => 'Invalid Credentials. Please make sure you entered the right information and you have verified your email address.'
                    ], 
                    401
                );
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'message' => 'Could not create token'], 500);
        }
        
        // all good so return the token
        return response()->json(['success' => true, 'data' => ['token' => $token, 'user' => auth()->user()]]);
    }

    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $this->validate($request, ['token' => 'required']);
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }

    public function check(Request $request)
    {
        if (!$token = JWTAuth::setRequest($request)->getToken()) {
            return response()->json(['success' => false, 'message' => 'Token not provided'], 400);
        }

        try {
            $user = JWTAuth::authenticate($token);
        } catch (TokenExpiredException $e) {
            return response()->json(['success' => false, 'message' => 'Token expired'], $e->getStatusCode());
            
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => 'Token invalid'], $e->getStatusCode());
        }

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        return [
            'success'   =>  true,
            'user'  =>  $user,
            'token' => $token
        ];
    }
}
