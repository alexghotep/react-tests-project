<?php
// api/tasks.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getPDO();

// 1. GET: Получить все задачи
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT id, text FROM tasks ORDER BY id ASC");
    $tasks = $stmt->fetchAll();

    $tasks = array_map(function ($task) {
        return [
            'id' => (int)$task['id'],
            'text' => $task['text']
        ];
    }, $tasks);

    echo json_encode(['tasks' => $tasks]);
    exit;
}

// 2. POST: Добавить новую задачу
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['text']) && trim($data['text']) !== '') {
        $text = trim($data['text']);

        $stmt = $pdo->prepare("INSERT INTO tasks (text) VALUES (?)");
        $stmt->execute([$text]);

        $newId = (int)$pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'task' => [
                'id' => $newId,
                'text' => $text
            ]
        ]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Текст задачи не может быть пустым']);
    exit;
}

// 3. DELETE: Удалить задачу по id
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if (!$id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($data['id']) ? (int)$data['id'] : null;
    }

    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['success' => true, 'deleted_id' => $id]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Не указан ID задачи']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Метод не поддерживается']);