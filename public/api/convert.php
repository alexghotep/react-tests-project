<?php
header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);
$url = $input['url'] ?? '';

if (!filter_var($url, FILTER_VALIDATE_URL) || !preg_match('/(youtube\.com|youtu\.be)/', $url)) {
    http_response_code(400);
    echo json_encode(['message' => 'Некорректная ссылка на YouTube']);
    exit;
}

$id = md5($url . time());
$outputDir = __DIR__ . '/downloads';
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

$outputTemplate = escapeshellarg("{$outputDir}/{$id}.%(ext)s");
$safeUrl = escapeshellarg($url);

// Извлечение названия
$titleCmd = "yt-dlp --get-title {$safeUrl}";
$title = trim(shell_exec($titleCmd) ?? 'audio');

// Скачивание и извлечение MP3
$cmd = "yt-dlp -x --audio-format mp3 -o {$outputTemplate} {$safeUrl} 2>&1";
exec($cmd, $output, $returnCode);

if ($returnCode !== 0) {
    http_response_code(500);
    echo json_encode(['message' => 'Не удалось извлечь аудиодорожку']);
    exit;
}

echo json_encode([
    'title' => $title,
    'downloadUrl' => "/api/downloads/{$id}.mp3"
]);
