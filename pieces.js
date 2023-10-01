import { ajoutListenerAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
// const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());
// Remplacement du fichier coder en dure par l'API
// const pieces = await fetch("http://localhost:8081/pieces/").then(pieces => pieces.json());

// *Utilisation du local Storage du navigateur
// Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');
if (pieces === null){
    // Récupération des pièces depuis l'API
    const reponse = await fetch("http://localhost:8081/pieces/");
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockages des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
}else{
    pieces = JSON.parse(pieces);
}


// Transformation des pièces en JSON pour le localStorage
const valeurPieces = JSON.stringify(pieces);

// Stockage des informations dans le localStorage
window.localStorage.setItem("pieces", valeurPieces);

// Appel de la fonction ajoutListenerEnvoyerAvis pour l'ajout du listener au formulaire (ecoute du formulaire)
ajoutListenerEnvoyerAvis()

// Fonction qui génère toute la page web
function genererPieces(pieces){
    for (let i = 0; i<pieces.length; i++){
        // Recupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector('.fiches');
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
        nomElement.innerHTML = pieces[i].nom;
        pieceElement.appendChild(nomElement);
        const prixElement = document.createElement ('p');
        prixElement.innerHTML = `Prix : ${pieces[i].prix} FCFA ${pieces[i].prix < 4000 ? "" : "( ~ Remise possible)"}`;
        pieceElement.appendChild(prixElement);
        const categorieEelement = document.createElement('p');
        // Pour les produits n'ayant pas de catégorie, nous utilisons l'opérateur "nullis" ~ ?? pour le notifier : 
        categorieEelement.innerHTML = pieces[i].categorie ?? "(Auncune catégorie)";
        pieceElement.appendChild(categorieEelement);
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = pieces[i].description ?? "(Pas de description pour le moment !)";
        pieceElement.appendChild(descriptionElement);
        const disponibiliteElement = document.createElement('p');
        disponibiliteElement.innerHTML = pieces[i].disponibilite ? "En stock" : "Indisponible";
        pieceElement.appendChild(disponibiliteElement);

        // Code ajouté
        const avisBouton = document.createElement('button');
        // avisBouton.dataset.id = article.id;
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.textContent = "Afficher les avis";

        // On Rattache la balise article au body
        document.body.appendChild(pieceElement);
        // On ratache maintenant la balise article à sectiction fiche ou classe fiches
        sectionFiches.appendChild(pieceElement);

        // Code ajouté
        pieceElement.appendChild(avisBouton);

    }
    // Ajout de la fonction ajoutListennerAvis
    ajoutListenerAvis();

}

// Premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click', function (){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b){
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector('.fiches').innerHTML = "";
    genererPieces(piecesOrdonnees);
});

// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector('.btn-filtrer');
boutonFiltrer.addEventListener('click', function(){
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 4000;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector('.fiches').innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Filtrage par prix max (input range)
const inputPrixmax = document.querySelector('#prix-max');
inputPrixmax.addEventListener('input', function (){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixmax.value;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesFiltrees);
})

// Highlight pieces
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
    nomElement.innerHTML = noms[i];
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
    pieceDisponible.innerHTML = piecesDisponibles[i];
    disponiblesElements.appendChild(pieceDisponible);
}
// Ajout de l'en-tete puis de la liste au bloc résultats filtres
document.querySelector('.disponibles').appendChild(disponiblesElements); 

// Pièces ayant une description
const btnDescription = document.querySelector('.btn-description');
btnDescription.addEventListener('click', function(){
    const piecesDecrites = pieces.filter(function(piece){
        return piece.description;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesDecrites);
});

// Tri par prix décroissant
const btnPrixDecroissant = document.querySelector('.btn-prixDecroissant');
btnPrixDecroissant.addEventListener('click', function(){
    const prixFiltrees = Array.from(pieces);
    prixFiltrees.sort(function(a,b){
        return b.prix - a.prix;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(prixFiltrees);
});

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMiseAJour = document.querySelector('.btn-maj');
boutonMiseAJour.addEventListener('click', function() {
    window.localStorage.removeItem('pieces');
})