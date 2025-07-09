<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Starter_Theme
 */

get_header();
?>

	<main id="primary" class="o-section c-section--main-page">
		<div class="o-section__wrapper">
			<div class="content-blog">
				<div class="c-breadcrumbs">
					<?php if (function_exists('rank_math_the_breadcrumbs')) rank_math_the_breadcrumbs(); ?>
				</div>
				<div class="c-page d-flex gap-md">
					<section class="c-page__main post-content-main">
						<?php
						while (have_posts()) :
							the_post();
							get_template_part('template-parts/content-product', get_post_type());
						endwhile;
						?>
					</section>
					<?php get_sidebar('product'); ?>
				</div>
				<?php if (comments_open() || get_comments_number()) :
					// If comments are open or we have at least one comment, load up the comment template.
					comments_template();
				endif;
				?>
			</div>
		</div>
	</main>

<?php
get_footer();
