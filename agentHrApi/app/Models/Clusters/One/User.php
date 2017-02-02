<?php

namespace App\Models\Clusters\One;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Table timestamp.
     *
     * @var boolean
     */
    public $timestamps = false;
    
    /**
     * The guarded fields.
     *
     * @var array
     */
    protected $guarded = ['user_id'];

    /**
     * The models table name.
     *
     * @var string
     */
    protected $table = 'asterisk.vicidial_users_copy';
    
    /**
     * The model primary key.
     *
     * @var string
     */
    protected $primaryKey = 'user_id';
    
    /**
     * The models connection.
     *
     * @var string
     */
    protected $connection = 'cluster1';
}
