<?php

namespace App\Http\Controllers;

use Auth;
use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Log a user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        $user = User::where('id', $request->get('id'))->where('fname', $request->get('fname'))->first();

        if (is_null($user)) {
            return response(['error' => 'invalid_login'], 401);
        }

        Auth::login($user);
        
        $user = Auth::user();

        try {
            $token = JWTAuth::fromUser($user, [
                'user' => $user->toArray()
            ]);
        } catch (JWTException $e) {
            return response(['error' => 'server_error'], 500);
        }

        return response($token, 200);
    }
}
