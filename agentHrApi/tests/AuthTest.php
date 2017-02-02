<?php

class AuthTest extends TestCase
{
    public function testAuthenticateUser()
    {
        $credentials = ['id' => '15970', 'fname' => 'jordan'];

        $response = $this->post('http://agentHrApi.dev/auth/login', $credentials)->response->getContent();

        $this->seeStatusCode(200);
    }

    public function testAuthenticateInvalidUser()
    {
        $credentials = ['id' => 'fake', 'fname' => 'fake'];

        $response = $this->post('http://agentHrApi.dev/auth/login', $credentials)->response->getContent();

        $this->seeStatusCode(401);
    }
}
