//Recuperation du tableau de local storage
const articleCart = JSON.parse(localStorage.getItem('cart'));

// essai de tri du tableau
function compareId(x, y) {
	if (x.id < y.id) {
		return -1;
	}
	if (x.id > y.id) {
		return 1;
	}
	return 0;
}
function sortItem() {
	articleCart.sort(compareId);
}

//affichage du panier trier par id dans la console
// console.log(
// 	'Contenu du panier dans le local storage au chargement de la page ='
// );
// console.table(articleCart);

//Fonction de suppression d'article
function itemDelete() {
	const deleteBtn = document.getElementsByClassName('deleteItem');
	//bloucle pour supprimer le bonne article
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener('click', function () {
			articleCart.splice(i, 1);
			localStorage.setItem('cart', JSON.stringify(articleCart));
			location.reload();
		});
	}
}

//Fonction modification de la quantité
function itemModifQuantity() {
	const itemChangeQuantity = document.getElementsByClassName('itemQuantity');
	for (let i = 0; i < itemChangeQuantity.length; i++) {
		itemChangeQuantity[i].addEventListener('change', function () {
			const newQuantity = itemChangeQuantity[i].value;
			articleCart[i].quantities = newQuantity;
			if (newQuantity > 0 && newQuantity <= 100) {
				localStorage.setItem('cart', JSON.stringify(articleCart));
				numberItem();
				numberTotalItem();
				totalPrice();
				sortItem();
			} else if (newQuantity <= 0 || newQuantity > 100) {
				alert('Veuillez selectionner une quantité entre 0 et 100.');
			}
		});
	}
}

//Fonction nombre total d'article
function numberItem() {
	const numberByItem = document.getElementsByClassName('itemQuantity');
	let total = 0;

	for (let i = 0; i < numberByItem.length; i++) {
		const q = numberByItem[i].value;
		let qNumber = parseInt(q, 10);
		total += qNumber;
	}
	return total;
}

//afficher le nombre total d'article
function numberTotalItem() {
	const displayTotalItem = document.getElementById('totalQuantity');
	const cartTotalItem = numberItem();
	displayTotalItem.textContent = cartTotalItem;
}

//Pour le Prix
function totalPrice() {
	let totalPriceCart = 0;
	fetch('http://localhost:3000/api/products')
		.then(function (reponseAPI) {
			return reponseAPI.json();
		})
		.then(function (articleAPI) {
			const idArticlesAPI = articleAPI.map((el) => el._id);
			for (const articles of articleCart) {
				const id = articles['id'];
				const indexId = idArticlesAPI.indexOf(id);
				const price = articleAPI[indexId].price;
				const quantity = articles['quantities'];
				let totalPriceItem = quantity * price;
				totalPriceCart += totalPriceItem;
				//console.log(totalPriceCart);
			}
			return totalPriceCart;
		})
		//afficher le prix
		.then(function (totalPriceCart) {
			const displayTotalPrice = document.getElementById('totalPrice');
			displayTotalPrice.textContent = totalPriceCart;
		});
}

function displayStorage(id, color, imageUrl, altTxt, price, quantity, name) {
	//Sur la page
	const cartItem = document.getElementById('cart__items');
	const article = document.createElement('article');
	cartItem.appendChild(article);
	article.setAttribute('data-id', id);
	article.setAttribute('data-color', color);
	article.classList.add('cart__item');

	//Creation de la div image
	const baliseDiv = document.createElement('div');
	baliseDiv.classList.add('cart__item__img');
	article.appendChild(baliseDiv);

	//image du produit
	const baliseDivImg = document.createElement('img');
	baliseDiv.appendChild(baliseDivImg);
	baliseDivImg.src = imageUrl;
	baliseDivImg.alt = altTxt;

	//Creation des details de l'article
	const divArcticle = document.createElement('div');
	divArcticle.classList.add('cart__item__content');
	article.appendChild(divArcticle);

	const divArcticleDetail = document.createElement('div');
	divArcticleDetail.classList.add('cart__item__content__description');
	divArcticle.appendChild(divArcticleDetail);

	//Nom couleur prix
	const divArcticleDetailH2 = document.createElement('h2');
	divArcticleDetailH2.textContent = name;
	divArcticleDetail.appendChild(divArcticleDetailH2);

	const divArcticleDetailP1 = document.createElement('p');
	divArcticleDetailP1.textContent = color;
	divArcticleDetail.appendChild(divArcticleDetailP1);

	const divArcticleDetailP2 = document.createElement('p');
	divArcticleDetailP2.textContent = price + ' €';
	divArcticleDetail.appendChild(divArcticleDetailP2);

	//Quantité
	const divArticleSetting = document.createElement('div');
	divArticleSetting.classList.add('cart__item__content__settings');
	divArcticle.appendChild(divArticleSetting);

	const divArticleSettingQuant = document.createElement('div');
	divArticleSettingQuant.classList.add(
		'cart__item__content__settings__quantity'
	);
	divArticleSetting.appendChild(divArticleSettingQuant);

	const cartQuantity = document.createElement('p');
	cartQuantity.textContent = 'Quantité : ';
	divArticleSetting.appendChild(cartQuantity);

	const cartQuantityInput = document.createElement('input');
	divArticleSetting.appendChild(cartQuantityInput);
	cartQuantityInput.setAttribute('input', 'number');
	cartQuantityInput.setAttribute('name', 'itemQuantity');
	cartQuantityInput.setAttribute('min', '1');
	cartQuantityInput.setAttribute('max', '100');
	cartQuantityInput.setAttribute('value', quantity);
	cartQuantityInput.classList.add('itemQuantity');

	//supprimer
	const divDeleteItem = document.createElement('div');
	divArcticle.appendChild(divDeleteItem);
	divDeleteItem.classList.add('cart__item__content__settings__delete');

	const pDeleteItem = document.createElement('p');
	divDeleteItem.appendChild(pDeleteItem);
	pDeleteItem.classList.add('deleteItem');
	pDeleteItem.textContent = 'Supprimer';
}

