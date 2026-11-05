<?php
/**
 * Direct Standalone PHP CRM Fallback Portal
 * Accessible at https://qaziclub.com/crm/admin.php
 */
session_start();
date_default_timezone_set('Asia/Kolkata');

$DATA_DIR = __DIR__ . '/../api/data';
$DB_FILE = $DATA_DIR . '/crm_inquiries.sqlite';
$JSON_FILE = $DATA_DIR . '/inquiries_fallback.json';
$ADMIN_PIN = 'qazi2026';

if (isset($_GET['logout'])) {
    unset($_SESSION['qazi_crm_auth']);
    header('Location: admin.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pin'])) {
    if ($_POST['pin'] === $ADMIN_PIN) {
        $_SESSION['qazi_crm_auth'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $error = 'Invalid Admin PIN';
    }
}

$isAuth = !empty($_SESSION['qazi_crm_auth']);

// Helper: Open SQLite
function getDb($dbFile) {
    if (class_exists('PDO')) {
        try {
            $pdo = new PDO("sqlite:" . $dbFile);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (Exception $e) {
            return null;
        }
    }
    return null;
}

$pdo = getDb($DB_FILE);

// Handle Status Change or Delete
if ($isAuth && isset($_GET['action'])) {
    $action = $_GET['action'];
    $id = intval($_GET['id'] ?? 0);
    if ($action === 'delete' && $id) {
        if ($pdo) {
            $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = :id");
            $stmt->execute([':id' => $id]);
        }
        header('Location: admin.php');
        exit;
    }
    if ($action === 'status' && $id && isset($_GET['val'])) {
        $val = trim($_GET['val']);
        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE inquiries SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $val, ':id' => $id]);
        }
        header('Location: admin.php');
        exit;
    }
}

