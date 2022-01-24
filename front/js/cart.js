//Initialisation du local storage //
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide //
function RecupCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
    for (let produit in produitLocalStorage){

        // Insertion -> "article" //
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
    
        // Insertion -> "div" //
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
        // Insertion -> image //
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = produitLocalStorage[produit].imgProduit;
        productImg.alt = produitLocalStorage[produit].altImgProduit;
        
        // Insertion -> "div" //
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
        // Insertion ->"div" //
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion -> h3 //
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
    
        // Insertion -> couleur //
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
        productColor.style.fontSize = "20px";
    
        // Insertion -> prix //
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
    
        // Insertion -> "div" //
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";
    
        // Insertion -> "div" //
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion -> "Quantité" //
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";
    
        // Insertion de la quantité //
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produitLocalStorage[produit].quantiteProduit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    
        // Insertion -> "div" //
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
        // Insertion -> "p" supprimer //
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
    };
};
};

RecupCart();

function RecupTotals(){

    // Récupération du total des quantités //
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length;
    totalQtt = 0;

    for (let i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    };

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total //

    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    };

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
};

RecupTotals();

// Modification d'une quantité de produit //
function modifQuantite() {
    let quantiteModif = document.querySelectorAll(".itemQuantity");

    for (let q = 0; q < quantiteModif.length; q++){
        quantiteModif[q].addEventListener("change" , (event) => {
            event.e.target();

            //Selection de l'element à modifier en fonction de son id ET sa couleur //
            let quantiteModif = produitLocalStorage[q].quantiteProduit;
            let quantiteModifValue = quantiteModif[q].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.quantiteModifValue != quantiteModif);

            resultFind.quantiteProduit = quantiteModifValue;
            produitLocalStorage[q].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh rapide //
            location.reload();
        })
    };
};

modifQuantite();

// Suppression d'un produit //
function SuppProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let b = 0; b < btn_supprimer.length; b++){
        btn_supprimer[b].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur //
            let idSupp = produitLocalStorage[b].idProduit;
            let colorSupp = produitLocalStorage[b].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idSupp || el.couleurProduit !== colorSupp );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé //
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    };
};

SuppProduct();