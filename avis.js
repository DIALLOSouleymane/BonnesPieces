export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector('.formulaire-avis');
    formulaireAvis.addEventListener('submit', function (event) {
        event.preventDefault();
        // Création de l'objet du nouvel avis
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value
        };

        // Conversion de l'objet en une chaine de caractères au format JSON afin de le transmettre au body
        // c'est la création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);

        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        });
    });
}

export function ajoutListenerAvis(){
    const piecesElements = document.querySelectorAll('.fiches article button');

    for (let i= 0; i<piecesElements.length; i++){
        piecesElements[i].addEventListener('click', async function (event) {
            const id = event.target.dataset.id;
            // fetch(`http://localhost:8081/pieces/${id}/avis`);
            // modification de la requete
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
            // reconstruction des donnees
            const avis = await reponse.json();

            // Gestion de l'élément :
            const pieceElement = event.target.parentElement;

            const avisElement = document.createElement('p');
            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `<b>${avis[i].utilisateur}</b> : <I>${avis[i].commentaire}</I><br>`;
                avisElement.innerHTML += `<b>Nombre d'étoiles : <I>${avis[i].nbEtoiles}</I></b><br>`;
            }
            pieceElement.appendChild(avisElement);
        });
    }
    
}

export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaire par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];
    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
    }
    
    // légende qui s'affichera sur la gauche à coté de la barre horizontale
    const labels = ['5', '4', '3', '2', '1'];
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)", //Couleur jaune
        }],
    };
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
        indexAxis: "y",
        },
    };
    // Rendu du graphique dans l'élément canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );

    // Second Graphique : commentaires pièces dispos et noon dispo
    // Récupération des pièces depuis le localStorage
    const piecesJSON = window.localStorage.getItem("pieces");
    //const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];
    const pieces = JSON.parse(piecesJSON)
    // Calcul du nombre de commentaires
    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;
    //if(pieces.length > 0){
    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(p => p.id === avis[i].pieceId);

        if (piece) {
            if (piece.disponibilite) {
                nbCommentairesDispo++;
            } else {
                nbCommentairesNonDispo++;
            }
        }
    }

    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labelsDispo = ["Disponibles", "Non dispo."];

    // Données et personnalisation du graphique
    const dataDispo = {
        labels: labelsDispo,
        datasets: [{
            label: "Nombre de commentaires",
            data: [nbCommentairesDispo, nbCommentairesNonDispo],
            backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
        }],
    };

    // Objet de configuration final
    const configDispo = {
        type: "bar",
        data: dataDispo,
    };
    console.log(dataDispo);
    // Rendu du graphique dans l'élément canvas
    new Chart(
        document.querySelector("#graphique-dispo"),
        configDispo,
    );
}
