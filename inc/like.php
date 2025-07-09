<?php

if (!defined('ABSPATH')) {
	exit;
} // Exit if accessed directly


if (!class_exists('F_like')) {
	class F_like
	{
		/**
		 * Construct the plugin object
		 */
		public function __construct()
		{
			add_action('wp_ajax_nopriv_likeSend', array(&$this, 'like'));
			add_action('wp_ajax_likeSend', array(&$this, 'like'));
			add_action('wp_ajax_nopriv_noCache', array(&$this, 'noCache'));
			add_action('wp_ajax_noCache', array(&$this, 'noCache'));
			add_action('wp_head', array(&$this, 'css'), 1);
			add_action('wp_body_open', array(&$this, 'like_icons'));
			add_shortcode('like', array(&$this, 'like_shortcode'));
			// add_action('enqueue_block_editor_assets', array(&$this, 'likeBlock'));
			// register_block_type('roya-web/roya-like', array(
			// 	'render_callback' => function ($attributes, $content, $block) {
			// 		return do_shortcode('[like]');
			// 	}
			// ));
		}


		public function css()
		{ ?>
			<style>
				.like {
					cursor: pointer;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					gap: 4px;
					font-size: 13px
				}

				.like-count {
					height: 12px;
					color: var(--color-gray-600);
				}

				.like-box {
					position: relative;
					width: fit-content
				}

				.like-box.loaded:after {
					content: '';
					-webkit-animation-name: circles;
					animation-name: circles;
					-webkit-animation-duration: .8s;
					animation-duration: .8s;
					-webkit-animation-iteration-count: 1;
					animation-iteration-count: 1;
					-webkit-animation-timing-function: ease-in;
					animation-timing-function: ease-in;
					border-radius: 50%;
					display: block;
					height: .3333333333em;
					left: 50%;
					margin-left: -.1666666667em;
					margin-top: -.1666666667em;
					position: absolute;
					top: 50%;
					width: .3333333333em;
					z-index: 2
				}

				.like svg {
					transition: .3s;
					fill: transparent
				}

				.c-post__poll .liked .choice.like svg path {
					/*fill: #e2264d;*/
					stroke: #1fcb80;
					transition: .3s
				}
				.c-post__poll .liked .choice.like span {
					/*fill: #e2264d;*/
					color: #1fcb80;
					transition: .3s
				}
				.quest {
					position: fixed;
					top: 0;
					right: 50%;
					z-index: 9999999999;
					background: #606060;
					color: #fff;
					transform: translate(50%, -100px);
					padding: 10px 50px;
					border-radius: 4px
				}

				.like-comments .like-box span {
					display: none;
				}

				.c-blog__willing .like-count {
					display: none;
				}
			</style>
		<?php }

		public function like_icons()
		{ ?>
			<svg style="display: none;">
				<symbol id="like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
					<rect fill="#ff13dc" width="18" height="18" opacity="0"></rect>
					<path
						d="M12.182,3.2545A4.00649,4.00649,0,0,0,9,5.1635a4.00649,4.00649,0,0,0-3.182-1.909A3.818,3.818,0,0,0,2,7.0725c0,3.646,7,8.273,7,8.273s7-4.578,7-8.273A3.818,3.818,0,0,0,12.182,3.2545Z"></path>
				</symbol>

			</svg>
			<?php if (is_single()) {
			$rate_count = get_post_meta(get_the_ID(), '_like_count', true);
			if (!$rate_count) {
				$rate_count = 1;
			}
			?>
			<script type="application/ld+json">
				{
					"@context": "http://schema.org",
					"@type": "CreativeWorkSeries",
					"aggregateRating": {
						"@type": "AggregateRating",
						"bestRating": "5",
						"ratingCount": "<?php echo $rate_count; ?>",
							"ratingValue": "5"
						},
						"image": "<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>",
						"name": "<?php echo get_the_title(); ?>",
						"description": "<?php echo get_the_title(); ?>"
					}
			</script>
		<?php } ?>
			<script>
				function $(query) {
					return document.querySelectorAll(query);
				}

				let post_url = "<?php echo admin_url('admin-ajax.php'); ?>";
				let sendlike = new XMLHttpRequest();

				const like = ({
								  id
							  }) => {
					sendlike.onreadystatechange = function () {

						if (this.readyState == 4 && this.status == 200) {
							const obj = JSON.parse(this.responseText);
							const liked = obj.liked;
							const count = obj.count;
							const guest = obj.guest;

							if (guest === 1) {
								const uGuest = document.createElement("div");
								uGuest.classList.add('quest');
								const node = document.createTextNode("برای ذخیره پست لطفا وارد حساب کاربری شوید");
								uGuest.appendChild(node);
								document.body.appendChild(uGuest);
								// uGuest.classList.add('liked');
								setTimeout(() => {
									uGuest.parentNode.removeChild(uGuest);
								}, 2000);
							}
							if (liked === 1) {
								$(".like").forEach(div => {
									if (div.dataset.id === id) {

										// div.parentNode.classList.add('liked', 'loaded');
										// div.querySelector('.like-count').innerHTML = count;
									}
								});
							}
							// else {
							// 	$(".like").forEach(div => {
							// 		if (div.dataset.id === id) {
							// 			div.parentNode.classList.remove('liked', 'loaded');
							// 			div.querySelector('.like-count').innerHTML = count;
							// 		}
							// 	});
							//
							// }

						}
					};
					sendlike.open("POST", post_url, true);
					sendlike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					sendlike.send("action=likeSend&id=" + id + "&safe=<?php echo wp_create_nonce('like'); ?>");

				}

				document.addEventListener('DOMContentLoaded', function () {

					let postsId = [];
					$(".like").forEach(div => {
						postsId.push(div.dataset.id);
					});
					sendlike.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
							const obj = JSON.parse(this.responseText);
							obj.forEach(function (obj, index) {
								const liked = obj.liked;
								const count = obj.count;
								const id = obj.id;

								if (liked === 1) {
									$(".like").forEach(div => {
										if (div.dataset.id === id) {

											// div.parentNode.classList.add('liked');
											// div.querySelector('.like-count').innerHTML = count;
										}
									});
								}
								// else {
								// 	$(".like").forEach(div => {
								// 		if (div.dataset.id === id) {
								// 			div.parentNode.classList.remove('liked');
								// 			div.querySelector('.like-count').innerHTML = count;
								// 		}
								// 	});
								//
								// }
							});
						}
					};
					if (postsId.length === 0) return false;
					sendlike.open("POST", post_url, true);
					sendlike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					sendlike.send("action=noCache&posts_id=" + postsId);
				}, false);
			</script>

		<?php }

		public function like_shortcode($atts = ''): string
		{
			ob_start();
			$post_id = get_the_id();
			$user_id = get_current_user_id();
			if ($user_id == 0) {
				$user_id = md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
			}
			$meta_ids = get_post_meta($post_id, '_like_user_ids');
			$likeCount = get_post_meta($post_id, '_like_count', true);
			if (!$likeCount) {
				$likeCount = 0;
			}
			$liked = '';
			if ($this->alreadyLiked($meta_ids, $user_id)) {
				$liked = 'liked';
			}
			?>
			<div class="c-post__poll">
					<span>
						این مطلب برای شما مفید بود؟
					</span>
				<div class="u-flex c-like-btn like-box <?php echo $liked; ?>">
					<div data-id="<?php echo $post_id; ?>" class="choice like"
						 onclick="like({id: this.dataset.id});">
<!--						<div class="like-count">--><?php //echo $likeCount; ?><!--</div>-->
						<svg width="20" height="24" viewBox="0 0 24 24" fill="none"
							 xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 21.6496C11.69 21.6496 11.39 21.6096 11.14 21.5196C7.32 20.2096 1.25 15.5596 1.25 8.68961C1.25 5.18961 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00961 12 4.18961C13.17 3.00961 14.75 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.19961 22.75 8.68961C22.75 15.5696 16.68 20.2096 12.86 21.5196C12.61 21.6096 12.31 21.6496 12 21.6496ZM7.56 3.84961C4.91 3.84961 2.75 6.01961 2.75 8.68961C2.75 15.5196 9.32 19.3196 11.63 20.1096C11.81 20.1696 12.2 20.1696 12.38 20.1096C14.68 19.3196 21.26 15.5296 21.26 8.68961C21.26 6.01961 19.1 3.84961 16.45 3.84961C14.93 3.84961 13.52 4.55961 12.61 5.78961C12.33 6.16961 11.69 6.16961 11.41 5.78961C10.48 4.54961 9.08 3.84961 7.56 3.84961Z"
								fill="#292D32"/>
						</svg>

						<span>بله</span>
					</div>
				</div>
				<div class="choice" id="no" onclick="like({id: this.dataset.id});">
					<svg width="20" height="24" viewBox="0 0 24 24" fill="none"
						 xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.10999 18.2496C5.92999 18.2496 5.73998 18.1796 5.59998 18.0496C3.61998 16.1896 1.25 13.0596 1.25 8.68964C1.25 5.18964 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00964 12 4.18964C13.17 3.00964 14.75 2.34961 16.44 2.34961C17.7 2.34961 18.92 2.72963 19.97 3.42963C20.31 3.65963 20.4 4.1296 20.17 4.4696C19.94 4.8096 19.47 4.89962 19.13 4.66962C18.34 4.12962 17.41 3.83966 16.45 3.83966C14.93 3.83966 13.52 4.54966 12.61 5.77966C12.33 6.15966 11.69 6.15966 11.41 5.77966C10.49 4.54966 9.09001 3.83966 7.57001 3.83966C4.92001 3.83966 2.76001 6.00963 2.76001 8.67963C2.76001 12.5196 4.87001 15.2896 6.64001 16.9496C6.94001 17.2296 6.95999 17.7096 6.67999 18.0096C6.50999 18.1696 6.30999 18.2496 6.10999 18.2496Z"
							fill="#292D32"/>
						<path
							d="M11.9999 21.6498C11.6899 21.6498 11.3899 21.6098 11.1399 21.5198C10.3899 21.2598 9.49991 20.8398 8.63991 20.3298C8.27991 20.1198 8.1699 19.6598 8.3799 19.2998C8.5899 18.9498 9.04987 18.8298 9.40987 19.0398C10.1899 19.4998 10.9799 19.8798 11.6299 20.0998C11.8099 20.1598 12.1999 20.1598 12.3799 20.0998C14.6799 19.3098 21.2599 15.5198 21.2599 8.6798C21.2599 8.1798 21.1799 7.68978 21.0399 7.21978C20.9199 6.81978 21.1299 6.39984 21.5299 6.27984C21.9299 6.15984 22.3499 6.37983 22.4699 6.76983C22.6599 7.38983 22.7599 8.0298 22.7599 8.6798C22.7599 15.5598 16.6899 20.1998 12.8699 21.5098C12.6099 21.6098 12.3099 21.6498 11.9999 21.6498Z"
							fill="#292D32"/>
						<path
							d="M1.99997 22.7495C1.80997 22.7495 1.61994 22.6795 1.46994 22.5295C1.17994 22.2395 1.17994 21.7595 1.46994 21.4695L21.4699 1.46945C21.7599 1.17945 22.24 1.17945 22.53 1.46945C22.82 1.75945 22.82 2.23951 22.53 2.52951L2.53 22.5295C2.38 22.6795 2.18997 22.7495 1.99997 22.7495Z"
							fill="#292D32"/>
					</svg>
					<span>خیر</span>
				</div>
			</div>
			<?php

			return ob_get_clean();
		}

		public function likeCounter($post_id)
		{
			return get_post_meta($post_id, '_like_count', true);
		}

		public function alreadyLiked($meta_ids, $user_id): bool
		{

			if ($meta_ids) {
				$like_user_ids = $meta_ids[0];
				if (!is_array($like_user_ids)) {
					$like_user_ids = array();
				}
				if (in_array($user_id, $like_user_ids)) {
					return true;
				}
			}

			return false;
		}

		public function like()
		{
			//SAFETY
			//check_ajax_referer( 'like', 'safe' );

			$user_logged = $user_id = get_current_user_id();
			if ($user_id == 0) {
				$user_id = md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
			}
			$liked = '';
			$post_id = $_POST['id'];
			$meta_ids = get_post_meta($post_id, '_like_user_ids');
			$like_user_ids = $meta_ids[0];

			if ($user_logged != 0) {
				$meta_post_ids = get_user_meta($user_id, '_like_user_posts');
				$like_user_posts = $meta_post_ids[0];
			}

			//SAFE ARRAYS
			if (!is_array($like_user_ids)) {
				$like_user_ids = array();
			}

			if (!is_array($like_user_posts)) {
				$like_user_posts = array();
			}

			if ($this->alreadyLiked($meta_ids, $user_id)) {
//				$keyInPost = array_search($user_id, $like_user_ids);
//				unset($like_user_ids[$keyInPost]);
//
//
//				foreach ($like_user_posts as $samepostkey => $samepostvalue) {
//					if ($post_id == $samepostvalue) {
//						unset($like_user_posts[$samepostkey]);
//					}
//					//$keyInUser = array_search( $post_id, $like_user_posts );
//				}
//				$likes_count = $this->likeCounter($post_id);
//				if (update_post_meta($post_id, '_like_count', --$likes_count)) {
//					update_post_meta($post_id, '_like_user_ids', $like_user_ids);
//					if ($user_logged != 0) {
//						update_user_meta($user_id, '_like_user_posts', $like_user_posts);
//					}
//				}
//				$liked = 0;
			}
			else {
				$like_user_ids[] = $user_id;
				$like_user_posts[] = $post_id;
				$likes_count = $this->likeCounter($post_id);
				if (update_post_meta($post_id, '_like_count', ++$likes_count)) {
					update_post_meta($post_id, '_like_user_ids', $like_user_ids);
					if ($user_logged != 0) {
						update_user_meta($user_id, '_like_user_posts', $like_user_posts);
					}
				}

				$liked = 1;
			}

			$count = get_post_meta($post_id, '_like_count', true);
			if (!$count) {
				$count = 0;
			}
			$res = array(
				'liked' => $liked,
				'count' => $count
			);

			echo json_encode($res);
			die();
		}

		public function noCache()
		{

			$user_id = get_current_user_id();
			if ($user_id == 0) {
				$user_id = md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
			}

			$post_ids = $_POST['posts_id'];
			$post_ids = explode(",", $post_ids);
			$results = array();
			foreach ($post_ids as $post_id) {
				$meta_ids = get_post_meta($post_id, '_like_user_ids');
				$count = get_post_meta($post_id, '_like_count', true);
				if (!$count) {
					$count = 0;
				}
				$liked = 0;
				if ($this->alreadyLiked($meta_ids, $user_id)) {
					$liked = 1;
				}

				$results[] = array('id' => $post_id, 'liked' => $liked, 'count' => $count);
			}

			echo json_encode($results);
			die();
		}

		// public function likeBlock()
		// {
		// 	wp_enqueue_script('like-block', get_theme_file_uri() . '/includes/js/like-block.js', array(
		// 		'wp-blocks',
		// 		'wp-i18n',
		// 		'wp-editor'
		// 	), true, false);
		// }
	}
}
//init class
if (class_exists('F_like')) {
	// instantiate the plugin class
	$F_SocialShare = new F_like();
}
