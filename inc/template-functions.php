<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Starter_Theme
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function starter_theme_body_classes($classes)
{
	// Adds a class of hfeed to non-singular pages.
	if (!is_singular()) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if (!is_active_sidebar('sidebar-1')) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}

add_filter('body_class', 'starter_theme_body_classes');

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function starter_theme_pingback_header()
{
	if (is_singular() && pings_open()) {
		printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
	}
}

add_action('wp_head', 'starter_theme_pingback_header');

// Changing excerpt length
function new_excerpt_length($length)
{
	return 40;
}

add_filter('excerpt_length', 'new_excerpt_length');

// Changing excerpt more
function new_excerpt_more($more)
{
	return '...';
}

add_filter('excerpt_more', 'new_excerpt_more');

// Support SVG
function add_file_types_to_uploads($file_types)
{
	$new_filetypes = array();
	$new_filetypes['svg'] = 'image/svg+xml';
	$file_types = array_merge($file_types, $new_filetypes);
	return $file_types;
}

add_filter('upload_mimes', 'add_file_types_to_uploads');

// JQuery Replace
function replace_jquery()
{
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_register_script('jquery', get_template_directory_uri() . '/assets/scripts/jquery-3.7.0.min.js');
		wp_enqueue_script('jquery');
	}
}

add_action('init', 'replace_jquery');

// Prevent Emoji from loading on the front-end
function disable_emoji_feature()
{
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('admin_print_styles', 'print_emoji_styles');
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji');
	remove_filter('embed_head', 'print_emoji_detection_script');
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
	add_filter('option_use_smilies', '__return_false');
}

function disable_emojis_tinymce($plugins)
{
	if (is_array($plugins)) {
		$plugins = array_diff($plugins, array('wpemoji'));
	}
	return $plugins;
}

add_action('init', 'disable_emoji_feature');

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css()
{
	wp_dequeue_style('wp-block-library');
	wp_dequeue_style('wp-block-library-theme');
	wp_dequeue_style('wc-blocks-style'); // Remove WooCommerce block CSS
}

