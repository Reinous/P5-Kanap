// URL de API

const urlApi = 'http://localhost:3000/api/products';

//*****************Local storage exemple */
// const voitur =[
//     {id:'renault',
//         quantities: 5,
//         colors: 'rouge',},
//     {id:'BM',
//         quantities: 2,
//         colors: 'Vert',}
// ]

// //mise en chaine de caractere grace a "stringify"
// localStorage.setItem('test' ,JSON.stringify(voitur))
// const item = localStorage.getItem('test')
// console.log(item)
// // remise en tableau de la constante grace a "parse"
// console.log(JSON.parse(item))

// const essay = localStorage.getItem('cart')
// console.log(JSON.parse(essay))

fetch(urlApi)
	.then(function (response) {
		if (response.ok) {
			return response.json();
		}
	})
	.then(function (products) {
		const item = document.getElementById('items');
		for (const article of products) {
			const A = document.createElement('a');
			A.href = `./product.html?id=${article._id}`;
			item.appendChild(A);

			const articles = document.createElement('article');
			A.appendChild(articles);

			const img = new Image();
			img.src = `${article.imageUrl}`;
			img.alt = `${article.altTxt}`;
			articles.appendChild(img);

			const title = document.createElement('h3');
			title.classList.add('productNam');
			title.textContent = `${article.name}`;
			articles.appendChild(title);

			const productDescription = document.createElement('p');
			productDescription.classList.add('productDescription');
			productDescription.textContent = `${article.description}`;
			articles.appendChild(productDescription);
		}
	})
	.catch(function (err) {
		console.log(err);
	});
