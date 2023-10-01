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