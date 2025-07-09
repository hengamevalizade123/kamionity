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
					<h1 class="title title-left"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
													  xmlns="http://www.w3.org/2000/svg">
							<path d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18"
								  stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"></path>
							<path d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z"
								  stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"></path>
							<path d="M22 22L21 21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"></path>
							<path d="M8 7H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"></path>
							<path d="M9 11H15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"></path>
						</svg>
						وبلاگ
					</h1>

					<ul class="p-0">
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
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												 xmlns="http://www.w3.org/2000/svg">
												<path d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
													  stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
													  stroke-linejoin="round"/>
												<path d="M12 8V13" stroke="#292D32" stroke-width="1.5"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M9 2H15" stroke="#292D32" stroke-width="1.5"
													  stroke-miterlimit="10" stroke-linecap="round"
													  stroke-linejoin="round"/>
											</svg>
											مطالعه :
											<?php echo reading_time() ?>
										</p>
										<p>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												 xmlns="http://www.w3.org/2000/svg">
												<path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M3.5 9.09H20.5" stroke="#292D32" stroke-width="1.5"
													  stroke-miterlimit="10" stroke-linecap="round"
													  stroke-linejoin="round"/>
												<path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
													  stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M15.6947 13.7H15.7037" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M15.6947 16.7H15.7037" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M11.9955 13.7H12.0045" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M11.9955 16.7H12.0045" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M8.29431 13.7H8.30329" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M8.29431 16.7H8.30329" stroke="#292D32" stroke-width="2"
													  stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
											<?php echo get_the_date(); ?>
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
