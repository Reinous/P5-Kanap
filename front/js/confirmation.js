function validOrder() {
	const confirmationNumber = document.getElementById('orderId');
	confirmationNumber.textContent = localStorage.getItem('orderId');
	console.log('ID DE LA COMMANDE AVANT SUPPRESSION DU LOCALSTORAGE =');
	console.log(localStorage.getItem('orderId'));
	localStorage.clear();
}
validOrder();
