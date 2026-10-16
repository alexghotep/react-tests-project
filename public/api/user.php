<?php
// api/user.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getPDO();

// 1. GET: читаем сохраненное имя
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'user_name'");
    $stmt->execute();
    $row = $stmt->fetch();

    $name = $row ? $row['setting_value'] : 'Гость';
    echo json_encode(['name' => $name]);
    exit;
}

// 2. POST: обновляем имя
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name'])) {
        $newName = trim($data['name']);
        if ($newName === '') {
            $newName = 'Гость';
        }

        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = 'user_name'");
        $stmt->execute([$newName]);

        echo json_encode(['success' => true, 'name' => $newName]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}