"use strict";

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var headings = document.querySelectorAll('article h2, article h3');
    var tocList;

    if (window.innerWidth > 766) {
      tocList = document.getElementById('toc-list');
    } else {
      tocList = document.getElementById('toc-list-m');
    } // اضافه کردن اسکرول و فعال‌سازی TOC


    if (tocList) {
      window.addEventListener('scroll', function () {
        // انتخاب تمام لینک‌های TOC
        var tocLinks = tocList.querySelectorAll('a'); // حذف کلاس active از تمام لینک‌ها

        tocLinks.forEach(function (link) {
          link.classList.remove('active');
        }); // بررسی تمام عناوین

        headings.forEach(function (heading, index) {
          var rect = heading.getBoundingClientRect(); // بررسی اگر عنوان در محدوده قابل مشاهده است

          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            // اضافه کردن کلاس active به لینک مربوط به عنوانی که در حال حاضر در نمای دید است
            tocLinks[index].classList.add('active');
          }
        });
      });
    } // price section type txt


    document.querySelectorAll('.c-live__list').forEach(function (list) {
      var newsItems = list.querySelectorAll('li');

      if (newsItems.length > 0) {
        var typeNews = function typeNews() {
          var currentNews = newsItems[currentNewsIndex];
          var linkElement = currentNews.querySelector('span');
          var newsText = linkElement.textContent.trim();
          currentNews.style.display = 'list-item';
          linkElement.textContent = '';

          function typeChar() {
            if (currentCharIndex < newsText.length) {
              linkElement.textContent += newsText.charAt(currentCharIndex);
              currentCharIndex++;
              setTimeout(typeChar, typingSpeed);
            } else {
              setTimeout(function () {
                currentNews.style.display = 'none';
                currentCharIndex = 0;
                currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
                typeNews();
              }, displayDuration);
            }
          }

          typeChar();
        };

        var hideAllNews = function hideAllNews() {
          newsItems.forEach(function (news) {
            news.style.display = 'none';
          });
        };

        var startTyping = function startTyping() {
          hideAllNews();
          typeNews();
        };

        var currentNewsIndex = 0;
        var currentCharIndex = 0;
        var typingSpeed = 50;
        var displayDuration = 4000;
        startTyping();
      }
    }); // ایجاد یک TOC داینامیک

    if (document.getElementById('toc-list')) {
      headings.forEach(function (heading, index) {
        // ساخت لینک برای هر عنوان
        var tocItem = document.createElement('li');
        var tocLink = document.createElement('a'); // ساخت شناسه یکتا برای هر عنوان

        var anchorId = 'toc-' + index;
        heading.setAttribute('id', anchorId);
        tocLink.setAttribute('href', '#' + anchorId);
        tocLink.textContent = heading.textContent;
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
      });
    } // more input for product in form


    if (document.getElementById("show-more-product-btn")) {
      document.getElementById("show-more-product-btn").addEventListener("click", function (event) {
        event.preventDefault();
        var moreSection = document.querySelector(".c-form__more");
        moreSection.classList.add("open");
        this.style.display = "none";
      });
    }

    if (document.getElementById('no')) {
      var resetChoices = function resetChoices() {
        noElement.classList.remove('selected-no');
      }; // like-box
      // div.parentNode.classList.add('liked', 'loaded')


      // فرم نظر سنجی مقالات
      var noElement = document.getElementById('no');
      document.querySelector('.like-box').addEventListener('click', function () {
        document.querySelector('.like-box').classList.add('liked', 'loaded');
        noElement.classList.add('animate');
        noElement.classList.remove('selected-no');
        setTimeout(function () {
          return noElement.classList.remove('animate');
        }, 500);
      });
      noElement.addEventListener('click', function () {
        document.querySelector('.like-box').classList.remove('liked', 'loaded'); //
        // resetChoices();

        noElement.classList.add('selected-no');
        noElement.classList.add('animate');
        setTimeout(function () {
          return noElement.classList.remove('animate');
        }, 500);
      });
    } // همبرگر منو


    var hamburger = document.querySelector('.js-hamburger');

    if (hamburger) {
      var hamburgerMenu = function hamburgerMenu() {
        document.getElementsByTagName('html')[0].classList.toggle('is-fixed');
        document.querySelector('.js-navs').classList.toggle('is-open');
      };

      hamburger.addEventListener('click', hamburgerMenu, false);
    } // کپچا


    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var correctSum = num1 + num2; // نمایش اعداد در فرم

    if (document.getElementById('random-numbers')) {
      document.getElementById('random-numbers').innerText = "".concat(num1, " + ").concat(num2, " = \u061F"); // ذخیره مقدار صحیح در فیلد مخفی

      document.getElementById('correct_sum').value = correctSum;
    } // پاپ‌آپ ویدئو (بازگشت به نسخه قبلی)


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

    var customSwiper = document.querySelector(".custom-swiper");

    if (!!customSwiper) {
      new Swiper(".custom-swiper", {
        slidePerView: 1,
        spaceBetween: 16 // navigation: {
        // 	nextEl: ".swiper-button-next",
        // 	prevEl: ".swiper-button-prev",
        // },

      });
    }
  });
  document.querySelectorAll('.c-table__num span').forEach(function (element) {
    var price = parseInt(element.textContent.replace(/,/g, ''));

    if (price > 900000) {
      var parent = element.closest('.c-table__num');
      parent.innerHTML = '<small>تماس بگیرید</small>';
    }
  });
})();

