<?php
///* Template Name: Blogs Page */
get_header();
?>
	<section class="o-section c-section--main-page">
		<div class="o-section__wrapper">
			<div class="c-page">
				<div class="c-breadcrumbs">
					<?php if (function_exists('rank_math_the_breadcrumbs')) rank_math_the_breadcrumbs(); ?>
				</div>
				<div id="c-blogs" class="c-section--blogs c-page__main c-page__table">
					<h1 class="title title-left">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2 8H8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2 11H6" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2 14H4" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>

						محصولات</h1>
					<ul class="p-0">
						<?php
						$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

						$args = array(
							'post_type' => 'product',
							'posts_per_page' =>5,
							'paged' => $paged,
							'orderby' => 'date',
							'order' => 'DESC'
						);

						$latest_posts = new WP_Query($args);

						if ($latest_posts->have_posts()) :
							while ($latest_posts->have_posts()) : $latest_posts->the_post(); ?>
								<li>
									<a class="c-blog__img" href="<?php the_permalink(); ?>">
										<img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'thumbnail'); ?>"
											 alt="<?php the_title_attribute(); ?>">
									</a>
									<div class="c-blog__info">
										<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
										<p><?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>
									</div>
									<div class="c-blog__meta">
										<p>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M13.0601 10.94C15.3101 13.19 15.3101 16.83 13.0601 19.07C10.8101 21.31 7.17009 21.32 4.93009 19.07C2.69009 16.82 2.68009 13.18 4.93009 10.94" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M10.59 13.41C8.24996 11.07 8.24996 7.27001 10.59 4.92001C12.93 2.57001 16.73 2.58001 19.08 4.92001C21.43 7.26001 21.42 11.06 19.08 13.41" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>

											دسته‌بندی:
											<?php
											$terms = get_the_terms(get_the_ID(), 'product_category');
											if ($terms && !is_wp_error($terms)) {
												foreach ($terms as $term) {
													echo '<a href="' . esc_url(get_term_link($term)) . '">' . esc_html($term->name) . '</a> ';
												}
											} else {
												echo 'بدون دسته‌بندی';
											}
											?>
										</p>
									</div>
								</li>
							<?php endwhile;
							wp_reset_postdata();
						else : ?>
							<li>هیچ مطلبی یافت نشد.</li>
						<?php endif; ?>
					</ul>

					<?php
					$total_pages = $latest_posts->max_num_pages;

					if ($total_pages > 1) {
						echo '<div class="pagination">';
						echo paginate_links(array(
							'current' => max(1, get_query_var('paged')),
							'total' => $total_pages,
							'prev_text' => __('« قبلی'),
							'next_text' => __('بعدی »'),
						));
						echo '</div>';
					}
					?>
				</div>
			</div>
		</div>
	</section>
<?php
get_footer();
