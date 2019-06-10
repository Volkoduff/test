(function() {
var modal = document.querySelector('.modal-window');

function displayModalAdvise(text) {
	modal.classList.remove('hidden')
	textContentForModal(modal, text);
	addHandlerToCloseModal(modal)
}

function addHandlerToCloseModal(modal) {
	modal.addEventListener('click', function () {
		modal.classList.add('hidden');
	})
}

function textContentForModal(modalWindow, textContent) {
	var modalText = modalWindow.querySelector('.modal-text');
	modalText.textContent = textContent;
}

window.modal = {
	displayModalAdvise: displayModalAdvise
}

})()