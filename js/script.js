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
	 	  modal = document.querySelector(".modal"),
		  modalCloseBtn = document.querySelector("[data-close]");
	
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


	modalCloseBtn.addEventListener("click", closeModal);
	//модальное окно закрывается при клике крестик

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}//модальное окно закрывается при клике на подложку
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}//модальное окно закрывается при клике на 'Esc'
	});

	const modalTimerId = setTimeout(openModal, 5000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -0.5) {
			//Модальное окно появляется при прокрутки страницы до конца
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
			//после одного раза событие удаляется

		}

	}

	window.addEventListener("scroll", showModalByScroll);

});