<?php
require_once __DIR__ . '/../config/auth.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)($_POST['id'] ?? 0);

    // Cannot delete yourself
    if ($id > 0 && $id !== (int)$_SESSION['admin_id']) {
        getDB()->prepare("DELETE FROM admin_users WHERE id = ?")->execute([$id]);
    }
}
header('Location: register.php');
exit;
