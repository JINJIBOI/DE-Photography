/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

		// Gallery lightbox.
			var $lightbox = $('#gallery-lightbox'),
				$lightboxImage = $lightbox.find('img'),
				$lightboxCaption = $lightbox.find('figcaption'),
				$galleryLinks = $('.grid-gallery a'),
				galleryIndex = 0;

			function showGalleryImage(index) {
				galleryIndex = (index + $galleryLinks.length) % $galleryLinks.length;

				var $link = $galleryLinks.eq(galleryIndex),
					$image = $link.find('img');

				$lightboxImage.attr({
					src: $link.attr('href'),
					alt: $image.attr('alt')
				});
				$lightboxCaption.text($image.attr('alt'));
			}

			$galleryLinks.on('click', function(event) {
				event.preventDefault();
				showGalleryImage($galleryLinks.index(this));
				$lightbox.attr('aria-hidden', 'false');
				$body.addClass('is-gallery-visible');
			});

			$lightbox.on('click', function(event) {
				if ($(event.target).is($lightbox) || $(event.target).hasClass('gallery-lightbox-close')) {
					$lightbox.attr('aria-hidden', 'true');
					$body.removeClass('is-gallery-visible');
				}
			});

			$lightbox.find('.gallery-lightbox-previous').on('click', function() {
				showGalleryImage(galleryIndex - 1);
			});

			$lightbox.find('.gallery-lightbox-next').on('click', function() {
				showGalleryImage(galleryIndex + 1);
			});

			$body.on('keydown', function(event) {
				if (!$body.hasClass('is-gallery-visible'))
					return;

				if (event.keyCode == 37)
					showGalleryImage(galleryIndex - 1);
				else if (event.keyCode == 39)
					showGalleryImage(galleryIndex + 1);
				else if (event.keyCode == 27) {
					$lightbox.attr('aria-hidden', 'true');
					$body.removeClass('is-gallery-visible');
				}
			});

})(jQuery);