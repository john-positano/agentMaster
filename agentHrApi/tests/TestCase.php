<?php

use App\Models\User;

abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    protected $baseUrl = 'http://localhost';

    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }
    
    public function createAuthToken()
    {
        $user = User::take(1)->inRandomOrder()->first();

        $response = $this->post('http://agentHrApi.dev/auth/login', [
            'id' => $user->getId(),
            'fname' => $user->getFirstName()
        ]);

        return $response->response->getContent();
    }
}
