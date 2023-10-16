import { closeModal, openModal } from "./modal";

function forms() {
    	//Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро мы с Вами свяжемся!",
		fail: "Что-то пошло не так..."
	};

	forms.forEach(item => {
		bindpostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: data
		});

		return await res.json();
	};

	function bindpostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement("afterend", statusMessage);


			// при использовании FormData с XMLHttpRequest заголовок указывать НЕ НУЖНО!!!
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.fail);
				}).finally(() => {
					form.reset();
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

	// fetch("http://localhost:3000/menu")
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));
}

export default forms;