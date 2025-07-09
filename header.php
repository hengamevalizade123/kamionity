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
	<link rel="preload" as="image"
		  href="https://shahrpanel.com/wp-content/themes/ShahrPanel/assets/images/logo-bg.svg"/>
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="apple-touch-icon" sizes="180x180"
		  href="<?php echo get_template_directory_uri(); ?>/assets/images/sign.svg">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/sign.svg">
	<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<!-- Google Tag Manager (noscript) -->
<noscript>
	<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDZSTQHZ"
			height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
<?php
//$imagePath = 'https://shahrpanel.com/wp-content/uploads/2025/06/logo-bg-3.png';
//$imageData = file_get_contents($imagePath);
//$base64 = 'data:image/png;base64,' . base64_encode($imageData);
//echo $base64;
//?>
<div id="page" class="site">
	<header id="masthead" class="o-section c-section--header site-header">
		<div class="header-inner">
			<div class="o-section__wrapper">
				<div class="c-header">
					<a href="/" title="کامیونیتی" class="c-logo">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="کامیونیتی"
							 title="کامیونیتی">
					</a>

					<div class="c-header__wrap js-navs">
						<ul class="c-menu">
							<li>
								<a href="/">صفحه اصلی</a>

							</li>
							<li>
								<a class="has-sub-menu gap-sm d-flex item-center"  href="/">
									اتاق کامیونت
								</a>
								<ul class="u-flex u-flex--column">
									<li><a class="sub-menu"
											href="https://wpgostar.com/kian/product-category/communication/">ارتباطی</a>
									</li>
									<li><a class="sub-menu"
										   href="https://wpgostar.com/kian/product-category/electronic/">الکترونیکی</a>
									</li>
									<li><a class="sub-menu"
										   href="https://wpgostar.com/kian/product-category/mechanical/">مکانیکی</a>
									</li>
								</ul>

							</li>
							<li>
								<a href="https://shahrpanel.com/wall-sandwich-panel/">ساندویچ پانل دیواری</a>
							</li>

							<li>
								<a href="https://shahrpanel.com/roof-sandwich-panel/">ساندویچ پانل سقفی</a>
							</li>
							<li>
								<a href="https://shahrpanel.com/companies/">تولیدکنندگان پانل</a>
							</li>
							<li>
								<a href="https://shahrpanel.com/blog/">بلاگ</a>
							</li>
						</ul>
					</div>

					<div class="c-header__cta">
						<a class="c-search-btn">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
									stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M22 22L20 20" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
									  stroke-linejoin="round"/>
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
		</div>
	</header><!-- #masthead -->
