(function (global) {
	var slidesApp = new SlidesApp();

	slidesApp.init({
		'frame': $('.slides').get(0),
		'toolbar': $('.toolbar_nav .toolbar__form').get(0)
	});

	// Not sure if I should place DOM binding code here or in some module method.
	$(window).on('resize', function (e) {
		slidesApp.scale();
	});

	$(window).on('keydown', function (e) {
		if (e.keyCode === 37) {
			slidesApp.prevSlide();
		} else if (e.keyCode === 39) {
			slidesApp.nextSlide();
		} else if (e.keyCode === 36) {
			slidesApp.setSlide(0);
		} else if (e.keyCode === 35) {
			slidesApp.setSlide(-1);
		}
	});

	$(window).on('mousewheel', function (e) {
		if (e.wheelDelta < 0) {
			slidesApp.nextSlide();
		} else {
			slidesApp.prevSlide();
		}
	});

	$(window).on('click', '.button', function (e) {
		var button = $(e.target);
		if (button.hasClass('button_prev')) {
			slidesApp.prevSlide();
		} else if (button.hasClass('button_next')) {
			slidesApp.nextSlide();
		} else if (button.hasClass('button_first')) {
			slidesApp.setSlide(0);
		} else if (button.hasClass('button_last')) {
			slidesApp.setSlide(-1);
		}
	});

	slidesApp._toolbar.elements.slide_current.addEventListener('keydown', function (e) {
		e.stopPropagation();
	});

	slidesApp._toolbar.elements.slide_current.addEventListener('keypress', function (e) {
		if (/\D/.test(String.fromCharCode(e.keyCode))) {
			e.preventDefault();
		}
	});

	slidesApp._toolbar.elements.slide_current.addEventListener('change', function (e) {
		var slide = parseInt(e.target.value, 10);
		slidesApp.setSlide(slide - 1);
	});

	slidesApp._toolbar.elements.change_effect.addEventListener('change', function (e) {
		$(slidesApp._frame)
			.removeClass('slides_normal slides_fade slides_shrink')
			.addClass(e.target.value);
	});

	global.slidesApp = slidesApp;
})(this);
