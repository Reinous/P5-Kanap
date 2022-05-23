function validOrder() {
	const confirmationNumber = document.getElementById('orderId');
	const orderIdValue = document.location.search.split('?orderId=').join('');
	confirmationNumber.textContent = `${orderIdValue}`;
	localStorage.clear();
}
validOrder();
