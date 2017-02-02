<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sql\TerminationReason;

class TerminationReasonController extends Controller
{
    /**
     * TenureController constructor.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * Retrieve a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reasons = TerminationReason::all();

        return response($reasons, 200);
    }
}
