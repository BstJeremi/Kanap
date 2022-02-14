// Initialisation du local storage //
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
const cartItemsElement = document.querySelector("#cart__items");
let totalPanier = 0

// Si le panier est vide //
async function RecupCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        cartItemsElement.innerHTML = emptyCart;
    } else {
        for (let produit of produitLocalStorage){

            const resultat = await(await fetch('http://localhost:3000/api/products/' + produit.idProduit)).json()
            totalPanier += resultat.price * produit.quantiteProduit
            cartItemsElement.insertAdjacentHTML('afterbegin', `
                <article class="cart__item" data-id="${resultat._id}" data-color="{product-color}">
                    <div class="cart__item__img">
                    <img src="${resultat.imageUrl}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${resultat.name}</h2>
                        <p>${produit.couleurProduit}</p>
                        <p>${resultat.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantiteProduit}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-price="${resultat.price}">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>
            `)

        
        }
    }
};

RecupCart();

function RecupTotals(){

    // Récupération du total des quantités //
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length;
    let totalQtt = 0;

    let totalPrice = 0;
    console.log(elemsQtt)
    for (let i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
        totalPrice += (elemsQtt[i].valueAsNumber * elemsQtt[i].getAttribute("data-price"));
    };
    // alert(totalPrice)
    // alert(totalQtt)

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total //

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
};

RecupTotals();

// Modification d'une quantité de produit //
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            // Selection de l'element à modifier en fonction de son id ET sa couleur //
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            
            console.log(event.target);
            RecupTotals();
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

            // Selection de l'element à supprimer en fonction de son id ET sa couleur //
            let idSupp = produitLocalStorage[b].idProduit;
            let colorSupp = produitLocalStorage[b].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idSupp || el.couleurProduit !== colorSupp );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.log(localStorage.getItem("produit"))

            event.target.parentNode.parentNode.parentNode.parentNode.remove()
            RecupTotals();
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