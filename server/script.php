<?php
require_once('./inc/db.php');

mysql_connect($db_host, $db_username, $db_password) or die(mysql_error());
mysql_select_db($db_database) or die(mysql_error());

if(count($_POST)) {

  $url = filter_var($_POST["url"], FILTER_VALIDATE_URL);
  if(!$url) {
    exit('none');
  }

  $parsed = parse_url($url);
  // check if sites already exists
  $sql = "SELECT id, found, last_checked FROM sites WHERE host='$parsed[host]'";
  $res = mysql_query($sql) or die(mysql_error());
  if($site = mysql_fetch_assoc($res)) {
    // check date difference
    $time_last_checked = strtotime($site["last_checked"]);
    if(time() - $time_last_checked > 259200) { // check every 3 days
      mysql_query("UPDATE sites SET last_checked = NOW() WHERE id=$site[id]")
        or die(mysql_error());
    }
  } else {
    mysql_query("INSERT INTO sites (host, path, created, found, last_checked) VALUES ('$parsed[host]', '$parsed[path]', NOW(), 1, NOW())")
       or die(mysql_error());
  }

}

