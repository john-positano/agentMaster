<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
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
    protected $table = 'employee_copy.dbo.empdepartments';

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

    /**
     * A department entry has a department.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function department()
    {
        return $this->hasOne(DepartmentList::class, 'ID', 'Department');
    }
}