add_action('wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100);

// remove classic-themes.min.css
add_action('wp_enqueue_scripts', 'deregister_styles', 10);
function deregister_styles()
{
	wp_dequeue_style('classic-theme-styles');
}

// Disable global-styles-inline-css in WordPress
add_action('wp_enqueue_scripts', 'remove_global_styles');
function remove_global_styles()
{
	wp_dequeue_style('global-styles');
}

// Custom filter to remove default image sizes from WordPress.
function remove_default_image_sizes($sizes)
{
	unset($sizes['thumbnail']);       // Remove Thumbnail (150 x 150 hard cropped)
	unset($sizes['medium']);          // Remove Medium resolution (300 x 300 max height 300px)
	unset($sizes['medium_large']);    // Remove Medium Large (added in WP 4.4) resolution (768 x 0 infinite height)
	unset($sizes['large']);           // Remove Large resolution (1024 x 1024 max height 1024px)

	unset($sizes['1536x1536']);
	unset($sizes['2048x2048']);

	return $sizes;
}

add_filter('intermediate_image_sizes_advanced', 'remove_default_image_sizes');

function add_custom_columns($columns)
{
	$columns['store'] = __('انبار');
	$columns['price'] = __('قیمت');
	return $columns;
}

add_filter('manage_price_list_posts_columns', 'add_custom_columns');

function display_custom_column_data($column, $post_id)
{
	switch ($column) {
		case 'store':
			$store = get_field('store', $post_id);
			switch ($store) {
				case 'store_yes':
					echo 'موجود';
					break;
				case 'store_no':
					echo 'ناموجود';
					break;
				case 'store_us':
					echo 'موجود در انبار ما';
					break;
				case 'store_company':
					echo 'موجود در انبار شرکت';
					break;
				default:
					echo 'نامشخص';
			}
			break;
		case 'price':
			$price = get_field('price', $post_id);
			echo $price ? $price : 'بدون قیمت';
			break;
	}
}

add_action('manage_price_list_posts_custom_column', 'display_custom_column_data', 10, 2);

function sortable_custom_columns($columns)
{
	$columns['store'] = 'store';
	$columns['price'] = 'price';
	return $columns;
}

add_filter('manage_edit-price_list_sortable_columns', 'sortable_custom_columns');

function custom_column_orderby($query)
{
	if (!is_admin()) {
		return;
	}

	$orderby = $query->get('orderby');
	if ('store' == $orderby) {
		$query->set('meta_key', 'store');
		$query->set('orderby', 'meta_value');
	} elseif ('price' == $orderby) {
		$query->set('meta_key', 'price');
		$query->set('orderby', 'meta_value_num'); // assuming price is a numeric field
	}
}

add_action('pre_get_posts', 'custom_column_orderby');


// Post type quick edit
function display_quick_edit_custom($column_name, $post_type)
{
	if ($post_type == 'price_list') {
		switch ($column_name) {
			case 'store':
				?>
				<fieldset class="inline-edit-col-right">
					<div class="inline-edit-col">
						<label>
							<span class="title"><?php _e('Store'); ?></span>
							<select name="store">
								<option value="store_yes"><?php _e('موجود'); ?></option>
								<option value="store_no"><?php _e('ناموجود'); ?></option>
								<option value="store_us"><?php _e('موجود در انبار ما'); ?></option>
								<option value="store_company"><?php _e('موجود در انبار شرکت'); ?></option>
							</select>
						</label>
					</div>
				</fieldset>
				<?php
				break;
			case 'price':
				?>
				<fieldset class="inline-edit-col-right">
					<div class="inline-edit-col">
						<label>
							<span class="title"><?php _e('Price'); ?></span>
							<input type="text" name="price" value="">
						</label>
					</div>
				</fieldset>
				<?php
				break;
		}
	}
}

add_action('quick_edit_custom_box', 'display_quick_edit_custom', 10, 2);

function save_quick_edit_custom($post_id)
{
	if (get_post_type($post_id) == 'price_list') {
		if (isset($_POST['store'])) {
			update_post_meta($post_id, 'store', sanitize_text_field($_POST['store']));
		}
		if (isset($_POST['price'])) {
			update_post_meta($post_id, 'price', sanitize_text_field($_POST['price']));
		}
	}
}

add_action('save_post', 'save_quick_edit_custom');

function enqueue_inline_quick_edit_script()
{
	global $post_type;
	if ($post_type == 'price_list') {
		?>
		<script type="text/javascript">
			jQuery(document).ready(function ($) {
				var wp_inline_edit_function = inlineEditPost.edit;
				inlineEditPost.edit = function (post_id) {
					wp_inline_edit_function.apply(this, arguments);

					if (typeof (post_id) == 'object') {
						post_id = this.getId(post_id);
					}

					var $edit_row = $('#edit-' + post_id);
					var $post_row = $('#post-' + post_id);

					var store = $post_row.find('.column-store').text().trim();
					var price = $post_row.find('.column-price').text().trim();

					$edit_row.find('select[name="store"]').val(store);
					$edit_row.find('input[name="price"]').val(price);
				};
			});
		</script>
		<?php
	}
}

add_action('admin_footer', 'enqueue_inline_quick_edit_script');

function add_custom_quick_edit_data()
{
	global $post;
	if (isset($post) && $post->post_type == 'price_list') {
		$store = get_post_meta($post->ID, 'store', true);
		$price = get_post_meta($post->ID, 'price', true);
		?>
		<script type="text/javascript">
			function set_quick_edit_data(post_id) {
				var $ = jQuery;
				var store = '<?php echo esc_js($store); ?>';
				var price = '<?php echo esc_js($price); ?>';
				$('#edit-' + post_id + ' select[name="store"]').val(store);
				$('#edit-' + post_id + ' input[name="price"]').val(price);
			}
		</script>
		<?php
	}
}

add_action('admin_footer', 'add_custom_quick_edit_data');

// Support SVG
function cc_mime_types($mimes)
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

add_filter('upload_mimes', 'cc_mime_types');

function fix_svg()
{
	echo '<style type="text/css">
        .attachment-266x266, .thumbnail img {
             width: 100% !important;
             height: auto !important;
        }
        </style>';
}

add_action('admin_head', 'fix_svg');


// reading_time
if (!function_exists('utf8_str_word_count')) {
	function utf8_str_word_count($string, $format = 0, $charlist = null)
	{
		if ($charlist === null) {
			$regex = '/\\pL[\\pL\\p{Mn}\'-]*/u';
		} else {
			$split = array_map(
				'preg_quote',
				preg_split('//u', $charlist, -1, PREG_SPLIT_NO_EMPTY)
			);
			$regex = sprintf(
				'/(\\pL|%1$s)([\\pL\\p{Mn}\'-]|%1$s)*/u',
				implode('|', $split)
			);
		}
		switch ($format) {
			default:
			case 0:
				return preg_match_all($regex, $string);
			case 1:
				$results = null;
				preg_match_all($regex, $string, $results);
				return $results[0];
			case 2:
				$results = null;
				preg_match_all($regex, $string, $results, PREG_OFFSET_CAPTURE);
				return empty ($results[0])
					? array()
					: array_combine(
						array_map('end', $results[0]),
						array_map('reset', $results[0])
					);
		}
	}
}
function reading_time()
{
	$content = get_post_field('post_content', get_the_ID());
	$word_count = utf8_str_word_count(strip_tags($content));
	$readingtime = ceil($word_count / 200);
	if ($readingtime < 1) {
		$totalreadingtime = "کمتر از یک دقیقه";
	} else {
		$totalreadingtime = $readingtime . "دقیقه";
	}
	return $totalreadingtime;
}

// Api Product Sales
function add_five_minute_cron_schedule($schedules)
{
	$schedules['five_minutes'] = [
		'interval' => 300,
		'display' => __('Every 5 Minutes'),
	];
	return $schedules;
}

add_filter('cron_schedules', 'add_five_minute_cron_schedule');

function schedule_cron_for_crm_data()
{
	if (wp_next_scheduled('update_crm_data_event')) {
		wp_clear_scheduled_hook('update_crm_data_event');
	}
	wp_schedule_event(time(), 'five_minutes', 'update_crm_data_event');
}

add_action('wp', 'schedule_cron_for_crm_data');

function update_crm_data()
{
	$endpoints = [
		'new' => "https://shahrpanel.com/api/API.php/new",
		'old' => "https://shahrpanel.com/api/API.php/old",
		'damaged' => "https://shahrpanel.com/api/API.php/damaged",
	];

	foreach ($endpoints as $key => $url) {
		$response = wp_remote_post($url, ['timeout' => 15]);

		if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
			$data = wp_remote_retrieve_body($response);

			set_transient("crm_data_{$key}", $data, 300);
			update_option("crm_backup_data_{$key}", $data);
		} else {
			$backup_data = get_option("crm_backup_data_{$key}");
			if ($backup_data) {
				set_transient("crm_data_{$key}", $backup_data, 300);
			}
		}
	}
}

