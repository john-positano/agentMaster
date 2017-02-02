<?php

namespace App\Models\Clusters\HostedOne;

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
    protected $connection = 'hosted';

    /**
     * The models table name.
     *
     * @var string
     */
    protected $table = 'totalmarketing.vicidial_users_copy';
}
