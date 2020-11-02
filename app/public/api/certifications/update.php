<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'UPDATE certification SET certifyAgency=?, certifyName=?, expirePeriod=? WHERE certifyID = ?'
);

$stmt->execute([
  $_POST['certifyAgency'],
  $_POST['certifyName'],
  $_POST['expirePeriod'],
  $_POST['certifyID']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifications/update.php');

?>
