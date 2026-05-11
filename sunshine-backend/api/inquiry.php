<?php
// ============================================
// Sunshine Academy - Inquiry Form API
// ============================================

require_once __DIR__ . '/../config/db.php';

setCorsHeaders();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body || !is_array($body)) { $body = $_POST; }

$name  = trim($body['name']  ?? '');
$phone = trim($body['phone'] ?? '');
$grade = trim($body['grade'] ?? '');
$type  = trim($body['type']  ?? '');
$msg   = trim($body['msg']   ?? $body['message'] ?? '');

if (empty($name))  { echo json_encode(['success'=>false,'message'=>'Name is required.']); exit; }
if (empty($phone)) { echo json_encode(['success'=>false,'message'=>'Phone is required.']); exit; }

$cleanPhone = preg_replace('/\D/', '', $phone);
if (strlen($cleanPhone) < 10 || strlen($cleanPhone) > 13) {
    echo json_encode(['success'=>false,'message'=>'Enter a valid phone number.']);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

try {
    $db = getDB();

    $r = $db->prepare("SELECT COUNT(*) FROM inquiries WHERE ip_address=? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $r->execute([$ip]);
    if ((int)$r->fetchColumn() >= 10) {
        echo json_encode(['success'=>false,'message'=>'Too many submissions. Try later.']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO inquiries (name,phone,grade,type,message,ip_address) VALUES (:n,:p,:g,:t,:m,:i)");
    $stmt->execute([':n'=>substr($name,0,120),':p'=>substr($phone,0,20),':g'=>substr($grade,0,60),':t'=>substr($type,0,80),':m'=>substr($msg,0,2000),':i'=>$ip]);

    echo json_encode(['success'=>true,'message'=>'Inquiry submitted! We will call you back soon.','id'=>$db->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(['success'=>false,'message'=>'Error: '.$e->getMessage()]);
}
exit;
