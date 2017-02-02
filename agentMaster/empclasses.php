<?php

include('config.php');

$pdo = new PDO($dsn, $use, $pas);

$userid = $_REQUEST["userid"];
$class = $_REQUEST["userclass"];

if (isset($userid) && isset($class))
{
	$upsertquery = "MERGE EmpClasses AS a USING (SELECT $userid) as b ([User]) ON a.[User] = b.[User] WHEN MATCHED THEN UPDATE SET Class = $class WHEN NOT MATCHED THEN INSERT ([User], [Class]) VALUES ($userid, $class);";
	$stmt = $pdo->query($upsertquery);
	if ($stmt)
	{
		echo json_encode(["success" => "employee upserted"]);
	}
	else
	{
		echo json_encode(["error" => var_dump($pdo->errorInfo())]);
	}
}
else
{
	echo json_encode(["error" => "missing info"]);
}

