function validOrder() {
	const confirmationNumber = document.getElementById('orderId');
	confirmationNumber.textContent = localStorage.getItem('orderId');
	localStorage.clear();
}
validOrder();