$inquiries = [];
if ($isAuth) {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY id DESC");
        $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } elseif (file_exists($JSON_FILE)) {
        $inquiries = json_decode(file_get_contents($JSON_FILE), true) ?: [];
        usort($inquiries, function($a, $b) { return ($b['id'] ?? 0) - ($a['id'] ?? 0); });
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QAZI CLUB — CRM Admin Desk</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Manrope:wght@300..700&family=Space+Grotesk:wght@400..700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0908; color: #EAE5D9; font-family: 'Manrope', sans-serif; min-height: 100vh; padding-bottom: 40px; }
        .header { background: #141210; border-bottom: 1px solid #292520; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo-title { font-family: 'Bodoni Moda', serif; font-size: 20px; font-weight: 900; color: #FFF; }
        .gold-badge { background: linear-gradient(135deg, #D8AE56, #9B7018); color: #141210; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; }
        .container { max-width: 1200px; margin: 30px auto; padding: 0 16px; }
        .card { background: #141210; border: 1px solid #292520; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
        .card-new { border-color: rgba(216, 174, 86, 0.5); box-shadow: 0 4px 20px rgba(216, 174, 86, 0.1); }
        .wa-btn { background: #25D366; color: #000; font-weight: 800; padding: 6px 12px; border-radius: 8px; text-decoration: none; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; }
        .btn { padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: bold; text-decoration: none; cursor: pointer; border: none; }
        .btn-gold { background: #D8AE56; color: #141210; }
        .login-box { max-width: 400px; margin: 80px auto; background: #141210; border: 1px solid #D8AE56; border-radius: 20px; padding: 32px; text-align: center; }
        input[type="password"], input[type="text"] { width: 100%; background: #221F1C; border: 1px solid #38332C; color: #FFF; padding: 12px; border-radius: 10px; margin: 12px 0; outline: none; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #221F1C; font-size: 13px; }
        th { color: #A8A29E; font-size: 11px; text-transform: uppercase; font-family: 'Space Grotesk', sans-serif; }
    </style>
</head>
<body>
<?php if (!$isAuth): ?>
    <div class="login-box">
        <h2 style="font-family:'Bodoni Moda', serif; font-size:24px; color:#FFF; margin-bottom:8px;">QAZI CLUB CRM</h2>
        <p style="font-size:12px; color:#A8A29E; margin-bottom:20px;">Enter Admin PIN to access client leads</p>
        <?php if (!empty($error)) echo "<p style='color:#EF4444; font-size:12px;'>$error</p>"; ?>
        <form method="POST">
            <input type="password" name="pin" placeholder="Enter PIN (e.g. qazi2026)" required autofocus>
            <button type="submit" class="btn btn-gold" style="width:100%; padding:14px;">Unlock Dashboard</button>
        </form>
    </div>
<?php else: ?>
    <div class="header">
        <div style="display:flex; align-items:center; gap:12px;">
            <span class="logo-title">QAZI CLUB CRM</span>
            <span class="gold-badge"><?= count($inquiries) ?> Leads</span>
        </div>
        <div style="display:flex; gap:10px;">
            <a href="../api/inquiry.php?action=export_csv&pin=<?= $ADMIN_PIN ?>" class="btn btn-gold">Export CSV</a>
            <a href="?logout=1" class="btn" style="background:#221F1C; color:#EF4444;">Lock</a>
        </div>
    </div>
    <div class="container">
        <h2 style="font-size:18px; color:#D8AE56; font-family:'Space Grotesk', sans-serif; margin-bottom:16px;">ALL INQUIRIES &amp; BOOKING REQUESTS</h2>
        <?php if (empty($inquiries)): ?>
            <div class="card" style="text-align:center; padding:40px; color:#A8A29E;">No inquiries registered yet. When a visitor submits a form on QaziClub.com, it will immediately appear here.</div>
        <?php else: ?>
            <?php foreach ($inquiries as $row): 
                $cleanPhone = preg_replace('/[^0-9]/', '', $row['phone'] ?? '');
                if (strlen($cleanPhone) === 10) $cleanPhone = '91' . $cleanPhone;
                $isNew = ($row['status'] ?? 'new') === 'new';
            ?>
            <div class="card <?= $isNew ? 'card-new' : '' ?>">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                    <div>
                        <span style="font-size:11px; background:#221F1C; padding:2px 8px; border-radius:6px; color:#D8AE56; font-family:'Space Grotesk', sans-serif;">#<?= $row['id'] ?> • <?= htmlspecialchars($row['source'] ?? '') ?></span>
                        <span style="font-size:11px; background:#2A2318; padding:2px 8px; border-radius:6px; color:#F3D084; font-weight:bold; margin-left:6px;"><?= htmlspecialchars($row['category'] ?? '') ?></span>
                        <h3 style="font-size:18px; color:#FFF; margin-top:6px; font-weight:bold;"><?= htmlspecialchars($row['name'] ?? 'Unnamed Lead') ?></h3>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; color:#A8A29E; display:block; margin-bottom:6px;"><?= htmlspecialchars($row['created_at'] ?? '') ?></span>
                        <?php 
                            $st = strtolower($row['status'] ?? 'new');
                            $stColor = ($st === 'new') ? '#10B981' : (($st === 'closed') ? '#EF4444' : '#F59E0B');
                        ?>
                        <select onchange="window.location.href='?action=status&id=<?= $row['id'] ?>&val=' + this.value" style="background:#1C1A17; color:<?= $stColor ?>; border:2px solid <?= $stColor ?>; font-size:11px; font-weight:bold; padding:4px 8px; border-radius:8px; text-transform:uppercase; cursor:pointer;">
                            <option value="new" <?= ($st === 'new') ? 'selected' : '' ?> style="color:#10B981;">🟢 New</option>
                            <option value="in-progress" <?= ($st === 'in-progress' || $st === 'contacted') ? 'selected' : '' ?> style="color:#F59E0B;">🟡 In Progress</option>
                            <option value="closed" <?= ($st === 'closed') ? 'selected' : '' ?> style="color:#EF4444;">🔴 Closed</option>
                        </select>
                        <a href="?action=delete&id=<?= $row['id'] ?>" onclick="return confirm('Delete inquiry #<?= $row['id'] ?>?');" style="color:#EF4444; font-size:11px; margin-left:8px; text-decoration:none;">Delete</a>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:12px; background:#1C1A17; padding:12px; border-radius:10px;">
                    <div><b style="color:#A8A29E;">Phone:</b> <span style="color:#FFF;"><?= htmlspecialchars($row['phone'] ?? 'N/A') ?></span> <?php if ($cleanPhone): ?><a class="wa-btn" href="https://wa.me/<?= $cleanPhone ?>" target="_blank">WhatsApp</a><?php endif; ?></div>
                    <div><b style="color:#A8A29E;">Email:</b> <a href="mailto:<?= htmlspecialchars($row['email'] ?? '') ?>" style="color:#D8AE56;"><?= htmlspecialchars($row['email'] ?? 'N/A') ?></a></div>
                    <div><b style="color:#A8A29E;">City:</b> <span style="color:#FFF;"><?= htmlspecialchars($row['city'] ?? 'N/A') ?></span></div>
                    <div><b style="color:#A8A29E;">Date / Slot:</b> <span style="color:#F3D084;"><?= htmlspecialchars($row['event_date'] ?? '') ?> <?= htmlspecialchars($row['slot_or_duration'] ?? '') ?></span></div>
                </div>
                <?php if (!empty($row['message'])): ?>
                <div style="margin-top:12px; font-size:12px; color:#D5CEBF; background:#111; padding:10px; border-radius:8px;">
                    <b style="color:#D8AE56; display:block; font-size:11px; margin-bottom:4px;">MESSAGE / REQUIREMENT:</b>
                    <?= nl2br(htmlspecialchars($row['message'])) ?>
                </div>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
<?php endif; ?>
</body>
</html>

