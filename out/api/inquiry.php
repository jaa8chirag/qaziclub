<?php
/**
 * QAZI CLUB — Official Artist CRM & Inquiries API
 * Handles lead collection, CRM listing, status updates, and CSV export.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Pin");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

date_default_timezone_set('Asia/Kolkata');

$DATA_DIR = __DIR__ . '/data';
if (!file_exists($DATA_DIR)) {
    @mkdir($DATA_DIR, 0755, true);
}

$DB_FILE = $DATA_DIR . '/crm_inquiries.sqlite';
$JSON_FILE = $DATA_DIR . '/inquiries_fallback.json';
$ADMIN_PIN = 'qazi2026';

// Helper: Open SQLite connection or return null
function getDb($dbFile) {
    if (class_exists('PDO')) {
        try {
            $pdo = new PDO("sqlite:" . $dbFile);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS inquiries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source TEXT,
                    name TEXT,
                    email TEXT,
                    phone TEXT,
                    city TEXT,
                    category TEXT,
                    event_date TEXT,
                    slot_or_duration TEXT,
                    expected_guests TEXT,
                    budget TEXT,
                    message TEXT,
                    status TEXT DEFAULT 'new',
                    notes TEXT DEFAULT '',
                    ip_address TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            ");
            return $pdo;
        } catch (Exception $e) {
            return null;
        }
    }
    return null;
}

$pdo = getDb($DB_FILE);

// Read Input Payload
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($data['action']) ? $data['action'] : '');

// -------------------------------------------------------------
// HELPER: Send Email Notification to info@qaziclub.com
// -------------------------------------------------------------
function sendContactNotificationEmail($name, $email, $phone, $city, $category, $message, $source, $now) {
    $to = 'info@qaziclub.com';
    $senderName = $name ? $name : 'Website Visitor';
    $subject = "New Contact Inquiry from {$senderName} — QAZI CLUB";

    $replyTo = !empty($email) ? $email : 'info@qaziclub.com';

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: Qazi Club Portal <info@qaziclub.com>';
    $headers[] = 'Reply-To: ' . ($name ? "{$name} <{$replyTo}>" : $replyTo);
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    $safeName = htmlspecialchars($name ?: 'N/A');
    $safeEmail = htmlspecialchars($email ?: 'N/A');
    $safePhone = htmlspecialchars($phone ?: 'N/A');
    $safeCity = htmlspecialchars($city ?: 'N/A');
    $safeCategory = htmlspecialchars($category ?: 'Direct Contact');
    $safeMessage = nl2br(htmlspecialchars($message ?: 'No message text provided'));
    $safeSource = htmlspecialchars($source ?: 'Contact Form');

    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Contact Inquiry</title>
</head>
<body style="margin:0; padding:20px; background-color:#FAF8F5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#141312;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#FFFFFF; border:2px solid #D8AE56; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg, #1A1815 0%, #24211D 100%); padding:28px 24px; text-align:center; border-bottom:3px solid #D8AE56;">
        <h1 style="margin:0; color:#F3D084; font-size:24px; letter-spacing:2px; font-weight:900;">QAZI TOUQEER</h1>
        <p style="margin:4px 0 0; color:#D7D0C0; font-size:12px; text-transform:uppercase; letter-spacing:1.5px;">New Website Contact Inquiry</p>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding:28px 24px;">
        <div style="background-color:#FAF5EC; border-left:4px solid #D8AE56; padding:12px 16px; border-radius:6px; margin-bottom:24px;">
          <p style="margin:0; font-size:13px; color:#87672D; font-weight:bold; text-transform:uppercase;">Source: {$safeSource}</p>
          <p style="margin:4px 0 0; font-size:12px; color:#524E46;">Received on {$now} (IST)</p>
        </div>

        <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size:14px; color:#141312; border-collapse:collapse;">
          <tr style="border-bottom:1px solid #F0ECE4;">
            <td width="35%" style="color:#7A7366; font-weight:bold; text-transform:uppercase; font-size:11px;">Client Name</td>
            <td style="font-weight:bold; color:#111111;">{$safeName}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0ECE4;">
            <td style="color:#7A7366; font-weight:bold; text-transform:uppercase; font-size:11px;">Email Address</td>
            <td><a href="mailto:{$safeEmail}" style="color:#9B7018; text-decoration:none; font-weight:bold;">{$safeEmail}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #F0ECE4;">
            <td style="color:#7A7366; font-weight:bold; text-transform:uppercase; font-size:11px;">Phone / WhatsApp</td>
            <td style="font-weight:bold;">{$safePhone}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0ECE4;">
            <td style="color:#7A7366; font-weight:bold; text-transform:uppercase; font-size:11px;">City / Location</td>
            <td>{$safeCity}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0ECE4;">
            <td style="color:#7A7366; font-weight:bold; text-transform:uppercase; font-size:11px;">Subject / Purpose</td>
            <td style="color:#9B7018; font-weight:bold;">{$safeCategory}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="margin-top:24px;">
          <h3 style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#7A7366;">Client Message:</h3>
          <div style="background-color:#FAF8F5; border:1px solid #E6DFD1; border-radius:10px; padding:16px; font-size:14px; line-height:1.6; color:#221F1C;">
            {$safeMessage}
          </div>
        </div>

        <!-- Quick Reply Action -->
        <div style="margin-top:28px; text-align:center;">
          <a href="mailto:{$safeEmail}?subject=Re:%20{$safeCategory}%20-%20Qazi%20Touqeer%20Management" style="display:inline-block; padding:12px 28px; background:linear-gradient(to right, #D8AE56, #B68938); color:#1A1203; text-decoration:none; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:1.5px; border-radius:50px; box-shadow:0 4px 15px rgba(216,174,86,0.3);">
            Reply to {$safeName}
          </a>
        </div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color:#F4EFE6; padding:16px; text-align:center; font-size:11px; color:#87672D; border-top:1px solid #E6DFD1;">
        Official Notification for Qazi Touqeer Management &bull; <a href="https://qaziclub.com/crm/" style="color:#9B7018; font-weight:bold;">View in CRM Dashboard</a>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    return @mail($to, $subject, $html, implode("\r\n", $headers), "-f info@qaziclub.com");
}

// -------------------------------------------------------------
// 1. CRM ADMIN ACTIONS (Protected with PIN)
// -------------------------------------------------------------
if ($action === 'list' || $action === 'update_status' || $action === 'delete' || $action === 'export_csv' || $action === 'test_email') {
    $providedPin = '';
    if (isset($_SERVER['HTTP_X_ADMIN_PIN'])) {
        $providedPin = $_SERVER['HTTP_X_ADMIN_PIN'];
    } elseif (isset($_GET['pin'])) {
        $providedPin = $_GET['pin'];
    } elseif (isset($data['pin'])) {
        $providedPin = $data['pin'];
    }

    if ($providedPin !== $ADMIN_PIN) {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Unauthorized: Invalid Admin PIN']);
        exit;
    }

    // Action: LIST
    if ($action === 'list') {
        header('Content-Type: application/json');
        $rows = [];
        if ($pdo) {
            $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY id DESC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } elseif (file_exists($JSON_FILE)) {
            $rows = json_decode(file_get_contents($JSON_FILE), true) ?: [];
            usort($rows, function($a, $b) {
                return ($b['id'] ?? 0) - ($a['id'] ?? 0);
            });
        }
        echo json_encode(['success' => true, 'count' => count($rows), 'data' => $rows]);
        exit;
    }

    // Action: UPDATE STATUS
    if ($action === 'update_status') {
        header('Content-Type: application/json');
        $id = intval($data['id'] ?? 0);
        $newStatus = trim($data['status'] ?? 'new');
        $notes = trim($data['notes'] ?? '');

        if (!$id) {
            echo json_encode(['success' => false, 'error' => 'Missing inquiry ID']);
            exit;
        }

        if ($pdo) {
            $stmt = $pdo->prepare("UPDATE inquiries SET status = :status, notes = :notes WHERE id = :id");
            $stmt->execute([':status' => $newStatus, ':notes' => $notes, ':id' => $id]);
        } elseif (file_exists($JSON_FILE)) {
            $rows = json_decode(file_get_contents($JSON_FILE), true) ?: [];
            foreach ($rows as &$row) {
                if (($row['id'] ?? 0) === $id) {
                    $row['status'] = $newStatus;
                    $row['notes'] = $notes;
                    break;
                }
            }
            file_put_contents($JSON_FILE, json_encode($rows, JSON_PRETTY_PRINT));
        }

        echo json_encode(['success' => true, 'message' => 'Status updated']);
        exit;
    }

    // Action: DELETE
    if ($action === 'delete') {
        header('Content-Type: application/json');
        $id = intval($data['id'] ?? 0);
        if (!$id) {
            echo json_encode(['success' => false, 'error' => 'Missing inquiry ID']);
            exit;
        }

        if ($pdo) {
            $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = :id");
            $stmt->execute([':id' => $id]);
        } elseif (file_exists($JSON_FILE)) {
            $rows = json_decode(file_get_contents($JSON_FILE), true) ?: [];
            $rows = array_values(array_filter($rows, function($r) use ($id) {
                return ($r['id'] ?? 0) !== $id;
            }));
            file_put_contents($JSON_FILE, json_encode($rows, JSON_PRETTY_PRINT));
        }

        echo json_encode(['success' => true, 'message' => 'Inquiry deleted']);
        exit;
    }

    // Action: EXPORT CSV
    if ($action === 'export_csv') {
        $rows = [];
        if ($pdo) {
            $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY id DESC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } elseif (file_exists($JSON_FILE)) {
            $rows = json_decode(file_get_contents($JSON_FILE), true) ?: [];
        }

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=QaziClub_Leads_' . date('Y-m-d_His') . '.csv');
        $output = fopen('php://output', 'w');
        fputcsv($output, ['ID', 'Date/Time', 'Source', 'Client Name', 'Phone', 'Email', 'Category', 'City', 'Event Date', 'Duration/Slot', 'Guests', 'Status', 'Message', 'Notes']);
        foreach ($rows as $r) {
            fputcsv($output, [
                $r['id'] ?? '',
                $r['created_at'] ?? '',
                $r['source'] ?? '',
                $r['name'] ?? '',
                $r['phone'] ?? '',
                $r['email'] ?? '',
                $r['category'] ?? '',
                $r['city'] ?? '',
                $r['event_date'] ?? '',
                $r['slot_or_duration'] ?? '',
                $r['expected_guests'] ?? '',
                $r['status'] ?? 'new',
                $r['message'] ?? '',
                $r['notes'] ?? ''
            ]);
        }
        fclose($output);
        exit;
    }

    // Action: TEST EMAIL
    if ($action === 'test_email') {
        header('Content-Type: application/json');
        $sent = sendContactNotificationEmail(
            'Admin Test Lead',
            'test@qaziclub.com',
            '+91 99999 99999',
            'Mumbai, India',
            'Test Inquiry Notification',
            'This is a test notification confirming email delivery to info@qaziclub.com from the Qazi Club Portal API.',
            'Admin Test Diagnostic',
            date('Y-m-d H:i:s')
        );
        echo json_encode([
            'success' => $sent,
            'message' => $sent ? 'Test email dispatched successfully to info@qaziclub.com' : 'Mail transport reported an error during dispatch.',
            'target' => 'info@qaziclub.com'
        ]);
        exit;
    }
}

// -------------------------------------------------------------
// 2. SUBMIT NEW INQUIRY (From Footer / Contact / Booking Forms)
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $name = trim($data['name'] ?? $data['repName'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $source = trim($data['source'] ?? 'Website Inquiry');
    $category = trim($data['category'] ?? $data['subject'] ?? 'General Inquiry');
    $city = trim($data['city'] ?? $data['address'] ?? '');
    $eventDate = trim($data['event_date'] ?? $data['perfDate'] ?? '');
    $slotOrDuration = trim($data['slot_or_duration'] ?? $data['time_slot'] ?? $data['timeSlot'] ?? '');
    $expectedGuests = trim($data['expected_guests'] ?? $data['expectedGuests'] ?? '');
    $budget = trim($data['budget'] ?? $data['currency'] ?? '');
    $message = trim($data['message'] ?? $data['notes'] ?? '');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

    // Fallback if client occasion provided
    if (!empty($data['org_name']) || !empty($data['orgName'])) {
        $org = trim($data['org_name'] ?? $data['orgName']);
        $message = "Entity/Organization: " . $org . ($message ? "\n\n" . $message : '');
    }

    if (empty($name) && empty($email) && empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide at least Name, Email or Phone']);
        exit;
    }

    $insertedId = 0;
    $now = date('Y-m-d H:i:s');

    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO inquiries (source, name, email, phone, city, category, event_date, slot_or_duration, expected_guests, budget, message, status, notes, ip_address, created_at)
            VALUES (:source, :name, :email, :phone, :city, :category, :event_date, :slot_or_duration, :expected_guests, :budget, :message, 'new', '', :ip, :created_at)
        ");
        $stmt->execute([
            ':source' => $source,
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':city' => $city,
            ':category' => $category,
            ':event_date' => $eventDate,
            ':slot_or_duration' => $slotOrDuration,
            ':expected_guests' => $expectedGuests,
            ':budget' => $budget,
            ':message' => $message,
            ':ip' => $ip,
            ':created_at' => $now
        ]);
        $insertedId = intval($pdo->lastInsertId());
    } else {
        // Fallback to JSON storage
        $rows = [];
        if (file_exists($JSON_FILE)) {
            $rows = json_decode(file_get_contents($JSON_FILE), true) ?: [];
        }
        $insertedId = count($rows) > 0 ? (max(array_column($rows, 'id')) + 1) : 1;
        $newRow = [
            'id' => $insertedId,
            'source' => $source,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'city' => $city,
            'category' => $category,
            'event_date' => $eventDate,
            'slot_or_duration' => $slotOrDuration,
            'expected_guests' => $expectedGuests,
            'budget' => $budget,
            'message' => $message,
            'status' => 'new',
            'notes' => '',
            'ip_address' => $ip,
            'created_at' => $now
        ];
        $rows[] = $newRow;
        file_put_contents($JSON_FILE, json_encode($rows, JSON_PRETTY_PRINT));
    }

    // Check if inquiry originates from Contact Form or Footer -> send email to info@qaziclub.com
    $isContactForm = (
        stripos($source, 'contact') !== false ||
        stripos($source, 'footer') !== false ||
        stripos($source, 'Quick Contact') !== false ||
        empty($eventDate)
    );

    $emailSent = false;
    if ($isContactForm) {
        $emailSent = sendContactNotificationEmail(
            $name,
            $email,
            $phone,
            $city,
            $category,
            $message,
            $source,
            $now
        );
    }

    echo json_encode([
        'success' => true,
        'message' => $isContactForm ? 'Your message has been sent to info@qaziclub.com and recorded in CRM.' : 'Your booking inquiry has been recorded in CRM.',
        'email_sent' => $emailSent,
        'id' => $insertedId
    ]);
    exit;
}

// Default fallback
header('Content-Type: application/json');
echo json_encode(['status' => 'active', 'service' => 'Qazi Club CRM API v1.0']);

