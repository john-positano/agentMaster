<?php

namespace App\Http\Controllers;

use Log;
use Illuminate\Http\Request;

use App\Models\Sql\{
    Employee,
    Department
};

class EmployeeController extends Controller
{
    /**
     * The fields to store.
     *
     * @var array
     */
    protected $fieldsToStore = [
        'fname', 'lname', 'active',
        'phone', 'mobile', 'gender',
        'address', 'ssn', 'position',
        'political', 'vzw', 'siteid',
        'rate', 'email', 'hireDate',
    ];

    /**
     * The tables we will add a user to.
     *
     * @var array
     */
    protected $tables = [
        \App\Models\Clusters\One\User::class,
        \App\Models\Clusters\Two\User::class,
        \App\Models\Clusters\Three\User::class,
        \App\Models\Clusters\HostedOne\User::class,
        \App\Models\Clusters\HostedManual\User::class,
    ];

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
        $employees = Employee::with('department.department')->paginate(25);

        return response($employees, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // First we need to validate the data is correct.
        $this->validate($request, Employee::getValidationRules());

        // Next we need to create an employee record.
        $employee = Employee::create($request->only($this->fieldsToStore));

        // Next we need to assign it a department.
        $employee->department()->create([
            'department' => $request->get('department')
        ]);

        // Finally, we need to register that employee
        // across all the clusters.
        foreach ($this->tables as $index => $model) {
            $table = new $model;

            $table->user = $employee->getId();
            $table->full_name = $employee->getFullName();
            $table->pass = ucfirst(strtolower($employee->getFirstName()));
            $table->user_group = $employee->getUserGroup($index > 2);

            $table->save();
        }

        return response($employee, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::with('department.department')->findOrFail($id);

        return response($employee, 200);
    }

    /**
     * Update a resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // First we need to make sure the data is correct.
        $this->validate($request, Employee::getValidationRules());

        // Retrieve the employee.
        $employee = Employee::findOrFail($id);

        unset($this->feildsToStore[5]);

        // Update the employee master table.
        $employee->update($request->only($this->fieldsToStore));

        // Create or update the employee
        Department::firstOrCreate([
            'user' => $id
        ])->update([
            'department' => $request->get('department')
        ]);

        return response(['message' => 'employee_updated'], 200);
    }
}
