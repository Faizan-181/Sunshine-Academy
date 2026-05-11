<?php
// ============================================
// Sunshine Academy - Admin Auth Helper
// ============================================

require_once __DIR__ . '/../config/db.php';

function startAdminSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_name(SESSION_NAME);
        session_set_cookie_params([
            'lifetime' => SESSION_TIMEOUT,
            'path'     => '/',
            'secure'   => false, // Set true on HTTPS
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        session_start();
    }
}

function isLoggedIn(): bool {
    startAdminSession();
    if (empty($_SESSION['admin_id'])) return false;
    // Session timeout check
    if (!empty($_SESSION['last_active']) && (time() - $_SESSION['last_active']) > SESSION_TIMEOUT) {
        session_destroy();
        return false;
    }
    $_SESSION['last_active'] = time();
    return true;
}

function requireLogin(): void {
    if (!isLoggedIn()) {
        header('Location: index.php');
        exit;
    }
}

function adminLogin(string $username, string $password): bool {
    $db   = getDB();
    $stmt = $db->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) return false;
    if (!password_verify($password, $user['password_hash'])) return false;

    // Update last login
    $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?")
       ->execute([$user['id']]);

    startAdminSession();
    $_SESSION['admin_id']    = $user['id'];
    $_SESSION['admin_name']  = $user['full_name'];
    $_SESSION['last_active'] = time();
    return true;
}
