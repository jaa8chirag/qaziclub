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
// 1. CRM ADMIN ACTIONS (Protected with PIN)
// -------------------------------------------------------------
if ($action === 'list' || $action === 'update_status' || $action === 'delete' || $action === 'export_csv') {
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

    echo json_encode([
        'success' => true,
        'message' => 'Your inquiry has been received by Qazi Touqeer Management CRM.',
        'id' => $insertedId
    ]);
    exit;
}

// Default fallback
header('Content-Type: application/json');
echo json_encode(['status' => 'active', 'service' => 'Qazi Club CRM API v1.0']);
