<?php
// ============================================
// Sunshine Academy - Admin Dashboard
// ============================================

require_once __DIR__ . '/../config/auth.php';
requireLogin();

$db = getDB();

// ── Handle Status Update ──────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $id     = (int)($_POST['id'] ?? 0);
    $status = $_POST['status'] ?? 'new';
    $allowed = ['new', 'contacted', 'enrolled', 'closed'];
    if ($id > 0 && in_array($status, $allowed)) {
        $db->prepare("UPDATE inquiries SET status = ? WHERE id = ?")->execute([$status, $id]);
    }
    header('Location: dashboard.php');
    exit;
}

// ── Handle Delete ─────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $id = (int)($_POST['delete_id'] ?? 0);
    if ($id > 0) {
        $db->prepare("DELETE FROM inquiries WHERE id = ?")->execute([$id]);
    }
    header('Location: dashboard.php');
    exit;
}

// ── Filters ───────────────────────────────────
$filterStatus = $_GET['status'] ?? 'all';
$search       = trim($_GET['q'] ?? '');
$page         = max(1, (int)($_GET['page'] ?? 1));
$perPage      = 15;
$offset       = ($page - 1) * $perPage;

$where  = [];
$params = [];

if ($filterStatus !== 'all') {
    $where[]  = "status = ?";
    $params[] = $filterStatus;
}
if ($search !== '') {
    $where[]  = "(name LIKE ? OR phone LIKE ? OR message LIKE ?)";
    $s        = "%$search%";
    $params   = array_merge($params, [$s, $s, $s]);
}

$whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

// Count
$countStmt = $db->prepare("SELECT COUNT(*) FROM inquiries $whereSQL");
$countStmt->execute($params);
$totalRows = (int)$countStmt->fetchColumn();
$totalPages = max(1, ceil($totalRows / $perPage));

// Fetch rows
$stmt = $db->prepare("SELECT * FROM inquiries $whereSQL ORDER BY created_at DESC LIMIT $perPage OFFSET $offset");
$stmt->execute($params);
$inquiries = $stmt->fetchAll();

