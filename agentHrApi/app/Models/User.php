<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The connection the model belongs to.
     *
     * @var string
     */
    protected $connection = 'mssql';

    /**
     * The protected fields.
     *
     * @var array
     */
    protected $guarded = ['id'];
    
    /**
     * The models table name.
     *
     * @var string
     */
    protected $table = 'employee.dbo.empmaster';

    /**
     * Get the id.
     *
     * @return string
     */
    public function getId()
    {
        return $this->ID;
    }

    /**
     * Get the first name.
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->Fname;
    }
}
