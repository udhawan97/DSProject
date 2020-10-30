<?php

require 'common.php';

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  $sql = 'DELETE FROM certifiedUsers WHERE certifiedUserID = ?'
);

$stmt->execute([
  $_POST['certifiedUserID']
]);

$certifiedUsers = $stmt->fetchAll();

$json = json_encode($certifiedUsers, JSON_PRETTY_PRINT);


header('HTTP/1.1 303 See Other');
header('Location: ../certifiedmembers/get.php');
echo $json;
