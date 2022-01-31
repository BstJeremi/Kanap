// Récupérer l’id du produit à afficher //

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);

let article = "";

const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

// Récupération des articles de l'api //

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'api dans le DOM //
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })

    .catch((error) => {
        console.log("Erreur de la requête API");
    })
};

getArticle();
    
function getPost(article) {

    // Insertion image //
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification titre -> h1 //
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification prix //
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification description //
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion options couleur //
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(article);

};

// Gestion du panier //

function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier //
    btn_envoyerPanier.addEventListener("click", (event) => {
        if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0){

        // Récupération du choix de la couleur //
        let choixCouleur = color.value;
                    
        // Récupération du choix de la quantité //
        let choixQuantite = quantity.value;

        // Récupération des options de l'article à ajouter au panier //
        let optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            nomProduit: article.name,
            prixProduit: article.price,
            descriptionProduit: article.description,
            imgProduit: article.imageUrl,
            altImgProduit: article.altTxt, 
        };

        // Initialisation du local storage //
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        // Fenêtre pop-up //
        const popupConfirmation =() =>{
            if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier`)){
                window.location.href ="cart.html";
            }
        }

        // Importation sur le local storage //

        // Si le panier comporte déjà au moins 1 article //
        if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);

        // Si le produit commandé est déjà dans le panier //
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();

        // Si le produit commandé n'est pas dans le panier //
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
        
        // Si le panier est vide //
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }}
    });
};