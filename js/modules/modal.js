function openModal() {
	//первый способ
	modal.classList.add("show");
	modal.classList.remove("hide");
	//второй способ
	// modal.classList.toggle("show");

	document.body.style.overflow = "hidden";//убираем прокрутку страницы при открытом модальном окне
	clearInterval(modalTimerId);//отменяет ооткрытие окна по таймеру, если пользователь сам его уже открывал ранее
}

function closeModal() {
	//первый способ
	modal.classList.add("hide");
	modal.classList.remove("show");
	//второй способ
	// modal.classList.toggle("show");

	document.body.style.overflow = "";//восстанавливаем прокрутку при закрытии модального
}



function modal() {
	//Modal

	const modalTrigger = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal");

	modalTrigger.forEach(btn => {
		btn.addEventListener("click", openModal);
	});




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
}

export default modal;
export {closeModal};
export {openModal};