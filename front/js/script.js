// URL de API

const urlApi = 'http://localhost:3000/api/products';

//affiche
function displayItem(article, items) {
	const aTag = document.createElement('a');
	aTag.href = `./product.html?id=${article._id}`;
	items.appendChild(aTag);

	const articles = document.createElement('article');
	aTag.appendChild(articles);

	const img = new Image();
	img.src = `${article.imageUrl}`;
	img.alt = `${article.altTxt}`;
	articles.appendChild(img);

	const title = document.createElement('h3');
	title.classList.add('productName');
	title.textContent = `${article.name}`;
	articles.appendChild(title);

	const productDescription = document.createElement('p');
	productDescription.classList.add('productDescription');
	productDescription.textContent = `${article.description}`;
	articles.appendChild(productDescription);
}

function getItem() {
	fetch(urlApi)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(function (products) {
			const items = document.getElementById('items');
			for (const article of products) {
				displayItem(article, items);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
}
getItem();
