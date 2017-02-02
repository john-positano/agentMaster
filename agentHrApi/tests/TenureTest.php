<?php

use App\Models\Sql\Tenure;

class TenureTest extends TestCase
{
    private static $toDelete;

    public function testGetTenures()
    {
        $token = $this->createAuthToken();

        $result = $this->get("http://agentHrApi.dev/tenures?token=$token")->response->getContent();

        $this->seeStatusCode(200);
    }

    public function testCreateTenure()
    {
        $token = $this->createAuthToken();

        $result = $this->post("http://agentHrApi.dev/tenures?token=$token", [
            'modifier' => '12345',
            'agentid' => '15970',
            'active' => '1',
            'termreasonid' => '1'
        ])->response->getContent();

        $this->seeStatusCode(200);
    }

    public function testGetSpecificTenure()
    {
        $token = $this->createAuthToken();

        $tenure = Tenure::take(1)->inRandomOrder()->first();

        $result = $this->get("http://agentHrApi.dev/tenures/{$tenure->id}?token=$token")->response->getContent();

        $this->seeStatusCode(200);

        self::$toDelete = $tenure->id;
    }

    public function testDeleteTenure()
    {
        $token = $this->createAuthToken();

        $id = self::$toDelete;

        $this->delete("http://agentHrApi.dev/tenures/$id?token=$token")->response->getContent();

        $this->seeStatuscode(200);
    }
}
