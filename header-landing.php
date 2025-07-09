<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starter_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php
	if (get_field('availability')):
		$product_id = get_field('product-id');
		$matchedProduct = null;
		$product = get_product_data(get_field('product-id'));
		?>
		<meta name="product_id" content="<?php echo $product_id ?>">
		<meta name="product_name" content="<?php echo get_the_title() ?>">
		<meta property="og:image" content="<?php echo get_the_post_thumbnail_url() ?>">
		<meta name="product_price" content="<?php echo $product['price'] / 10 ?>">
		<meta name="availability" content="<?php echo get_field('availability') ?>">
	<?php endif;
	?>
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>

	<link rel="apple-touch-icon" sizes="180x180"
		  href="<?php echo get_template_directory_uri(); ?>/assets/images/sign.svg">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/sign.svg">
	<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
	<!--	<meta name="msapplication-TileColor" content="#b91d47">-->
	<!--	<meta name="theme-color" content="#ffffff">-->

	<?php wp_head(); ?>

	<!-- Google Tag Manager -->
	<script>(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({
				'gtm.start':
					new Date().getTime(), event: 'gtm.js'
			});
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src =
				'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-NDZSTQHZ');</script>
	<!-- End Google Tag Manager -->
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<!-- Google Tag Manager (noscript) -->
<noscript>
	<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDZSTQHZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
<div id="page" class="site">
	<header id="masthead-landing" class="o-section c-section--header-landing site-header-landing">
		<div class="o-section__wrapper">
			<div class="c-header-landing">
				<a href="https://shahrpanel.com/mammut-construction/" title="شهر پانل" class="c-logo-landing">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/images/logos/logo_mammut_landing.webp"
						 alt="شهر پانل"
						 title="ماموت ساختمان">
				</a>
				<a class="cart-mobile cart" href="https://shahrpanel.com/cart/">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51003C4.00003 22 3.24002 19.99 3.54002 17.53L4.44003 10.03C4.66003 8.09 5.00002 6.5 8.40002 6.5Z"
							stroke="#aaaaae" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M8 8V4.5C8 3 9 2 10.5 2H13.5C15 2 16 3 16 4.5V8" stroke="#aaaaae"
							  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M20.41 17.03H8" stroke="#aaaaae" stroke-width="1.5" stroke-linecap="round"
							  stroke-linejoin="round"/>
					</svg>
					<span class="cart-count count-order">
<?php echo (isset($_COOKIE['shoppingCart'])) ? count(json_decode(stripslashes($_COOKIE['shoppingCart']), true)) : 0 ?>
						</span>
				</a>
				<div class="c-header-landing__wrap js-navs">
					<ul class="c-menu-landing">
						<li class="c-menu-landing-item">
							<a href="https://shahrpanel.com/">ساندویچ پانل</a>
						</li>
						<li class="c-menu-landing-item">
							<a href="#products-landing">محصولات</a>
						</li>
						<li class="c-menu-landing-item">
							<a href="#customers-landing">رضایت مشتری</a>
						</li>
						<li class="c-menu-landing-item">
							<a href="#contact-landing">ارتباط با کارشناسان</a>
						</li>
					</ul>
					<a class="cart" href="https://shahrpanel.com/cart/">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51003C4.00003 22 3.24002 19.99 3.54002 17.53L4.44003 10.03C4.66003 8.09 5.00002 6.5 8.40002 6.5Z"
								stroke="#aaaaae" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8 8V4.5C8 3 9 2 10.5 2H13.5C15 2 16 3 16 4.5V8" stroke="#aaaaae"
								  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M20.41 17.03H8" stroke="#aaaaae" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"/>
						</svg>
						<span class="cart-count count-order">
<?php echo (isset($_COOKIE['shoppingCart'])) ? count(json_decode(stripslashes($_COOKIE['shoppingCart']), true)) : 0 ?>
						</span>
					</a>
					<a class="c-header-landing__call" href="tel:09124021654">
						<span class="c-header-landing__call-num">
							 ۴۴۰۳۱۷۳۵ - ۰۲۱
						</span>
						<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_761_3523)">
								<path
									d="M9.4668 10.8407C7.52572 10.0188 5.98217 8.47164 5.1648 6.52867L7.43146 4.258L3.25813 0.0813333L1.14413 2.19467C0.777464 2.56343 0.487562 3.00124 0.291196 3.48277C0.0948312 3.9643 -0.00409881 4.47999 0.000130068 5C0.000130068 9.832 6.16813 16 11.0001 16C11.5201 16.0045 12.0358 15.9058 12.5172 15.7094C12.9987 15.513 13.4364 15.2229 13.8048 14.856L15.9188 12.742L11.7421 8.56533L9.4668 10.8407ZM12.8615 13.9133C12.6166 14.156 12.326 14.3476 12.0065 14.4769C11.6869 14.6063 11.3448 14.6708 11.0001 14.6667C6.8448 14.6667 1.33346 9.15533 1.33346 5C1.32954 4.65522 1.39411 4.31309 1.52342 3.99346C1.65274 3.67383 1.84423 3.38305 2.0868 3.138L3.25813 1.96667L5.54946 4.258L3.5928 6.21467L3.75613 6.624C4.23696 7.91021 4.98864 9.07804 5.96023 10.0484C6.93182 11.0187 8.10063 11.7688 9.38746 12.248L9.79146 12.402L11.7421 10.4507L14.0335 12.742L12.8615 13.9133ZM9.33346 1.33333V0C11.101 0.00194106 12.7955 0.704943 14.0454 1.95477C15.2952 3.20459 15.9982 4.89915 16.0001 6.66667H14.6668C14.6652 5.25267 14.1028 3.89703 13.1029 2.89718C12.1031 1.89733 10.7475 1.33492 9.33346 1.33333ZM9.33346 4V2.66667C10.394 2.66773 11.4108 3.08949 12.1607 3.83941C12.9106 4.58933 13.3324 5.60613 13.3335 6.66667H12.0001C12.0001 5.95942 11.7192 5.28115 11.2191 4.78105C10.719 4.28095 10.0407 4 9.33346 4Z"
									fill="white"/>
							</g>
							<defs>
								<clipPath id="clip0_761_3523">
									<rect width="16" height="16" fill="white"/>
								</clipPath>
							</defs>
						</svg>

					</a>
				</div>

				<div class="c-hamburger">
					<input class="c-hamburger__checkbox js-hamburger" type="checkbox" aria-label="Menu">
					<span class="c-hamburger__icon"></span>
					<span class="c-hamburger__icon"></span>
					<span class="c-hamburger__icon"></span>
				</div>
			</div>
		</div>
	</header><!-- #masthead-landing -->
