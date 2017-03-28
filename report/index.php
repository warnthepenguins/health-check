<?php
  $data = "";
  $result = "\r\n...php session started";

  function create_file_if_none($dir) {
    if (!file_exists($dir)) {
      $csv = fopen($dir, 'w');
      fwrite($csv, "uuid,version,date,email,name,title,company,phone,contactpreference,totalscore,topicscores,.,.,.,.,.,questionanswers...,\r\n");
      fclose($csv);
      $result .= "\r\n...File matching version not found; created new file {$dir}.";
      return TRUE;
    }
    return FALSE;
  }

  function sheetify($from) {
    if ($from === "post") {
      $session = $_POST[0];
      $topics = $_POST[1];
      $questions = $_POST[2];

      $data_line =
          $_POST["hc-session-uuid"] . "," .
          $_POST["hc-session-version"] . "," .
          date("Y.M.d H:i:s") . "," .
          $_POST["hc-session-email"] . ",";

      $data_line .=
          $_POST["hc-user-name"] . "," .
          $_POST["hc-user-title"] . "," .
          $_POST["hc-user-company"] . "," .
          $_POST["hc-user-phone"] . "," .
          array_key_exists("hc-user-contact-preference", $_POST) . ",";

      foreach($_POST["hc-topics"] as $element) {
        $data_line .= $element["score"] . ",";
      }
      foreach($_POST["hc-questions"] as $element) {
        $data_line .= $element["answer"] . ",";
      }

    } else {
      $session = $from[0];
      $topics = $from[1];
      $questions = $from[2];

      $data_line =
          $session["uuid"] . "," .
          $session["version"] . "," .
          date("Y.M.d H:i:s") . "," .
          $session["email"] . ",";

      $data_line = $data_line . ",,,,,"; //Skip the 5 cols of user data -- only available after form submit

      foreach($topics as $element) {
        $data_line = $data_line . $element["score"] . ",";
      }
      foreach($questions as $element) {
        $data_line = $data_line . $element["answer"] . ",";
      }
    }
    return $data_line;
  }

  if (array_key_exists('check_submit', $_POST)) {
    //Form submitted - write user data + scores
    echo json_encode($_POST);
    http_response_code(200);

    $dir = "hc-database-v" . $_POST['hc-session-version'] . ".csv";
    create_file_if_none($dir);

    $inserted_line = sheetify("post");
    $new_contents = $inserted_line . "\r\n";
    file_put_contents($dir, $new_contents, FILE_APPEND);
    $result .= "\r\n...1 new line written from POST at {$_POST['hc-session-uuid']}";

  } else {
    //form not yet submitted - write survey answers and scores
    $data = file_get_contents('php://input');
    $decoded_data = urldecode($data);
    $decoded_data = str_replace('\r', '', $decoded_data);
    $obj = json_decode($decoded_data, true);

    $session = $obj[0];
    $id = $session['uuid'];

    $dir = "hc-database-v" . $session["version"] . ".csv";
    create_file_if_none($dir);

    $data_line = sheetify($obj);
    $new_contents = $data_line . "\r\n";
    file_put_contents($dir, $new_contents, FILE_APPEND);
    $result .= "\r\n...1 new line written from php://input at {$id}";
  }


  $log = fopen("logfile.txt", 'a');
  fwrite($log, date("m.d H:i.s") . $result . "\r\n\r\n");
  fclose($log);

  header("Location: ./report.html");

?>
