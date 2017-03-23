<?php
  //Check whether the form has been submitted
  if (array_key_exists('check_submit', $_POST)) {
     //Let's now print out the received values in the browser
     $uuid = uniqid('session.', true);
     echo "<div class='gone hidden' id='hc-user-email'>{$_POST['email']}</div>";
     echo "<div class='gone hidden' id='hc-session-id'>" . $uuid . "</div>";
     require 'survey.php';
  } else {
    header("Location: http://sophity.com");
  }
?>
