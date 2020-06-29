<?php

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // fetchAll -> retourne des tableau associatifs
];

$host = '127.0.0.1';
$db = 'ma-24_lucasf_SpeedBall';
$user = 'lucasf';
$pass = '46cc508fNmQ1ZDlkZTQzYjc2ZWRmNjdlNGYyNjAz63ebb841';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";


try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$time = $_POST['time'];
$pseudo = $_POST['pseudo'];

$sql = 'INSERT INTO `score`(`id`, `player`, `time`) VALUES (null, :pseudo, :time)';
$query = $pdo->prepare($sql);
$query->execute([
    'pseudo' => $pseudo,
    'time' => $time
]);

header('Location: index.php');
exit;
?>