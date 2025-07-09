<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starter_Theme
 */
?>

<aside class="c-sidebar">
	<div class="c-sidebar__main">
		<div class="c-page__table c-page__access">
			<div class="c-table__title">
				<div class="c-table__title-name d-flex item-center gap-sm">
					<svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M22 22L21 21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M8 7H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M9 11H15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>

					<span class="color-dark m-t-sm">
					مقالات مرتبط
				</span>
				</div>
			</div>
			<ul class="c-tabs-content">
				<?php
				$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

				$args = array(
					'post_type' => 'post',
					'posts_per_page' =>5,
					'paged' => $paged,
					'orderby' => 'date',
					'order' => 'DESC'
				);

				$latest_posts = new WP_Query($args);

				if ($latest_posts->have_posts()) :
					while ($latest_posts->have_posts()) : $latest_posts->the_post(); ?>
						<li>
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</li>
					<?php endwhile;
					wp_reset_postdata();
				else : ?>
					<li>هیچ مطلبی یافت نشد.</li>
				<?php endif; ?>
			</ul>
		</div>
	</div>
</aside>
