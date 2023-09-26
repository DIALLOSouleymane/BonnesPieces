// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i<pieces.length; i++){
    // Creation des quatres elements dur le DOM
    const article = pieces[i];
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
    const sectionFiches = document.querySelector('.fiches');
    sectionFiches.appendChild(imageElement);
    sectionFiches.appendChild(nomElement);
    sectionFiches.appendChild(prixElement);
    sectionFiches.appendChild(categorieEelement);
    sectionFiches.appendChild(descriptionElement);
    sectionFiches.appendChild(disponibiliteElement);
}

// Ajoutons un listener afin de modifier l'ordre des pièces en fonction du prix
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    pieces.sort(function (a, b){
        return a.prix - b.prix;
    });
    console.log(pieces);
});


