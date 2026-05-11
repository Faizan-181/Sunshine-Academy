<?php
require_once __DIR__ . '/../config/auth.php';
startAdminSession();
session_destroy();
header('Location: index.php');
exit;
