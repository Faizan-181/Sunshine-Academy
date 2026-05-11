<?php
// ============================================
// Sunshine Academy - Admin Registration
// ============================================

require_once __DIR__ . '/../config/auth.php';

// Must be logged in to register new admins
requireLogin();

$success = '';
$error   = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname  = trim($_POST['fullname']  ?? '');
    $username  = trim($_POST['username']  ?? '');
    $password  = trim($_POST['password']  ?? '');
    $password2 = trim($_POST['password2'] ?? '');

    // Validation
    if (empty($fullname) || empty($username) || empty($password)) {
        $error = 'All fields are required.';
    } elseif (strlen($username) < 4) {
        $error = 'Username must be at least 4 characters.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters.';
    } elseif ($password !== $password2) {
        $error = 'Passwords do not match.';
    } else {
        $db = getDB();

        // Check if username exists
        $check = $db->prepare("SELECT id FROM admin_users WHERE username = ? LIMIT 1");
        $check->execute([$username]);
        if ($check->fetch()) {
            $error = 'This username is already taken. Choose another.';
        } else {
            // Create admin
            $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
            $db->prepare("INSERT INTO admin_users (username, password_hash, full_name) VALUES (?, ?, ?)")
               ->execute([$username, $hash, $fullname]);
            $success = "Admin account <strong>" . htmlspecialchars($username) . "</strong> created successfully!";
        }
    }
}

