<?php

include('config.php');

$pdo = new PDO($dsn, $use, $pas);

$tid = $_REQUEST["tid"];
$tenureortransfer = $_REQUEST["tenureortransfer"];
$date = $_REQUEST["date"];

if (isset($tid) && isset($tenureortransfer) && isset($date))
{
	if ($tenureortransfer == "tenure")
	{
		$table = "Tenure";
	}
	if ($tenureortransfer == "transfer")
	{
		$table = "Transfer";
	}

	$updatequery = "UPDATE $table SET timestamp = '$date' WHERE id = $tid";
	$stmt = $pdo->query($updatequery);
	if ($stmt)
	{
		echo json_encode(["success" => "date updated"]);
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

?>
