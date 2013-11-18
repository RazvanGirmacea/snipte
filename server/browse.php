<?php
// show the sites with sniptes
require_once('./inc/db.php');

mysql_connect($db_host, $db_username, $db_password) or die(mysql_error());
mysql_select_db($db_database) or die(mysql_error());

$sql = "SELECT * FROM sites ORDER BY created DESC";
$res = mysql_query($sql) or die(mysql_error());

// thumb url
//http://{entrypoint}.pagepeeker.com/v2/thumbs.php?size={size}&code={code}&refresh={refresh}&wait={wait}&url={url}


while($site = mysql_fetch_assoc($res)) {

  $thumb = "http://free.pagepeeker.com/v2/thumbs.php?size=l&url=http://$site[host]$site[path]";

  ?>
  <a href="http://<?=$site["host"].$site["path"]?>" target="_blank">
    <img src="<?=$thumb?>" alt="<?=$site["host"]?>">
  </a>
  <?

}