add_action('update_crm_data_event', 'update_crm_data');

function get_crm_data($type)
{
	$data = get_transient("crm_data_{$type}");

	if (!$data) {
		$backup_data = get_option("crm_backup_data_{$type}");
		if ($backup_data) {
			return json_decode($backup_data, true);
		}

		return ['error' => 'Data not available or expired.'];
	}

	return json_decode($data, true);
}

function ajax_get_panel_entity()
{
	$data = get_crm_data('new');
	wp_send_json($data);
}

add_action('wp_ajax_get_panel_entity', 'ajax_get_panel_entity');
add_action('wp_ajax_nopriv_get_panel_entity', 'ajax_get_panel_entity');

// Save API and history
function update_price_list_data()
{
	$price_endpoints = [
		'mammut' => "https://shahrpanel.com/api/API.php/mammutPriceList",
		'kabir' => "https://shahrpanel.com/api/API.php/KabirPriceList",
	];

	foreach ($price_endpoints as $key => $url) {
		$response = wp_remote_post($url, ['timeout' => 15]);

		if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
			$data = wp_remote_retrieve_body($response);
			$product_prices = json_decode($data, true);

			if (is_array($product_prices)) {
				update_option("price_history_{$key}", $product_prices);

				set_transient("latest_price_list_{$key}", $product_prices);
			}
		} else {
			$cached_data = get_option("price_history_{$key}");
			if (!empty($cached_data)) {
				set_transient("latest_price_list_{$key}", $cached_data);
			}
		}
	}
}

