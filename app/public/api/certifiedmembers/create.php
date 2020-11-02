<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'INSERT INTO certifiedUsers (personID, certifyID, certifiedDate, expireDate)
  VALUES (?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['personID'],
  $_POST['certifyID'],
  $_POST['certifiedDate'],
  $_POST['expireDate']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifiedmembers/get.php');
?>
