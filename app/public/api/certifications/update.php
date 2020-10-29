<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'UPDATE certification SET certifyAgency=?, certifyName=?, expirePeriod=? WHERE certifyID = ?'
);

$stmt->execute([
  $_POST['certifyID'],
  $_POST['certifyName'],
  $_POST['certifyAgency'],
  $_POST['expirePeriod']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifications/get.php');