add_action('update_price_list_data_event', 'update_price_list_data');

function schedule_price_list_cron()
{
	if (!wp_next_scheduled('update_price_list_data_event')) {
		wp_schedule_event(time(), 'five_minutes', 'update_price_list_data_event');
	}
}

add_action('wp', 'schedule_price_list_cron');

function get_price_list($brand_slug)
{

	$data = get_transient("latest_price_list_{$brand_slug}");

	if (!$data) {
		$data = get_option("price_history_{$brand_slug}", []);
	}

	return $data;
}

//function get_product_price_history($brand_slug, $product_title)
//{
//	$price_history = get_option("price_history_{$brand_slug}", []);
//	return isset($price_history[$product_title]) ? $price_history[$product_title] : [];
//}
//History Price
// افزودن زمان‌بندی جدید برای اجرای کرون جاب هر روز
function add_daily_cron_schedule($schedules)
{
	$schedules['daily'] = [
		'interval' => DAY_IN_SECONDS,
		'display' => __('Every Day'),
	];
	return $schedules;
}

add_filter('cron_schedules', 'add_daily_cron_schedule');

// برنامه‌ریزی کرون جاب برای به‌روزرسانی داده‌های قیمت‌ها
function schedule_price_history_cron()
{
	if (!wp_next_scheduled('update_price_history_event')) {
		wp_schedule_event(time(), 'daily', 'update_price_history_event');
	}
}

add_action('wp', 'schedule_price_history_cron');

// دریافت و ذخیره تاریخچه قیمت‌ها از API
function update_price_history()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'price_history';

	$price_endpoints = [
		'mammut' => "https://shahrpanel.com/api/API.php/mammutPriceList",
		'kabir' => "https://shahrpanel.com/api/API.php/KabirPriceList",
	];

	foreach ($price_endpoints as $brand => $url) {
		$response = wp_remote_get($url, ['timeout' => 15]);

		if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
			$data = json_decode(wp_remote_retrieve_body($response), true);

			if (is_array($data)) {
				foreach ($data as $product) {
					$product_name = sanitize_text_field($product['title']);
					$price = floatval($product['price']);
					$date = current_time('mysql');
					$query = $wpdb->prepare(
						"INSERT INTO $table_name (brand, product_id, price, date) VALUES (%s, %s, %f, %s)",
						$brand,
						$product['productId'],
						$price,
						$date
					);
					$wpdb->query($query);
					delete_transient('price_history_' . sanitize_key($brand));
				}
			}
		}
	}
}

add_action('update_price_history_event', 'update_price_history');

// تابع دریافت تاریخچه قیمت یک محصول خاص
function get_product_price_history($brand, $product_id)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'price_history';

	$price_history = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT date, price FROM $table_name WHERE brand = %s AND product_id = %s ORDER BY date ASC",
			$brand,
			$product_id
		),
		ARRAY_A
	);

	return $price_history;
}

function get_all_product_price_histories($brand)
{
	$cache_key = 'price_history_' . sanitize_key($brand);
	$cached_data = get_transient($cache_key);

	if ($cached_data !== false) {
		return $cached_data;
	}

	global $wpdb;
	$table_name = $wpdb->prefix . 'price_history';

	$results = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT product_id, date, price FROM $table_name WHERE brand = %s ORDER BY product_id, date ASC",
			$brand
		),
		ARRAY_A
	);

	$grouped = [];
	foreach ($results as $row) {
		$grouped[$row['product_id']][] = [
			'date'  => $row['date'],
			'price' => $row['price'],
		];
	}

	// کش کردن به مدت 6 ساعت (می‌تونی تغییر بدی)
	set_transient($cache_key, $grouped, 6 * HOUR_IN_SECONDS);

	return $grouped;
}

// WPCF7 Remove html base
add_filter('wpcf7_autop_or_not', '__return_false');

