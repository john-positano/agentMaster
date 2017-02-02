<?php

try
{
	$pdo = new PDO("mysql:host=172.16.82.151;dbname=asterisk", "cron", "1234");
}
catch (PDOException $e)
{
	
}

$viciquery = "INSERT INTO vicidial_users_copy"
	. "("
		. "user, "
		. "pass, "
		. "full_name, "
		. "user_group"
	. ") "
	. "VALUES "
	. "("
		. "'$user', "
		. "'$pass', "
		. "'$full_name', "
		. "'$user_group'"
	. ")"
;

$stmt = $pdo->query($viciquery); 

if ($stmt)
{
	echo json_encode(["success" => "yes"]);
}
else
{
	echo json_encode(["success" => "no"]);
}