// Get all admins list
$db     = getDB();
$admins = $db->query("SELECT id, username, full_name, last_login, created_at FROM admin_users ORDER BY created_at DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Register Admin — Sunshine Academy</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:#0D1B2E;color:#E2E8F0;min-height:100vh;}

    /* Header */
    .topbar{background:#111e35;border-bottom:1px solid rgba(245,166,35,.15);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
    .topbar-left{display:flex;align-items:center;gap:12px;}
    .topbar-left img{width:42px;height:auto;filter:drop-shadow(0 2px 8px rgba(245,166,35,.4));}
    .topbar-title{font-size:1.05rem;font-weight:800;color:#fff;}
    .topbar-title span{color:#F5A623;}
    .nav-links{display:flex;gap:10px;}
    .nav-link{padding:7px 16px;border-radius:8px;font-size:.83rem;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);transition:all .2s;}
    .nav-link:hover{background:rgba(245,166,35,.1);border-color:rgba(245,166,35,.3);color:#F5A623;}
    .nav-link.active{background:rgba(245,166,35,.15);border-color:#F5A623;color:#F5A623;}
    .logout-btn{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#FCA5A5;padding:6px 14px;border-radius:8px;font-size:.82rem;font-weight:600;text-decoration:none;}

    .container{max-width:1100px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:420px 1fr;gap:28px;}
    @media(max-width:768px){.container{grid-template-columns:1fr;padding:16px;}}

    /* Form Card */
    .card{background:#111e35;border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:32px;}
    .card-title{font-size:1.15rem;font-weight:800;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:9px;}
    .card-sub{font-size:.82rem;color:rgba(255,255,255,.4);margin-bottom:28px;}

    label{display:block;font-size:.78rem;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;}
    input{width:100%;padding:11px 14px;border:1.5px solid rgba(255,255,255,.1);border-radius:10px;background:rgba(255,255,255,.05);color:#fff;font-family:inherit;font-size:.9rem;outline:none;transition:border-color .2s;}
    input:focus{border-color:#F5A623;background:rgba(245,166,35,.04);}
    input::placeholder{color:rgba(255,255,255,.25);}
    .field{margin-bottom:18px;}
    .hint{font-size:.75rem;color:rgba(255,255,255,.3);margin-top:5px;}

    .btn{width:100%;padding:13px;background:linear-gradient(135deg,#F5A623,#E8920A);color:#0A1628;font-weight:800;font-size:.95rem;border:none;border-radius:11px;cursor:pointer;margin-top:4px;transition:opacity .2s;}
    .btn:hover{opacity:.9;}

    .alert-success{background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.3);color:#6EE7B7;padding:13px 16px;border-radius:10px;font-size:.88rem;margin-bottom:20px;}
    .alert-error{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#FCA5A5;padding:13px 16px;border-radius:10px;font-size:.88rem;margin-bottom:20px;}

    /* Admins Table */
    .table-wrap{background:#111e35;border:1px solid rgba(255,255,255,.07);border-radius:18px;overflow:hidden;}
    .table-header{padding:22px 24px 16px;border-bottom:1px solid rgba(255,255,255,.06);}
    .table-header h2{font-size:1.1rem;font-weight:800;color:#fff;}
    table{width:100%;border-collapse:collapse;}
    th{padding:11px 18px;text-align:left;font-size:.72rem;font-weight:700;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.07em;background:rgba(245,166,35,.05);}
    td{padding:13px 18px;border-top:1px solid rgba(255,255,255,.05);font-size:.87rem;}
    tr:hover td{background:rgba(255,255,255,.02);}
    .you-badge{background:rgba(245,166,35,.15);color:#F5A623;border:1px solid rgba(245,166,35,.3);padding:2px 10px;border-radius:100px;font-size:.7rem;font-weight:700;margin-left:8px;}

    .del-form button{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#FCA5A5;border-radius:7px;padding:5px 12px;font-size:.78rem;cursor:pointer;font-family:inherit;}
    .del-form button:hover{background:rgba(239,68,68,.25);}
    .no-delete{color:rgba(255,255,255,.2);font-size:.78rem;}

    .pass-wrap{position:relative;}
    .pass-wrap input{padding-right:44px;}
    .toggle-pass{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:1rem;padding:0;}
  </style>
</head>
<body>

<!-- HEADER -->
<div class="topbar">
  <div class="topbar-left">
    <img src="../public/logo.png" alt="Logo" onerror="this.style.display='none'"/>
    <div class="topbar-title">Sunshine <span>Academy</span></div>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <div class="nav-links">
      <a href="dashboard.php" class="nav-link">📋 Inquiries</a>
      <a href="register.php" class="nav-link active">👤 Admins</a>
    </div>
    <a href="logout.php" class="logout-btn">Logout</a>
  </div>
</div>

<div class="container">

  <!-- REGISTER FORM -->
  <div>
    <div class="card">
      <div class="card-title">👤 Register New Admin</div>
      <p class="card-sub">Create a new admin account for the panel.</p>

      <?php if ($success): ?>
        <div class="alert-success">✅ <?= $success ?></div>
      <?php endif; ?>
      <?php if ($error): ?>
        <div class="alert-error">⚠️ <?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="POST" action="">
        <div class="field">
          <label>Full Name</label>
          <input type="text" name="fullname" placeholder="e.g. Muhammad Ali"
                 value="<?= htmlspecialchars($_POST['fullname'] ?? '') ?>" required/>
        </div>
        <div class="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="e.g. admin2"
                 value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                 autocomplete="off" required/>
          <p class="hint">Min 4 characters. No spaces allowed.</p>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="pass-wrap">
            <input type="password" name="password" id="pass1"
                   placeholder="Min 6 characters" required/>
            <button type="button" class="toggle-pass" onclick="togglePass('pass1',this)">👁</button>
          </div>
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <div class="pass-wrap">
            <input type="password" name="password2" id="pass2"
                   placeholder="Repeat password" required/>
            <button type="button" class="toggle-pass" onclick="togglePass('pass2',this)">👁</button>
          </div>
        </div>
        <button type="submit" class="btn">➕ Create Admin Account</button>
      </form>
    </div>
  </div>

  <!-- ADMINS LIST -->
  <div class="table-wrap">
    <div class="table-header">
      <h2>👥 All Admin Accounts (<?= count($admins) ?>)</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Last Login</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($admins as $a): ?>
        <tr>
          <td style="color:rgba(255,255,255,.3)"><?= $a['id'] ?></td>
          <td style="font-weight:700;color:#fff">
            <?= htmlspecialchars($a['full_name']) ?>
            <?php if ((int)$a['id'] === (int)$_SESSION['admin_id']): ?>
              <span class="you-badge">YOU</span>
            <?php endif; ?>
          </td>
          <td style="color:#F5A623;font-weight:600">@<?= htmlspecialchars($a['username']) ?></td>
          <td style="color:rgba(255,255,255,.45);font-size:.8rem">
            <?= $a['last_login'] ? date('d M Y h:i A', strtotime($a['last_login'])) : 'Never' ?>
          </td>
          <td style="color:rgba(255,255,255,.4);font-size:.8rem">
            <?= date('d M Y', strtotime($a['created_at'])) ?>
          </td>
          <td>
            <?php if ((int)$a['id'] === (int)$_SESSION['admin_id']): ?>
              <span class="no-delete">Cannot delete self</span>
            <?php else: ?>
              <form class="del-form" method="POST" action="delete_admin.php"
                    onsubmit="return confirm('Delete admin @<?= htmlspecialchars($a['username']) ?>?')">
                <input type="hidden" name="id" value="<?= $a['id'] ?>"/>
                <button type="submit">🗑 Delete</button>
              </form>
            <?php endif; ?>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>

</div>

<script>
function togglePass(id, btn) {
  const inp = document.getElementById(id);
  if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
  else { inp.type = 'password'; btn.textContent = '👁'; }
}
</script>
</body>
</html>
