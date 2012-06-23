var SlidesApp = function () {
};

SlidesApp.prototype.init = function (options) {
	this._toolbar = options.toolbar;
	this._frame = options.frame;
	this._slides = $(this._frame).find('.slides__item');

	this.setSlide(0);
	this.updateToolbar();
	this.scale();

};

SlidesApp.prototype.scale = function () {
	var body = this._frame;
	var scale = Math.min(
		window.innerWidth / body.clientWidth,
		(window.innerHeight - this._toolbar.parentNode.offsetHeight) / body.clientHeight
	);
	var value = 'scale('+scale+')';

	// TODO: use PrefixFree or StyleFix?
	$(body).css({
		'transform': value,
		'-o-transform': value,
		'-ms-transform': value,
		'-moz-transform': value,
		'-webkit-transform': value
	})
};

SlidesApp.prototype.updateToolbar = function () {
	if (!this._toolbar.elements.slides_total.value) {
		this._toolbar.elements.slides_total.value = this._slides.length;
	}
	this._toolbar.elements.slide_current.value = this._current + 1;

	this._toolbar.elements.button_first.disabled =
	this._toolbar.elements.button_prev.disabled = (this._current === 0);
	this._toolbar.elements.button_last.disabled =
	this._toolbar.elements.button_next.disabled = (this._current + 1 === this._slides.length);
};

SlidesApp.prototype.setSlide = function (i) {
	if (i < 0) {
		i = this._slides.length + i;
	} else if (i >= this._slides.length) {
		i = this._slides.length - 1;
	}

	this._current = i;
	$('.slides__item_active').removeClass('slides__item_active');
	$('.slides__item').eq(this._current).addClass('slides__item_active');

	this.updateToolbar();
};

SlidesApp.prototype.prevSlide = function () {
	this.setSlide(this._current - 1);
};

SlidesApp.prototype.nextSlide = function () {
	this.setSlide(this._current + 1);
};
