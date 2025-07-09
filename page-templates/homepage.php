<?php
/* Template Name: Home Page */
get_header();

include get_template_directory() . '/template-parts/partials/home/hero.php';
include get_template_directory() . '/template-parts/partials/home/services.php';
include get_template_directory() . '/template-parts/partials/home/home-about.php';
include get_template_directory() . '/template-parts/partials/home/order-banner.php';
include get_template_directory() . '/template-parts/partials/home/home-products.php';
include get_template_directory() . '/template-parts/partials/home/home-banner.php';
include get_template_directory() . '/template-parts/partials/home/home-blog.php';

get_footer();
