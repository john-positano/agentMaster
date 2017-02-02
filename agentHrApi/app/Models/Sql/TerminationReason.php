<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class TerminationReason extends Model
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
    protected $table = 'employee_copy.dbo.terminationreason';
}