jQuery(document).ready(function ($) {
  var isMobile = function isMobile() {
    return window.innerWidth <= 768;
  };

  var hideTimer;

  function activateFirstChain($li) {
    var current = $li;

    while (true) {
      var $ulToShow = current.find('ul').first();
      if ($ulToShow.length === 0) break; // $ulToShow.addClass('open');

      current = $ulToShow.children('li').first();
    }
  }

  function deactivateAll() {
    $('.has-sub-menu ul').removeClass('open');
  }

  if (!isMobile()) {
    $('.mega-menu').on('mouseenter', function () {
      $('.c-menu').addClass('open');
      var $subContent = $(this).siblings('.sub-child').find('.sub-child-content');
      var currentUL = $subContent.find('ul').first(); // شروع از اولین UL

      $subContent.find('ul').removeClass('show');
      console.log("$(this).closest('.sub-child')");
      console.log($(this).siblings('.sub-child'));

      while (currentUL.length) {
        currentUL.addClass('show'); // پیدا کردن اولین LI که داخل این UL هست

        var firstLI = currentUL.children('li').first(); // رفتن به UL بعدی داخل این LI

        currentUL = firstLI.children('ul').first();
      }
    });
    $('.sub-child .has-sub-menu').on('mouseenter', function () {
      $(this).find('ul').first().addClass('show');
    }).on('mouseleave', function () {
      $(this).find('ul').first().removeClass('show');
    });
    $('.c-header').on('mouseleave', function () {
      console.log("gdfjbngdf;iujhfdgiuhdf");
      setTimeout(function () {
        $('.c-menu').removeClass('open');
        $('ul').removeClass('show');
      }, 200);
    });
  }

  $(window).on('resize', function () {
    deactivateAll();
  });

  if (isMobile()) {
    var showMobileSubmenu = function showMobileSubmenu(id) {
      $('.mobile-submenu').removeClass('active');
      $(".mobile-submenu[data-mobile-id=\"".concat(id, "\"]")).addClass('active');
      historyStack.push(id);
    };

    var historyStack = []; // همه ul‌های با کلاس show رو جدا کن و بذار تو بدنه به‌صورت صفحات

    $('ul.sub-menu, ul.product-list').each(function (i) {
      var $clone = $(this).clone();
      var $wrapper = $('<div class="mobile-submenu"></div>');
      var $backBtn = $('<div class="back-button">بازگشت</div>');
      $wrapper.append($backBtn).append($clone);
      $('body').append($wrapper);
      $(this).data('mobile-id', i);
      $wrapper.attr('data-mobile-id', i);
    }); // وقتی mega-menu کلیک شد

    $('.mega-menu').on('click', function (e) {
      e.preventDefault();
      var $ul = $(this).siblings('.sub-child').find('ul').first();
      var id = $ul.data('mobile-id');
      showMobileSubmenu(id);
    }); // وقتی آیتمی با زیرمنو کلیک شد (لول بعد)

    $(document).on('click', '.mobile-submenu ul > li.has-sub-menu > a', function (e) {
      e.preventDefault();
      var $nextUL = $(this).siblings('ul').first();
      var id = $nextUL.data('mobile-id');
      showMobileSubmenu(id);
    }); // دکمه برگشت

    $(document).on('click', '.back-button', function () {
      historyStack.pop(); // حذف آخرین

      var prev = historyStack[historyStack.length - 1];
      $('.mobile-submenu').removeClass('active');

      if (prev !== undefined) {
        $(".mobile-submenu[data-mobile-id=\"".concat(prev, "\"]")).addClass('active');
      }
    });
  } //ثدببا


  if ($('.more-text').length > 0) {
    $('.more-text').on('click', function () {
      var $content = $(this).closest('.c-des').find('.hidden-content');
      var $text = $(this).find('.text');

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
  }); // toc mobile

  if ($('#toc-list-m').length) {
    $('#toc-list-m').hide();
    $('.toggle-icon').text('+');
    $('.c-table__title-m').click(function () {
      var content = $('#toc-list-m');
      content.stop(true, true).slideToggle(400);
    });
  } // بستن پاپ‌آپ


  $('.close-popup').on('click', function () {
    $('#search-popup').fadeOut();
  });
  var $searchField = $("#ajax-search-field");
  var $resultsContainer = $("#search-results"); // بستن پاپ‌آپ با کلیک بیرون از محتوای آن

  $('#search-popup').on('click', function (e) {
    if ($(e.target).is('#search-popup')) {
      $('#search-popup').fadeOut();
      $searchField.val("");
      $(this).find('#search-results').empty();
    }
  }); // جستجوی لایو

  $searchField.on("input", function () {
    var query = $searchField.val().trim();

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
        s: query
      },
      beforeSend: function beforeSend() {
        $resultsContainer.html('<ul><li class="search-loading">در حال جستجو</li></ul>').slideDown(200);
      },
      success: function success(response) {
        $resultsContainer.html(response);
      },
      error: function error() {
        $resultsContainer.html('<ul><li>مشکلی پیش آمد. دوباره تلاش کنید.</li></ul>');
      }
    });
  }); // سوالات متداول

  if ($('.c-faq__q').length > 0) {
    $('.c-faq__q').on('click', function () {
      var $item = $(this).closest('.c-faq__item');
      var $answer = $item.find('.c-faq__a');

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
  } // تغییرات اسکرول برای هدر
  // Throttle ساده


  function throttle(func, limit) {
    var lastFunc;
    var lastRan;
    return function () {
      var context = this;
      var args = arguments;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  $(document).ready(function () {
    var $header = $(".c-section--header");
    var scrollThreshold = 50;
    var handleScroll = throttle(function () {
      var scrollTop = $(window).scrollTop();

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
  } // تب‌ها


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

  spTabs(); // آکاردئون

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
        document.querySelectorAll(".change-color").forEach(function (path) {
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
  } // فرمت کردن اعداد


  if ($('.c-table__num, .js-table__content-price').length) {
    $('.c-table__num, .js-table__content-price').each(function () {
      var formatNumber = function formatNumber(number) {
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
  }); // landing
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
    var percent = 1 / totalSlides * 100;
    var imgUrl = $('.c-hero-landing__slider').find('.c-hero-landing__slider-item').eq(0).attr('data-img');
    document.body.style.setProperty('--bg-img-landing', "url(".concat(imgUrl, ")"));
    $('.slider-progress-fill').css('width', percent + '%');
    $('.c-hero-landing__slider').on('change.flickity', function (event, index) {
      var percent = (index + 1) / totalSlides * 100;
      $('.slider-position-hero').html('<span class="total-slide">0' + totalSlides + '/</span><span class="active-slide">0' + (index + 1) + '</span>');
      $('.slider-progress-fill').css('width', percent + '%');
      var $activeSlide = $('.c-hero-landing__slider').find('.c-hero-landing__slider-item').eq(index);
      var imgUrl = $activeSlide.attr('data-img');
      $('.c-section--hero-landing').each(function () {
        this.style.setProperty('--bg-img-landing', "url(".concat(imgUrl, ")"));
      });
    });
  }

  var isExpanded = false;
  $('.btn-more-landing').click(function () {
    if (!isExpanded) {
      $('.c-desc-landing').animate({
        'max-height': '2000px'
      }, 500);
      $('.c-desc-landing').addClass("is-open");
      $(this).text('مشاهده کمتر');
      isExpanded = true;
    } else {
      $('.c-desc-landing').animate({
        'max-height': '141px'
      }, 500);
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
});