<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class Tenure extends Model
{
    /**
     * Table timestamps.
     *
     * @var boolean
     */
    public $timestamps = false;

    /**
     * The guarded fields.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The table PK.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The models connection.
     *
     * @var string
     */
    protected $connection = 'mssql';

    /**
     * The models table.
     *
     * @var string
     */
    protected $table = 'employee_copy.dbo.tenure';

    /**
     * The rules required to create an employee.
     *
     * @return array
     */
    public static function getValidationRules()
    {
        return [
            'active' => 'required|digits:1|in:0,1',
            'modifier' => 'required|integer',
            'agentid' => 'required|integer',
            'termreasonid' => 'required|digits:1'
        ];
    }
}
