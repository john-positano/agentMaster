<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
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
    protected $guarded = ['SiteID'];

    /**
     * The table PK.
     *
     * @var string
     */
    protected $primaryKey = 'SiteID';

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
    protected $table = 'employee.dbo.sitetable';

    /**
     * Get the site name.
     *
     * @return string
     */
    public function getSiteName()
    {
        return $this->Descrip;
    }
}
