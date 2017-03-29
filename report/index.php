<?php
  ini_set('display_errors', 'On');
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

  function strip_specials($string) {
    $string = str_replace("\r", '', $string);
    $string = str_replace("\n", '', $string);
    $string = str_replace(',', '-', $string);
    $string = str_replace('"', '~', $string);
    $string = str_replace("'", '~', $string);
    $string = str_replace('`', '~', $string);
    $string = str_replace('{', '(', $string);
    $string = str_replace('}', ')', $string);
    $string = str_replace('[', '(', $string);
    $string = str_replace(']', ')', $string);
    $string = str_replace('/', '-', $string);
    $string = str_replace("\\", '-', $string);
    return $string;
  }

  function sheetify($from) {
    if ($from === "post") {
      $data_line =
          strip_specials($_POST["hc-session-uuid"]) . "," .
          strip_specials($_POST["hc-session-version"]) . "," .
          date("Y.M.d H:i:s") . "," .
          strip_specials($_POST["hc-session-email"]) . ",";

      $data_line .=
          strip_specials($_POST["hc-user-name"]) . "," .
          strip_specials($_POST["hc-user-title"]) . "," .
          strip_specials($_POST["hc-user-company"]) . "," .
          strip_specials($_POST["hc-user-phone"]) . "," .
          array_key_exists("hc-user-contact-preference", $_POST) . ",";

      foreach($_POST["hc-topics"] as $element) {
        $data_line .= strip_specials($element["score"]) . ",";
      }
      foreach($_POST["hc-questions"] as $element) {
        $data_line .= strip_specials($element["answer"]) . ",";
      }

    } else {
      $session = $from[0];
      $topics = $from[1];
      $questions = $from[2];

      $data_line =
          strip_specials($session["uuid"]) . "," .
          strip_specials($session["version"]) . "," .
          date("Y.M.d H:i:s") . "," .
          strip_specials($session["email"]) . ",";

      $data_line = $data_line . ",,,,,"; //Skip the 5 cols of user data -- only available after form submit

      foreach($topics as $element) {
        $data_line = $data_line . strip_specials($element["score"]) . ",";
      }
      foreach($questions as $element) {
        $data_line = $data_line . strip_specials($element["answer"]) . ",";
      }
    }
    return $data_line;
  }

  if (array_key_exists('check_submit', $_POST)) {
    //Form submitted - write user data + scores
    $id = strip_specials($_POST['hc-session-uuid']);
    $version = strip_specials($_POST['hc-session-version']);

    $dir = "hc-database-v" . $version . ".csv";
    create_file_if_none($dir);

    $inserted_line = sheetify("post");
    $new_contents = $inserted_line . "\r\n";
    file_put_contents($dir, $new_contents, FILE_APPEND);
    $result .= "\r\n...1 new line written from POST at {$id}";

  } else {
    //form not yet submitted - write survey answers and scores
    $data = file_get_contents('php://input');
    $decoded_data = urldecode($data);
    $obj = json_decode($decoded_data, true);

    $session = $obj[0];
    $id = strip_specials($session['uuid']);
    $version = strip_specials($session['version']);

    $dir = "hc-database-v" . $version . ".csv";
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