// TOC
function get_headings_with_links($content)
{
	$pattern = '/<h2[^>]*>(.*?)<\/h2>/i';
	preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

	$headings = [];

	foreach ($matches as $match) {
		$level = 2;
		$title = strip_tags($match[1]);
		$id = sanitize_title($title);

		if (empty($id)) {
			$id = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title)));
		}

		$headings[] = [
			'level' => $level,
			'title' => $title,
			'link' => '#' . $id,
		];

		$content = str_replace($match[0], "<h2 id=\"$id\">$match[1]</h2>", $content);
	}

	return $headings;
}

function add_ids_to_h2_headings($content)
{
	// Regular expression to match H2 tags
	$pattern = '/<h2([^>]*)>(.*?)<\/h2>/i';
	preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

	foreach ($matches as $match) {
		$title = strip_tags($match[2]);
		$id = urlencode($title);
		$content = str_replace($match[0], '<h2' . $match[1] . ' id="' . $id . '">' . $match[2] . '</h2>', $content);
	}

	return $content;
}

// Title date
function current_persian_date_shortcode()
{
	if (function_exists('parsidate')) {
		return parsidate('j F Y', time(), 'per');
	}
	return '';
}

add_shortcode('current_persian_date', 'current_persian_date_shortcode');

function current_persian_date_month_shortcode()
{
	if (function_exists('parsidate')) {
		return parsidate('F Y', time(), 'per');
	}
	return '';
}

add_shortcode('current_persian_date_month', 'current_persian_date_month_shortcode');

add_filter('rank_math/frontend/title', 'do_shortcode');

// جستجوی زنده با ایجکس
function handle_ajax_search()
{
	echo '<ul>';
	if (isset($_GET['s']) && !empty($_GET['s'])) {
		$query = new WP_Query(array(
			's' => sanitize_text_field($_GET['s']),
			'posts_per_page' => 8,
		));

		if ($query->have_posts()) {
			while ($query->have_posts()) {
				$query->the_post();
				echo '<li><a href="' . esc_url(get_permalink()) . '"><img src="' . get_the_post_thumbnail_url() . '" alt="' . get_the_title() . '">' . esc_html(get_the_title()) . '</a></li>';
			}
		} else {
			echo '<li>نتیجه‌ای یافت نشد.</li>';
		}

		wp_reset_postdata();
	} else {
		echo '<li>عبارت جستجو خالی است.</li>';
	}
	echo '</ul>';
	wp_die();
}

add_action('wp_ajax_nopriv_handle_ajax_search', 'handle_ajax_search');
add_action('wp_ajax_handle_ajax_search', 'handle_ajax_search');

function my_ajax_scripts()
{
	wp_enqueue_script('jquery');
//	wp_enqueue_script('my-ajax-script', get_template_directory_uri() . '/js/ajax-sffearch.js', array('jquery'), null, true);
	wp_localize_script('theme-js', 'ajaxObject', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
	));
}

add_action('wp_enqueue_scripts', 'my_ajax_scripts');
// shop post type
function register_shop_post_type()
{
	$labels = array(
		'name' => 'فروشگاه شهرپانل',
		'singular_name' => 'فروشگاه شهرپانل',
		'menu_name' => 'فروشگاه شهرپانل',
		'name_admin_bar' => 'محصول',
		'add_new' => 'افزودن محصول جدید',
		'add_new_item' => 'افزودن محصول جدید',
		'new_item' => 'محصول جدید',
		'edit_item' => 'ویرایش محصول',
		'view_item' => 'مشاهده محصول',
		'all_items' => 'همه محصولات',
		'search_items' => 'جستجوی محصول',
		'not_found' => 'محصولی پیدا نشد',
		'not_found_in_trash' => 'محصولی در زباله‌دان یافت نشد',
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'menu_icon' => 'dashicons-store',
		'menu_position' => 5,
		'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
		'has_archive' => true,
		'rewrite' => array('slug' => 'mammut-construction/shop'),
		'show_in_rest' => true, // برای گوتنبرگ و API
	);

	register_post_type('shop', $args);
}

