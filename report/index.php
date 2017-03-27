<?php
  //Check whether the form has been submitted
  if (array_key_exists('check_submit', $_POST)) {
     //Let's now print out the received values in the browser
     echo json_encode($_POST);
    //  $response = "User ID: {$_POST['uuid']}";
    //  $response = $response . "User Email: {$_POST['email']}";
    //  header($response);
  } else {
    // accept JSON {session, topics, questions}

    // $session = $_POST["session"];
    // $topics = $_POST["topics"];
    // $questions = $_POST["questions"];

//    $rest_json = file_get_contents("php://input");
//    $_POST = json_decode($rest_json, true);

    $version = $_POST["session[version]"];

    $csv = fopen("hc-database-v" . $session["version"] . ".csv", 'w');
//    fputcsv($csv, $topics, "\t");
    fwrite($csv, json_encode($_POST));

    fclose($csv);
  }
?>
