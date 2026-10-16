<?php
// api/counter.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/db.php';
$pdo = getPDO();

// 1. GET: читаем значение счётчика
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'counter_value'");
    $stmt->execute();
    $row = $stmt->fetch();

    $count = $row ? (int)$row['setting_value'] : 0;
    echo json_encode(['count' => $count]);
    exit;
}

// 2. POST: обновляем значение счётчика
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['count'])) {
        $newCount = (int)$data['count'];

        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = 'counter_value'");
        $stmt->execute([$newCount]);

        echo json_encode(['success' => true, 'count' => $newCount]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}