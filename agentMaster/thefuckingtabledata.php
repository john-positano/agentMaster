<?php

include('config.php');

try
{
	$pdo = new PDO($dsn, $use, $pas);
}
catch (PDOException $e)
{
	var_dump($e->getMessage());
}

$stmt = $pdo->query("SELECT TOP 100 a.*, b.Department, c.Class FROM dbo.EmpMaster a LEFT JOIN dbo.EmpDepartments b ON a.ID = b.[User] LEFT JOIN dbo.EmpClasses c ON a.ID = c.[User] ORDER BY NEWID()");
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row, JSON_FORCE_OBJECT);
