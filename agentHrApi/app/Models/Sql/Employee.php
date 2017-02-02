<?php

namespace App\Models\Sql;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
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
     * The models table.
     *
     * @var string
     */
    protected $table = 'employee_copy.dbo.empmaster';

    /**
     * An employee belongs to a department.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function department()
    {
        return $this->hasOne(Department::class, 'User', 'ID');
    }

    /**
     * Get the user group for an employee.
     *
     * @param  bool  $hosted
     * @return string
     */
    public function getUserGroup(bool $hosted)
    {
        if ($this->getSiteId() < 10) {
            if ($hosted) {
                return 'TMC';
            }

            return 'ENERGY';
        }

        $site = $this->hasOne(Site::class, 'SiteID', 'siteid')->first();

        return $site->getSiteName();
    }

    /**
     * Get the employee id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->ID;
    }

    /**
     * Get the site id.
     *
     * @return string
     */
    public function getSiteId()
    {
        return $this->siteid;
    }

    /**
     * Get the first name.
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->fname;
    }

    /**
     * Get the last name.
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lname;
    }

    /**
     * Get the employee full name.
     *
     * @return string
     */
    public function getFullName()
    {
        return sprintf('%s %s', $this->getFirstName(), $this->getLastName());
    }

    /**
     * The rules required to create an employee.
     *
     * @return array
     */
    public static function getValidationRules()
    {
        return [
            'fname' => 'required',
            'lname' => 'required',
            'phone' => 'required|digits:10',
            'mobile' => 'digits:10',
            'address' => 'required',
            'ssn' => 'required|digits:5',
            'position' => 'required|max:2',
            'political' => 'digits:1',
            'vzw' => 'required|digits:1',
            'siteid' => 'required|integer',
            'rate' => 'required|digits:1',
            'active' => 'required|integer|in:0,1',
            'gender' => 'string',
            'department' => 'required|integer',
        ];
    }
}
