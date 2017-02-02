<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TransferTest extends TestCase
{
    private static $transferId;

    public function testCreateTransfer()
    {
        $token = $this->createAuthToken();

        $result = $this->post("http://agentHrApi.dev/transfers?token=$token", [
            'modifier' => '12345',
            'agentid' => '15970',
            'transreasonid' => 1,
            'vzw' => 0,
            'political' => 0,
            'energy' => 0,
            'other' => 1
        ])->response->getContent();

        $this->seeStatusCode(200);

        self::$transferId = array_change_key_case(json_decode($result, true), CASE_LOWER)['id'];
    }

    public function testGetAllTransfers()
    {
        $token = $this->createAuthToken();

        $result = $this->get("http://agentHrApi.dev/transfers?token=$token");

        $this->seeStatusCode(200);
    }

    public function testGetSpecificTransfer()
    {
        $id = self::$transferId;

        $token = $this->createAuthToken();

        $result = $this->get("http://agentHrApi.dev/transfers/$id?token=$token")->response->getContent();

        $this->seeStatusCode(200);
        $this->assertTrue(array_key_exists('id', json_decode($result, true)));
    }

    public function testDeleteTransfer()
    {
        $id = self::$transferId;

        $token = $this->createAuthToken();

        $result = $this->delete("http://agentHrApi.dev/transfers/$id?token=$token");

        $this->seeStatusCode(200);
        $this->seeJson(['message' => 'transfer_deleted']);
    }
}