add_action('init', 'register_shop_post_type');

//add orders in database - shop
function handle_custom_checkout_form()
{
	if (isset($_POST['submit_request'])) {

		global $wpdb;
		$table = $wpdb->prefix . 'customer_orders';
		$data = [
			'user_info' => json_encode($_POST['user_info'], JSON_UNESCAPED_UNICODE),
			'order_info' => stripslashes($_COOKIE['shoppingCart']),
			'created_at' => current_time('mysql'),
			'tracking_code' => $_POST['trackingCode']
		];
		$mobile = $_POST['user_info']['phone_number'];
		$wpdb->insert($table, $data);

		ini_set("soap.wsdl_cache_enabled", "0");
		$sms = new SoapClient("http://api.payamak-panel.com/post/Send.asmx?wsdl", array("encoding" => "UTF-8"));
		$data = [
			"username" => "989014515051",
			"password" => "gBc2q%-=",
			"text" => [$_POST['trackingCode']],
			"to" => $mobile,
			"bodyId" => 325595,
		];
		$send_Result = $sms->SendByBaseNumber($data)->SendByBaseNumberResult;

		$data_admin = [
			"username" => "989014515051",
			"password" => "gBc2q%-=",
			"from"     => "50004001515051",
			"to"       => "989014515051",
			"text"     => "شهرپانل، سفارش جدید ثبت شد.",
			'isflash'  => false
		];
		$sms->SendSimpleSMS2($data_admin);

		// ======== send email ========
		$recipients = [
			'mammut.mehrsa@gmail.com',
			'mehrshdad.khanbabaie@gmail.com',
			'hengamevalizade@gmail.com'
		];

		$subject = "سفارش جدید در شهرپانل";

		ob_start();
		$user_info = $_POST['user_info'];
		$order_data = json_decode(stripslashes($_COOKIE['shoppingCart']), true);
		$tracking_code = $_POST['trackingCode'];
		include get_template_directory() . '/email-templates/order-notification.php';
		$body = ob_get_clean();

		$headers = ['Content-Type: text/html; charset=UTF-8', 'From: شهرپانل <info@shahrpanel.com>'];

		foreach ($recipients as $email) {
			wp_mail($email, $subject, $body, $headers);
		}

		echo $send_Result;
		exit;
	}
}

add_action('init', 'handle_custom_checkout_form');
add_action('wp_ajax_handle_custom_checkout_form', 'handle_custom_checkout_form');
add_action('wp_ajax_nopriv_handle_custom_checkout_form', 'handle_custom_checkout_form');



function get_product_data($id = false)
{
	$products = get_transient('cached_product_data');
	if ($products === false) {
		$url = "https://shahrpanel.com/api/API.php/price";
		$response = wp_remote_post($url, ['timeout' => 15]);

		if (is_wp_error($response)) {
			return 'خطا در ارتباط با API';
		}

		$body = wp_remote_retrieve_body($response);
		$data = json_decode($body, true);

		if (json_last_error() !== JSON_ERROR_NONE) {
			return 'فرمت JSON معتبر نیست';
		}

		$products = [];
		foreach ($data['data'] as $items) {
			foreach ($items["products"] as $item) {
				$products[$item['id']] = $item;
			}
		}
		set_transient('cached_product_data', $products, 10 * MINUTE_IN_SECONDS);
	}

	if ($id) {
		return $products[$id] ?? null;
	}

	return $products;
}

function get_group_and_products_data()
{
	$grouped_products = get_transient('cached_grouped_product_data');
	if ($grouped_products === false) {
		$url = "https://shahrpanel.com/api/API.php/price";
		$response = wp_remote_post($url, ['timeout' => 15]);

		if (is_wp_error($response)) {
			return 'خطا در ارتباط با API';
		}

		$body = wp_remote_retrieve_body($response);
		$data = json_decode($body, true);

		if (json_last_error() !== JSON_ERROR_NONE) {
			return 'فرمت JSON معتبر نیست';
		}

		$products = [];
		foreach ($data['data'] as $items) {
			foreach ($items["products"] as $item) {
				$products[] = $item;
			}
		}

		$grouped_products = [];
		foreach ($products as $product) {
			if (stripos($product['title'], 'سقفی') !== false) {
				$grouped_products['roof'][] = $product;
			} elseif (stripos($product['title'], 'دیواری') !== false) {
				$grouped_products['wall'][] = $product;
			} else {
				$grouped_products['else'][] = $product;
			}
		}

		set_transient('cached_grouped_product_data', $grouped_products, 10 * MINUTE_IN_SECONDS);
	}

	return $grouped_products;
}

