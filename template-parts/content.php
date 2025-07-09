<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Kamionity
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('c-post'); ?>>
	<section class="o-section c-section--post-content">
		<div class="c-page">
			<section class="c-page__main d-flex direction-column gap-md">
				<div class="c-post__img">
					<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo the_title(); ?>">
				</div>
				<div class="c-post__info">
					<div class="c-section__title c-post__title">
						<div class="c-section__col">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18"
									stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8 7H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
									  stroke-linejoin="round"/>
								<path d="M9 11H15" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
									  stroke-linejoin="round"/>
								<path
									d="M18.211 14.7703L14.671 18.3103C14.531 18.4503 14.401 18.7103 14.371 18.9003L14.181 20.2503C14.111 20.7403 14.451 21.0803 14.941 21.0103L16.291 20.8203C16.481 20.7903 16.751 20.6603 16.881 20.5203L20.421 16.9803C21.031 16.3703 21.321 15.6603 20.421 14.7603C19.531 13.8703 18.821 14.1603 18.211 14.7703Z"
									stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
									stroke-linejoin="round"/>
								<path d="M17.6992 15.2803C17.9992 16.3603 18.8392 17.2003 19.9192 17.5003"
									  stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
									  stroke-linejoin="round"/>
							</svg>

							<h1><?php echo the_title(); ?></h1></div>
					</div>
					<time class="c-post__date">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
								  stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
								  stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M3.5 9.09H20.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
								  stroke-linecap="round" stroke-linejoin="round"/>
							<path
								d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
								stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
								stroke-linejoin="round"/>
							<path d="M15.6947 13.7H15.7037" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M15.6947 16.7H15.7037" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M11.9955 13.7H12.0045" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M11.9955 16.7H12.0045" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M8.29431 13.7H8.30329" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M8.29431 16.7H8.30329" stroke="#292D32" stroke-width="2" stroke-linecap="round"
								  stroke-linejoin="round"/>
						</svg>

						تاریخ انتشار :
						<?php the_date(); ?>
					</time>
					<div class="c-post__study">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
								stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M12 8V13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
								  stroke-linejoin="round"/>
							<path d="M9 2H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
								  stroke-linecap="round" stroke-linejoin="round"/>
						</svg>

						مدت زمان مطالعه :
						<span class="persian-number">
				<?php echo reading_time() ?>
			</span>
					</div>
				</div>
				<div class="c-post__content c-page__box">
					<div class="c-toc-m">
						<div class="c-table__title c-table__title-m">
							<div class="c-table__title-name">
								<span>در این مقاله می خوانید</span>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
									<path d="M14 4.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
										  stroke-linejoin="round"/>
									<path d="M14 9.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
										  stroke-linejoin="round"/>
									<path d="M3 14.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
										  stroke-linejoin="round"/>
									<path d="M3 19.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
										  stroke-linejoin="round"/>
									<path
										d="M9.5 8.43V5.57C9.5 4.45 9.05 4 7.92 4H5.07C3.95 4 3.5 4.45 3.5 5.57V8.42C3.5 9.55 3.95 10 5.07 10H7.92C9.05 10 9.5 9.55 9.5 8.43Z"
										stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
										stroke-linejoin="round"/>
								</svg>

							</div>
						</div>
						<ul class="c-tabs-content" id="toc-list-m">
						</ul>
					</div>
					<?php
					the_content();
					?>
				</div>

			</section>
		</div>
	</section>
</article><!-- #post-<?php the_ID(); ?> -->