// ── Stats Cards ───────────────────────────────
$stats = $db->query("
    SELECT
        COUNT(*) AS total,
        SUM(status='new') AS new_count,
        SUM(status='contacted') AS contacted,
        SUM(status='enrolled') AS enrolled,
        SUM(DATE(created_at)=CURDATE()) AS today
    FROM inquiries
")->fetch();

$statusColors = [
    'new'       => '#F5A623',
    'contacted' => '#3B82F6',
    'enrolled'  => '#10B981',
    'closed'    => '#6B7280',
];
$statusLabels = [
    'new'       => 'New',
    'contacted' => 'Contacted',
    'enrolled'  => 'Enrolled',
    'closed'    => 'Closed',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dashboard — Sunshine Academy Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:#0D1B2E;color:#E2E8F0;min-height:100vh;}

    /* ── Header ── */
    .topbar{background:#111e35;border-bottom:1px solid rgba(245,166,35,.15);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
    .topbar-left{display:flex;align-items:center;gap:12px;}
    .topbar-left img{width:42px;height:auto;filter:drop-shadow(0 2px 8px rgba(245,166,35,.4));}
    .topbar-title{font-size:1.05rem;font-weight:800;color:#fff;}
    .topbar-title span{color:#F5A623;}
    .topbar-right{display:flex;align-items:center;gap:16px;}
    .admin-badge{background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.2);color:#F5A623;padding:5px 14px;border-radius:100px;font-size:.8rem;font-weight:700;}
    .logout-btn{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#FCA5A5;padding:6px 14px;border-radius:8px;font-size:.82rem;font-weight:600;text-decoration:none;cursor:pointer;transition:background .2s;}
    .logout-btn:hover{background:rgba(239,68,68,.2);}

    /* ── Layout ── */
    .container{max-width:1400px;margin:0 auto;padding:28px 24px;}

    /* ── Stats ── */
    .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:28px;}
    .stat-card{background:#111e35;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px 22px;}
    .stat-val{font-size:2rem;font-weight:800;color:#F5A623;line-height:1;}
    .stat-lbl{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.45);margin-top:6px;text-transform:uppercase;letter-spacing:.06em;}

    /* ── Filters ── */
    .filters{background:#111e35;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px 22px;margin-bottom:22px;display:flex;gap:14px;flex-wrap:wrap;align-items:center;}
    .filter-tabs{display:flex;gap:8px;flex-wrap:wrap;}
    .tab{padding:7px 16px;border-radius:8px;font-size:.82rem;font-weight:700;text-decoration:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);transition:all .2s;cursor:pointer;background:none;}
    .tab:hover,.tab.active{background:#F5A623;color:#0A1628;border-color:#F5A623;}
    .search-wrap{margin-left:auto;display:flex;gap:8px;}
    .search-inp{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 14px;color:#fff;font-family:inherit;font-size:.88rem;outline:none;width:220px;transition:border-color .2s;}
    .search-inp:focus{border-color:#F5A623;}
    .search-btn{background:#F5A623;border:none;border-radius:9px;padding:8px 16px;font-weight:700;font-size:.85rem;color:#0A1628;cursor:pointer;}

    /* ── Table ── */
    .table-wrap{background:#111e35;border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;}
    table{width:100%;border-collapse:collapse;}
    thead{background:rgba(245,166,35,.07);}
    th{padding:13px 16px;text-align:left;font-size:.75rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.07em;white-space:nowrap;}
    td{padding:13px 16px;border-top:1px solid rgba(255,255,255,.05);font-size:.88rem;vertical-align:top;}
    tr:hover td{background:rgba(255,255,255,.025);}
    .name-cell{font-weight:700;color:#fff;}
    .phone-cell a{color:#F5A623;text-decoration:none;font-weight:600;}
    .phone-cell a:hover{text-decoration:underline;}
    .msg-cell{color:rgba(255,255,255,.5);font-size:.82rem;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .date-cell{color:rgba(255,255,255,.4);font-size:.8rem;white-space:nowrap;}

    /* Status badge */
    .badge{display:inline-block;padding:4px 12px;border-radius:100px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;}

    /* Actions */
    .actions{display:flex;gap:8px;align-items:center;}
    select.status-sel{background:#0D1B2E;border:1px solid rgba(255,255,255,.12);color:#fff;border-radius:7px;padding:5px 9px;font-size:.78rem;font-family:inherit;cursor:pointer;outline:none;}
    .save-btn{background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);color:#6EE7B7;border-radius:7px;padding:5px 10px;font-size:.78rem;font-weight:700;cursor:pointer;}
    .save-btn:hover{background:rgba(16,185,129,.25);}
    .del-btn{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#FCA5A5;border-radius:7px;padding:5px 9px;font-size:.78rem;cursor:pointer;}
    .del-btn:hover{background:rgba(239,68,68,.25);}

    /* ── Pagination ── */
    .pagination{display:flex;justify-content:center;gap:8px;padding:22px;flex-wrap:wrap;}
    .pag-btn{padding:7px 14px;border-radius:8px;font-size:.85rem;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);}
    .pag-btn:hover,.pag-btn.active{background:#F5A623;color:#0A1628;border-color:#F5A623;}

    /* ── Empty ── */
    .empty{padding:60px 24px;text-align:center;color:rgba(255,255,255,.3);}
    .empty-ico{font-size:3rem;margin-bottom:12px;}

    /* ── Responsive ── */
    @media(max-width:768px){
      .stats{grid-template-columns:1fr 1fr;}
      .stat-card:last-child{grid-column:1/-1;}
      .filters{flex-direction:column;}
      .search-wrap{margin-left:0;width:100%;}
      .search-inp{width:100%;}
      .hide-mob{display:none;}
      .container{padding:16px;}
      .topbar{padding:12px 16px;}
    }
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
    <div style="display:flex;gap:8px;">
      <a href="dashboard.php" style="padding:7px 16px;border-radius:8px;font-size:.83rem;font-weight:600;text-decoration:none;background:rgba(245,166,35,.15);border:1px solid #F5A623;color:#F5A623;">📋 Inquiries</a>
      <a href="register.php" style="padding:7px 16px;border-radius:8px;font-size:.83rem;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);">👤 Admins</a>
    </div>
    <span class="admin-badge">👤 <?= htmlspecialchars($_SESSION['admin_name'] ?? 'Admin') ?></span>
    <a href="logout.php" class="logout-btn">Logout</a>
  </div>
</div>

<div class="container">

  <!-- STATS -->
  <div class="stats">
    <div class="stat-card">
      <div class="stat-val"><?= $stats['total'] ?></div>
      <div class="stat-lbl">Total Inquiries</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#F5A623"><?= $stats['new_count'] ?></div>
      <div class="stat-lbl">New / Pending</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#3B82F6"><?= $stats['contacted'] ?></div>
      <div class="stat-lbl">Contacted</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#10B981"><?= $stats['enrolled'] ?></div>
      <div class="stat-lbl">Enrolled</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#A78BFA"><?= $stats['today'] ?></div>
      <div class="stat-lbl">Today</div>
    </div>
  </div>

  <!-- FILTERS -->
  <div class="filters">
    <div class="filter-tabs">
      <?php foreach (['all'=>'All','new'=>'🟡 New','contacted'=>'🔵 Contacted','enrolled'=>'🟢 Enrolled','closed'=>'⚫ Closed'] as $k=>$v): ?>
        <a href="?status=<?= $k ?>&q=<?= urlencode($search) ?>"
           class="tab <?= $filterStatus===$k?'active':'' ?>"><?= $v ?></a>
      <?php endforeach; ?>
    </div>
    <form class="search-wrap" method="GET" action="">
      <input type="hidden" name="status" value="<?= htmlspecialchars($filterStatus) ?>"/>
      <input class="search-inp" type="text" name="q" placeholder="Search name / phone..." value="<?= htmlspecialchars($search) ?>"/>
      <button type="submit" class="search-btn">Search</button>
    </form>
  </div>

  <!-- TABLE -->
  <div class="table-wrap">
    <?php if (empty($inquiries)): ?>
      <div class="empty">
        <div class="empty-ico">📭</div>
        <p>No inquiries found.</p>
      </div>
    <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th class="hide-mob">Grade</th>
          <th class="hide-mob">Program</th>
          <th class="hide-mob">Message</th>
          <th>Status</th>
          <th class="hide-mob">Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($inquiries as $row): ?>
        <tr>
          <td style="color:rgba(255,255,255,.3);font-size:.78rem">#<?= $row['id'] ?></td>
          <td class="name-cell"><?= htmlspecialchars($row['name']) ?></td>
          <td class="phone-cell">
            <a href="tel:<?= htmlspecialchars($row['phone']) ?>">
              <?= htmlspecialchars($row['phone']) ?>
            </a>
          </td>
          <td class="hide-mob" style="color:rgba(255,255,255,.6)"><?= htmlspecialchars($row['grade'] ?: '—') ?></td>
          <td class="hide-mob" style="color:rgba(255,255,255,.6);font-size:.82rem"><?= htmlspecialchars($row['type'] ?: '—') ?></td>
          <td class="msg-cell hide-mob" title="<?= htmlspecialchars($row['message']) ?>">
            <?= htmlspecialchars($row['message'] ?: '—') ?>
          </td>
          <td>
            <span class="badge" style="background:<?= $statusColors[$row['status']] ?>22;color:<?= $statusColors[$row['status']] ?>;border:1px solid <?= $statusColors[$row['status']] ?>44">
              <?= $statusLabels[$row['status']] ?>
            </span>
          </td>
          <td class="date-cell hide-mob">
            <?= date('d M Y', strtotime($row['created_at'])) ?><br/>
            <span style="font-size:.75rem"><?= date('h:i A', strtotime($row['created_at'])) ?></span>
          </td>
          <td>
            <div class="actions">
              <form method="POST" style="display:flex;gap:6px;align-items:center">
                <input type="hidden" name="id" value="<?= $row['id'] ?>"/>
                <select name="status" class="status-sel">
                  <?php foreach ($statusLabels as $sv=>$sl): ?>
                    <option value="<?= $sv ?>" <?= $row['status']===$sv?'selected':'' ?>><?= $sl ?></option>
                  <?php endforeach; ?>
                </select>
                <button type="submit" name="update_status" class="save-btn">✓</button>
              </form>
              <form method="POST" onsubmit="return confirm('Delete this inquiry?')">
                <input type="hidden" name="delete_id" value="<?= $row['id'] ?>"/>
                <button type="submit" class="del-btn">✕</button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <?php if ($totalPages > 1): ?>
    <div class="pagination">
      <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <a href="?status=<?= $filterStatus ?>&q=<?= urlencode($search) ?>&page=<?= $i ?>"
           class="pag-btn <?= $page===$i?'active':'' ?>"><?= $i ?></a>
      <?php endfor; ?>
    </div>
    <?php endif; ?>
    <?php endif; ?>
  </div>

  <p style="text-align:center;color:rgba(255,255,255,.2);font-size:.78rem;margin-top:20px;">
    Showing <?= count($inquiries) ?> of <?= $totalRows ?> inquiries
  </p>
</div>
</body>
</html>
