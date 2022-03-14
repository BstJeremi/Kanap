// Initialisation du local storage //
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
const cartItemsElement = document.querySelector("#cart__items");
let cartTotal = 0
let cartProductsCount = 0;
const pricesMap = new Map()

// Si le panier est vide //
async function getCart(){
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        cartItemsElement.innerHTML = emptyCart;
    } else {
        for (let produit of produitLocalStorage) {
            const resultat = await(await fetch('http://localhost:3000/api/products/' + produit.idProduit)).json()
            cartTotal += resultat.price * produit.quantiteProduit
            cartProductsCount += produit.quantiteProduit
            pricesMap.set(produit.idProduit, resultat.price)
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
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `)
       
        }
        displayTotals()
    }
};

// Page panier //

cartItemsElement.addEventListener('click', function(event) {

    if (event.target.className.indexOf('itemQuantity') >= 0) {
        const productNewQuantity = parseInt(event.target.value)
        const articleElement = event.target.parentNode.parentNode.parentNode.parentNode
        const productId = articleElement.getAttribute('data-id')
        const productIndex = produitLocalStorage.findIndex(el => el.idProduit == productId)
        const productOldQuantity = produitLocalStorage[productIndex].quantiteProduit 

        if (productNewQuantity === productOldQuantity) return;

        if (productOldQuantity > event.target.value) {
            cartProductsCount -= 1
            cartTotal -= pricesMap.get(productId)
        } else if (productOldQuantity < event.target.value) {
            cartProductsCount += 1
            cartTotal += pricesMap.get(productId)
        }
        produitLocalStorage[productIndex].quantiteProduit = productNewQuantity
        
        localStorage.setItem('produit', JSON.stringify(produitLocalStorage))
        displayTotals()
    }

    else if (event.target.className.indexOf('deleteItem') >= 0) {
        const articleElement = event.target.parentNode.parentNode.parentNode.parentNode
        const productId = articleElement.getAttribute('data-id')
        articleElement.remove()
        const productIndex = produitLocalStorage.findIndex(el => el.idProduit == productId);
        cartProductsCount -= produitLocalStorage[productIndex].quantiteProduit
        cartTotal -= produitLocalStorage[productIndex].quantiteProduit * pricesMap.get(productId)
        produitLocalStorage.splice(productIndex, 1)
        localStorage.setItem('produit', JSON.stringify(produitLocalStorage))
        displayTotals()
    }
})

getCart();

function displayTotals () {
    document.getElementById('totalPrice').innerText = cartTotal;
    document.getElementById('totalQuantity').innerText = cartProductsCount;
};

// Formulaire //
function getForm() {

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

// FORMULAIRE //
function postForm(e) {
    e.preventDefault();
   
    // Récupération des coordonnées du formulaire client //
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    // Construction d'un array depuis le local storage //
    let idProducts = [];
    for (let i = 0; i<produitLocalStorage.length;i++) {
        idProducts.push(produitLocalStorage[i].idProduit);
    }

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
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html";
    })
    .catch((err) => {
        alert ("Problème avec fetch : " + err.message);
    });
}
