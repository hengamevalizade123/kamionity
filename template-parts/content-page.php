<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Starter_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('c-post'); ?>>
	<section class="o-section c-section--post-content">
		<div class="c-page">
			<section class="c-page__main">
				<div class="c-post__content c-page__box">
					<?php
					the_content();
					?>
				</div>
			</section>
		</div>
	</section>
</article><!-- #post-<?php the_ID(); ?> -->
