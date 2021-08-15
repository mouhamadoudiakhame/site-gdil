<?php
    $email = $_POST['email'];
    $message = $_POST['message'];

    $servername = "mysql:host=localhost;dbname=site_gdil";
    $user = 'root';
    $password = '';

    try {
        $connexion = new PDO($servername, $user, $password);

        $sql = "insert into messages(email, message) values(:email, :message)";
        $stmt= $connexion->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        header('Location: conf_message_recu.html'); 
    } catch(PDOException $e) {
        print("Erreur : " . $e->getMessage() . "<br>");
    }

    $connexion = null;



?>