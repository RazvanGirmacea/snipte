<?php
if ($_GET['randomId'] != "FyzULF_DTMwg95nCBAEHvtBbBNJvFS2PgMASDSeNnEVE05Fr45M2bFM99Q5spacT") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
