<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	header('Allow: POST');
	header('Content-Type: application/json');
	echo json_encode(['error' => 'requests are not allowed.']);
	exit;
}


$validToken = '0547ac8e-8914-4aa0-8497-e26ef0ca1130';

$headers = getallheaders();
$token = $headers['X-Api-Key'] ?? null;

if (!$token || $token !== $validToken) {
	http_response_code(401);
	header('Content-Type: application/json');
	echo json_encode(['error' => 'Unauthorized: Invalid or missing API token.']);
	exit;
}

$requestUri = $_SERVER['REQUEST_URI'];
$cleanUri = strtok($requestUri, '?');
$route = str_replace('/api/v1/', '', $cleanUri);
define('SHORTINIT', true);
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

header('Content-Type: application/json');


switch ($route) {
	case 'orders/':
		global $wpdb;
		$offset = 0;
		$limit = 10;
		$page = 1;
		$lastIdQuery = '';
		if (isset($_POST['page']) && $_POST['page']) {
			$page = intval($_POST['page']);
			$offset = ($_POST['page'] - 1) * $limit;
		}

		if (isset($_POST['limit']) && $_POST['limit']) {
			$limit = $_POST['limit'];
		}

		if (isset($_POST['last_id']) && $_POST['last_id']) {
			$last_id = $_POST['last_id'];
			$lastIdQuery = "AND  a.id > '$last_id'";
		}

		$order_dir = "DESC";
		$order_by = "a.id";
		$table_forms = $wpdb->prefix . 'customer_orders';


		$result_total = $wpdb->get_row("SELECT COUNT(*) as total FROM $table_forms a
        where 1=1
$lastIdQuery
        ");

		$result_forms = $wpdb->get_results(
			$wpdb->prepare("SELECT a.*
            FROM $table_forms a
            WHERE 1=%d
            $lastIdQuery
            ORDER BY $order_by $order_dir
            LIMIT $limit OFFSET $offset
            ", [1])
		);
		foreach ($result_forms as $result_form) {
			$result_form->user_info = json_decode($result_form->user_info, true);
			$result_form->order_info = json_decode($result_form->order_info, true);
		}

		$totalPages = ceil($result_total->total / $limit);
		$pagination = array(
			'currentPage' => max(1, $page),
			'totalPage' => $totalPages,
			'perPage' => (int)$limit,
			'totalItems' => (int)$result_total->total,
		);
		echo json_encode(['status' => 'ok', "pagination" => $pagination, 'data' => $result_forms], JSON_UNESCAPED_UNICODE);
		break;
	case 'purches/':
		global $wpdb;
		$orders_table   = $wpdb->prefix . 'purches';
		$products_table = $wpdb->prefix . 'purches_products';
		$page    = max(1, intval($_POST['page'] ?? 1));
		$limit   = max(1, intval($_POST['limit'] ?? 10));
		$offset  = ($page - 1) * $limit;
		$last_id = isset($_POST['last_id']) ? intval($_POST['last_id']) : 0;
		$where_clause = "WHERE 1=1";
		$params = [];

		if ($last_id > 0) {
			$where_clause .= " AND id > %d";
			$params[] = $last_id;
		}
		$total_query = "SELECT COUNT(*) FROM $orders_table $where_clause";
		$total       = $wpdb->get_var($wpdb->prepare($total_query, ...$params));
		$order_query = "
		SELECT * FROM $orders_table
		$where_clause
		ORDER BY id DESC
		LIMIT %d OFFSET %d
	";
		$params[] = $limit;
		$params[] = $offset;
		$orders = $wpdb->get_results($wpdb->prepare($order_query, ...$params));
		foreach ($orders as &$order) {
			// گروه‌بندی اطلاعات فردی
			$order->user_info = [
				'full_name'   => $order->full_name,
				'company_name'=> $order->company_name,
				'phone'       => $order->phone,
				'email'       => $order->email,
				'location'    => $order->location,
				'city'        => $order->city,
				'message'     => $order->message,
				'created_at'  => $order->created_at,
			];

			$order->products = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT product_type, product_brand, product_meterage
				 FROM $products_table
				 WHERE order_id = %d",
					$order->id
				)
			);
		}
		$response = [
			'status' => 'ok',
			'pagination' => [
				'currentPage' => $page,
				'totalPage'   => ceil($total / $limit),
				'perPage'     => $limit,
				'totalItems'  => (int) $total,
			],
			'data' => $orders
		];

		echo json_encode($response, JSON_UNESCAPED_UNICODE);
		break;

	// case 'forms/submit':
	//     echo json_encode(['status' => 'ok', 'message' => 'Form submitted']);
	//     break;

	default:
		http_response_code(404);
		echo json_encode(['error' => 'Route not found']);
		break;
}
exit;