function useFetch() {
	fetch('http://localhost:3000/api/products')
		.then(function (reponseAPI) {
			return reponseAPI.json();
		})

		.then(function (articleAPI) {
			//console.log("CONTENU DE L'API =");
			//console.table(articleAPI);
			let idArticlesAPI = articleAPI.map((el) => el._id);

			for (const articles of articleCart) {
				const id = articles['id'];
				const indexId = idArticlesAPI.indexOf(id);
				const price = articleAPI[indexId].price;
				const color = articles['colors'];
				const imageUrl = articleAPI[indexId].imageUrl;
				const altTxt = articleAPI[indexId].altTxt;
				const name = articleAPI[indexId].name;
				const quantity = articles['quantities'];
				displayStorage(id, color, imageUrl, altTxt, price, quantity, name);
			}
			itemDelete();
			itemModifQuantity();
			numberItem();
			numberTotalItem();
			totalPrice();
		})
		.catch(function (error) {
			console.log("Erreur lors de la communication avec l'API");
			console.log(error);
		});
}
function checkName(nameValue, id, message) {
	const letterRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
	const errorFirstName = document.getElementById(id);
	if (letterRegExp.test(nameValue)) {
		errorFirstName.textContent = '';
		console.log('nom Bon');
	} else {
		errorFirstName.textContent = message;
		console.log('nom Pas Bon');
	}
}

//check Adresse
function checkAdress(addressValue) {
	const errorAddress = document.getElementById('addressErrorMsg');
	const addressRegExp = new RegExp('^[A-Za-z0-9]');
	if (addressRegExp.test(addressValue)) {
		errorAddress.textContent = '';
		console.log('Adresse Bon');
	} else {
		errorAddress.textContent = 'Veuillez renseigner votre adresse';
		console.log('Adresse Pas Bon');
	}
}
//Check Ville
function checkCity(cityValue) {
	const letterRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
	const errorcity = document.getElementById('cityErrorMsg');
	if (letterRegExp.test(cityValue)) {
		errorcity.textContent = '';
		console.log('Ville Bon');
	} else {
		errorcity.textContent = 'Veuillez renseigner votre ville';
		console.log('Ville Pas Bon');
	}
}
//check E-mail
function checkMail(emailValue) {
	const mailRegExp = new RegExp(
		'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
	);
	const erroremail = document.getElementById('emailErrorMsg');
	if (mailRegExp.test(emailValue)) {
		erroremail.textContent = '';
		console.log('email Bon');
	} else {
		erroremail.textContent = 'Veuillez renseigner votre email';
		console.log('email Pas Bon');
	}
}

//Formulaire
function form() {
	const userData = document.querySelector('.cart__order__form');

	//modification du prenom
	userData.firstName.addEventListener('change', function (event) {
		checkName(
			event.target.value,
			'firstNameErrorMsg',
			'Veuillez renseigner votre Prénom'
		);
	});

	//modification nom
	userData.lastName.addEventListener('change', function (event) {
		checkName(
			event.target.value,
			'lastNameErrorMsg',
			'Veuillez renseigner votre Nom'
		);
	});

	//modification address
	userData.address.addEventListener('change', function (event) {
		checkAdress(event.target.value);
	});

	//modification Ville
	userData.city.addEventListener('change', function (event) {
		checkCity(event.target.value);
	});

	//modification email
	userData.email.addEventListener('change', function (event) {
		checkMail(event.target.value);
	});
}

//Envoir du formutlaire
function formSend() {
	const submitBtn = document.querySelector('form');

	//Appuyer sur le bouton
	submitBtn.addEventListener('submit', function (event) {
		event.preventDefault();

		//Les infos du formulaire
		const firstName = document.getElementById('firstName');
		const lastName = document.getElementById('lastName');
		const address = document.getElementById('address');
		const city = document.getElementById('city');
		const email = document.getElementById('email');

		//un tableau dans le local storage
		const idProduct = [];
		for (let i = 0; i < articleCart.length; i++) {
			idProduct.push(articleCart[i].id);
		}

		const order = {
			contact: {
				firstName: firstName.value,
				lastName: lastName.value,
				address: address.value,
				city: city.value,
				email: email.value,
			},
			products: idProduct,
		};

		//Creation de post
		const post = {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		//Fetch
		fetch('http://localhost:3000/api/products/order', post)
			.then(function (reponseAPI) {
				return reponseAPI.json();
			})

			//A CHANGER ne pas stocker
			.then(function (responseID) {
				localStorage.clear();
				//localStorage.setItem('orderId', responseID.orderId);
				//Allez a la page de confirmation de commande
				document.location.href =
					'confirmation.html?orderId=' + responseID.orderId;
				//console.log(order);
			})
			.catch(function (error) {
				console.log('Erreur Confimation');
				console.log(error);
			});
	});
}

//Si le panier es vide
function isCartEmpty() {
	const empty = document.getElementById(
		'cartAndFormContainer'
	).firstElementChild;

	if (articleCart == 0 || articleCart === null) {
		empty.textContent = 'Votre panier est vide';
	} else {
		useFetch();
		form();
		formSend();
	}
}

isCartEmpty();
