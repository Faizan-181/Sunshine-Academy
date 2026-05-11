<?php
// ============================================
// Sunshine Academy - Admin Login
// ============================================

require_once __DIR__ . '/../config/auth.php';

// Already logged in? Go to dashboard
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = 'Please enter username and password.';
    } elseif (adminLogin($username, $password)) {
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Login — Sunshine Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:#0A1628;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;}
    .card{background:#111e35;border:1px solid rgba(245,166,35,.2);border-radius:20px;padding:44px 40px;width:100%;max-width:420px;box-shadow:0 30px 80px rgba(0,0,0,.5);}
    .logo-wrap{text-align:center;margin-bottom:28px;}
    .logo-wrap img{width:90px;height:auto;filter:drop-shadow(0 4px 12px rgba(245,166,35,.4));}
    h1{font-size:1.5rem;font-weight:800;color:#fff;text-align:center;margin-bottom:4px;}
    .sub{text-align:center;color:rgba(255,255,255,.45);font-size:.85rem;margin-bottom:32px;}
    label{display:block;font-size:.82rem;font-weight:600;color:rgba(255,255,255,.6);margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase;}
    input{width:100%;padding:12px 16px;border:1.5px solid rgba(255,255,255,.1);border-radius:10px;background:rgba(255,255,255,.06);color:#fff;font-family:inherit;font-size:.92rem;outline:none;transition:border-color .2s;}
    input:focus{border-color:#F5A623;}
    .field{margin-bottom:20px;}
    .btn{width:100%;padding:14px;background:linear-gradient(135deg,#F5A623,#E8920A);color:#0A1628;font-weight:800;font-size:1rem;border:none;border-radius:11px;cursor:pointer;transition:opacity .2s;margin-top:8px;}
    .btn:hover{opacity:.9;}
    .error{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#FCA5A5;padding:12px 16px;border-radius:10px;font-size:.88rem;margin-bottom:20px;text-align:center;}
    .hint{text-align:center;color:rgba(255,255,255,.3);font-size:.78rem;margin-top:20px;}
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-wrap">
      <img src="../public/logo.png" alt="Sunshine Academy" onerror="this.style.display='none'"/>
    </div>
    <h1>Admin Panel</h1>
    <p class="sub">Sunshine Academy — Faisalabad</p>

    <?php if ($error): ?>
      <div class="error">⚠️ <?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="">
      <div class="field">
        <label>Username</label>
        <input type="text" name="username" placeholder="admin"
               value="<?= htmlspecialchars($_POST['username'] ?? '') ?>" autocomplete="username" required/>
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" name="password" placeholder="••••••••" autocomplete="current-password" required/>
      </div>
      <button type="submit" class="btn">Login to Dashboard →</button>
    </form>
    <p class="hint">Default: admin / Sunshine@2025</p>
  </div>
</body>
</html>
