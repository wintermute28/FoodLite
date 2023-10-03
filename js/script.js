window.addEventListener("DOMContentLoaded", () => {
	//Tabs
	const tabs = document.querySelectorAll(".tabheader__item"),
		  tabsContent = document.querySelectorAll(".tabcontent"),
		  tabsParent = document.querySelector(".tabheader__items");

    
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});
	};

	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
		tabs[i].classList.add("tabheader__item_active");
	};

	hideTabContent();
	showTabContent();


	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});


	//Timer

	const deadLine = "2024-01-01";

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			seconds = 0;
			minutes = 0;
			hours = 0;
		}else {
			days = Math.floor( (t/(1000*60*60*24)) ),
			seconds = Math.floor( (t/1000) % 60 ),
			minutes = Math.floor( (t/1000/60) % 60 ),
			hours = Math.floor( (t/(1000*60*60) % 24) );
		}
	
		return {
			"total": t,
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		};
	}
	
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
				  days = timer.querySelector("#days"),
				  hours = timer.querySelector("#hours"),
				  minutes = timer.querySelector("#minutes"),
				  seconds = timer.querySelector("#seconds"),
				  timeInterval = setInterval(updateClock, 1000);
			
		updateClock(); //Что бы не было моргания в начале загрузки страницы
	
		function updateClock() {
			const t = getTimeRemaining(endtime);
	
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
	
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	
	setClock(".timer", deadLine);


	//Modal

	const modalTrigger = document.querySelectorAll("[data-modal]"),
	 	  modal = document.querySelector(".modal");

	
	function openModal() {
		//первый способ
		modal.classList.add("show");
		modal.classList.remove("hide");
		//второй способ
		// modal.classList.toggle("show");

		document.body.style.overflow = "hidden";//убираем прокрутку страницы при открытом модальном окне
		clearInterval(modalTimerId);//отменяет ооткрытие окна по таймеру, если пользователь сам его уже открывал ранее
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener("click", openModal);
	});

	function closeModal() {
		//первый способ
		modal.classList.add("hide");
		modal.classList.remove("show");
		//второй способ
		// modal.classList.toggle("show");
		
		document.body.style.overflow = "";//восстанавливаем прокрутку при закрытии модального
	}


	// modalCloseBtn.addEventListener("click", closeModal);
	//модальное окно закрывается при клике крестик

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}//модальное окно закрывается при клике на подложку или крестик
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}//модальное окно закрывается при клике на 'Esc'
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -0.5) {
			//Модальное окно появляется при прокрутки страницы до конца
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
			//после одного раза событие удаляется

		}

	}

	window.addEventListener("scroll", showModalByScroll);

	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 97;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.element = "menu__item";
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	// Можно так:
	// const div = new MenuCard;
	// div.render();
	// Но есть способ короче, он подойдет если нам нужно просто создать что-то один раз и потом не использовать это:
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		// eslint-disable-next-line quotes
		'Меню "Фитнес"',
		// eslint-disable-next-line quotes
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		".menu .container"
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		// eslint-disable-next-line quotes
		'Меню “Премиум”',
		// eslint-disable-next-line quotes
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		16,
		".menu .container"
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		// eslint-disable-next-line quotes
		'Меню "Постное"',
		// eslint-disable-next-line quotes
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		8,
		".menu .container"
	).render();
	
	//Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро мы с Вами свяжемся!",
		fail: "Что-то пошло не так..."
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement("afterend", statusMessage);


			const request = new XMLHttpRequest();
			request.open("POST", "server.php");

			request.setRequestHeader("Content-type", "aplication/json");
			// при использовании FormData с XMLHttpRequest заголовок указывать НЕ НУЖНО!!!
			const formData = new FormData(form);

			const object = {};
			formData.forEach(function(value, key) {
				object.key = value;
			});//создаем объект из FormData и далее уже его переформатируем в JSON

			const json = JSON.stringify(object);


			request.send(json);

			request.addEventListener("load", () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
				} else {
					showThanksModal(message.fail);
				}
			});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		openModal();


		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 4000);
	}



});