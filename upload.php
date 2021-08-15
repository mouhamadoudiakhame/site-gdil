<?php


$prenom = $_POST['prenom'];
$nom = $_POST['nom'];
$adresse = $_POST['adresse'];
$email = $_POST['email'];
$date_de_naissance = $_POST['date_naissance'];
$statut = $_POST['statut'];

$servername = "mysql:host=localhost;dbname=site_gdil";
$user = 'root';
$password = '';

$target_dir = "uploads/";

$programme_file = '';
$appreciation1_file = '';
$appreciation2_file = '';
$master1_file = '';
$attestation_m1 = '';


$cv_file = $target_dir . basename($_FILES["cv"]["name"]);
$photo_file = $target_dir . basename($_FILES["photo"]["name"]);
$appreciation1_file = $target_dir . basename($_FILES["appreciation1"]["name"]);
$appreciation2_file = $target_dir . basename($_FILES["appreciation2"]["name"]);
$appreciation2_file = $target_dir . basename($_FILES["appreciation2"]["name"]);
$motivation_file = $target_dir . basename($_FILES["motivation"]["name"]);
$licence1_file = $target_dir . basename($_FILES["licence1"]["name"]);
$licence2_file = $target_dir . basename($_FILES["licence2"]["name"]);
$licence3_file = $target_dir . basename($_FILES["licence3"]["name"]);
$diplome_licence_file = $target_dir . basename($_FILES["diplome_licence"]["name"]);
$programme_file = $target_dir . basename($_FILES["programme"]["name"]);


if($_POST['admission'] === 'm2') {
        $master1_file = $target_dir . basename($_FILES["master1"]["name"]);
        $attestation_m1 = $target_dir . basename($_FILES["attestation_m1"]["name"]);
}



$check = move_uploaded_file($_FILES["cv"]["tmp_name"], $cv_file);
$check = $check && move_uploaded_file($_FILES["photo"]["tmp_name"], $photo_file);
if($appreciation1_file)
    $check = $check && move_uploaded_file($_FILES["appreciation1"]["tmp_name"], $appreciation1_file);
if($appreciation2_file)
    $check = $check && move_uploaded_file($_FILES["appreciation2"]["tmp_name"], $appreciation2_file);
$check = $check && move_uploaded_file($_FILES["motivation"]["tmp_name"], $motivation_file);
$check = $check && move_uploaded_file($_FILES["licence1"]["tmp_name"], $licence1_file);
$check = $check && move_uploaded_file($_FILES["licence2"]["tmp_name"], $licence2_file);
$check = $check && move_uploaded_file($_FILES["licence3"]["tmp_name"], $licence3_file);
$check = $check && move_uploaded_file($_FILES["diplome_licence"]["tmp_name"], $diplome_licence_file);
if($programme_file)
    $check = $check && move_uploaded_file($_FILES["programme"]["tmp_name"], $programme_file);
if($_POST['admission'] === 'm2') {
    $check = $check && move_uploaded_file($_FILES["master1"]["tmp_name"], $photo_file);
    $check = $check && move_uploaded_file($_FILES["attestation_m1"]["tmp_name"], $appreciation1_file);
}

if ($check)
{
    try {
        $connexion = new PDO($servername, $user, $password);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "insert into dossiers(prenom, nom, date_de_naissance, adresse, 
        email, statut, cv, photo,  	lettre_apprecition1,  	lettre_apprecition2, 
        lettre_motivation, diplome_licence, releve_l1, releve_l2, releve_l3, programme, 
        attestation_m1, releve_m1) values(
            :prenom, :nom, :date_de_naissance, :adresse, 
            :email, :statut, :cv, :photo, :lettre_apprecition1, :lettre_apprecition2, 
            :lettre_motivation, :diplome_licence, :releve_l1, :releve_l2, :releve_l3, :programme, 
            :attestation_m1, :releve_m1
        )";
        $stmt= $connexion->prepare($sql);
        echo $nom . $prenom . $date_de_naissance . $email . $adresse . $statut . $cv_file . $photo_file . $appreciation1_file . $appreciation2_file . $motivation_file . $diplome_licence_file . $licence1_file . $licence2_file . $licence3_file .  $programme_file . $master1_file . $attestation_m1;
        echo "<br><br>";
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':date_de_naissance', $date_de_naissance);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':adresse', $adresse);
        $stmt->bindParam(':statut', $statut);
        $stmt->bindParam(':cv', $cv_file);
        $stmt->bindParam(':photo', $photo_file);
        $stmt->bindParam(':lettre_apprecition1', $appreciation1_file);
        $stmt->bindParam(':lettre_apprecition2', $appreciation2_file);
        $stmt->bindParam(':lettre_motivation', $motivation_file);
        $stmt->bindParam(':diplome_licence', $diplome_licence_file);
        $stmt->bindParam(':releve_l1', $licence1_file);
        $stmt->bindParam(':releve_l2', $licence2_file);
        $stmt->bindParam(':releve_l3', $licence3_file);
        $stmt->bindParam(':programme', $programme_file);
        $stmt->bindParam(':releve_m1', $master1_file);
        $stmt->bindParam(':attestation_m1', $attestation_m1);
                
        $stmt->execute();

        header('Location: conf_dossier_recu.html'); 
    } catch(PDOException $e) {
        print("Erreur : " . $e->getMessage() . "<br>");
    }
    $connexion = null;
    
}
else
{
    header('Location: inscription.html'); 
}


?>
