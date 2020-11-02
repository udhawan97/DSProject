<?php

require 'common.php';


$db = DbConnection::getConnection();


$stmt = $db->prepare(
  'UPDATE certifiedUsers SET personID=?, certifyID=?, certifiedDate=?, expireDate=? WHERE certifiedUserID = ?'
);

$stmt->execute([
  $_POST['personID'],
  $_POST['certifyID'],
  $_POST['certifiedDate'],
  $_POST['expireDate'],
  $_POST['certifiedUserID']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../certifiedmembers/update.php');

?>
