// ETAPE 3 // Récupération des articles(produits) de l'api //

async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// ETAPE 4 // Répartition des données de l'api dans le DOM //

async function fillSection() {
    let result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {
    
            // Insertion élément -> a //
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion élément -> article //
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
    
            // Insertion image //
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;
    
            // Insertion titre -> h3 //
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;
    
            // Insertion description -> p //
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;

        }

    });

}

fillSection();