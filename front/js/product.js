// URL de API
const urlApi = 'http://localhost:3000/api/products/';

function addColorSelection(product) {
	const selectColor = document.getElementById('colors');
	for (couleur of product.colors) {
		let option = document.createElement('option');
		option.setAttribute('product', couleur);
		option.textContent = couleur;
		selectColor.appendChild(option);
	}
}

//url searchparams pour récupérer l'id et le mettre avec l'api
const params = new URL(document.location).searchParams;
const id = params.get('id');
const urlApiProduits = new URL(id, urlApi);

//mettre en liens les canapé et les id
fetch(urlApiProduits)
	.then(function (response) {
		if (response.ok) {
			return response.json();
		}
	})
	.then(function (product) {
		//mettre en relations les info produit avec le html

		//a changer innerhtml
		document.querySelector(
			'.item__img'
		).innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé"></img>`;
		document.querySelector('#title').textContent = product.name;
		document.querySelector('#price').textContent = product.price;
		document.querySelector('#description').textContent = product.description;

		//Pour la selection de couleur
		addColorSelection(product);
	})
	.catch(function (err) {
		alert("Une erreur s'est produite" + err);
	});

//**********************Local Storage***************************** */

//Ecouter le bouton du panier

document.querySelector('#addToCart').addEventListener('click', (event) => {
	//Creation de l'objet avant de mettre dans le local storage
	let color = document.getElementById('colors').value;
	let quantity = document.getElementById('quantity').value;

	let sofa = {
		id: id,
		quantities: quantity,
		colors: color,
	};

	//Verifier si une couleur et une quantité est noté
	if (color && quantity > 0 && quantity <= 100) {
		//Mise de l'object dans le local storage
		addSofa(sofa);
		alert('Votre article a bien été ajouté au panier.');
	}
	//Sinon erreur
	else if (color == false || quantity <= 0 || quantity > 100) {
		alert('Veuillez selectionner une couleur et une quantité entre 0 et 100.');
	}
});

//Creation du local storage
function saveCart(sofa) {
	localStorage.setItem('cart', JSON.stringify(sofa));
}

//Verification si le panier est vide sinon le remettre en tableau
function getSofa() {
	const sofa = localStorage.getItem('cart');
	if (sofa === null) {
		return [];
	} else {
		return JSON.parse(sofa);
	}
}

//Voir si le canapé existe deja dans le panier ou pas en verifiant la couleur et id du produit sinn push
function addSofa(product) {
	const sofa = getSofa();
	const foundProduct = sofa.find(
		(p) => p.id == product.id && p.colors == product.colors
	);

	//si il existe on les additionne
	if (foundProduct !== undefined) {
		const numberA = parseInt(foundProduct.quantities, 10);
		const numberB = parseInt(quantity.value, 10);
		foundProduct.quantities = numberA + numberB;
	} else {
		//sinon on le push a la fin de la liste
		product.quantities = parseInt(quantity.value, 10);
		sofa.push(product);
	}
	saveCart(sofa);
	const essay = localStorage.getItem('cart');
	console.log(JSON.parse(essay));
}
