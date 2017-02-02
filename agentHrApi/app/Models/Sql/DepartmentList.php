<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class DepartmentList extends Model
{
    /**
     * Eloquent timestamps.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The model table name.
     *
     * @var string
     */
    protected $table = 'employee_copy.dbo.departments';

    /**
     * The guarded fields.
     *
     * @var array
     */
    protected $guarded = ['ID'];

    /**
     * The table PK.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    /**
     * The models connection.
     *
     * @var string
     */
    protected $connection = 'mssql';
}
