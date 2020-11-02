<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM certifiedUsers, certification, people WHERE certification.certifyID = certifiedUsers.certifyID and people.personID = certifiedUsers.personID and certifiedUsers.expireDate < CURDATE() ORDER BY certifiedUserID';
$vars = [];

// if (isset($_GET['guid'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM certifiedUsers WHERE certifiedUserID = ?';
//   $sql = 'SELECT * FROM certifiedUsers, certification WHERE certification.certifyID = certifiedUsers.certifyID and personID = ?';
//   $sql = 'SELECT * FROM certifiedUsers WHERE certifyID = ?';
//   $sql = 'SELECT * FROM certifiedUsers WHERE certifiedDate = ?';
//   $sql = 'SELECT * FROM certifiedUsers WHERE expirationDate = ?';
//   $vars = [ $_GET['guid'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$certifications = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($certifications, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;

?>
