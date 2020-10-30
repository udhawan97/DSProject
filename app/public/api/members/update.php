<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'UPDATE people SET firstName=?, lastName=?, position=?, gender=?, email=?, address=?, dateofBirth=?, phoneNumber=?, isActive=?, radioNumber=?, stationNumber=? WHERE personID = ?'
);

$stmt->execute([
  $_POST['firstName'],
  $_POST['lastName'],
  $_POST['position'],
  $_POST['gender'],
  $_POST['email'],
  $_POST['address'],
  $_POST['dateofBirth'],
  $_POST['phoneNumber'],
  $_POST['isActive'],
  $_POST['radioNumber'],
  $_POST['stationNumber'],
  $_POST['personID']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../members/get.php');

?>
