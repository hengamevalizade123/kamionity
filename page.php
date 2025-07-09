<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Starter_Theme
 */

get_header();
?>

	<main id="primary" class="o-section c-section--main-page">
		<div class="o-section__wrapper">
			<div class="c-breadcrumbs">
				<?php if (function_exists('rank_math_the_breadcrumbs')) rank_math_the_breadcrumbs(); ?>
			</div>
			<div class="c-page">
				<section class="c-page__main">
					<?php
					while (have_posts()) :
						the_post();
						get_template_part('template-parts/content-page', get_post_type());
					endwhile;
					?>
				</section>
				<?php get_sidebar('companies'); ?>
			</div>
		</div>
	</main>

<?php
get_footer();
