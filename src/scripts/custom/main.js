(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', function () {
		const headings = document.querySelectorAll('article h2, article h3');
		let tocList;

		if (window.innerWidth > 766) {
			tocList = document.getElementById('toc-list');
		} else {
			tocList = document.getElementById('toc-list-m');
		}
		// اضافه کردن اسکرول و فعال‌سازی TOC
		if (tocList) {

			window.addEventListener('scroll', function () {
				// انتخاب تمام لینک‌های TOC
				const tocLinks = tocList.querySelectorAll('a');

				// حذف کلاس active از تمام لینک‌ها
				tocLinks.forEach(function (link) {
					link.classList.remove('active');
				});

				// بررسی تمام عناوین
				headings.forEach(function (heading, index) {
					const rect = heading.getBoundingClientRect();
					// بررسی اگر عنوان در محدوده قابل مشاهده است
					if (rect.top <= window.innerHeight && rect.bottom >= 0) {
						// اضافه کردن کلاس active به لینک مربوط به عنوانی که در حال حاضر در نمای دید است
						tocLinks[index].classList.add('active');
					}
				});
			});
		}
		// price section type txt
		document.querySelectorAll('.c-live__list').forEach((list) => {
			const newsItems = list.querySelectorAll('li');
			if (newsItems.length > 0) {
				let currentNewsIndex = 0;
				let currentCharIndex = 0;
				const typingSpeed = 50;
				const displayDuration = 4000;

				function typeNews() {
					const currentNews = newsItems[currentNewsIndex];
					const linkElement = currentNews.querySelector('span');
					const newsText = linkElement.textContent.trim();

					currentNews.style.display = 'list-item';
					linkElement.textContent = '';

					function typeChar() {
						if (currentCharIndex < newsText.length) {
							linkElement.textContent += newsText.charAt(currentCharIndex);
							currentCharIndex++;
							setTimeout(typeChar, typingSpeed);
						} else {
							setTimeout(() => {
								currentNews.style.display = 'none';
								currentCharIndex = 0;
								currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
								typeNews();
							}, displayDuration);
						}
					}

					typeChar();
				}

				function hideAllNews() {
					newsItems.forEach((news) => {
						news.style.display = 'none';
					});
				}

				function startTyping() {
					hideAllNews();
					typeNews();
				}

				startTyping();
			}
		});

		// ایجاد یک TOC داینامیک
		if (document.getElementById('toc-list')) {
			headings.forEach(function (heading, index) {
				// ساخت لینک برای هر عنوان
				const tocItem = document.createElement('li');
				const tocLink = document.createElement('a');

				// ساخت شناسه یکتا برای هر عنوان
				const anchorId = 'toc-' + index;
				heading.setAttribute('id', anchorId);

				tocLink.setAttribute('href', '#' + anchorId);
				tocLink.textContent = heading.textContent;

				tocItem.appendChild(tocLink);
				tocList.appendChild(tocItem);
			});
		}

// more input for product in form
		if (document.getElementById("show-more-product-btn")) {
			document.getElementById("show-more-product-btn").addEventListener("click", function (event) {
				event.preventDefault();
				const moreSection = document.querySelector(".c-form__more");
				moreSection.classList.add("open");
				this.style.display = "none";
			});
		}
		if (document.getElementById('no')) {
			// فرم نظر سنجی مقالات
			const noElement = document.getElementById('no');

			function resetChoices() {
				noElement.classList.remove('selected-no');
			}

			// like-box
			// div.parentNode.classList.add('liked', 'loaded')
			document.querySelector('.like-box').addEventListener('click', () => {
				document.querySelector('.like-box').classList.add('liked', 'loaded');
				noElement.classList.add('animate');
				noElement.classList.remove('selected-no');
				setTimeout(() => noElement.classList.remove('animate'), 500);
			});
			noElement.addEventListener('click', () => {
				document.querySelector('.like-box').classList.remove('liked', 'loaded');
				//
				// resetChoices();
				noElement.classList.add('selected-no');
				noElement.classList.add('animate');
				setTimeout(() => noElement.classList.remove('animate'), 500);
			});
		}
		// همبرگر منو
		let hamburger = document.querySelector('.js-hamburger');
		if (hamburger) {
			let hamburgerMenu = function () {
				document.getElementsByTagName('html')[0].classList.toggle('is-fixed');
				document.querySelector('.js-navs').classList.toggle('is-open');
			};
			hamburger.addEventListener('click', hamburgerMenu, false);
		}
// کپچا
		const num1 = Math.floor(Math.random() * 10);
		const num2 = Math.floor(Math.random() * 10);
		const correctSum = num1 + num2;

		// نمایش اعداد در فرم
		if (document.getElementById('random-numbers')) {
			document.getElementById('random-numbers').innerText = `${num1} + ${num2} = ؟`;
			// ذخیره مقدار صحیح در فیلد مخفی
			document.getElementById('correct_sum').value = correctSum;
		}

		// پاپ‌آپ ویدئو (بازگشت به نسخه قبلی)
		if (document.getElementById('videoPopup')) {
			var videoItems = document.querySelectorAll('.video-item');
			var videoPopup = document.getElementById('videoPopup');
			var popupVideo = document.getElementById('popupVideo');
			var closeBtn = document.querySelector('.close');
			videoItems.forEach(function (item) {
				item.addEventListener('click', function () {
					var videoUrl = item.getAttribute('data-video-url');
					popupVideo.src = videoUrl;
					popupVideo.play();
					videoPopup.style.display = 'flex';
				});
			});

			closeBtn.addEventListener('click', function () {
				videoPopup.style.display = 'none';
				popupVideo.pause();
				popupVideo.currentTime = 0;
				popupVideo.src = '';
			});

			videoPopup.addEventListener('click', function (e) {
				if (e.target === videoPopup) {
					videoPopup.style.display = 'none';
					popupVideo.pause(); // توقف ویدئو
					popupVideo.currentTime = 0; // بازگشت به ابتدای ویدئو
					popupVideo.src = ''; // پاک کردن آدرس ویدئو
				}
			});
		}


		const customSwiper = document.querySelector(".custom-swiper");
		if (!!customSwiper) {
			new Swiper(".custom-swiper", {
				slidePerView: 1,
				spaceBetween: 16,
				// navigation: {
				// 	nextEl: ".swiper-button-next",
				// 	prevEl: ".swiper-button-prev",
				// },
			});
		}
	});

	document.querySelectorAll('.c-table__num span').forEach(element => {
		const price = parseInt(element.textContent.replace(/,/g, ''));

		if (price > 900000) {
			const parent = element.closest('.c-table__num');

			parent.innerHTML = '<small>تماس بگیرید</small>';
		}


	});

})();
jQuery(document).ready(function ($) {
	// shop now
// input plus and minize
	$(document).on('input', '.qty-input', function () {
		let val = parseInt($(this).val());
		if (isNaN(val) || val < 1) {
			$(this).val(1);
		}
		if ($('.meterage-value').length > 0) {
			billAmount($(this));
		}
	});
	$('.plus').click(function () {
		const $box = $(this).closest('.quantity-box');
		const $input = $box.find('.qty-input');
		const $minusBtn = $box.find('.minus');
		let val = parseInt($input.val()) + 1;
		$input.val(val);
		$('.meterage-popup').val(val);
		if ($('.finalPrice').length > 0) {
			$('.finalPrice').html(Number(val * $('#pr-price').val()).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
		}
		billAmount($(this));
		if (val > 1) {
			$minusBtn.html('-');
		}
	});
	$('.minus').click(function () {
		const $box = $(this).closest('.quantity-box');
		const $input = $box.find('.qty-input');
		const $minusBtn = $box.find('.minus');
		let val = parseInt($input.val());
		val--;
		$('.meterage-popup').val(val);
		if ($('.finalPrice').length > 0) {
			$('.finalPrice').html(Number(val * $('#pr-price').val()).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
		}
		$('.meterage-popup').val(val);
		if (val > 1) {
			$input.val(val);
			$minusBtn.html('-');
			billAmount($(this));
		} else if (val == 1) {
			$input.val(1);
			billAmount($(this));
			$minusBtn.html(`
			<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.5 5.48335C14.725 5.20835 11.9333 5.06668 9.15 5.06668C7.5 5.06668 5.85 5.15001 4.2 5.31668L2.5 5.48335" stroke="#D70609" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M7.0835 4.64166L7.26683 3.54999C7.40016 2.75832 7.50016 2.16666 8.9085 2.16666H11.0918C12.5002 2.16666 12.6085 2.79166 12.7335 3.55832L12.9168 4.64166" stroke="#D70609" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M15.7082 8.11667L15.1665 16.5083C15.0748 17.8167 14.9998 18.8333 12.6748 18.8333H7.32484C4.99984 18.8333 4.92484 17.8167 4.83317 16.5083L4.2915 8.11667" stroke="#D70609" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8.6084 14.25H11.3834" stroke="#D70609" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M7.9165 10.9167H12.0832" stroke="#D70609" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		`);
		} else {
			// delete order in cart
			var $productLi = $(this).closest('li');
			var productId = $productLi.data('product-id');
			let cart = getCookie('shoppingCart');
			cart = cart.filter(function (item) {
				return String(item.id) !== String(productId);
			});
			setCookie('shoppingCart', cart, 7);
			updateTotal(cart, true);
			$('.count-order').text(cart.length);
			$(this).closest('li').fadeOut(350, function () {
				$(this).remove();
			});
		}
	});
	$('input[name="thickness"]').change(function () {
		// alert($(this).val());
		$('#pr-price').val($(this).val());
		$('#product-id').val($(this).data('id'));
		$('#unit-price').html(Number($(this).val()).toLocaleString() + ' <svg class="toman"><use href="#toman"/></svg> ');
		finalPrice();
	});
	$('#checkout-form').submit(function (e) {
		e.preventDefault();
		$('.close-btn').click(function () {
			$('#submited-success').fadeOut();
		});
		var isValid = true;
		var $inputs = $('#checkout-form input.required');
		$inputs.each(function () {
			var value = $(this).val();
			if (value == '') {
				$(this).closest('label').addClass('is-error');
				isValid = false;
			} else {
				$(this).closest('label').removeClass('is-error');
			}
		});

		if (!isValid) {
			return;
		}
		$('#order-form').fadeOut();
		$('#submited-success').fadeIn();
		var trackingCode = document.getElementById('trackingCode').value;
		var userInfo = {
			full_name: $('input[name="user_info[full_name]"]').val(),
			phone_number: $('input[name="user_info[phone_number]"]').val(),
			email: $('input[name="user_info[email]"]').val(),
			city: $('input[name="user_info[city]"]').val(),
			province: $('input[name="user_info[province]"]').val(),
			postal_address: $('input[name="user_info[postal_address]"]').val(),
		};
		$.ajax({
			url: ajaxObject.ajaxurl,
			method: "POST",
			data: {
				action: "handle_custom_checkout_form",
				submit_request: true,
				trackingCode: trackingCode,
				user_info: userInfo
			},
			success: function (response) {
					$('#tracking-code').text('کد رهگیری : ' + trackingCode);
					document.cookie = "shoppingCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					document.cookie = "cartTotal = getCookie('cartTotal');\n=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

					setTimeout(function () {
						window.location.href = '/';
					}, 4000);
				if (response) {}
			},
			error: function () {
				$('body').html('<ul><li>مشکلی پیش آمد. دوباره تلاش کنید.</li></ul>');
			},
		});
	});
// popup order form
	$('#confirm-order').click(function () {
		$('#order-form').fadeIn();
	});
	$('.success-modal').click(function (e) {
		if ($(e.target).is('.added-cart')) {
			$('#add-cart-success').fadeOut();
		}
	})
	$('.close-popup-form').click(function () {
		if ($('#order-form').length > 0) {
			$('.cart-modal').fadeOut()
		} else if ($('#add-cart-success').length > 0) {
			$('#add-cart-success').fadeOut();
		}
		// $('#order-form').fadeOut();
	});
// payment method
	$('input[name="payment"]').on('change', function () {
		const value = $(this).val();
		if (value === 'deposit') {
			paymentMethod($('input[name="payment-method"]:checked').val());
			$('#payment-method').slideDown(300);
		} else {
			paymentMethod(1);
			$('#payment-method').slideUp(300);
		}
	});
	$('#meterage').on('change', function () {
		$('.meterage-value').val($('#meterage').val());
		finalPrice();
	});
	$('input[name="payment-method"]').on('change', function () {
		var percent = $(this).val();
		paymentMethod(percent);
	});

	function paymentMethod(percent) {
		var cost = $('input[name="shipping"]:checked').data('cost');
		let total = getCookie('cartTotal');
		const tax = total * 0.1;
		const final = total + tax + cost;
		if ($('#total-price').length > 0) {
			$('#shipping-cost').html(cost ? Number(cost).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>' : 'رایگان');
			$('#total-price').html(Number(total).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
			$('#tax-amount').html(Number(tax).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
			$('#final-price').html(Number(final * percent).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
			$('#deposit-desc').html(' پرداخت ' + percent * 100 + '% مبلغ کل');
		}
	}

	function finalPrice() {
		var price = $('#pr-price').val() * $('#meterage').val();
		$('.finalPrice').html(Number(price).toLocaleString() + ' <svg class="toman"><use href="#toman"/></svg> ');
	}

// shipping method
	$('input[name="shipping"]').on('change', function () {
		if ($('#quickly').is(':checked')) {
			$('.shipping-notice').text('( در تحویل فوری ارسال بصورت فوری می‌باشد ولی در صورت نبود برش مناسب 24 ساعت زمان اضافه می گردد. )')
		} else if ($('#normal').is(':checked')) {
			$('.shipping-notice').text('( در تحویل عادی ارسال برش مناسب ۷ الی ۱۰ روز زمان می‌برد. )')
		}
	});

// change meter order in cart
	function billAmount(e) {
		var $productLi = e.closest('li');
		var productId = $productLi.data('product-id');
		var totalRowPrice = $productLi.find('.total-price-order');
		var input = $productLi.find('.qty-input');
		let cart = getCookie('shoppingCart');
		const $amount = input.val();
		cart.forEach(function (item) {
			if (String(item.id) === String(productId)) {
				item.amount = Number($amount);
				totalRowPrice.html(Number(item.amount * item.price).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
			}
		});
		setCookie('shoppingCart', cart, 7);
		updateTotal(cart, true);
	}

// shop cart
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = "expires=" + d.toUTCString();
		document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
	}

	function getCookie(name) {
		const cookies = document.cookie.split("; ");
		for (let i = 0; i < cookies.length; i++) {
			const parts = cookies[i].split("=");
			if (parts[0] === name) {
				return JSON.parse(parts[1]);
			}
		}
		return [];
	}

	function add_to_card(product,fadeIn) {
		let cart = getCookie('shoppingCart');
		// cart.push(product);
		let productIndex = cart.findIndex(function (item) {
			return String(item.id) === String(product.id);
		});

		if (productIndex !== -1) {
			cart[productIndex].amount = product.amount;
			cart[productIndex].price = product.price;
		} else {
			cart.push(product);
		}
		setCookie('shoppingCart', cart, 7);
		updateTotal(cart);
		if(fadeIn){
			$('#add-cart-success').fadeIn();
		}
	}

	if ($('.c-shopping-online').length) {
		var $productDetail = $('.product-detail').find('a');
		$('.shop-now').on('click', function (e) {
			var $this = $(this);
			var $parent = $this.closest('.shop__item');
			$productDetail.text($parent.find('.product-name').data('name'));
			document.getElementById('product-name').value = $parent.find('.product-name').data('name');
			document.getElementById('pr-price').value = $parent.find('.product-price').data('price');
			document.getElementById('product-id').value = $this.data('id');
			document.getElementById('page-id').value = $this.data('pageid');
			$('#add-cart-success').fadeIn();
		});
	}


	if ($('#add-to-card').length > 0) {
		$('#add-to-card').on('click', function (e) {
			// e.preventDefault();
			let product;
			if ($('.c-shopping-online').length) {
				const name = document.getElementById('product-name').value;
				const price = document.getElementById('pr-price').value;
				const amount = document.getElementById('meterage').value;
				const productId = document.getElementById('product-id').value;
				const pageId = document.getElementById('page-id').value;
				product = {
					id: productId,
					name: name,
					price: price,
					amount: amount,
					pageId: pageId
				};
				$('#add-cart-success').fadeOut();
				add_to_card(product,false);
			} else {
				const name = document.getElementById('product-name').value;
				const price = document.getElementById('pr-price').value;
				const amount = document.getElementById('meterage').value;
				const productId = document.getElementById('product-id').value;
				const pageId = document.getElementById('page-id').value;
				product = {
					id: productId,
					name: name,
					price: price,
					amount: amount,
					pageId: pageId
				};
				add_to_card(product,true);
			}
		});
	}

	function updateTotal(cart, update = false) {
		let total = 0;
		cart.forEach(item => {
			total += parseInt(item.price * item.amount); // اطمینان از عدد بودن
		});
		const tax = total * 0.1;
		const final = total + tax;
		if ($('#total-price').length > 0 && update) {
			$('#total-price').html(Number(total).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
			$('#final-price').html(Number(final).toLocaleString() + '<svg class="toman"><use href="#toman"/></svg>');
		}
		setCookie('cartTotal', total, 7);
	}

	const existingCart = getCookie('shoppingCart');
	updateTotal(existingCart);

// قیمت محصولات در سینگل محصول
	function updatePrice() {
		var selectedOption = $('#product-select').find(':selected');
		var price = selectedOption.data('price');

		if (price) {
			$('#product-price').html(price + '<svg class="toman"><use href="#toman"></use></svg>');
		} else {
			$('#product-price').text('تماس بگیرید');
		}
	}

	$('#product-select').on('change', updatePrice);
	updatePrice();
	if ($('.more-text').length > 0) {
		$('.more-text').on('click', function () {
			const $content = $(this).closest('.c-des').find('.hidden-content');
			const $text = $(this).find('.text');

			if ($content.is(':visible')) {
				$content.slideUp();
				$(this).removeClass('open');
				$text.text('مشاهده بیشتر');
			} else {
				$content.slideDown();
				$(this).addClass('open');
				$text.text('مشاهده کمتر');
			}
		});
	}
	$('.c-search-btn').on('click', function () {
		$('#search-popup').fadeIn();
	});
// toc mobile
	if ($('#toc-list-m').length) {
		$('#toc-list-m').hide();
		$('.toggle-icon').text('+');
		$('.c-table__title-m').click(function () {
			var content = $('#toc-list-m');
			content.stop(true, true).slideToggle(400);
		});
	}
// بستن پاپ‌آپ
	$('.close-popup').on('click', function () {
		$('#search-popup').fadeOut();
	});
	const $searchField = $("#ajax-search-field");
	const $resultsContainer = $("#search-results");

// بستن پاپ‌آپ با کلیک بیرون از محتوای آن
	$('#search-popup').on('click', function (e) {
		if ($(e.target).is('#search-popup')) {
			$('#search-popup').fadeOut();
			$searchField.val("");
			$(this).find('#search-results').empty();
		}
	});
// جستجوی لایو
	$searchField.on("input", function () {
		const query = $searchField.val().trim();

		if (query.length < 3) {
			$resultsContainer.slideUp(200, function () {
				$(this).empty();
			});
			return;
		}

		$.ajax({
			url: ajaxObject.ajaxurl,
			method: "GET",
			data: {
				action: "handle_ajax_search",
				s: query,
			},
			beforeSend: function () {
				$resultsContainer.html('<ul><li class="search-loading">در حال جستجو</li></ul>').slideDown(200);
			},
			success: function (response) {
				$resultsContainer.html(response);
			},
			error: function () {
				$resultsContainer.html('<ul><li>مشکلی پیش آمد. دوباره تلاش کنید.</li></ul>');
			},
		});
	});

// سوالات متداول
	if ($('.c-faq__q').length > 0) {
		$('.c-faq__q').on('click', function () {
			const $item = $(this).closest('.c-faq__item');
			const $answer = $item.find('.c-faq__a');

			if ($item.hasClass('active')) {
				$item.removeClass('active');
				$answer.slideUp();
			} else {
				$('.c-faq__item').removeClass('active');
				$('.c-faq__a').slideUp();
				$item.addClass('active');
				$answer.slideDown();
			}
		});
	}

// تغییرات اسکرول برای هدر
// Throttle ساده
	function throttle(func, limit) {
		let lastFunc;
		let lastRan;
		return function () {
			const context = this;
			const args = arguments;
			if (!lastRan) {
				func.apply(context, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(function () {
					if ((Date.now() - lastRan) >= limit) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				}, limit - (Date.now() - lastRan));
			}
		}
	}

	$(document).ready(function() {
		const $header = $(".c-section--header");
		const scrollThreshold = 50;

		const handleScroll = throttle(function () {
			const scrollTop = $(window).scrollTop();
			if (scrollTop > scrollThreshold) {
				$header.addClass("js-scroll");
			} else {
				$header.removeClass("js-scroll");
			}
		}, 100);

		$(window).on("scroll", handleScroll);
	});

	if ($(".c-section--header-landing").length) {
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();
			var $header = $(".c-section--header-landing");
			if ($header.length) {
				if (scroll >= 36 && !$header.hasClass("js-scroll")) {
					$header.addClass("js-scroll");
				} else if (scroll < 36 && $header.hasClass("js-scroll")) {
					$header.removeClass("js-scroll");
				}
			}
		});
	}

// تب‌ها
	function spTabs() {
		if ($('.js-tabs').length) {
			$('.js-tabs').each(function (index, item) {
				var $mainContainer = $(this);
				var $menuContainer = $(this).find('.js-tabs-nav__item');
				var $label = $(this).find('.js-tab-__title_text');
				var $content = $(this).find('.js-tabs-content__item');

				$content.hide();
				$label.each(function (idx, ele) {
					$(this).attr('data-target', idx);
				});
				$($menuContainer[0], $label[0]).addClass('js-active');
				$($content[0]).show();

				$(this).find('.js-tabs-nav__item').click(function (ele) {
					$(this).closest('.js-tabs').find('.js-active').removeClass('js-active');
					$(this).addClass('js-active');
					$(this).find('.js-tab-__title_text').addClass('js-active');
					$(this).closest('.js-tabs').find('.js-tabs-content:first > .js-tabs-content__item').hide();
					$(this).closest('.js-tabs').find('.js-tabs-content:first > .js-tabs-content__item').eq(parseInt($(this).find('[data-target]').attr('data-target'))).show();
				});
			});
		}
	}

	spTabs();

// آکاردئون
	var accordionParentClass = '.js-table';
	var accordionQuestionClass = '.js-table .js-table__header';
	var accordionContentClass = '.js-table__content';

	if ($(accordionParentClass).length) {
		$(accordionParentClass).each(function () {
			$(this).addClass('js-close');
		});

		$(accordionQuestionClass).click(function () {
			if ($(this).closest(accordionParentClass).find(".panel-svg")) {
				var newColor = $(this).data("color");
				document.querySelectorAll(".change-color").forEach(path => {
					path.setAttribute("fill", newColor);
				});
			}
			var faqClass = $(this).closest(accordionParentClass).attr('class');

			if (faqClass.indexOf('js-close') != -1) {
				$(accordionParentClass).find(accordionContentClass).slideUp('slow');
				$(accordionParentClass).addClass('js-close').removeClass('js-open');

				$(this).closest(accordionParentClass).removeClass('js-close').addClass('js-open');
				$(this).closest(accordionParentClass).find(accordionContentClass).slideDown('slow');
			} else {
				$(this).closest(accordionParentClass).addClass('js-close').removeClass('js-open');
				$(this).closest(accordionParentClass).find(accordionContentClass).slideUp('slow');
			}
		});
	}

// فرمت کردن اعداد
	if ($('.c-table__num, .js-table__content-price').length) {
		$('.c-table__num, .js-table__content-price').each(function () {
			const formatNumber = (number) => {
				return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			};

			$(this).html(function (_, html) {
				return html.replace(/\d+(?:\.\d+)?/g, function (match) {
					return formatNumber(match);
				});
			});
		});
	}

	/* News Ticker */
	$('#js-news-ticker').breakingNews({
		height: 40,
		fontSize: 'default',
		themeColor: 'default',
		background: 'default',
		borderWidth: 0,
		direction: 'rtl',
		radius: 0,
		zIndex: 99999,
		// scrollSpeed: 3,
		stopOnHover: true
	});

// landing
// landing slider number
	if ($('.slide-show-1')) {
		$('.slide-show-1').css('fill', 'rgba(230, 231, 236, 1)');
		$('.carousel').on('change.flickity', function (event, index) {
			var totalSlides = $('.carousel').data('flickity').cells.length;
			$('.slider-position').html('<span class="total-slide">0' + totalSlides + '/</span><span class="active-slide">0' + (index + 1) + '</span>');
			for (var i = 1; i <= totalSlides; i++) {
				$('.slide-show-' + i).css('fill', 'rgba(170, 170, 174, 1)');
				$('.slide-location-show-' + i + ' path').css('fill', 'rgba(212, 213, 217, 1)');
			}
			$('.slide-show-' + (index + 1)).css('fill', 'rgba(230, 231, 236, 1)');
			$('.slide-location-show-' + (index + 1) + ' path').css('fill', 'rgba(0, 19, 66, 1)');
		});
	}
	if ($('.c-hero-landing__slider').length) {
		var totalSlides = $('.c-hero-landing__slider').data('flickity').cells.length;
		var percent = (1 / totalSlides) * 100;
		var imgUrl = ($('.c-hero-landing__slider').find('.c-hero-landing__slider-item').eq(0)).attr('data-img');
		document.body.style.setProperty('--bg-img-landing', `url(${imgUrl})`);
		$('.slider-progress-fill').css('width', percent + '%');
		$('.c-hero-landing__slider').on('change.flickity', function (event, index) {
			var percent = ((index + 1) / totalSlides) * 100;
			$('.slider-position-hero').html('<span class="total-slide">0' + totalSlides + '/</span><span class="active-slide">0' + (index + 1) + '</span>');
			$('.slider-progress-fill').css('width', percent + '%');
			var $activeSlide = $('.c-hero-landing__slider').find('.c-hero-landing__slider-item').eq(index);
			var imgUrl = $activeSlide.attr('data-img');
			$('.c-section--hero-landing').each(function () {
				this.style.setProperty('--bg-img-landing', `url(${imgUrl})`);
			});
		});
	}
	let isExpanded = false;
	$('.btn-more-landing').click(function () {
		if (!isExpanded) {
			$('.c-desc-landing').animate({'max-height': '2000px'}, 500);
			$('.c-desc-landing').addClass("is-open");
			$(this).text('مشاهده کمتر');
			isExpanded = true;
		} else {
			$('.c-desc-landing').animate({'max-height': '141px'}, 500);
			$(this).text('مشاهده بیشتر');
			$('.c-desc-landing').removeClass("is-open");
			isExpanded = false;
		}
	});
	if ($('#order-pop')) {
		$('#order-pop').click(function () {
			$('#popup-order').fadeIn();
		});
		$('#close-popup').click(function () {
			$('#popup-order').fadeOut();
		});
		$('#popup-order').click(function (e) {
			if (e.target.id === 'popup-order') {
				$(this).fadeOut();
			}
		});
	}
})
;
