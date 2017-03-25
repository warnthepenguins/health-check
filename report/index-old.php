<?php
  //Check whether the form has been submitted
  // if (array_key_exists('uuid', $_POST)) {
     //Let's now print out the received values in the browser
     $response = "User ID: {$_POST['uuid']}";
     $response = $response . "User Email: {$_POST['email']}";
     header($response);
  // }
?>
