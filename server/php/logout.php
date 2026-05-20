<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Try multiple ways to read the Authorization header (Apache/PHP differences)
$authHeader = '';
if (function_exists('getallheaders')) {
    $hdrs = getallheaders();
    if (!empty($hdrs['Authorization'])) {
        $authHeader = $hdrs['Authorization'];
    } elseif (!empty($hdrs['authorization'])) {
        $authHeader = $hdrs['authorization'];
    }
}
if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
}
if (empty($authHeader) && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
}

if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(['message' => 'Token lipsă sau invalid.']);
    exit;
}

// Într-un server PHP simplu nu verificăm JWT aici, doar simulăm logout.
http_response_code(200);
echo json_encode(['message' => 'Logout reușit. Te rugăm să ștergi token-ul pe client.']);
