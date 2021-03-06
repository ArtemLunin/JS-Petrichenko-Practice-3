import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			//прячем всплывающий блок
			this.hanson.style.opacity = '0';
			//показываем его только на 3 слайде
			if (n === 3) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1';
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch(e){}

		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});

		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	bindTriggers() {
		this.btns.forEach(item => {
			item.addEventListener('click', () => {
				this.plusSlides(1);
			});

			// находим выше по DOM дереву ссылку перехода на первый слайд и вешаем на нее событие
			item.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});
		document.querySelectorAll('.prevmodule').forEach(item => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(-1);
			});
		});

		document.querySelectorAll('.nextmodule').forEach(item => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(1);
			});
		});
	}

	render() {
		if (this.container) {
			try {
				//получаем всплывающий блок (главная страница, 3-й слайд)
				this.hanson = document.querySelector('.hanson');
			} catch(e){}

			this.showSlides(this.slideIndex);
			this.bindTriggers();

			
		}
	}
}