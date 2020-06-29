<?php

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // fetchAll -> retourne des tableau associatifs
];

//If localhost doesn't work try 127.0.0.1
$host = 'localhost';
//Name of your database (skill_game if you have no idea)
$db = 'skill_game';
//username and password of your DataBase Management System
$user = 'root';
$pass = 'root';

//Don't change the charset
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";


try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$sql = 'SELECT *
FROM score 
ORDER BY `score`.`time` 
ASC LIMIT 5';
$query = $pdo->prepare($sql);
$query->execute();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script src="script.js"></script>

    <script
    src="https://code.jquery.com/jquery-1.12.4.min.js"
    integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
    crossorigin="anonymous"></script>    

    <!--JQueryUI-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <link rel="stylesheet" href="main.css">
</head>
<body>
    <canvas width="1000" height="500"></canvas>
    <p></p>
    <button>Lancer</button>

    <form action="sendTime.php" method="POST">

        <input type="text" name="pseudo" id="pseudo" placeholder="pseudo" active>

        <input type="text" name="time" id="time">

        <input type="submit" value="Envoyer">

    </form>

    <div id="score">

        <h3>Scores : </h3>

        <ul>

            <?php while ($score = $query->fetch()): ?>
                <li><?= htmlspecialchars($score['pseudo'])?> -  <?=htmlspecialchars($score['time']) ?></li>    
            <?php endwhile ?>
        </ul>

    </div>
</body>
</html>