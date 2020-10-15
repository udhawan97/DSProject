<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM people';
$vars = [];

if (isset($_GET['guid'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM people WHERE personID = ?';
  $sql = 'SELECT * FROM people WHERE firstName = ?';
  $sql = 'SELECT * FROM people WHERE lastName = ?';
  $sql = 'SELECT * FROM people WHERE position = ?';
  $sql = 'SELECT * FROM people WHERE gender = ?';
  $sql = 'SELECT * FROM people WHERE email = ?';
  $sql = 'SELECT * FROM people WHERE address = ?';
  $sql = 'SELECT * FROM people WHERE dateofBirth = ?';
  $sql = 'SELECT * FROM people WHERE phoneNumber = ?';
  $sql = 'SELECT * FROM people WHERE isActive = ?';
  $sql = 'SELECT * FROM people WHERE radioNumber = ?';
  $sql = 'SELECT * FROM people WHERE stationNumber = ?';
  $vars = [ $_GET['guid'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$people = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($people, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;

?>
