<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
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
    protected $table = 'employee_copy.dbo.transfer';

    /**
     * The rules required to create an employee.
     *
     * @return array
     */
    public static function getValidationRules()
    {
        return [
            'modifier' => 'required|integer',
            'agentid' => 'required|integer',
            'transreasonid' => 'required|digits:1',
            'vzw' => 'required|digits:1|in:0,1',
            'political' => 'required|digits:1|in:0,1',
            'energy' => 'required|digits:1|in:0,1',
            'other' => 'required|integer'
        ];
    }
}
