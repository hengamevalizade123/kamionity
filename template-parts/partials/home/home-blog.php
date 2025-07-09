
<section class="o-section c-section--home-blog">
	<div class="o-section__wrapper">
		<div class="c-home-blog d-flex direction-column">
			<h2 class="title title-center">
				فروش انواع اتاق کامیونت
			</h2>
			<?php
			$args = [
				'post_type'      => 'post',
				'posts_per_page' => 6,
				'post_status'    => 'publish',
				'no_found_rows'  => true,
				'orderby'        => 'date',
				'order'          => 'DESC',
			];

			$query = new WP_Query($args);

			if ($query->have_posts()) : ?>
				<div class="c-home-blog__slider" data-flickity='{ "cellAlign": "right", "contain": true, "autoPlay": 5000, "prevNextButtons": false, "pageDots": false, "rightToLeft": true, "wrapAround": true }'>
					<?php while ($query->have_posts()) : $query->the_post(); ?>
						<article class="blog-card">
							<a href="<?php the_permalink(); ?>" class="blog-thumb d-flex">
								<?php if (has_post_thumbnail()) : ?>
									<?php the_post_thumbnail('medium_large', ['alt' => get_the_title(), 'loading' => 'lazy']); ?>
								<?php endif; ?>
							</a>
							<div class="blog-content d-flex direction-column gap-sm">
								<time class="blog-date"><?php echo get_the_date('Y/m/d'); ?></time>
								<h2 class="blog-title m-0">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h2>
								<p class="blog-excerpt m-0"><?php echo get_the_excerpt(); ?></p>
								<a href="<?php the_permalink(); ?>" class="blog-read-more">مشاهده بیشتر</a>
							</div>
						</article>
					<?php endwhile; ?>
				</div>
				<?php wp_reset_postdata(); ?>
			<?php else : ?>
				<p class="no-posts">هیچ مقاله‌ای یافت نشد.</p>
			<?php endif; ?>
		</div>
	</div>
</section>
