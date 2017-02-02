<?php

include('config.php');

$pdo = new PDO($dsn, $use, $pas);

$stmt = $pdo->query("SELECT * FROM dbo.Classes");
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($row);

?>
