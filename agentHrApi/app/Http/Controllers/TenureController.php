<?php

namespace App\Http\Controllers;

use App\Models\Sql\Tenure;
use Illuminate\Http\Request;

class TenureController extends Controller
{
    /**
     * The fields to store.
     *
     * @var array
     */
    protected $fieldsToStore = ['active', 'modifier', 'agentid', 'termreasonid'];

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
        $records = Tenure::all();

        return response($records, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, Tenure::getValidationRules());

        $tenure = Tenure::create($request->only($this->fieldsToStore));

        return response($tenure, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tenure = Tenure::findOrFail($id);

        return response($tenure, 200);
    }

    /**
     * Display the specified resource by user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($id)
    {
        $tenures = Tenure::where('agentid', $id)->get();

        return response($tenures, 200);
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
        $tenure = Tenure::findOrFail($id);

        $tenure->delete();

        return response(['message' => 'tenure_deleted'], 200);
    }
}
