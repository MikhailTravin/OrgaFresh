function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

let slider_about = new Swiper('.main-slider__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.main-slider__dotts',
		dynamicBullets: true,
		clickable: true,
	},
	// Arrows
	/*navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},*/

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		992: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		1268: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================


function sliders_bild_callback(params) { }

let categoriesSlider = new Swiper('.slider-home__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	/*pagination: {
		el: '.main-slider__dotts',
		dynamicBullets: true,
		clickable: true,
	},*/
	// Arrows
	navigation: {
		nextEl: '.slider-home__arrows-next',
		prevEl: '.slider-home__arrows-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.7,
		},
		430: {
			slidesPerView: 2.3,
		},
		500: {
			slidesPerView: 2.5,
		},
		600: {
			slidesPerView: 3.5,
		},
		768: {
			slidesPerView: 2.5,
		},
		992: {
			slidesPerView: 3.5,
		},
		1423: {
			slidesPerView: 5,
		},
		1445: {
			slidesPerView: 5,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

function sliders_bild_callback(params) { }

let weekSlider = new Swiper('.slider-week__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 4,
	spaceBetween: 32,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	/*pagination: {
		el: '.main-slider__dotts',
		dynamicBullets: true,
		clickable: true,
	},*/
	// Arrows
	navigation: {
		nextEl: '.slider-week__arrows-next',
		prevEl: '.slider-week__arrows-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.1,
		},
		430: {
			slidesPerView: 1.1,
		},
		500: {
			slidesPerView: 1.2,
		},
		600: {
			slidesPerView: 1.2,
		},
		768: {
			slidesPerView: 2.5,
		},
		992: {
			slidesPerView: 1.8,
		},
		1423: {
			slidesPerView: 3,
		},
		1500: {
			slidesPerView: 3.5,
		},
		1610: {
			slidesPerView: 4,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

function sliders_bild_callback(params) { }

let saySlider = new Swiper('.what-people-say__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 3,
	spaceBetween: 30,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: '.what-people-say__dotts',
		dynamicBullets: true,
		clickable: true,
	},
	// Arrows
	/*
	navigation: {
		nextEl: '.slider-week__arrows-next',
		prevEl: '.slider-week__arrows-prev',
	},*/

	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 1.5,
		},
		768: {
			slidesPerView: 1.5,
		},
		992: {
			slidesPerView: 2,
		},
		1452: {
			slidesPerView: 3,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

let sliderSubSlider = new Swiper('.images-product__subslider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 4,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	/*
	navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},*/
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

function sliders_bild_callback(params) { }

let sliderMainSlider = new Swiper('.images-product__mainslider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	thumbs: {
		swiper: sliderSubSlider
	},
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

let productsSlider = new Swiper('.related-products__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 5,
	spaceBetween: 30,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	/*pagination: {
		el: '.main-slider__dotts',
		dynamicBullets: true,
		clickable: true,
	},*/
	// Arrows
	navigation: {
		nextEl: '.related-products__arrows-next',
		prevEl: '.related-products__arrows-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.1,
		},
		430: {
			slidesPerView: 1.1,
		},
		500: {
			slidesPerView: 1.2,
		},
		600: {
			slidesPerView: 2.2,
		},
		768: {
			slidesPerView: 2.5,
		},
		992: {
			slidesPerView: 3.5,
			spaceBetween: 20,
		},
		1440: {
			slidesPerView: 4.7,
		},
		1585: {
			slidesPerView: 5,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

let aboutSlider = new Swiper('.about-slider__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 2,
	spaceBetween: 30,
	autoHeight: false,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	/*pagination: {
		el: '.main-slider__dotts',
		dynamicBullets: true,
		clickable: true,
	},*/
	// Arrows
	navigation: {
		nextEl: '.about-slider__arrows-next',
		prevEl: '.about-slider__arrows-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.2,
		},
		480: {
			slidesPerView: 1.2,
		},
		600: {
			slidesPerView: 1.5,
		},
		768: {
			slidesPerView: 1.5,
		},
		992: {
			slidesPerView: 1.5,
		},
		1053: {
			slidesPerView: 2,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//========================================================================================================================================================

let sliderBlog = new Swiper('.blog-detail__slide', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 15,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//clickable: true,
	//},
	// Arrows

	navigation: {
		nextEl: '.arrow-blog-detail__arrows-prev',
		prevEl: '.arrow-blog-detail__arrows-next',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: true,
		},
		768: {
			slidesPerView: 1,
		},
		1152: {
			slidesPerView: 1,
		},
		1920: {
			slidesPerView: 1,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});
let langHeaderCurrent = document.querySelector('.lang-header__current');
if (langHeaderCurrent) {

	let go = true;
	let type;

	langHeaderCurrent.addEventListener("click", function () {
		langHeaderToggle(langHeaderCurrent, type);
	});

	document.addEventListener("click", function (e) {
		if (!e.target.closest('.lang-header')) {
			langHeaderToggle(langHeaderCurrent, 'close');
		}
	});

	function langHeaderToggle(langHeaderCurrent, type) {
		if (go) {
			go = false;
			if (!type) {
				_slideToggle(langHeaderCurrent.nextElementSibling);
				langHeaderCurrent.classList.toggle('_active');
			} else {
				_slideUp(langHeaderCurrent.nextElementSibling);
				langHeaderCurrent.classList.remove('_active');
			}
			setTimeout(function () {
				go = true;
			}, 500);
		}
	}
}

//========================================================================================================================================================

let moneyHeaderCurrent = document.querySelector('.money-header__current');
if (moneyHeaderCurrent) {

	let go = true;
	let type;

	moneyHeaderCurrent.addEventListener("click", function () {
		langHeaderToggle(moneyHeaderCurrent, type);
	});

	document.addEventListener("click", function (e) {
		if (!e.target.closest('.money-header')) {
			langHeaderToggle(moneyHeaderCurrent, 'close');
		}
	});

	function langHeaderToggle(moneyHeaderCurrent, type) {
		if (go) {
			go = false;
			if (!type) {
				_slideToggle(moneyHeaderCurrent.nextElementSibling);
				moneyHeaderCurrent.classList.toggle('_active');
			} else {
				_slideUp(moneyHeaderCurrent.nextElementSibling);
				moneyHeaderCurrent.classList.remove('_active');
			}
			setTimeout(function () {
				go = true;
			}, 500);
		}
	}
}

//========================================================================================================================================================

const ratings = document.querySelectorAll('.slide-week__star-slide-week');
if (ratings.length > 0) {
	initRatings();
}

//========================================================================================================================================================

function initRatings() {
	let ratingActive, ratingValue;
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.star-slide-week__active');
		ratingValue = rating.querySelector('.star-slide-week__value');
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
}

//========================================================================================================================================================

let itemTabsResult = document.querySelector('.item-tabs-results__sorting');
if (itemTabsResult) {

	let go = true;
	let type;

	itemTabsResult.addEventListener("click", function () {
		itemTabsToggle(itemTabsResult, type);
	});

	document.addEventListener("click", function (e) {
		if (!e.target.closest('.item-tabs-results')) {
			itemTabsToggle(itemTabsResult, 'close');
		}
	});

	function itemTabsToggle(itemTabsResult, type) {
		if (go) {
			go = false;
			if (!type) {
				_slideToggle(itemTabsResult.nextElementSibling);
				itemTabsResult.classList.toggle('_active');
			} else {
				_slideUp(itemTabsResult.nextElementSibling);
				itemTabsResult.classList.remove('_active');
			}
			setTimeout(function () {
				go = true;
			}, 500);
		}
	}
}

//========================================================================================================================================================

const stars = document.querySelectorAll('.description-product-card__star-slide-week');
if (stars.length > 0) {
	initStars();
}

//========================================================================================================================================================

function initStars() {
	let starActive, starValue;
	for (let index = 0; index < stars.length; index++) {
		const star = stars[index];
		initStar(star);
	}

	function initStar(star) {
		initStarVars(star);

		setStarActiveWidth();

	}

	function initStarVars(star) {
		starActive = star.querySelector('.star-slide-week__active');
		starValue = star.querySelector('.star-slide-week__value');
	}

	function setStarActiveWidth(index = starValue.innerHTML) {
		const starActiveWidth = index / 0.05;
		starActive.style.width = `${starActiveWidth}%`;
	}
}

//========================================================================================================================================================

window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 992 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover")
			}
		}
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
	}
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
	const newYear = new Date('Jan 1 2022 00:00:00');

	const daysVal = document.querySelector('.time-count__days .time-count__val');
	const hoursVal = document.querySelector('.time-count__hours .time-count__val');
	const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
	const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

	function declOfNum(number, titles) {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	}

	const timeCount = () => {
		let now = new Date();
		let leftUntil = newYear - now;

		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
		let seconds = Math.floor(leftUntil / 1000) % 60;

		daysVal.textContent = days;
		hoursVal.textContent = hours;
		minutesVal.textContent = minutes;
		secondsVal.textContent = seconds;
	};

	timeCount();
	setInterval(timeCount, 1000);
});




var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//Spollers
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {

	function spollerCLick(e) {
		const spoller = e.target;
		if (spollersGo) {
			spollersGo = false;

			if (spoller.closest('._spollers').classList.contains('_one')) {
				let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let i = 0; i < curent_spollers.length; i++) {
					let el = curent_spollers[i];
					if (el != spoller) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			spoller.classList.toggle('_active');
			_slideToggle(spoller.nextElementSibling);

			setTimeout(function () {
				spollersGo = true;
			}, 500);
		}
	}
	function spollersInit() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			let spollerMax = spoller.getAttribute('data-max');

			if (spollerMax && window.innerWidth > spollerMax) {
				if (spoller.classList.contains('_init')) {
					spoller.classList.remove('_active');
					spoller.classList.remove('_init');
					spoller.nextElementSibling.style.cssText = '';
					spoller.removeEventListener("click", spollerCLick);
				}
			} else if (!spoller.classList.contains('_init')) {
				spoller.classList.add('_init');
				spoller.addEventListener("click", spollerCLick);
			}
		}
	}
	function spollersShowAvtive() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			if (spoller.classList.contains('_active')) {
				_slideToggle(spoller.nextElementSibling);
			}
		}
	}
	window.addEventListener("resize", spollersInit);

	setTimeout(function () {
		spollersShowAvtive();
		spollersInit();
	}, 0);
}

//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=================
//SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================
//Animate
function animate({ timing, draw, duration }) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}
function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}
function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open('_' + message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				datepicker(input, {
					customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//RANGE
const priceSlider = document.querySelector('.rating-shop-grid__range');
if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [50, 1200],
		connect: true,
		tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
		range: {
			'min': [50],
			'max': [1200]
		}
	});

	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}



let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}

	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}

	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}

