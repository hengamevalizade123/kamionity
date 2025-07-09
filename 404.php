<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Starter_Theme
 */

get_header();
?>

	<main id="primary" class="site-main">
		<div class="o-section__wrapper">
			<section class="error-404 not-found">
				<img src="<?php echo get_template_directory_uri(); ?>/assets/images/404.svg"
					 alt="404">
<p>
	متأسفانه صفحه مورد نظر پیدا نشد .
</p>
				<a href="/" class="c-btn c-btn--primary">برو به صفحه اصلی</a>
			</section>
		</div>
	</main><!-- #main -->

<?php
get_footer();