function generateTrackingCode()
{
	global $wpdb;
	$table = $wpdb->prefix . 'customer_orders';

	do {
		$prefix = 'ORD';
		$random = rand(10000, 99999);
		$code = $prefix . '-' . $random;

		$exists = $wpdb->get_var(
			$wpdb->prepare("SELECT COUNT(*) FROM $table WHERE tracking_code = %s", $code)
		);
	} while ($exists > 0);

	return $code;
}

function add_schema_to_specific_template() {
	if ( is_page() && get_page_template_slug( get_queried_object_id() ) === 'page-templates/company.php' ) {
		$company_name = get_field('company_name', get_queried_object_id());
		$company_logo = get_field('company_logo', get_queried_object_id())['url'];

		if ( empty($company_name) || empty($company_logo) ) {
			return;
		}

		$schema = [
			"@context" => "https://schema.org",
			"@type" => "Organization",
			"name" => $company_name,
			"url" => get_permalink( get_queried_object_id()),
			"logo" => $company_logo,
			"contactPoint" => [
				"@type" => "ContactPoint",
				"telephone" => "+982144021735",
				"contactType" => "customer service",
				"areaServed" => "IR",
				"availableLanguage" => "fa"
			]
		];

		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE ) . '</script>';
	}
}
add_action( 'wp_head', 'add_schema_to_specific_template' );
function move_jquery_to_footer() {
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_register_script('jquery', includes_url('/js/jquery/jquery.min.js'), false, null, true);
		wp_enqueue_script('jquery');
	}
}
add_action('wp_enqueue_scripts', 'move_jquery_to_footer');
//product post type
function register_custom_post_type_products() {

	// Register taxonomy: دسته‌بندی محصولات
	register_taxonomy('product_category', ['product'], [
		'labels' => [
			'name'              => 'دسته‌بندی محصولات',
			'singular_name'     => 'دسته‌بندی محصول',
			'search_items'      => 'جستجوی دسته‌بندی',
			'all_items'         => 'همه دسته‌بندی‌ها',
			'parent_item'       => 'دسته مادر',
			'parent_item_colon' => 'دسته مادر:',
			'edit_item'         => 'ویرایش دسته‌بندی',
			'update_item'       => 'به‌روزرسانی دسته‌بندی',
			'add_new_item'      => 'افزودن دسته‌بندی جدید',
			'new_item_name'     => 'نام دسته‌بندی جدید',
			'menu_name'         => 'دسته‌بندی محصولات',
		],
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'rewrite'           => ['slug' => 'product-category'],
		'show_in_rest'      => true,
	]);

	// Register post type: محصولات
	register_post_type('product', [
		'labels' => [
			'name'               => 'محصولات',
			'singular_name'      => 'محصول',
			'menu_name'          => 'محصولات',
			'name_admin_bar'     => 'محصول',
			'add_new'            => 'افزودن جدید',
			'add_new_item'       => 'افزودن محصول جدید',
			'new_item'           => 'محصول جدید',
			'edit_item'          => 'ویرایش محصول',
			'view_item'          => 'مشاهده محصول',
			'all_items'          => 'همه محصولات',
			'search_items'       => 'جستجوی محصولات',
			'not_found'          => 'موردی یافت نشد.',
			'not_found_in_trash' => 'در زباله‌دان چیزی نیست.',
		],
		'public'              => true,
		'has_archive'         => true,
		'rewrite'             => ['slug' => 'products'],
		'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
		'taxonomies'          => ['product_category'],
		'show_in_rest'        => true,
		'menu_icon'           => 'dashicons-cart',
	]);
}
add_action('init', 'register_custom_post_type_products');
