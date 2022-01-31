// Initialisation du local storage //
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
    
        // Insertion de l'image
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
    console.log(totalQtt);

    // Récupération du prix total //

    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    };

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
};

RecupTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}

modifyQtt();

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

// Formulaire //
function getForm() {
    
    // Ajout des Regex //
    let form = document.querySelector(".cart__order__form");

    // Création des expressions régulières //
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Modification du prénom //
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Modification du Nom //
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Modification de l'adresse //
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Modification de la Ville //
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Modification du Mail //
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    // Validation du prénom //
    const validFirstName = function(inputFirstName) {
        let firstNameMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameMsg.innerHTML = '';
        } else {
            firstNameMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation du nom //
    const validLastName = function(inputLastName) {
        let lastNameMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameMsg.innerHTML = '';
        } else {
            lastNameMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation de l'adresse //
    const validAddress = function(inputAddress) {
        let addressMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressMsg.innerHTML = '';
        } else {
            addressMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation de la ville //
    const validCity = function(inputCity) {
        let cityMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityMsg.innerHTML = '';
        } else {
            cityMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Validation du Mail //
    const validEmail = function(inputEmail) {
        let emailMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailMsg.innerHTML = '';
        } else {
            emailMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
};

getForm();

//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();