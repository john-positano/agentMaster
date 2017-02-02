<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
		'db' => [
			'driver' => 'sqlsrv',
			'host' => '172.16.2.35',
			'database' => 'EMPLOYEE',
			'username' => 'sa',
			'password' => 'k!p@ny52'
		]
    ],
];