function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			// ВЫЧИСЛИТЬ!!!
			let current_scroll = pageYOffset;//parseInt(scr_body.getAttribute('data-scroll'));
			//
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			let block_pos;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_prev) {
					let current_block_prev_height = current_block_prev.offsetHeight;
					block_pos = offset(current_block_prev).top;
					if (current_block_height <= viewport_height) {
						if (current_block_prev_height >= viewport_height) {
							block_pos = block_pos + (current_block_prev_height - viewport_height);
							full_scroll_to_sector(block_pos);
						}
					} else {
						enableScroll();
						if (current_scroll <= current_block_pos) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pagestart();
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_next) {
					block_pos = offset(current_block_next).top;
					if (current_block_height <= viewport_height) {
						full_scroll_to_sector(block_pos);
					} else {
						enableScroll();
						if (current_scroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pageend();
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				//infowindow.setContent($('.contacts-map-item_' + cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}

map(1);

/*
YA
function map(n) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525, 39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});

		let myPlacemark = new ymaps.Placemark([43.585525, 39.723062], {
		},{
			// Опции.
			//balloonContentHeader: 'Mistoun',
			//balloonContentBody: 'Москва, Николоямская 40с1',
			//balloonContentFooter: '+ 7(495) 507-54 - 90',
			//hasBalloon: true,
			//hideIconOnBalloonOpen: true,

			hasBalloon: false,
			hideIconOnBalloonOpen: false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		});
		myMap.geoObjects.add(myPlacemark);

		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');
	}
}*/

/*
  SimpleBar.js - v5.3.6
 Scrollbars, simpler.
  https://grsmto.github.io/simplebar/
 
 Made by Adrien Denat from a fork by Jonathan Nicol
 Under MIT License
 */

!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).SimpleBar = e() }(this, (function () { "use strict"; var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; function e(t, e) { return t(e = { exports: {} }, e.exports), e.exports } var r, i, n, o = "object", s = function (t) { return t && t.Math == Math && t }, a = s(typeof globalThis == o && globalThis) || s(typeof window == o && window) || s(typeof self == o && self) || s(typeof t == o && t) || Function("return this")(), c = function (t) { try { return !!t() } catch (t) { return !0 } }, l = !c((function () { return 7 != Object.defineProperty({}, "a", { get: function () { return 7 } }).a })), u = {}.propertyIsEnumerable, f = Object.getOwnPropertyDescriptor, h = { f: f && !u.call({ 1: 2 }, 1) ? function (t) { var e = f(this, t); return !!e && e.enumerable } : u }, d = function (t, e) { return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e } }, p = {}.toString, v = function (t) { return p.call(t).slice(8, -1) }, g = "".split, b = c((function () { return !Object("z").propertyIsEnumerable(0) })) ? function (t) { return "String" == v(t) ? g.call(t, "") : Object(t) } : Object, y = function (t) { if (null == t) throw TypeError("Can't call method on " + t); return t }, m = function (t) { return b(y(t)) }, x = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t }, E = function (t, e) { if (!x(t)) return t; var r, i; if (e && "function" == typeof (r = t.toString) && !x(i = r.call(t))) return i; if ("function" == typeof (r = t.valueOf) && !x(i = r.call(t))) return i; if (!e && "function" == typeof (r = t.toString) && !x(i = r.call(t))) return i; throw TypeError("Can't convert object to primitive value") }, w = {}.hasOwnProperty, S = function (t, e) { return w.call(t, e) }, O = a.document, k = x(O) && x(O.createElement), A = function (t) { return k ? O.createElement(t) : {} }, T = !l && !c((function () { return 7 != Object.defineProperty(A("div"), "a", { get: function () { return 7 } }).a })), L = Object.getOwnPropertyDescriptor, z = { f: l ? L : function (t, e) { if (t = m(t), e = E(e, !0), T) try { return L(t, e) } catch (t) { } if (S(t, e)) return d(!h.f.call(t, e), t[e]) } }, R = function (t) { if (!x(t)) throw TypeError(String(t) + " is not an object"); return t }, _ = Object.defineProperty, M = { f: l ? _ : function (t, e, r) { if (R(t), e = E(e, !0), R(r), T) try { return _(t, e, r) } catch (t) { } if ("get" in r || "set" in r) throw TypeError("Accessors not supported"); return "value" in r && (t[e] = r.value), t } }, C = l ? function (t, e, r) { return M.f(t, e, d(1, r)) } : function (t, e, r) { return t[e] = r, t }, W = function (t, e) { try { C(a, t, e) } catch (r) { a[t] = e } return e }, j = e((function (t) { var e = a["__core-js_shared__"] || W("__core-js_shared__", {}); (t.exports = function (t, r) { return e[t] || (e[t] = void 0 !== r ? r : {}) })("versions", []).push({ version: "3.2.1", mode: "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" }) })), N = j("native-function-to-string", Function.toString), I = a.WeakMap, B = "function" == typeof I && /native code/.test(N.call(I)), D = 0, P = Math.random(), F = function (t) { return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++D + P).toString(36) }, V = j("keys"), X = function (t) { return V[t] || (V[t] = F(t)) }, H = {}, q = a.WeakMap; if (B) { var $ = new q, Y = $.get, G = $.has, U = $.set; r = function (t, e) { return U.call($, t, e), e }, i = function (t) { return Y.call($, t) || {} }, n = function (t) { return G.call($, t) } } else { var Q = X("state"); H[Q] = !0, r = function (t, e) { return C(t, Q, e), e }, i = function (t) { return S(t, Q) ? t[Q] : {} }, n = function (t) { return S(t, Q) } } var K = { set: r, get: i, has: n, enforce: function (t) { return n(t) ? i(t) : r(t, {}) }, getterFor: function (t) { return function (e) { var r; if (!x(e) || (r = i(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required"); return r } } }, J = e((function (t) { var e = K.get, r = K.enforce, i = String(N).split("toString"); j("inspectSource", (function (t) { return N.call(t) })), (t.exports = function (t, e, n, o) { var s = !!o && !!o.unsafe, c = !!o && !!o.enumerable, l = !!o && !!o.noTargetGet; "function" == typeof n && ("string" != typeof e || S(n, "name") || C(n, "name", e), r(n).source = i.join("string" == typeof e ? e : "")), t !== a ? (s ? !l && t[e] && (c = !0) : delete t[e], c ? t[e] = n : C(t, e, n)) : c ? t[e] = n : W(e, n) })(Function.prototype, "toString", (function () { return "function" == typeof this && e(this).source || N.call(this) })) })), Z = a, tt = function (t) { return "function" == typeof t ? t : void 0 }, et = function (t, e) { return arguments.length < 2 ? tt(Z[t]) || tt(a[t]) : Z[t] && Z[t][e] || a[t] && a[t][e] }, rt = Math.ceil, it = Math.floor, nt = function (t) { return isNaN(t = +t) ? 0 : (t > 0 ? it : rt)(t) }, ot = Math.min, st = function (t) { return t > 0 ? ot(nt(t), 9007199254740991) : 0 }, at = Math.max, ct = Math.min, lt = function (t) { return function (e, r, i) { var n, o = m(e), s = st(o.length), a = function (t, e) { var r = nt(t); return r < 0 ? at(r + e, 0) : ct(r, e) }(i, s); if (t && r != r) { for (; s > a;)if ((n = o[a++]) != n) return !0 } else for (; s > a; a++)if ((t || a in o) && o[a] === r) return t || a || 0; return !t && -1 } }, ut = { includes: lt(!0), indexOf: lt(!1) }.indexOf, ft = function (t, e) { var r, i = m(t), n = 0, o = []; for (r in i) !S(H, r) && S(i, r) && o.push(r); for (; e.length > n;)S(i, r = e[n++]) && (~ut(o, r) || o.push(r)); return o }, ht = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], dt = ht.concat("length", "prototype"), pt = { f: Object.getOwnPropertyNames || function (t) { return ft(t, dt) } }, vt = { f: Object.getOwnPropertySymbols }, gt = et("Reflect", "ownKeys") || function (t) { var e = pt.f(R(t)), r = vt.f; return r ? e.concat(r(t)) : e }, bt = function (t, e) { for (var r = gt(e), i = M.f, n = z.f, o = 0; o < r.length; o++) { var s = r[o]; S(t, s) || i(t, s, n(e, s)) } }, yt = /#|\.prototype\./, mt = function (t, e) { var r = Et[xt(t)]; return r == St || r != wt && ("function" == typeof e ? c(e) : !!e) }, xt = mt.normalize = function (t) { return String(t).replace(yt, ".").toLowerCase() }, Et = mt.data = {}, wt = mt.NATIVE = "N", St = mt.POLYFILL = "P", Ot = mt, kt = z.f, At = function (t, e) { var r, i, n, o, s, c = t.target, l = t.global, u = t.stat; if (r = l ? a : u ? a[c] || W(c, {}) : (a[c] || {}).prototype) for (i in e) { if (o = e[i], n = t.noTargetGet ? (s = kt(r, i)) && s.value : r[i], !Ot(l ? i : c + (u ? "." : "#") + i, t.forced) && void 0 !== n) { if (typeof o == typeof n) continue; bt(o, n) } (t.sham || n && n.sham) && C(o, "sham", !0), J(r, i, o, t) } }, Tt = function (t) { if ("function" != typeof t) throw TypeError(String(t) + " is not a function"); return t }, Lt = function (t, e, r) { if (Tt(t), void 0 === e) return t; switch (r) { case 0: return function () { return t.call(e) }; case 1: return function (r) { return t.call(e, r) }; case 2: return function (r, i) { return t.call(e, r, i) }; case 3: return function (r, i, n) { return t.call(e, r, i, n) } }return function () { return t.apply(e, arguments) } }, zt = function (t) { return Object(y(t)) }, Rt = Array.isArray || function (t) { return "Array" == v(t) }, _t = !!Object.getOwnPropertySymbols && !c((function () { return !String(Symbol()) })), Mt = a.Symbol, Ct = j("wks"), Wt = function (t) { return Ct[t] || (Ct[t] = _t && Mt[t] || (_t ? Mt : F)("Symbol." + t)) }, jt = Wt("species"), Nt = function (t, e) { var r; return Rt(t) && ("function" != typeof (r = t.constructor) || r !== Array && !Rt(r.prototype) ? x(r) && null === (r = r[jt]) && (r = void 0) : r = void 0), new (void 0 === r ? Array : r)(0 === e ? 0 : e) }, It = [].push, Bt = function (t) { var e = 1 == t, r = 2 == t, i = 3 == t, n = 4 == t, o = 6 == t, s = 5 == t || o; return function (a, c, l, u) { for (var f, h, d = zt(a), p = b(d), v = Lt(c, l, 3), g = st(p.length), y = 0, m = u || Nt, x = e ? m(a, g) : r ? m(a, 0) : void 0; g > y; y++)if ((s || y in p) && (h = v(f = p[y], y, d), t)) if (e) x[y] = h; else if (h) switch (t) { case 3: return !0; case 5: return f; case 6: return y; case 2: It.call(x, f) } else if (n) return !1; return o ? -1 : i || n ? n : x } }, Dt = { forEach: Bt(0), map: Bt(1), filter: Bt(2), some: Bt(3), every: Bt(4), find: Bt(5), findIndex: Bt(6) }, Pt = function (t, e) { var r = [][t]; return !r || !c((function () { r.call(null, e || function () { throw 1 }, 1) })) }, Ft = Dt.forEach, Vt = Pt("forEach") ? function (t) { return Ft(this, t, arguments.length > 1 ? arguments[1] : void 0) } : [].forEach; At({ target: "Array", proto: !0, forced: [].forEach != Vt }, { forEach: Vt }); var Xt = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 }; for (var Ht in Xt) { var qt = a[Ht], $t = qt && qt.prototype; if ($t && $t.forEach !== Vt) try { C($t, "forEach", Vt) } catch (t) { $t.forEach = Vt } } var Yt = !("undefined" == typeof window || !window.document || !window.document.createElement), Gt = Wt("species"), Ut = Dt.filter; At({ target: "Array", proto: !0, forced: !function (t) { return !c((function () { var e = []; return (e.constructor = {})[Gt] = function () { return { foo: 1 } }, 1 !== e[t](Boolean).foo })) }("filter") }, { filter: function (t) { return Ut(this, t, arguments.length > 1 ? arguments[1] : void 0) } }); var Qt = Object.keys || function (t) { return ft(t, ht) }, Kt = l ? Object.defineProperties : function (t, e) { R(t); for (var r, i = Qt(e), n = i.length, o = 0; n > o;)M.f(t, r = i[o++], e[r]); return t }, Jt = et("document", "documentElement"), Zt = X("IE_PROTO"), te = function () { }, ee = function () { var t, e = A("iframe"), r = ht.length; for (e.style.display = "none", Jt.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), ee = t.F; r--;)delete ee.prototype[ht[r]]; return ee() }, re = Object.create || function (t, e) { var r; return null !== t ? (te.prototype = R(t), r = new te, te.prototype = null, r[Zt] = t) : r = ee(), void 0 === e ? r : Kt(r, e) }; H[Zt] = !0; var ie = Wt("unscopables"), ne = Array.prototype; null == ne[ie] && C(ne, ie, re(null)); var oe, se, ae, ce = function (t) { ne[ie][t] = !0 }, le = {}, ue = !c((function () { function t() { } return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype })), fe = X("IE_PROTO"), he = Object.prototype, de = ue ? Object.getPrototypeOf : function (t) { return t = zt(t), S(t, fe) ? t[fe] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? he : null }, pe = Wt("iterator"), ve = !1;[].keys && ("next" in (ae = [].keys()) ? (se = de(de(ae))) !== Object.prototype && (oe = se) : ve = !0), null == oe && (oe = {}), S(oe, pe) || C(oe, pe, (function () { return this })); var ge = { IteratorPrototype: oe, BUGGY_SAFARI_ITERATORS: ve }, be = M.f, ye = Wt("toStringTag"), me = function (t, e, r) { t && !S(t = r ? t : t.prototype, ye) && be(t, ye, { configurable: !0, value: e }) }, xe = ge.IteratorPrototype, Ee = function () { return this }, we = Object.setPrototypeOf || ("__proto__" in {} ? function () { var t, e = !1, r = {}; try { (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(r, []), e = r instanceof Array } catch (t) { } return function (r, i) { return R(r), function (t) { if (!x(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype") }(i), e ? t.call(r, i) : r.__proto__ = i, r } }() : void 0), Se = ge.IteratorPrototype, Oe = ge.BUGGY_SAFARI_ITERATORS, ke = Wt("iterator"), Ae = function () { return this }, Te = function (t, e, r, i, n, o, s) { !function (t, e, r) { var i = e + " Iterator"; t.prototype = re(xe, { next: d(1, r) }), me(t, i, !1), le[i] = Ee }(r, e, i); var a, c, l, u = function (t) { if (t === n && g) return g; if (!Oe && t in p) return p[t]; switch (t) { case "keys": case "values": case "entries": return function () { return new r(this, t) } }return function () { return new r(this) } }, f = e + " Iterator", h = !1, p = t.prototype, v = p[ke] || p["@@iterator"] || n && p[n], g = !Oe && v || u(n), b = "Array" == e && p.entries || v; if (b && (a = de(b.call(new t)), Se !== Object.prototype && a.next && (de(a) !== Se && (we ? we(a, Se) : "function" != typeof a[ke] && C(a, ke, Ae)), me(a, f, !0))), "values" == n && v && "values" !== v.name && (h = !0, g = function () { return v.call(this) }), p[ke] !== g && C(p, ke, g), le[e] = g, n) if (c = { values: u("values"), keys: o ? g : u("keys"), entries: u("entries") }, s) for (l in c) !Oe && !h && l in p || J(p, l, c[l]); else At({ target: e, proto: !0, forced: Oe || h }, c); return c }, Le = K.set, ze = K.getterFor("Array Iterator"), Re = Te(Array, "Array", (function (t, e) { Le(this, { type: "Array Iterator", target: m(t), index: 0, kind: e }) }), (function () { var t = ze(this), e = t.target, r = t.kind, i = t.index++; return !e || i >= e.length ? (t.target = void 0, { value: void 0, done: !0 }) : "keys" == r ? { value: i, done: !1 } : "values" == r ? { value: e[i], done: !1 } : { value: [i, e[i]], done: !1 } }), "values"); le.Arguments = le.Array, ce("keys"), ce("values"), ce("entries"); var _e = Object.assign, Me = !_e || c((function () { var t = {}, e = {}, r = Symbol(); return t[r] = 7, "abcdefghijklmnopqrst".split("").forEach((function (t) { e[t] = t })), 7 != _e({}, t)[r] || "abcdefghijklmnopqrst" != Qt(_e({}, e)).join("") })) ? function (t, e) { for (var r = zt(t), i = arguments.length, n = 1, o = vt.f, s = h.f; i > n;)for (var a, c = b(arguments[n++]), u = o ? Qt(c).concat(o(c)) : Qt(c), f = u.length, d = 0; f > d;)a = u[d++], l && !s.call(c, a) || (r[a] = c[a]); return r } : _e; At({ target: "Object", stat: !0, forced: Object.assign !== Me }, { assign: Me }); var Ce = Wt("toStringTag"), We = "Arguments" == v(function () { return arguments }()), je = function (t) { var e, r, i; return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = function (t, e) { try { return t[e] } catch (t) { } }(e = Object(t), Ce)) ? r : We ? v(e) : "Object" == (i = v(e)) && "function" == typeof e.callee ? "Arguments" : i }, Ne = {}; Ne[Wt("toStringTag")] = "z"; var Ie = "[object z]" !== String(Ne) ? function () { return "[object " + je(this) + "]" } : Ne.toString, Be = Object.prototype; Ie !== Be.toString && J(Be, "toString", Ie, { unsafe: !0 }); var De = "\t\n\v\f\r                　\u2028\u2029\ufeff", Pe = "[" + De + "]", Fe = RegExp("^" + Pe + Pe + "*"), Ve = RegExp(Pe + Pe + "*$"), Xe = function (t) { return function (e) { var r = String(y(e)); return 1 & t && (r = r.replace(Fe, "")), 2 & t && (r = r.replace(Ve, "")), r } }, He = { start: Xe(1), end: Xe(2), trim: Xe(3) }.trim, qe = a.parseInt, $e = /^[+-]?0[Xx]/, Ye = 8 !== qe(De + "08") || 22 !== qe(De + "0x16") ? function (t, e) { var r = He(String(t)); return qe(r, e >>> 0 || ($e.test(r) ? 16 : 10)) } : qe; At({ global: !0, forced: parseInt != Ye }, { parseInt: Ye }); var Ge = function (t) { return function (e, r) { var i, n, o = String(y(e)), s = nt(r), a = o.length; return s < 0 || s >= a ? t ? "" : void 0 : (i = o.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === a || (n = o.charCodeAt(s + 1)) < 56320 || n > 57343 ? t ? o.charAt(s) : i : t ? o.slice(s, s + 2) : n - 56320 + (i - 55296 << 10) + 65536 } }, Ue = { codeAt: Ge(!1), charAt: Ge(!0) }, Qe = Ue.charAt, Ke = K.set, Je = K.getterFor("String Iterator"); Te(String, "String", (function (t) { Ke(this, { type: "String Iterator", string: String(t), index: 0 }) }), (function () { var t, e = Je(this), r = e.string, i = e.index; return i >= r.length ? { value: void 0, done: !0 } : (t = Qe(r, i), e.index += t.length, { value: t, done: !1 }) })); var Ze = function (t, e, r) { for (var i in e) J(t, i, e[i], r); return t }, tr = !c((function () { return Object.isExtensible(Object.preventExtensions({})) })), er = e((function (t) { var e = M.f, r = F("meta"), i = 0, n = Object.isExtensible || function () { return !0 }, o = function (t) { e(t, r, { value: { objectID: "O" + ++i, weakData: {} } }) }, s = t.exports = { REQUIRED: !1, fastKey: function (t, e) { if (!x(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t; if (!S(t, r)) { if (!n(t)) return "F"; if (!e) return "E"; o(t) } return t[r].objectID }, getWeakData: function (t, e) { if (!S(t, r)) { if (!n(t)) return !0; if (!e) return !1; o(t) } return t[r].weakData }, onFreeze: function (t) { return tr && s.REQUIRED && n(t) && !S(t, r) && o(t), t } }; H[r] = !0 })), rr = (er.REQUIRED, er.fastKey, er.getWeakData, er.onFreeze, Wt("iterator")), ir = Array.prototype, nr = Wt("iterator"), or = function (t, e, r, i) { try { return i ? e(R(r)[0], r[1]) : e(r) } catch (e) { var n = t.return; throw void 0 !== n && R(n.call(t)), e } }, sr = e((function (t) { var e = function (t, e) { this.stopped = t, this.result = e }; (t.exports = function (t, r, i, n, o) { var s, a, c, l, u, f, h, d = Lt(r, i, n ? 2 : 1); if (o) s = t; else { if ("function" != typeof (a = function (t) { if (null != t) return t[nr] || t["@@iterator"] || le[je(t)] }(t))) throw TypeError("Target is not iterable"); if (void 0 !== (h = a) && (le.Array === h || ir[rr] === h)) { for (c = 0, l = st(t.length); l > c; c++)if ((u = n ? d(R(f = t[c])[0], f[1]) : d(t[c])) && u instanceof e) return u; return new e(!1) } s = a.call(t) } for (; !(f = s.next()).done;)if ((u = or(s, d, f.value, n)) && u instanceof e) return u; return new e(!1) }).stop = function (t) { return new e(!0, t) } })), ar = function (t, e, r) { if (!(t instanceof e)) throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation"); return t }, cr = Wt("iterator"), lr = !1; try { var ur = 0, fr = { next: function () { return { done: !!ur++ } }, return: function () { lr = !0 } }; fr[cr] = function () { return this }, Array.from(fr, (function () { throw 2 })) } catch (t) { } var hr = function (t, e, r, i, n) { var o = a[t], s = o && o.prototype, l = o, u = i ? "set" : "add", f = {}, h = function (t) { var e = s[t]; J(s, t, "add" == t ? function (t) { return e.call(this, 0 === t ? 0 : t), this } : "delete" == t ? function (t) { return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t) } : "get" == t ? function (t) { return n && !x(t) ? void 0 : e.call(this, 0 === t ? 0 : t) } : "has" == t ? function (t) { return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t) } : function (t, r) { return e.call(this, 0 === t ? 0 : t, r), this }) }; if (Ot(t, "function" != typeof o || !(n || s.forEach && !c((function () { (new o).entries().next() }))))) l = r.getConstructor(e, t, i, u), er.REQUIRED = !0; else if (Ot(t, !0)) { var d = new l, p = d[u](n ? {} : -0, 1) != d, v = c((function () { d.has(1) })), g = function (t, e) { if (!e && !lr) return !1; var r = !1; try { var i = {}; i[cr] = function () { return { next: function () { return { done: r = !0 } } } }, t(i) } catch (t) { } return r }((function (t) { new o(t) })), b = !n && c((function () { for (var t = new o, e = 5; e--;)t[u](e, e); return !t.has(-0) })); g || ((l = e((function (e, r) { ar(e, l, t); var n = function (t, e, r) { var i, n; return we && "function" == typeof (i = e.constructor) && i !== r && x(n = i.prototype) && n !== r.prototype && we(t, n), t }(new o, e, l); return null != r && sr(r, n[u], n, i), n }))).prototype = s, s.constructor = l), (v || b) && (h("delete"), h("has"), i && h("get")), (b || p) && h(u), n && s.clear && delete s.clear } return f[t] = l, At({ global: !0, forced: l != o }, f), me(l, t), n || r.setStrong(l, t, i), l }, dr = er.getWeakData, pr = K.set, vr = K.getterFor, gr = Dt.find, br = Dt.findIndex, yr = 0, mr = function (t) { return t.frozen || (t.frozen = new xr) }, xr = function () { this.entries = [] }, Er = function (t, e) { return gr(t.entries, (function (t) { return t[0] === e })) }; xr.prototype = { get: function (t) { var e = Er(this, t); if (e) return e[1] }, has: function (t) { return !!Er(this, t) }, set: function (t, e) { var r = Er(this, t); r ? r[1] = e : this.entries.push([t, e]) }, delete: function (t) { var e = br(this.entries, (function (e) { return e[0] === t })); return ~e && this.entries.splice(e, 1), !!~e } }; var wr = { getConstructor: function (t, e, r, i) { var n = t((function (t, o) { ar(t, n, e), pr(t, { type: e, id: yr++, frozen: void 0 }), null != o && sr(o, t[i], t, r) })), o = vr(e), s = function (t, e, r) { var i = o(t), n = dr(R(e), !0); return !0 === n ? mr(i).set(e, r) : n[i.id] = r, t }; return Ze(n.prototype, { delete: function (t) { var e = o(this); if (!x(t)) return !1; var r = dr(t); return !0 === r ? mr(e).delete(t) : r && S(r, e.id) && delete r[e.id] }, has: function (t) { var e = o(this); if (!x(t)) return !1; var r = dr(t); return !0 === r ? mr(e).has(t) : r && S(r, e.id) } }), Ze(n.prototype, r ? { get: function (t) { var e = o(this); if (x(t)) { var r = dr(t); return !0 === r ? mr(e).get(t) : r ? r[e.id] : void 0 } }, set: function (t, e) { return s(this, t, e) } } : { add: function (t) { return s(this, t, !0) } }), n } }, Sr = (e((function (t) { var e, r = K.enforce, i = !a.ActiveXObject && "ActiveXObject" in a, n = Object.isExtensible, o = function (t) { return function () { return t(this, arguments.length ? arguments[0] : void 0) } }, s = t.exports = hr("WeakMap", o, wr, !0, !0); if (B && i) { e = wr.getConstructor(o, "WeakMap", !0), er.REQUIRED = !0; var c = s.prototype, l = c.delete, u = c.has, f = c.get, h = c.set; Ze(c, { delete: function (t) { if (x(t) && !n(t)) { var i = r(this); return i.frozen || (i.frozen = new e), l.call(this, t) || i.frozen.delete(t) } return l.call(this, t) }, has: function (t) { if (x(t) && !n(t)) { var i = r(this); return i.frozen || (i.frozen = new e), u.call(this, t) || i.frozen.has(t) } return u.call(this, t) }, get: function (t) { if (x(t) && !n(t)) { var i = r(this); return i.frozen || (i.frozen = new e), u.call(this, t) ? f.call(this, t) : i.frozen.get(t) } return f.call(this, t) }, set: function (t, i) { if (x(t) && !n(t)) { var o = r(this); o.frozen || (o.frozen = new e), u.call(this, t) ? h.call(this, t, i) : o.frozen.set(t, i) } else h.call(this, t, i); return this } }) } })), Wt("iterator")), Or = Wt("toStringTag"), kr = Re.values; for (var Ar in Xt) { var Tr = a[Ar], Lr = Tr && Tr.prototype; if (Lr) { if (Lr[Sr] !== kr) try { C(Lr, Sr, kr) } catch (t) { Lr[Sr] = kr } if (Lr[Or] || C(Lr, Or, Ar), Xt[Ar]) for (var zr in Re) if (Lr[zr] !== Re[zr]) try { C(Lr, zr, Re[zr]) } catch (t) { Lr[zr] = Re[zr] } } } var Rr = "Expected a function", _r = NaN, Mr = "[object Symbol]", Cr = /^\s+|\s+$/g, Wr = /^[-+]0x[0-9a-f]+$/i, jr = /^0b[01]+$/i, Nr = /^0o[0-7]+$/i, Ir = parseInt, Br = "object" == typeof t && t && t.Object === Object && t, Dr = "object" == typeof self && self && self.Object === Object && self, Pr = Br || Dr || Function("return this")(), Fr = Object.prototype.toString, Vr = Math.max, Xr = Math.min, Hr = function () { return Pr.Date.now() }; function qr(t, e, r) { var i, n, o, s, a, c, l = 0, u = !1, f = !1, h = !0; if ("function" != typeof t) throw new TypeError(Rr); function d(e) { var r = i, o = n; return i = n = void 0, l = e, s = t.apply(o, r) } function p(t) { var r = t - c; return void 0 === c || r >= e || r < 0 || f && t - l >= o } function v() { var t = Hr(); if (p(t)) return g(t); a = setTimeout(v, function (t) { var r = e - (t - c); return f ? Xr(r, o - (t - l)) : r }(t)) } function g(t) { return a = void 0, h && i ? d(t) : (i = n = void 0, s) } function b() { var t = Hr(), r = p(t); if (i = arguments, n = this, c = t, r) { if (void 0 === a) return function (t) { return l = t, a = setTimeout(v, e), u ? d(t) : s }(c); if (f) return a = setTimeout(v, e), d(c) } return void 0 === a && (a = setTimeout(v, e)), s } return e = Yr(e) || 0, $r(r) && (u = !!r.leading, o = (f = "maxWait" in r) ? Vr(Yr(r.maxWait) || 0, e) : o, h = "trailing" in r ? !!r.trailing : h), b.cancel = function () { void 0 !== a && clearTimeout(a), l = 0, i = c = n = a = void 0 }, b.flush = function () { return void 0 === a ? s : g(Hr()) }, b } function $r(t) { var e = typeof t; return !!t && ("object" == e || "function" == e) } function Yr(t) { if ("number" == typeof t) return t; if (function (t) { return "symbol" == typeof t || function (t) { return !!t && "object" == typeof t }(t) && Fr.call(t) == Mr }(t)) return _r; if ($r(t)) { var e = "function" == typeof t.valueOf ? t.valueOf() : t; t = $r(e) ? e + "" : e } if ("string" != typeof t) return 0 === t ? t : +t; t = t.replace(Cr, ""); var r = jr.test(t); return r || Nr.test(t) ? Ir(t.slice(2), r ? 2 : 8) : Wr.test(t) ? _r : +t } var Gr = function (t, e, r) { var i = !0, n = !0; if ("function" != typeof t) throw new TypeError(Rr); return $r(r) && (i = "leading" in r ? !!r.leading : i, n = "trailing" in r ? !!r.trailing : n), qr(t, e, { leading: i, maxWait: e, trailing: n }) }, Ur = "Expected a function", Qr = NaN, Kr = "[object Symbol]", Jr = /^\s+|\s+$/g, Zr = /^[-+]0x[0-9a-f]+$/i, ti = /^0b[01]+$/i, ei = /^0o[0-7]+$/i, ri = parseInt, ii = "object" == typeof t && t && t.Object === Object && t, ni = "object" == typeof self && self && self.Object === Object && self, oi = ii || ni || Function("return this")(), si = Object.prototype.toString, ai = Math.max, ci = Math.min, li = function () { return oi.Date.now() }; function ui(t) { var e = typeof t; return !!t && ("object" == e || "function" == e) } function fi(t) { if ("number" == typeof t) return t; if (function (t) { return "symbol" == typeof t || function (t) { return !!t && "object" == typeof t }(t) && si.call(t) == Kr }(t)) return Qr; if (ui(t)) { var e = "function" == typeof t.valueOf ? t.valueOf() : t; t = ui(e) ? e + "" : e } if ("string" != typeof t) return 0 === t ? t : +t; t = t.replace(Jr, ""); var r = ti.test(t); return r || ei.test(t) ? ri(t.slice(2), r ? 2 : 8) : Zr.test(t) ? Qr : +t } var hi = function (t, e, r) { var i, n, o, s, a, c, l = 0, u = !1, f = !1, h = !0; if ("function" != typeof t) throw new TypeError(Ur); function d(e) { var r = i, o = n; return i = n = void 0, l = e, s = t.apply(o, r) } function p(t) { var r = t - c; return void 0 === c || r >= e || r < 0 || f && t - l >= o } function v() { var t = li(); if (p(t)) return g(t); a = setTimeout(v, function (t) { var r = e - (t - c); return f ? ci(r, o - (t - l)) : r }(t)) } function g(t) { return a = void 0, h && i ? d(t) : (i = n = void 0, s) } function b() { var t = li(), r = p(t); if (i = arguments, n = this, c = t, r) { if (void 0 === a) return function (t) { return l = t, a = setTimeout(v, e), u ? d(t) : s }(c); if (f) return a = setTimeout(v, e), d(c) } return void 0 === a && (a = setTimeout(v, e)), s } return e = fi(e) || 0, ui(r) && (u = !!r.leading, o = (f = "maxWait" in r) ? ai(fi(r.maxWait) || 0, e) : o, h = "trailing" in r ? !!r.trailing : h), b.cancel = function () { void 0 !== a && clearTimeout(a), l = 0, i = c = n = a = void 0 }, b.flush = function () { return void 0 === a ? s : g(li()) }, b }, di = "Expected a function", pi = "__lodash_hash_undefined__", vi = "[object Function]", gi = "[object GeneratorFunction]", bi = /^\[object .+?Constructor\]$/, yi = "object" == typeof t && t && t.Object === Object && t, mi = "object" == typeof self && self && self.Object === Object && self, xi = yi || mi || Function("return this")(); var Ei = Array.prototype, wi = Function.prototype, Si = Object.prototype, Oi = xi["__core-js_shared__"], ki = function () { var t = /[^.]+$/.exec(Oi && Oi.keys && Oi.keys.IE_PROTO || ""); return t ? "Symbol(src)_1." + t : "" }(), Ai = wi.toString, Ti = Si.hasOwnProperty, Li = Si.toString, zi = RegExp("^" + Ai.call(Ti).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Ri = Ei.splice, _i = Di(xi, "Map"), Mi = Di(Object, "create"); function Ci(t) { var e = -1, r = t ? t.length : 0; for (this.clear(); ++e < r;) { var i = t[e]; this.set(i[0], i[1]) } } function Wi(t) { var e = -1, r = t ? t.length : 0; for (this.clear(); ++e < r;) { var i = t[e]; this.set(i[0], i[1]) } } function ji(t) { var e = -1, r = t ? t.length : 0; for (this.clear(); ++e < r;) { var i = t[e]; this.set(i[0], i[1]) } } function Ni(t, e) { for (var r, i, n = t.length; n--;)if ((r = t[n][0]) === (i = e) || r != r && i != i) return n; return -1 } function Ii(t) { return !(!Fi(t) || (e = t, ki && ki in e)) && (function (t) { var e = Fi(t) ? Li.call(t) : ""; return e == vi || e == gi }(t) || function (t) { var e = !1; if (null != t && "function" != typeof t.toString) try { e = !!(t + "") } catch (t) { } return e }(t) ? zi : bi).test(function (t) { if (null != t) { try { return Ai.call(t) } catch (t) { } try { return t + "" } catch (t) { } } return "" }(t)); var e } function Bi(t, e) { var r, i, n = t.__data__; return ("string" == (i = typeof (r = e)) || "number" == i || "symbol" == i || "boolean" == i ? "__proto__" !== r : null === r) ? n["string" == typeof e ? "string" : "hash"] : n.map } function Di(t, e) { var r = function (t, e) { return null == t ? void 0 : t[e] }(t, e); return Ii(r) ? r : void 0 } function Pi(t, e) { if ("function" != typeof t || e && "function" != typeof e) throw new TypeError(di); var r = function () { var i = arguments, n = e ? e.apply(this, i) : i[0], o = r.cache; if (o.has(n)) return o.get(n); var s = t.apply(this, i); return r.cache = o.set(n, s), s }; return r.cache = new (Pi.Cache || ji), r } function Fi(t) { var e = typeof t; return !!t && ("object" == e || "function" == e) } Ci.prototype.clear = function () { this.__data__ = Mi ? Mi(null) : {} }, Ci.prototype.delete = function (t) { return this.has(t) && delete this.__data__[t] }, Ci.prototype.get = function (t) { var e = this.__data__; if (Mi) { var r = e[t]; return r === pi ? void 0 : r } return Ti.call(e, t) ? e[t] : void 0 }, Ci.prototype.has = function (t) { var e = this.__data__; return Mi ? void 0 !== e[t] : Ti.call(e, t) }, Ci.prototype.set = function (t, e) { return this.__data__[t] = Mi && void 0 === e ? pi : e, this }, Wi.prototype.clear = function () { this.__data__ = [] }, Wi.prototype.delete = function (t) { var e = this.__data__, r = Ni(e, t); return !(r < 0) && (r == e.length - 1 ? e.pop() : Ri.call(e, r, 1), !0) }, Wi.prototype.get = function (t) { var e = this.__data__, r = Ni(e, t); return r < 0 ? void 0 : e[r][1] }, Wi.prototype.has = function (t) { return Ni(this.__data__, t) > -1 }, Wi.prototype.set = function (t, e) { var r = this.__data__, i = Ni(r, t); return i < 0 ? r.push([t, e]) : r[i][1] = e, this }, ji.prototype.clear = function () { this.__data__ = { hash: new Ci, map: new (_i || Wi), string: new Ci } }, ji.prototype.delete = function (t) { return Bi(this, t).delete(t) }, ji.prototype.get = function (t) { return Bi(this, t).get(t) }, ji.prototype.has = function (t) { return Bi(this, t).has(t) }, ji.prototype.set = function (t, e) { return Bi(this, t).set(t, e), this }, Pi.Cache = ji; var Vi, Xi = Pi, Hi = [], qi = "ResizeObserver loop completed with undelivered notifications."; !function (t) { t.BORDER_BOX = "border-box", t.CONTENT_BOX = "content-box", t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box" }(Vi || (Vi = {})); var $i, Yi = function (t) { return Object.freeze(t) }, Gi = function (t, e) { this.inlineSize = t, this.blockSize = e, Yi(this) }, Ui = function () { function t(t, e, r, i) { return this.x = t, this.y = e, this.width = r, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Yi(this) } return t.prototype.toJSON = function () { var t = this; return { x: t.x, y: t.y, top: t.top, right: t.right, bottom: t.bottom, left: t.left, width: t.width, height: t.height } }, t.fromRect = function (e) { return new t(e.x, e.y, e.width, e.height) }, t }(), Qi = function (t) { return t instanceof SVGElement && "getBBox" in t }, Ki = function (t) { if (Qi(t)) { var e = t.getBBox(), r = e.width, i = e.height; return !r && !i } var n = t, o = n.offsetWidth, s = n.offsetHeight; return !(o || s || t.getClientRects().length) }, Ji = function (t) { var e, r; if (t instanceof Element) return !0; var i = null === (r = null === (e = t) || void 0 === e ? void 0 : e.ownerDocument) || void 0 === r ? void 0 : r.defaultView; return !!(i && t instanceof i.Element) }, Zi = "undefined" != typeof window ? window : {}, tn = new WeakMap, en = /auto|scroll/, rn = /^tb|vertical/, nn = /msie|trident/i.test(Zi.navigator && Zi.navigator.userAgent), on = function (t) { return parseFloat(t || "0") }, sn = function (t, e, r) { return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = !1), new Gi((r ? e : t) || 0, (r ? t : e) || 0) }, an = Yi({ devicePixelContentBoxSize: sn(), borderBoxSize: sn(), contentBoxSize: sn(), contentRect: new Ui(0, 0, 0, 0) }), cn = function (t, e) { if (void 0 === e && (e = !1), tn.has(t) && !e) return tn.get(t); if (Ki(t)) return tn.set(t, an), an; var r = getComputedStyle(t), i = Qi(t) && t.ownerSVGElement && t.getBBox(), n = !nn && "border-box" === r.boxSizing, o = rn.test(r.writingMode || ""), s = !i && en.test(r.overflowY || ""), a = !i && en.test(r.overflowX || ""), c = i ? 0 : on(r.paddingTop), l = i ? 0 : on(r.paddingRight), u = i ? 0 : on(r.paddingBottom), f = i ? 0 : on(r.paddingLeft), h = i ? 0 : on(r.borderTopWidth), d = i ? 0 : on(r.borderRightWidth), p = i ? 0 : on(r.borderBottomWidth), v = f + l, g = c + u, b = (i ? 0 : on(r.borderLeftWidth)) + d, y = h + p, m = a ? t.offsetHeight - y - t.clientHeight : 0, x = s ? t.offsetWidth - b - t.clientWidth : 0, E = n ? v + b : 0, w = n ? g + y : 0, S = i ? i.width : on(r.width) - E - x, O = i ? i.height : on(r.height) - w - m, k = S + v + x + b, A = O + g + m + y, T = Yi({ devicePixelContentBoxSize: sn(Math.round(S * devicePixelRatio), Math.round(O * devicePixelRatio), o), borderBoxSize: sn(k, A, o), contentBoxSize: sn(S, O, o), contentRect: new Ui(f, c, S, O) }); return tn.set(t, T), T }, ln = function (t, e, r) { var i = cn(t, r), n = i.borderBoxSize, o = i.contentBoxSize, s = i.devicePixelContentBoxSize; switch (e) { case Vi.DEVICE_PIXEL_CONTENT_BOX: return s; case Vi.BORDER_BOX: return n; default: return o } }, un = function (t) { var e = cn(t); this.target = t, this.contentRect = e.contentRect, this.borderBoxSize = Yi([e.borderBoxSize]), this.contentBoxSize = Yi([e.contentBoxSize]), this.devicePixelContentBoxSize = Yi([e.devicePixelContentBoxSize]) }, fn = function (t) { if (Ki(t)) return 1 / 0; for (var e = 0, r = t.parentNode; r;)e += 1, r = r.parentNode; return e }, hn = function () { var t = 1 / 0, e = []; Hi.forEach((function (r) { if (0 !== r.activeTargets.length) { var i = []; r.activeTargets.forEach((function (e) { var r = new un(e.target), n = fn(e.target); i.push(r), e.lastReportedSize = ln(e.target, e.observedBox), n < t && (t = n) })), e.push((function () { r.callback.call(r.observer, i, r.observer) })), r.activeTargets.splice(0, r.activeTargets.length) } })); for (var r = 0, i = e; r < i.length; r++) { (0, i[r])() } return t }, dn = function (t) { Hi.forEach((function (e) { e.activeTargets.splice(0, e.activeTargets.length), e.skippedTargets.splice(0, e.skippedTargets.length), e.observationTargets.forEach((function (r) { r.isActive() && (fn(r.target) > t ? e.activeTargets.push(r) : e.skippedTargets.push(r)) })) })) }, pn = function () { var t, e = 0; for (dn(e); Hi.some((function (t) { return t.activeTargets.length > 0 }));)e = hn(), dn(e); return Hi.some((function (t) { return t.skippedTargets.length > 0 })) && ("function" == typeof ErrorEvent ? t = new ErrorEvent("error", { message: qi }) : ((t = document.createEvent("Event")).initEvent("error", !1, !1), t.message = qi), window.dispatchEvent(t)), e > 0 }, vn = [], gn = function (t) { if (!$i) { var e = 0, r = document.createTextNode(""); new MutationObserver((function () { return vn.splice(0).forEach((function (t) { return t() })) })).observe(r, { characterData: !0 }), $i = function () { r.textContent = "" + (e ? e-- : e++) } } vn.push(t), $i() }, bn = 0, yn = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, mn = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], xn = function (t) { return void 0 === t && (t = 0), Date.now() + t }, En = !1, wn = new (function () { function t() { var t = this; this.stopped = !0, this.listener = function () { return t.schedule() } } return t.prototype.run = function (t) { var e = this; if (void 0 === t && (t = 250), !En) { En = !0; var r, i = xn(t); r = function () { var r = !1; try { r = pn() } finally { if (En = !1, t = i - xn(), !bn) return; r ? e.run(1e3) : t > 0 ? e.run(t) : e.start() } }, gn((function () { requestAnimationFrame(r) })) } }, t.prototype.schedule = function () { this.stop(), this.run() }, t.prototype.observe = function () { var t = this, e = function () { return t.observer && t.observer.observe(document.body, yn) }; document.body ? e() : Zi.addEventListener("DOMContentLoaded", e) }, t.prototype.start = function () { var t = this; this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), mn.forEach((function (e) { return Zi.addEventListener(e, t.listener, !0) }))) }, t.prototype.stop = function () { var t = this; this.stopped || (this.observer && this.observer.disconnect(), mn.forEach((function (e) { return Zi.removeEventListener(e, t.listener, !0) })), this.stopped = !0) }, t }()), Sn = function (t) { !bn && t > 0 && wn.start(), !(bn += t) && wn.stop() }, On = function () { function t(t, e) { this.target = t, this.observedBox = e || Vi.CONTENT_BOX, this.lastReportedSize = { inlineSize: 0, blockSize: 0 } } return t.prototype.isActive = function () { var t, e = ln(this.target, this.observedBox, !0); return t = this.target, Qi(t) || function (t) { switch (t.tagName) { case "INPUT": if ("image" !== t.type) break; case "VIDEO": case "AUDIO": case "EMBED": case "OBJECT": case "CANVAS": case "IFRAME": case "IMG": return !0 }return !1 }(t) || "inline" !== getComputedStyle(t).display || (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize }, t }(), kn = function (t, e) { this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = e }, An = new WeakMap, Tn = function (t, e) { for (var r = 0; r < t.length; r += 1)if (t[r].target === e) return r; return -1 }, Ln = function () { function t() { } return t.connect = function (t, e) { var r = new kn(t, e); An.set(t, r) }, t.observe = function (t, e, r) { var i = An.get(t), n = 0 === i.observationTargets.length; Tn(i.observationTargets, e) < 0 && (n && Hi.push(i), i.observationTargets.push(new On(e, r && r.box)), Sn(1), wn.schedule()) }, t.unobserve = function (t, e) { var r = An.get(t), i = Tn(r.observationTargets, e), n = 1 === r.observationTargets.length; i >= 0 && (n && Hi.splice(Hi.indexOf(r), 1), r.observationTargets.splice(i, 1), Sn(-1)) }, t.disconnect = function (t) { var e = this, r = An.get(t); r.observationTargets.slice().forEach((function (r) { return e.unobserve(t, r.target) })), r.activeTargets.splice(0, r.activeTargets.length) }, t }(), zn = function () { function t(t) { if (0 === arguments.length) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."); if ("function" != typeof t) throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."); Ln.connect(this, t) } return t.prototype.observe = function (t, e) { if (0 === arguments.length) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."); if (!Ji(t)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"); Ln.observe(this, t, e) }, t.prototype.unobserve = function (t) { if (0 === arguments.length) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."); if (!Ji(t)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"); Ln.unobserve(this, t) }, t.prototype.disconnect = function () { Ln.disconnect(this) }, t.toString = function () { return "function ResizeObserver () { [polyfill code] }" }, t }(), Rn = function (t) { return function (e, r, i, n) { Tt(r); var o = zt(e), s = b(o), a = st(o.length), c = t ? a - 1 : 0, l = t ? -1 : 1; if (i < 2) for (; ;) { if (c in s) { n = s[c], c += l; break } if (c += l, t ? c < 0 : a <= c) throw TypeError("Reduce of empty array with no initial value") } for (; t ? c >= 0 : a > c; c += l)c in s && (n = r(n, s[c], c, o)); return n } }, _n = { left: Rn(!1), right: Rn(!0) }.left; At({ target: "Array", proto: !0, forced: Pt("reduce") }, { reduce: function (t) { return _n(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0) } }); var Mn = M.f, Cn = Function.prototype, Wn = Cn.toString, jn = /^\s*function ([^ (]*)/; !l || "name" in Cn || Mn(Cn, "name", { configurable: !0, get: function () { try { return Wn.call(this).match(jn)[1] } catch (t) { return "" } } }); var Nn, In, Bn = function () { var t = R(this), e = ""; return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.dotAll && (e += "s"), t.unicode && (e += "u"), t.sticky && (e += "y"), e }, Dn = RegExp.prototype.exec, Pn = String.prototype.replace, Fn = Dn, Vn = (Nn = /a/, In = /b*/g, Dn.call(Nn, "a"), Dn.call(In, "a"), 0 !== Nn.lastIndex || 0 !== In.lastIndex), Xn = void 0 !== /()??/.exec("")[1]; (Vn || Xn) && (Fn = function (t) { var e, r, i, n, o = this; return Xn && (r = new RegExp("^" + o.source + "$(?!\\s)", Bn.call(o))), Vn && (e = o.lastIndex), i = Dn.call(o, t), Vn && i && (o.lastIndex = o.global ? i.index + i[0].length : e), Xn && i && i.length > 1 && Pn.call(i[0], r, (function () { for (n = 1; n < arguments.length - 2; n++)void 0 === arguments[n] && (i[n] = void 0) })), i }); var Hn = Fn; At({ target: "RegExp", proto: !0, forced: /./.exec !== Hn }, { exec: Hn }); var qn = Wt("species"), $n = !c((function () { var t = /./; return t.exec = function () { var t = []; return t.groups = { a: "7" }, t }, "7" !== "".replace(t, "$<a>") })), Yn = !c((function () { var t = /(?:)/, e = t.exec; t.exec = function () { return e.apply(this, arguments) }; var r = "ab".split(t); return 2 !== r.length || "a" !== r[0] || "b" !== r[1] })), Gn = function (t, e, r, i) { var n = Wt(t), o = !c((function () { var e = {}; return e[n] = function () { return 7 }, 7 != ""[t](e) })), s = o && !c((function () { var e = !1, r = /a/; return r.exec = function () { return e = !0, null }, "split" === t && (r.constructor = {}, r.constructor[qn] = function () { return r }), r[n](""), !e })); if (!o || !s || "replace" === t && !$n || "split" === t && !Yn) { var a = /./[n], l = r(n, ""[t], (function (t, e, r, i, n) { return e.exec === Hn ? o && !n ? { done: !0, value: a.call(e, r, i) } : { done: !0, value: t.call(r, e, i) } : { done: !1 } })), u = l[0], f = l[1]; J(String.prototype, t, u), J(RegExp.prototype, n, 2 == e ? function (t, e) { return f.call(t, this, e) } : function (t) { return f.call(t, this) }), i && C(RegExp.prototype[n], "sham", !0) } }, Un = Ue.charAt, Qn = function (t, e, r) { return e + (r ? Un(t, e).length : 1) }, Kn = function (t, e) { var r = t.exec; if ("function" == typeof r) { var i = r.call(t, e); if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null"); return i } if ("RegExp" !== v(t)) throw TypeError("RegExp#exec called on incompatible receiver"); return Hn.call(t, e) }; Gn("match", 1, (function (t, e, r) { return [function (e) { var r = y(this), i = null == e ? void 0 : e[t]; return void 0 !== i ? i.call(e, r) : new RegExp(e)[t](String(r)) }, function (t) { var i = r(e, t, this); if (i.done) return i.value; var n = R(t), o = String(this); if (!n.global) return Kn(n, o); var s = n.unicode; n.lastIndex = 0; for (var a, c = [], l = 0; null !== (a = Kn(n, o));) { var u = String(a[0]); c[l] = u, "" === u && (n.lastIndex = Qn(o, st(n.lastIndex), s)), l++ } return 0 === l ? null : c }] })); var Jn = Math.max, Zn = Math.min, to = Math.floor, eo = /\$([$&'`]|\d\d?|<[^>]*>)/g, ro = /\$([$&'`]|\d\d?)/g; Gn("replace", 2, (function (t, e, r) { return [function (r, i) { var n = y(this), o = null == r ? void 0 : r[t]; return void 0 !== o ? o.call(r, n, i) : e.call(String(n), r, i) }, function (t, n) { var o = r(e, t, this, n); if (o.done) return o.value; var s = R(t), a = String(this), c = "function" == typeof n; c || (n = String(n)); var l = s.global; if (l) { var u = s.unicode; s.lastIndex = 0 } for (var f = []; ;) { var h = Kn(s, a); if (null === h) break; if (f.push(h), !l) break; "" === String(h[0]) && (s.lastIndex = Qn(a, st(s.lastIndex), u)) } for (var d, p = "", v = 0, g = 0; g < f.length; g++) { h = f[g]; for (var b = String(h[0]), y = Jn(Zn(nt(h.index), a.length), 0), m = [], x = 1; x < h.length; x++)m.push(void 0 === (d = h[x]) ? d : String(d)); var E = h.groups; if (c) { var w = [b].concat(m, y, a); void 0 !== E && w.push(E); var S = String(n.apply(void 0, w)) } else S = i(b, a, y, m, E, n); y >= v && (p += a.slice(v, y) + S, v = y + b.length) } return p + a.slice(v) }]; function i(t, r, i, n, o, s) { var a = i + t.length, c = n.length, l = ro; return void 0 !== o && (o = zt(o), l = eo), e.call(s, l, (function (e, s) { var l; switch (s.charAt(0)) { case "$": return "$"; case "&": return t; case "`": return r.slice(0, i); case "'": return r.slice(a); case "<": l = o[s.slice(1, -1)]; break; default: var u = +s; if (0 === u) return e; if (u > c) { var f = to(u / 10); return 0 === f ? e : f <= c ? void 0 === n[f - 1] ? s.charAt(1) : n[f - 1] + s.charAt(1) : e } l = n[u - 1] }return void 0 === l ? "" : l })) } })); var io = function (t) { return Array.prototype.reduce.call(t, (function (t, e) { var r = e.name.match(/data-simplebar-(.+)/); if (r) { var i = r[1].replace(/\W+(.)/g, (function (t, e) { return e.toUpperCase() })); switch (e.value) { case "true": t[i] = !0; break; case "false": t[i] = !1; break; case void 0: t[i] = !0; break; default: t[i] = e.value } } return t }), {}) }; function no(t) { return t && t.ownerDocument && t.ownerDocument.defaultView ? t.ownerDocument.defaultView : window } function oo(t) { return t && t.ownerDocument ? t.ownerDocument : document } var so = null, ao = null; function co(t) { if (null === so) { var e = oo(t); if (void 0 === e) return so = 0; var r = e.body, i = e.createElement("div"); i.classList.add("simplebar-hide-scrollbar"), r.appendChild(i); var n = i.getBoundingClientRect().right; r.removeChild(i), so = n } return so } Yt && window.addEventListener("resize", (function () { ao !== window.devicePixelRatio && (ao = window.devicePixelRatio, so = null) })); var lo = function () { function t(e, r) { var i = this; this.onScroll = function () { var t = no(i.el); i.scrollXTicking || (t.requestAnimationFrame(i.scrollX), i.scrollXTicking = !0), i.scrollYTicking || (t.requestAnimationFrame(i.scrollY), i.scrollYTicking = !0) }, this.scrollX = function () { i.axis.x.isOverflowing && (i.showScrollbar("x"), i.positionScrollbar("x")), i.scrollXTicking = !1 }, this.scrollY = function () { i.axis.y.isOverflowing && (i.showScrollbar("y"), i.positionScrollbar("y")), i.scrollYTicking = !1 }, this.onMouseEnter = function () { i.showScrollbar("x"), i.showScrollbar("y") }, this.onMouseMove = function (t) { i.mouseX = t.clientX, i.mouseY = t.clientY, (i.axis.x.isOverflowing || i.axis.x.forceVisible) && i.onMouseMoveForAxis("x"), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && i.onMouseMoveForAxis("y") }, this.onMouseLeave = function () { i.onMouseMove.cancel(), (i.axis.x.isOverflowing || i.axis.x.forceVisible) && i.onMouseLeaveForAxis("x"), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && i.onMouseLeaveForAxis("y"), i.mouseX = -1, i.mouseY = -1 }, this.onWindowResize = function () { i.scrollbarWidth = i.getScrollbarWidth(), i.hideNativeScrollbar() }, this.hideScrollbars = function () { i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect(), i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect(), i.isWithinBounds(i.axis.y.track.rect) || (i.axis.y.scrollbar.el.classList.remove(i.classNames.visible), i.axis.y.isVisible = !1), i.isWithinBounds(i.axis.x.track.rect) || (i.axis.x.scrollbar.el.classList.remove(i.classNames.visible), i.axis.x.isVisible = !1) }, this.onPointerEvent = function (t) { var e, r; i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect(), i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect(), (i.axis.x.isOverflowing || i.axis.x.forceVisible) && (e = i.isWithinBounds(i.axis.x.track.rect)), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && (r = i.isWithinBounds(i.axis.y.track.rect)), (e || r) && (t.preventDefault(), t.stopPropagation(), "mousedown" === t.type && (e && (i.axis.x.scrollbar.rect = i.axis.x.scrollbar.el.getBoundingClientRect(), i.isWithinBounds(i.axis.x.scrollbar.rect) ? i.onDragStart(t, "x") : i.onTrackClick(t, "x")), r && (i.axis.y.scrollbar.rect = i.axis.y.scrollbar.el.getBoundingClientRect(), i.isWithinBounds(i.axis.y.scrollbar.rect) ? i.onDragStart(t, "y") : i.onTrackClick(t, "y")))) }, this.drag = function (e) { var r = i.axis[i.draggedAxis].track, n = r.rect[i.axis[i.draggedAxis].sizeAttr], o = i.axis[i.draggedAxis].scrollbar, s = i.contentWrapperEl[i.axis[i.draggedAxis].scrollSizeAttr], a = parseInt(i.elStyles[i.axis[i.draggedAxis].sizeAttr], 10); e.preventDefault(), e.stopPropagation(); var c = (("y" === i.draggedAxis ? e.pageY : e.pageX) - r.rect[i.axis[i.draggedAxis].offsetAttr] - i.axis[i.draggedAxis].dragOffset) / (n - o.size) * (s - a); "x" === i.draggedAxis && (c = i.isRtl && t.getRtlHelpers().isRtlScrollbarInverted ? c - (n + o.size) : c, c = i.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -c : c), i.contentWrapperEl[i.axis[i.draggedAxis].scrollOffsetAttr] = c }, this.onEndDrag = function (t) { var e = oo(i.el), r = no(i.el); t.preventDefault(), t.stopPropagation(), i.el.classList.remove(i.classNames.dragging), e.removeEventListener("mousemove", i.drag, !0), e.removeEventListener("mouseup", i.onEndDrag, !0), i.removePreventClickId = r.setTimeout((function () { e.removeEventListener("click", i.preventClick, !0), e.removeEventListener("dblclick", i.preventClick, !0), i.removePreventClickId = null })) }, this.preventClick = function (t) { t.preventDefault(), t.stopPropagation() }, this.el = e, this.minScrollbarWidth = 20, this.options = Object.assign({}, t.defaultOptions, {}, r), this.classNames = Object.assign({}, t.defaultOptions.classNames, {}, this.options.classNames), this.axis = { x: { scrollOffsetAttr: "scrollLeft", sizeAttr: "width", scrollSizeAttr: "scrollWidth", offsetSizeAttr: "offsetWidth", offsetAttr: "left", overflowAttr: "overflowX", dragOffset: 0, isOverflowing: !0, isVisible: !1, forceVisible: !1, track: {}, scrollbar: {} }, y: { scrollOffsetAttr: "scrollTop", sizeAttr: "height", scrollSizeAttr: "scrollHeight", offsetSizeAttr: "offsetHeight", offsetAttr: "top", overflowAttr: "overflowY", dragOffset: 0, isOverflowing: !0, isVisible: !1, forceVisible: !1, track: {}, scrollbar: {} } }, this.removePreventClickId = null, t.instances.has(this.el) || (this.recalculate = Gr(this.recalculate.bind(this), 64), this.onMouseMove = Gr(this.onMouseMove.bind(this), 64), this.hideScrollbars = hi(this.hideScrollbars.bind(this), this.options.timeout), this.onWindowResize = hi(this.onWindowResize.bind(this), 64, { leading: !0 }), t.getRtlHelpers = Xi(t.getRtlHelpers), this.init()) } t.getRtlHelpers = function () { var e = document.createElement("div"); e.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>'; var r = e.firstElementChild; document.body.appendChild(r); var i = r.firstElementChild; r.scrollLeft = 0; var n = t.getOffset(r), o = t.getOffset(i); r.scrollLeft = 999; var s = t.getOffset(i); return { isRtlScrollingInverted: n.left !== o.left && o.left - s.left != 0, isRtlScrollbarInverted: n.left !== o.left } }, t.getOffset = function (t) { var e = t.getBoundingClientRect(), r = oo(t), i = no(t); return { top: e.top + (i.pageYOffset || r.documentElement.scrollTop), left: e.left + (i.pageXOffset || r.documentElement.scrollLeft) } }; var e = t.prototype; return e.init = function () { t.instances.set(this.el, this), Yt && (this.initDOM(), this.setAccessibilityAttributes(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners()) }, e.initDOM = function () { var t = this; if (Array.prototype.filter.call(this.el.children, (function (e) { return e.classList.contains(t.classNames.wrapper) })).length) this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper), this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl), this.offsetEl = this.el.querySelector("." + this.classNames.offset), this.maskEl = this.el.querySelector("." + this.classNames.mask), this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder), this.heightAutoObserverWrapperEl = this.el.querySelector("." + this.classNames.heightAutoObserverWrapperEl), this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl), this.axis.x.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.horizontal), this.axis.y.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.vertical); else { for (this.wrapperEl = document.createElement("div"), this.contentWrapperEl = document.createElement("div"), this.offsetEl = document.createElement("div"), this.maskEl = document.createElement("div"), this.contentEl = document.createElement("div"), this.placeholderEl = document.createElement("div"), this.heightAutoObserverWrapperEl = document.createElement("div"), this.heightAutoObserverEl = document.createElement("div"), this.wrapperEl.classList.add(this.classNames.wrapper), this.contentWrapperEl.classList.add(this.classNames.contentWrapper), this.offsetEl.classList.add(this.classNames.offset), this.maskEl.classList.add(this.classNames.mask), this.contentEl.classList.add(this.classNames.contentEl), this.placeholderEl.classList.add(this.classNames.placeholder), this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl), this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl); this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild); this.contentWrapperEl.appendChild(this.contentEl), this.offsetEl.appendChild(this.contentWrapperEl), this.maskEl.appendChild(this.offsetEl), this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl), this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl), this.wrapperEl.appendChild(this.maskEl), this.wrapperEl.appendChild(this.placeholderEl), this.el.appendChild(this.wrapperEl) } if (!this.axis.x.track.el || !this.axis.y.track.el) { var e = document.createElement("div"), r = document.createElement("div"); e.classList.add(this.classNames.track), r.classList.add(this.classNames.scrollbar), e.appendChild(r), this.axis.x.track.el = e.cloneNode(!0), this.axis.x.track.el.classList.add(this.classNames.horizontal), this.axis.y.track.el = e.cloneNode(!0), this.axis.y.track.el.classList.add(this.classNames.vertical), this.el.appendChild(this.axis.x.track.el), this.el.appendChild(this.axis.y.track.el) } this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar), this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar), this.options.autoHide || (this.axis.x.scrollbar.el.classList.add(this.classNames.visible), this.axis.y.scrollbar.el.classList.add(this.classNames.visible)), this.el.setAttribute("data-simplebar", "init") }, e.setAccessibilityAttributes = function () { var t = this.options.ariaLabel || "scrollable content"; this.contentWrapperEl.setAttribute("tabindex", "0"), this.contentWrapperEl.setAttribute("role", "region"), this.contentWrapperEl.setAttribute("aria-label", t) }, e.initListeners = function () { var t = this, e = no(this.el); this.options.autoHide && this.el.addEventListener("mouseenter", this.onMouseEnter), ["mousedown", "click", "dblclick"].forEach((function (e) { t.el.addEventListener(e, t.onPointerEvent, !0) })), ["touchstart", "touchend", "touchmove"].forEach((function (e) { t.el.addEventListener(e, t.onPointerEvent, { capture: !0, passive: !0 }) })), this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl.addEventListener("scroll", this.onScroll), e.addEventListener("resize", this.onWindowResize); var r = !1, i = e.ResizeObserver || zn; this.resizeObserver = new i((function () { r && t.recalculate() })), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), e.requestAnimationFrame((function () { r = !0 })), this.mutationObserver = new e.MutationObserver(this.recalculate), this.mutationObserver.observe(this.contentEl, { childList: !0, subtree: !0, characterData: !0 }) }, e.recalculate = function () { var t = no(this.el); this.elStyles = t.getComputedStyle(this.el), this.isRtl = "rtl" === this.elStyles.direction; var e = this.heightAutoObserverEl.offsetHeight <= 1, r = this.heightAutoObserverEl.offsetWidth <= 1, i = this.contentEl.offsetWidth, n = this.contentWrapperEl.offsetWidth, o = this.elStyles.overflowX, s = this.elStyles.overflowY; this.contentEl.style.padding = this.elStyles.paddingTop + " " + this.elStyles.paddingRight + " " + this.elStyles.paddingBottom + " " + this.elStyles.paddingLeft, this.wrapperEl.style.margin = "-" + this.elStyles.paddingTop + " -" + this.elStyles.paddingRight + " -" + this.elStyles.paddingBottom + " -" + this.elStyles.paddingLeft; var a = this.contentEl.scrollHeight, c = this.contentEl.scrollWidth; this.contentWrapperEl.style.height = e ? "auto" : "100%", this.placeholderEl.style.width = r ? i + "px" : "auto", this.placeholderEl.style.height = a + "px"; var l = this.contentWrapperEl.offsetHeight; this.axis.x.isOverflowing = c > i, this.axis.y.isOverflowing = a > l, this.axis.x.isOverflowing = "hidden" !== o && this.axis.x.isOverflowing, this.axis.y.isOverflowing = "hidden" !== s && this.axis.y.isOverflowing, this.axis.x.forceVisible = "x" === this.options.forceVisible || !0 === this.options.forceVisible, this.axis.y.forceVisible = "y" === this.options.forceVisible || !0 === this.options.forceVisible, this.hideNativeScrollbar(); var u = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, f = this.axis.y.isOverflowing ? this.scrollbarWidth : 0; this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > n - f, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > l - u, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px", this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px", this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y") }, e.getScrollbarSize = function (t) { if (void 0 === t && (t = "y"), !this.axis[t].isOverflowing) return 0; var e, r = this.contentEl[this.axis[t].scrollSizeAttr], i = this.axis[t].track.el[this.axis[t].offsetSizeAttr], n = i / r; return e = Math.max(~~(n * i), this.options.scrollbarMinSize), this.options.scrollbarMaxSize && (e = Math.min(e, this.options.scrollbarMaxSize)), e }, e.positionScrollbar = function (e) { if (void 0 === e && (e = "y"), this.axis[e].isOverflowing) { var r = this.contentWrapperEl[this.axis[e].scrollSizeAttr], i = this.axis[e].track.el[this.axis[e].offsetSizeAttr], n = parseInt(this.elStyles[this.axis[e].sizeAttr], 10), o = this.axis[e].scrollbar, s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr], a = (s = "x" === e && this.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -s : s) / (r - n), c = ~~((i - o.size) * a); c = "x" === e && this.isRtl && t.getRtlHelpers().isRtlScrollbarInverted ? c + (i - o.size) : c, o.el.style.transform = "x" === e ? "translate3d(" + c + "px, 0, 0)" : "translate3d(0, " + c + "px, 0)" } }, e.toggleTrackVisibility = function (t) { void 0 === t && (t = "y"); var e = this.axis[t].track.el, r = this.axis[t].scrollbar.el; this.axis[t].isOverflowing || this.axis[t].forceVisible ? (e.style.visibility = "visible", this.contentWrapperEl.style[this.axis[t].overflowAttr] = "scroll") : (e.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[t].overflowAttr] = "hidden"), this.axis[t].isOverflowing ? r.style.display = "block" : r.style.display = "none" }, e.hideNativeScrollbar = function () { this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0, this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0 }, e.onMouseMoveForAxis = function (t) { void 0 === t && (t = "y"), this.axis[t].track.rect = this.axis[t].track.el.getBoundingClientRect(), this.axis[t].scrollbar.rect = this.axis[t].scrollbar.el.getBoundingClientRect(), this.isWithinBounds(this.axis[t].scrollbar.rect) ? this.axis[t].scrollbar.el.classList.add(this.classNames.hover) : this.axis[t].scrollbar.el.classList.remove(this.classNames.hover), this.isWithinBounds(this.axis[t].track.rect) ? (this.showScrollbar(t), this.axis[t].track.el.classList.add(this.classNames.hover)) : this.axis[t].track.el.classList.remove(this.classNames.hover) }, e.onMouseLeaveForAxis = function (t) { void 0 === t && (t = "y"), this.axis[t].track.el.classList.remove(this.classNames.hover), this.axis[t].scrollbar.el.classList.remove(this.classNames.hover) }, e.showScrollbar = function (t) { void 0 === t && (t = "y"); var e = this.axis[t].scrollbar.el; this.axis[t].isVisible || (e.classList.add(this.classNames.visible), this.axis[t].isVisible = !0), this.options.autoHide && this.hideScrollbars() }, e.onDragStart = function (t, e) { void 0 === e && (e = "y"); var r = oo(this.el), i = no(this.el), n = this.axis[e].scrollbar, o = "y" === e ? t.pageY : t.pageX; this.axis[e].dragOffset = o - n.rect[this.axis[e].offsetAttr], this.draggedAxis = e, this.el.classList.add(this.classNames.dragging), r.addEventListener("mousemove", this.drag, !0), r.addEventListener("mouseup", this.onEndDrag, !0), null === this.removePreventClickId ? (r.addEventListener("click", this.preventClick, !0), r.addEventListener("dblclick", this.preventClick, !0)) : (i.clearTimeout(this.removePreventClickId), this.removePreventClickId = null) }, e.onTrackClick = function (t, e) { var r = this; if (void 0 === e && (e = "y"), this.options.clickOnTrack) { var i = no(this.el); this.axis[e].scrollbar.rect = this.axis[e].scrollbar.el.getBoundingClientRect(); var n = this.axis[e].scrollbar.rect[this.axis[e].offsetAttr], o = parseInt(this.elStyles[this.axis[e].sizeAttr], 10), s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr], a = ("y" === e ? this.mouseY - n : this.mouseX - n) < 0 ? -1 : 1, c = -1 === a ? s - o : s + o; !function t() { var n, o; -1 === a ? s > c && (s -= r.options.clickOnTrackSpeed, r.contentWrapperEl.scrollTo(((n = {})[r.axis[e].offsetAttr] = s, n)), i.requestAnimationFrame(t)) : s < c && (s += r.options.clickOnTrackSpeed, r.contentWrapperEl.scrollTo(((o = {})[r.axis[e].offsetAttr] = s, o)), i.requestAnimationFrame(t)) }() } }, e.getContentElement = function () { return this.contentEl }, e.getScrollElement = function () { return this.contentWrapperEl }, e.getScrollbarWidth = function () { try { return "none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : co(this.el) } catch (t) { return co(this.el) } }, e.removeListeners = function () { var t = this, e = no(this.el); this.options.autoHide && this.el.removeEventListener("mouseenter", this.onMouseEnter), ["mousedown", "click", "dblclick"].forEach((function (e) { t.el.removeEventListener(e, t.onPointerEvent, !0) })), ["touchstart", "touchend", "touchmove"].forEach((function (e) { t.el.removeEventListener(e, t.onPointerEvent, { capture: !0, passive: !0 }) })), this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.recalculate.cancel(), this.onMouseMove.cancel(), this.hideScrollbars.cancel(), this.onWindowResize.cancel() }, e.unMount = function () { this.removeListeners(), t.instances.delete(this.el) }, e.isWithinBounds = function (t) { return this.mouseX >= t.left && this.mouseX <= t.left + t.width && this.mouseY >= t.top && this.mouseY <= t.top + t.height }, e.findChild = function (t, e) { var r = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector; return Array.prototype.filter.call(t.children, (function (t) { return r.call(t, e) }))[0] }, t }(); return lo.defaultOptions = { autoHide: !0, forceVisible: !1, clickOnTrack: !0, clickOnTrackSpeed: 40, classNames: { contentEl: "simplebar-content", contentWrapper: "simplebar-content-wrapper", offset: "simplebar-offset", mask: "simplebar-mask", wrapper: "simplebar-wrapper", placeholder: "simplebar-placeholder", scrollbar: "simplebar-scrollbar", track: "simplebar-track", heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper", heightAutoObserverEl: "simplebar-height-auto-observer", visible: "simplebar-visible", horizontal: "simplebar-horizontal", vertical: "simplebar-vertical", hover: "simplebar-hover", dragging: "simplebar-dragging" }, scrollbarMinSize: 25, scrollbarMaxSize: 0, timeout: 1e3 }, lo.instances = new WeakMap, lo.initDOMLoadedElements = function () { document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.removeEventListener("load", this.initDOMLoadedElements), Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function (t) { "init" === t.getAttribute("data-simplebar") || lo.instances.has(t) || new lo(t, io(t.attributes)) })) }, lo.removeObserver = function () { this.globalObserver.disconnect() }, lo.initHtmlApi = function () { this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this), "undefined" != typeof MutationObserver && (this.globalObserver = new MutationObserver(lo.handleMutations), this.globalObserver.observe(document, { childList: !0, subtree: !0 })), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.addEventListener("load", this.initDOMLoadedElements)) }, lo.handleMutations = function (t) { t.forEach((function (t) { Array.prototype.forEach.call(t.addedNodes, (function (t) { 1 === t.nodeType && (t.hasAttribute("data-simplebar") ? !lo.instances.has(t) && document.documentElement.contains(t) && new lo(t, io(t.attributes)) : Array.prototype.forEach.call(t.querySelectorAll("[data-simplebar]"), (function (t) { "init" !== t.getAttribute("data-simplebar") && !lo.instances.has(t) && document.documentElement.contains(t) && new lo(t, io(t.attributes)) }))) })), Array.prototype.forEach.call(t.removedNodes, (function (t) { 1 === t.nodeType && ("init" === t.getAttribute("data-simplebar") ? lo.instances.has(t) && !document.documentElement.contains(t) && lo.instances.get(t).unMount() : Array.prototype.forEach.call(t.querySelectorAll('[data-simplebar="init"]'), (function (t) { lo.instances.has(t) && !document.documentElement.contains(t) && lo.instances.get(t).unMount() }))) })) })) }, lo.getOptions = io, Yt && lo.initHtmlApi(), lo }));
