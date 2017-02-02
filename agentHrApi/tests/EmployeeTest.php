<?php

use App\Models\Sql\Employee;

class EmployeeTest extends TestCase
{
    private static $id;

    private $clusters = [
        \App\Models\Clusters\One\User::class,
        \App\Models\Clusters\Two\User::class,
        \App\Models\Clusters\Three\User::class,
        \App\Models\Clusters\HostedOne\User::class,
        \App\Models\Clusters\HostedManual\User::class,
    ];

    public function testGetEmployees()
    {
        $token = $this->createAuthToken();

        $result = $this->get("http://agentHrApi.dev/employees?token=$token")->response->getContent();

        $this->seeStatusCode(200);
        $this->assertNotEmpty($result);
    }

    public function testFindEmployee()
    {
        $token = $this->createAuthToken();
        
        $employee = Employee::take(1)->inRandomOrder()->first();

        $result = $this->get("http://agentHrApi.dev/employees/".$employee->id."?token=$token")->response->getContent();

        $this->seeStatusCode(200);
        $this->assertNotEmpty($result);
    }

    public function testCreateEmployee()
    {
        $token = $this->createAuthToken();

        $result = $this->post("http://agentHrApi.dev/employees?token=$token", [
            'fname' => 'testy',
            'lname' => 'mctesterson',
            'phone' => '1231231234',
            'address' => 'testy way',
            'ssn' => '12345',
            'position' => 'FT',
            'vzw' => 1,
            'siteid' => 1,
            'rate' => 0,
            'active' => 1,
            'hireDate' => '12/22/1996',
            'department' => 1,
        ])->response->getContent();

        $id = json_decode($result)->ID;
        self::$id = $id;

        foreach ($this->clusters as $cluster) {
            $this->assertEquals(1, $cluster::where('user', $id)->get()->count());
        }

        $this->seeStatusCode(200);
    }

    public function testUpdateEmployee()
    {
        $token = $this->createAuthToken();

        $id = self::$id;

        $result = $this->put("http://agentHrApi.dev/employees/$id?token=$token", [
            'fname' => 'testy',
            'lname' => 'mctesterson',
            'phone' => '1231231234',
            'address' => 'testy way',
            'ssn' => '12345',
            'position' => 'FT',
            'vzw' => 1,
            'siteid' => 1,
            'rate' => 0,
            'active' => 1,
            'email' => 'test@test.com',
            'hireDate' => '12/22/1997',
            'department' => 3,
        ])->response->getContent();

        $this->seeStatusCode(200);
        $this->seeJson(['message' => 'employee_updated']);
    }
}
