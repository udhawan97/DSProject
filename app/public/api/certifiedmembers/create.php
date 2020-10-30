<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'INSERT INTO certifiedUsers (personID, certifyID, certifiedYear, renewedDate)
  VALUES (?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['personID'],
  $_POST['certifyID'],
  $_POST['certifiedYear'],
  $_POST['renewedDate']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifiedmembers/');
