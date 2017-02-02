<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sql\Transfer;

class TransferController extends Controller
{
    /**
     * The fields to store.
     *
     * @var array
     */
    protected $fieldsToStore = [
        'agentid', 'transreasonid', 
        'vzw', 'political', 'energy', 
        'other', 'modifier'
    ];

    /**
     * TransferController constructor.
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
        $transfers = Transfer::all();

        return response($transfers, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, Transfer::getValidationRules());

        $transfer = Transfer::create($request->only($this->fieldsToStore));

        return response($transfer, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transfer = Transfer::findOrFail($id);

        return response($transfer, 200);
    }

    /**
     * Display the specified resource by user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($id)
    {
        $transfers = Transfer::where('agentid', $id)->get();

        return response($transfers, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transfer = Transfer::findOrfail($id);

        $transfer->delete();

        return response(['message' => 'transfer_deleted'], 200);
    }
}
