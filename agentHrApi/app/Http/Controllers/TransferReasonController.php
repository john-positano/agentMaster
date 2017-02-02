<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sql\TransferReason;

class TransferReasonController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reasons = TransferReason::all();

        return response($reasons, 200);
    }
}
