<?php

namespace App\Http\Controllers;

use App\Models\Sql\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    /**
     * SiteController constructor.
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
        $sites = Site::all();

        return response($sites, 200);
    }
}
