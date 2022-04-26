// URL de API
const urlApi = 'http://localhost:3000/api/products/';

function addColorSelection(product){
    const selectColor = document.getElementById('colors');
    for(couleur of product.colors){
        let option = document.createElement('option');
        option.setAttribute('product', couleur);
        option.textContent = couleur;
        selectColor.appendChild(option);
    }
}

//url searchparams pour récupérer l'id et le mettre avec l'api
const params = new URL(document.location).searchParams;
const id = params.get('id');
const urlApiProduits = new URL (id, urlApi)

//mettre en liens les canapé et les id
fetch(urlApiProduits)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(product){
        //mettre en relations les info produit avec le html


        //a changer innerhtml
        document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé"></img>`;
        document.querySelector("#title").textContent = product.name ;
        document.querySelector('#price').textContent = product.price ; 
        document.querySelector('#description').textContent = product.description ;


        //Pour la selection de couleur
        addColorSelection(product)
    })
    .catch(function(err) {
        alert("Une erreur s'est produite")
    })


    //**********************Local Storage***************************** */

//Ecouter le bouton du panier

document.querySelector('#addToCart').addEventListener('click',(event) => {
    //Creation de l'objet avant de mettre dans le local storage
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;

    let product = [{
        produit: id,
        quantities: quantity,
        colors: color,
    }]
    //Mise de l'object dans le local storage
localStorage.setItem('cart' ,JSON.stringify(product))
const cart = localStorage.getItem('cart')
   console.log(JSON.parse(cart))
})

