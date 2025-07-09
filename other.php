<?php
// Define the brand and product type slugs
$brand_slug = 'your-brand-slug'; // تغییر دهید به slug برند مورد نظر
$product_type_slug = 'your-product-type-slug'; // تغییر دهید به slug نوع محصول مورد نظر

// Custom WP_Query to get the latest 10 posts from the 'price_list' post type
$args = array(
	'post_type' => 'price_list',
	'posts_per_page' => 10,
	'orderby' => 'modified', // Sort by last modified date
	'order' => 'DESC', // Descending order
	'tax_query' => array(
		'relation' => 'AND',
		array(
			'taxonomy' => 'brand',
			'field'    => 'slug',
			'terms'    => $brand_slug,
		),
		array(
			'taxonomy' => 'product_type',
			'field'    => 'slug',
			'terms'    => $product_type_slug,
		),
	),
);

$price_list_query = new WP_Query( $args );

if ( $price_list_query->have_posts() ) : ?>
	<div class="custom-price-list">
		<?php while ( $price_list_query->have_posts() ) : $price_list_query->the_post(); ?>
			<div class="price-list-item">
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="price-list-thumbnail">
						<a href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail('thumbnail'); ?>
						</a>
					</div>
				<?php endif; ?>

				<div class="price-list-content">
					<h2 class="price-list-title">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</h2>

					<div class="price-list-excerpt">
						<?php the_excerpt(); ?>
					</div>

					<?php $price = get_post_meta(get_the_ID(), 'price', true); ?>
					<?php if ( $price ) : ?>
						<div class="price-list-price">
							<?php echo 'Price: ' . esc_html($price); ?>
						</div>
					<?php endif; ?>

					<div class="price-list-modified">
						<?php echo 'Last Modified: ' . get_the_modified_date(); ?>
					</div>
				</div> <!-- .price-list-content -->
			</div> <!-- .price-list-item -->
		<?php endwhile; ?>
	</div> <!-- .custom-price-list -->
<?php else : ?>
	<p>هیچ پستی یافت نشد.</p>
<?php endif;

// Restore original Post Data
wp_reset_postdata();
?>




<?php
// Define the brand slug
$brand_slug = 'your-brand-slug'; // تغییر دهید به slug برند مورد نظر

// Custom WP_Query to get the latest 10 posts from the 'price_list' post type
$args = array(
	'post_type' => 'price_list',
	'posts_per_page' => 10,
	'orderby' => 'modified', // Sort by last modified date
	'order' => 'DESC', // Descending order
	'tax_query' => array(
		array(
			'taxonomy' => 'brand',
			'field'    => 'slug',
			'terms'    => $brand_slug,
		),
	),
);

$price_list_query = new WP_Query( $args );

if ( $price_list_query->have_posts() ) : ?>
	<div class="custom-price-list">
		<?php while ( $price_list_query->have_posts() ) : $price_list_query->the_post(); ?>
			<div class="price-list-item">
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="price-list-thumbnail">
						<a href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail('thumbnail'); ?>
						</a>
					</div>
				<?php endif; ?>

				<div class="price-list-content">
					<h2 class="price-list-title">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</h2>

					<div class="price-list-excerpt">
						<?php the_excerpt(); ?>
					</div>

					<?php $price = get_post_meta(get_the_ID(), 'price', true); ?>
					<?php if ( $price ) : ?>
						<div class="price-list-price">
							<?php echo 'Price: ' . esc_html($price); ?>
						</div>
					<?php endif; ?>

					<div class="price-list-modified">
						<?php echo 'Last Modified: ' . get_the_modified_date(); ?>
					</div>
				</div> <!-- .price-list-content -->
			</div> <!-- .price-list-item -->
		<?php endwhile; ?>
	</div> <!-- .custom-price-list -->
<?php else : ?>
	<p>هیچ پستی یافت نشد.</p>
<?php endif;

// Restore original Post Data
wp_reset_postdata();
?>
