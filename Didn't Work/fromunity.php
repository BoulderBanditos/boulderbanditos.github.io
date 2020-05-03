<?php
  $text1 = $_POST["score"];
  $text2 = $_POST["level"];

  if ($text2 == 1)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score1.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }
  elseif ($text2 == 2)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score2.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }

  elseif ($text2 == 3)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score3.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }

  elseif ($text2 == 4)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score4.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }

  elseif ($text2 == 5)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score5.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }

  elseif ($text2 == 6)
  {
    echo("Message successfully sent!");
    echo("Score: " . $text1);
    $file = fopen("Score6.txt", "w"); //w will create a new file. maybe use an if statement and a second $text to differentiate between writing and appending
    fwrite($file, $text1);
    fclose($file);
  }
?>
