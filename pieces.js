// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i<pieces.length; i++){
    // Creation des quatres elements dur le DOM
    const article = pieces[i];

    // Recuperation de l'élément du DOM qui accueillera les fiches :
    const sectionFiches = document.querySelector('.fiches');

    // Création d'une balise d'une balise dédiée à une pièce automobile
    const pieceElement = document.createElement('article');

    // Création des balises
    const imageElement = document.createElement('img');
    imageElement.src = article.image;
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
    
    // Rattachement des elements au DOM
    // On rattache la balise article à la section Fiche
    sectionFiches.appendChild(pieceElement);
    // Puis on remplace sectionFiches par pieceElement
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieEelement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
}

// Gestion des boutons
// Ajoutons un listener afin de modifier l'ordre des pièces en fonction du prix
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    // Création d'une copie de la liste
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b){
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector('.btn-filtrer');
boutonFiltrer.addEventListener('click', function(){
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= 4000;
    });
    console.log(piecesFiltrees);
});

// Pièces ayant une description
const btnDescription = document.querySelector('.btn-description');
btnDescription.addEventListener('click', function(){
    const piecesDecrites = pieces.filter(function(piece){
        return piece.description;
    });
    console.log(piecesDecrites);
});

// Tri par prix décroissant
const btnPrixDecroissant = document.querySelector('.btn-prixDecroissant');
btnPrixDecroissant.addEventListener('click', function(){
    const prixFiltrees = Array.from(pieces);
    prixFiltrees.sort(function(a,b){
        return b.prix - a.prix;
    });
    console.log(prixFiltrees);
});

/* // Affichage de la liste des noms des pièces avec map
const btnlisteNomsProdduits = document.querySelector('.btn-nomsPieces');
btnlisteNomsProdduits.addEventListener('click', function(){
    const noms = pieces.map(piece => piece.nom);
    // Nous retirons les noms des pièces non abordables
    for (let i = pieces.length -1; i>=0; i--){
        if (pieces[i].prix > 4000){
            noms.splice(i, 1);
        }
    }
    // Création de la liste au DOM
    const abordablesElements = document.createElement('ul');
    // Ajout de chaque nom à la liste
    for (let i=0; i<noms.length; i++){
        const nomElement = document.createElement('li');
        nomElement.innerText = noms[i];
        abordablesElements.appendChild(nomElement);
    }
    // Ajout de l'en-tete puis de la liste au bloc résultats filtres
    document.querySelector('.abordables').appendChild(abordablesElements);
    console.log(noms);
}); */

const noms = pieces.map(piece => piece.nom);
// Nous retirons les noms des pièces non abordables
for (let i = pieces.length -1; i>=0; i--){
    if (pieces[i].prix > 4000){
        noms.splice(i, 1);
    }
}
// Création de la liste au DOM
const abordablesElements = document.createElement('ul');
// Ajout de chaque nom à la liste
for (let i=0; i<noms.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tete puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(abordablesElements);

 
// Pièces disponibles
const piecesDisponibles = pieces.map(piece => `${piece.nom} - ${piece.prix} FCFA`);
// Nous retirons maintenant les pièces non disponibles
for (let i = pieces.length - 1; i>=0; i--){
    if (!(pieces[i].disponibilite)){
        // Si la piece n'est pas disponible, on la retire
        piecesDisponibles.splice(i,1);
    }
}
// Création de la liste au DOM
const disponiblesElements = document.createElement('ul');
// Ajout des pièces à la liste
for (let i=0; i<piecesDisponibles.length; i++){
    const pieceDisponible = document.createElement('li');
    pieceDisponible.innerText = piecesDisponibles[i];
    disponiblesElements.appendChild(pieceDisponible);
}
// Ajout de l'en-tete puis de la liste au bloc résultats filtres
document.querySelector('.disponibles').appendChild(disponiblesElements); 