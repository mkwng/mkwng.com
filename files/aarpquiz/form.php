<?php

$data = print_r($_POST, true) . "\r\n";
$file = "data.txt"; 

echo "Hello <br />";
print($data);
echo "<br />";

$fp = fopen($file, "a") or die("Couldn't open $file for writing!");
fwrite($fp, $data) or die("Couldn't write values to file!"); 

fclose($fp); 
echo "Saved to $file successfully!";


?>
