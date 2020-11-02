<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'UPDATE certifiedUsers SET personID=?, certifyID=?, certifiedDate=?, expirationDate=? WHERE certifiedUserID = ?'
);

$stmt->execute([
  $_POST['personID'],
  $_POST['certifyID'],
  $_POST['certifiedDate'],
  $_POST['expirationDate'],
  $_POST['certifiedUserID']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifiedmembers/update.php');

?>
