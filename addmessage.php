<?php
    if (isset($_POST['message'])) {
    $message = $_POST['message'];
    $numberOfMessages = $_POST['numberOfMessages'];

    $dbhost = "localhost";
    $dbname = "messages-base";
    $dbtable = "messages";
    $username = "root";
    $password = "root";

    $mysqli = new mysqli($dbhost,$username,$password,$dbname);

    if ($mysqli->connect_error) {
        die('Ошибка : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
    }

    $result = $mysqli->query("INSERT INTO ".$dbtable." (message, numberOfMessages) VALUES ('$message', '$numberOfMessages')");
    

    if ($result == true){
        echo "Информация занесена в базу данных";
    }else{
        echo "Информация не занесена в базу данных";
    }

}
    
?>