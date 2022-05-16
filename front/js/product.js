// URL de API
const urlApi = 'http://localhost:3000/api/products/';

function addColorSelection(product) {
	const selectColor = document.getElementById('colors');
	for (const color of product.colors) {
		const option = document.createElement('option');
		option.setAttribute('product', color);
		option.textContent = color;
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

		const itemImg = document.createElement('img');
		document.querySelector('.item__img').appendChild(itemImg).src =
			product.imageUrl;
		document.querySelector('.item__img').appendChild(itemImg).alt =
			product.altTxt;

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

document.querySelector('#addToCart').addEventListener('click', () => {
	//Creation de l'objet avant de mettre dans le local storage
	const color = document.getElementById('colors').value;
	const quantity = document.getElementById('quantity').value;

	const sofa = {
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
