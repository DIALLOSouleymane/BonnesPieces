// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// Fonction qui génère toute la page web
function genererPieces(pieces){
    for (let i = 0; i<pieces.length; i++){
        // Création d'une balise dédiéee à une pièce auto
        const pieceElement = document.createElement("article");
        // On crée maintenant l'élément img
        const imageElement = document.createElement('img');
        // On accede à l'indice i de la liste des pieces pour configurer la source de l'image
        imageElement.src = pieces[i].image;
        // On rattache l'image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        // On repète la meme chose pour le nom, prix, categorie, ...
        
        const nomElement = document.createElement('h2');
        nomElement.innerText = article.nom;
        const prixElement = document.createElement ('p');
        prixElement.innerText = `Prix : ${article.prix} FCFA ${article.prix < 4000 ? "" : "( ~ Remise possible)"}`;
        const categorieEelement = document.createElement('p');
        // Pour les produits n'ayant pas de catégorie, nous utilisons l'opérateur "nullis" ~ ?? pour le notifier : 
        categorieEelement.innerText = article.categorie ?? "(Auncune catégorie)";
        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = article.description ?? "(Pas de description pour le moment !)";
        const disponibiliteElement = document.createElement('p');
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Indisponible";
    }
}