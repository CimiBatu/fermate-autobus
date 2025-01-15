document.getElementById("stopForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const stopNumber = document.getElementById("stopNumber").value.trim();
    const resultsList = document.getElementById("stopResults");

    resultsList.innerHTML = "";
    
    if (!stopNumber) {
        resultsList.innerHTML = `<li class="list-group-item text-danger">Inserisci un numero di fermata valido.</li>`;
        return;
    }

    let URL = "https://gpa.madbob.org/query.php?stop=" + stopNumber;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                resultsList.innerHTML = `<li class="list-group-item">Nessun passaggio trovato per questa fermata.</li>`;
                return;
            }

            for (let i = 0; i < data.length; i++) {
                const line = data[i].line || "Non disponibile";
                const hour = data[i].hour || "Non disponibile";
                creaCard(line, hour);
            }
        })
        .catch(error => {
            console.error("Errore:", error);
            resultsList.innerHTML = `<li class="list-group-item text-danger">Errore: ${error.message}</li>`;
        });
});

function creaCard(linea, orario) {
    let riga = document.getElementById("riga");
    let div = document.createElement("div");
    div.classList.add("card", "mb-3");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    p1.innerHTML = `Linea: ${linea}`;
    p2.innerHTML = `Orario: ${orario}`;

    p1.classList.add("text-bg-primary", "p-2");
    p2.classList.add("p-2");

    div.appendChild(p1);
    div.appendChild(p2);
    riga.appendChild(div);
}
