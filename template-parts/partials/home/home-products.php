<section class="o-section c-section--home-product">
	<div class="o-section__wrapper">
		<div class="c-home-product d-flex direction-column">
			<h2 class="title title-center">
				فروش انواع اتاق کامیونت
			</h2>
		<?php
		$args = [
			'post_type'      => 'product',
			'posts_per_page' => 12,
			'post_status'    => 'publish',
			'no_found_rows'  => true,
			'orderby'        => 'date',
			'order'          => 'DESC',
		];

		$query = new WP_Query($args);

		if ($query->have_posts()) : ?>
			<div class="c-home-product__slider" data-flickity='{ "cellAlign": "right", "contain": true, "autoPlay": 5000, "prevNextButtons": false, "pageDots": false, "rightToLeft": true, "wrapAround": true }'>
				<?php while ($query->have_posts()) : $query->the_post(); ?>
					<article class="product-card">

							<?php if (has_post_thumbnail()) : ?>
						<a href="<?php the_permalink(); ?>" class="product-link" title="<?php the_title_attribute(); ?>">
								<figure class="m-0">
									<?php the_post_thumbnail('medium_large', ['alt' => get_the_title(), 'loading' => 'lazy']); ?>
								</figure>
							</a>
							<?php endif; ?>
							<h3 class="product-title"><a href="<?php the_permalink(); ?>" class="product-link" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h3>

					</article>
				<?php endwhile; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<p class="no-products">محصولی برای نمایش وجود ندارد.</p>
		<?php endif; ?>
		</div>
	</div>
</section>
