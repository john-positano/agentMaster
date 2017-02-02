<?php

include('config.php');

$pdo = new PDO($dsn, $use, $pas);

$criterion = $_REQUEST['criterion'];
$searchval = $_REQUEST['searchval'];
$likeorexact = $_REQUEST['likeorexact'];
$part1 = " LIKE '%";
$part2 = "%' ";

if (isset($criterion) && isset($searchval) && $searchval != "" && isset($likeorexact))
{

	if($criterion != "Department" && $criterion != "Class" && $criterion != "hireDate")
	{

		if ($likeorexact == "exact")
		{
			$part1 = " = '";
			$part2 = "' ";
		}

		$searchquery = "SELECT TOP 1000 a.*, b.Department, c.Class FROM dbo.EmpMaster a LEFT JOIN dbo.EmpDepartments b ON a.ID = b.[User] LEFT JOIN dbo.EmpClasses c ON a.ID = c.[User] WHERE a." . $criterion . $part1 . $searchval . $part2 . "ORDER BY PATINDEX('%" . $searchval . "%', CONVERT(varchar, a." . $criterion . ")) ASC, a." . $criterion . " ASC";
		$stmt = $pdo->query($searchquery);
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($row, JSON_FORCE_OBJECT);
	
	}
	else if ($criterion == "Department")
	{

		if ($likeorexact == "exact")
		{
			$part1 = " = '";
			$part2 = "' ";
		}

		$searchquery = "SELECT TOP 1000 a.*, b.Department, c.Class FROM dbo.EmpMaster a LEFT JOIN dbo.EmpDepartments b ON a.ID = b.[User] LEFT JOIN dbo.EmpClasses c ON a.ID = c.[User] LEFT JOIN dbo.Departments d ON d.ID = b.Department WHERE d.Department" . $part1 . $searchval . $part2 . "ORDER BY a.Fname ASC";
		$stmt = $pdo->query($searchquery);
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($row, JSON_FORCE_OBJECT);

	}
	else if ($criterion == "Class")
	{

		if ($likeorexact == "exact")
		{
			$part1 = " = '";
			$part2 = "' ";
		}

		$searchquery = "SELECT TOP 1000 a.*, b.Department, c.Class FROM dbo.EmpMaster a LEFT JOIN dbo.EmpDepartments b ON a.ID = b.[User] LEFT JOIN dbo.EmpClasses c ON a.ID = c.[User] LEFT JOIN dbo.Classes d ON d.ID = c.[Class] WHERE d.[Class]" . $part1 . $searchval . $part2 . "ORDER BY a.Fname ASC";
		$stmt = $pdo->query($searchquery);
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($row, JSON_FORCE_OBJECT);

	}
	else if ($criterion == "hireDate")
	{

		if ($likeorexact == "exact")
		{
			$part1 = " > '" . $searchval . " 00:00:00' AND a.hireDate < '";
			$part2 = " 23:59:59' ";
		}
		if ($likeorexact == "less")
		{
			$part1 = " < '";
			$part2 = "' ";
		}
		if ($likeorexact == "more")
		{
			$part1 = " > '";
			$part2 = "' ";
		}

		$searchquery = "SELECT TOP 1000 a.*, b.Department, c.Class FROM dbo.EmpMaster a LEFT JOIN dbo.EmpDepartments b ON a.ID = b.[User] LEFT JOIN dbo.EmpClasses c ON a.ID = c.[User] WHERE a.hireDate" . $part1 . $searchval . $part2 . "ORDER BY a.Fname ASC";
		$stmt = $pdo->query($searchquery);
		$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($row, JSON_FORCE_OBJECT);

	}

}
