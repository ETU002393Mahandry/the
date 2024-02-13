function connect() {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        try {
            var data = JSON.parse(xhr.responseText);
            localStorage.setItem("iduser",data.iduser);
            if (data.isadmin == 1) {
                window.location.href = "administration.html";
            }
            else{
                window.location.href = "utilisateur.html";
            }
        } catch (error) {
            Swal.fire({
                title: 'Erreur de connection!',
                text: error,
                icon: 'warning', 
                confirmButtonText: 'Ok'
            });
        }
    });
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    xhr.open("POST", "../functions/login.php", true);
    xhr.send(formData);
}

function signup() {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        if(!isNaN(xhr.responseText)){
            localStorage.setItem("iduser",xhr.responseText);
            window.location.href = "utilisateur.html";
        } else {
            Swal.fire({
                title: 'Erreur lors de la creation compte!',
                text: xhr.responseText,
                icon: 'warning', 
                confirmButtonText: 'Ok'
            });
        }
    });
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    xhr.open("POST", "../functions/signup.php", true);
    xhr.send(formData);
}

function inserer(form) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        location.reload();
    });
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    if (form.id == "form_variete") {
        xhr.open("POST", "../functions/inserer.php?page=the_Variete", true);
    } 
    else if (form.id == "form_parcelle") {
        xhr.open("POST", "../functions/inserer.php?page=the_Parcelle", true);
    } 
    else if (form.id == "form_cueilleur") {
        xhr.open("POST", "../functions/inserer.php?page=the_Cueilleur", true);
    } 
    else if (form.id == "form_categorie") {
        xhr.open("POST", "../functions/inserer.php?page=the_Depense", true);
    } 
    else if (form.id == "form_salaire") {
        xhr.open("POST", "../functions/inserer.php?page=the_Salaire", true);
    } 
    else if (form.id == "form_cueillette") {
        xhr.open("POST", "../functions/inserer.php?page=the_Cueillette", true);
    }
    else if (form.id == "form_depense") {
        xhr.open("POST", "../functions/inserer.php?page=the_CoutDepense", true);
    }
    xhr.send(formData);
}

function resultatGlobal(form) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function(event) {
        var tbody = document.querySelector('.table tbody');
        tbody.innerHTML = ''; // Effacer le contenu précédent de la table
        alert(xhr.responseText);
        var retour = JSON.parse(xhr.responseText);
        if (retour) {
            var poidsTotal = retour.poidsTotal || '';
            var poidsRestant = retour.poidsrestant || '';
            var coutRevient = retour.prixRevient || '';

            var newRow = tbody.insertRow();
            
            var cell1 = newRow.insertCell();
            cell1.textContent = poidsTotal;

            var cell2 = newRow.insertCell();
            cell2.textContent = poidsRestant;

            var cell3 = newRow.insertCell();
            cell3.textContent = coutRevient;
        } else {
            console.log("Erreur: Aucune donnée retournée");
        }
    });

    xhr.addEventListener("error", function(event) {
        alert("Erreur de chargement des données");
    });

    xhr.open("POST", "../functions/resultat.php", true);
    xhr.send(formData);
}

function modifier(form) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        location.reload();
    });
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    if (form.id == "modif_variete") {
        xhr.open("POST", "../functions/modify.php?page=the_Variete&&val="+formData.get('idvariete')+"&&col=idvariete", true);
    } 
    else if (form.id == "modif_parcelle") {
        xhr.open("POST", "../functions/modify.php?page=the_Parcelle&&val="+formData.get('idparcelle')+"&&col=idparcelle", true);
    } 
    else if (form.id == "modif_cueilleur") {
        xhr.open("POST", "../functions/modify.php?page=the_Cueilleur&&val="+formData.get('idcueilleur')+"&&col=idcueilleur", true);
    } 
    else if (form.id == "modif_categorie") {
        xhr.open("POST", "../functions/modify.php?page=the_Depense&&val="+formData.get('iddepense')+"&&col=iddepense", true);
    } 
    else if (form.id == "modif_salaire") {
        xhr.open("POST", "../functions/modify.php?page=the_Salaire&&val="+formData.get('idsalaire')+"&&col=idsalaire", true);
    } 
    xhr.send(formData);
}

function supprimer(id, callerId) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        location.reload();
    });
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    if (callerId == "variete_button") {
        xhr.open("POST", "../functions/delete.php?page=the_Variete&&val="+id+"&&col=idvariete", true);
    } 
    else if (callerId == "parcelle_button") {
        xhr.open("POST", "../functions/delete.php?page=the_Parcelle&&val="+id+"&&col=idparcelle", true);
    } 
    else if (callerId == "cueilleur_button") {
        xhr.open("POST", "../functions/delete.php?page=the_Cueilleur&&val="+id+"&&col=idcueilleur", true);
    } 
    else if (callerId == "depense_button") {
        xhr.open("POST", "../functions/delete.php?page=the_Depense&&val="+id+"&&col=iddepense", true);
    } 
    else if (callerId == "salaire_button") {
        xhr.open("POST", "../functions/delete.php?page=the_Salaire&&val="+id+"&&col=idsalaire", true);
    } 
    xhr.send();
}
function manova(id, form) {
    var formulaire = document.getElementById(form);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        var retour = JSON.parse(xhr.responseText);
        for (var key in retour) {
            if (retour.hasOwnProperty(key)) {
                var inputElement = formulaire.querySelector('[name="' + key + '"]');
                if (inputElement) {
                    if (inputElement.tagName.toLowerCase() === 'select') {
                        var option = inputElement.querySelector('option[value="' + retour[key] + '"]');
                        if (option) {
                            option.selected = true;
                        }
                    } else {
                        inputElement.value = retour[key];
                    }
                }
            }
        }
    });
    
    xhr.addEventListener("error", function(event) {
        alert("Erreur de connexion au serveur");
    });
    if (form == "variete_modification") {
        xhr.open("POST", "../functions/all.php?page=the_Variete&&val="+id+"&&col=idvariete", true);
    } 
    else if (form == "parcelle_modification") {
        xhr.open("POST", "../functions/all.php?page=the_Parcelle&&val="+id+"&&col=idparcelle", true);
    } 
    else if (form == "cueilleurs_modification") {
        xhr.open("POST", "../functions/all.php?page=the_Cueilleur&&val="+id+"&&col=idcueilleur", true);
    } 
    else if (form == "categorie_modification") {
        xhr.open("POST", "../functions/all.php?page=the_Depense&&val="+id+"&&col=iddepense", true);
    } 
    else if (form == "salaire_modification") {
        xhr.open("POST", "../functions/all.php?page=the_Salaire&&val="+id+"&&col=idsalaire", true);
    } 
    xhr.send();
}


function varietes(listevar){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        listevar.innerHTML="";
        var retour = JSON.parse(xhr.responseText);
        if (retour && retour.length > 0) {    
            for (var i = 0; i < retour.length; i++) {
                var option=document.createElement("option");
                option.textContent=retour[i].nom;
                option.value=retour[i].idvariete;
                listevar.appendChild(option);
            }    
        } else {
            listevar.innerHTML = "Pas de Variete";
        }
    });

    xhr.addEventListener("error", function(event) {
        alert("Erreur de chargement des varietes");
    });

    xhr.open("GET", "../functions/tout.php?page=the_Variete", true);
    xhr.send();
}

function cueilleurs(listecueil){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        listecueil.innerHTML="";
        var retour = JSON.parse(xhr.responseText);
        if (retour && retour.length > 0) {    
            for (var i = 0; i < retour.length; i++) {
                var option=document.createElement("option");
                option.textContent=retour[i].nom;
                option.value=retour[i].idcueilleur;
                listecueil.appendChild(option);
            }    
        } else {
            listecueil.innerHTML = "Pas de Cueilleur";
        }
    });

    xhr.addEventListener("error", function(event) {
        alert("Erreur de chargement des cueilleurs");
    });

    xhr.open("GET", "../functions/tout.php?page=the_Cueilleur", true);
    xhr.send();
}

function parcelles(listepar){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        listepar.innerHTML="";
        var retour = JSON.parse(xhr.responseText);
        if (retour && retour.length > 0) {    
            for (var i = 0; i < retour.length; i++) {
                var option=document.createElement("option");
                option.textContent=retour[i].idparcelle;
                option.value=retour[i].idparcelle;
                listepar.appendChild(option);
            }    
        } else {
            listepar.innerHTML = "Pas de Parcelle";
        }
    });

    xhr.addEventListener("error", function(event) {
        alert("Erreur de chargement des parcelles.");
    });

    xhr.open("GET", "../functions/tout.php?page=the_Parcelle", true);
    xhr.send();
}

function depenses(listedep){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(event) {
        listedep.innerHTML="";
        var retour = JSON.parse(xhr.responseText);
        if (retour && retour.length > 0) {    
            for (var i = 0; i < retour.length; i++) {
                var option=document.createElement("option");
                option.textContent=retour[i].nom;
                option.value=retour[i].iddepense;
                listedep.appendChild(option);
            }    
        } else {
            listedep.innerHTML = "Pas de Depenses";
        }
    });

    xhr.addEventListener("error", function(event) {
        alert("Erreur de chargement des depenses");
    });

    xhr.open("GET", "../functions/tout.php?page=the_Depense", true);
    xhr.send();
}

function liste_variete() {
    var xhrLoadAchats = new XMLHttpRequest();
    xhrLoadAchats.addEventListener("load", function(event) {
        var tableau = document.getElementById("resultat_variete");
        var resultat = tableau.querySelector('tbody');
        var retour = JSON.parse(xhrLoadAchats.responseText);
        if (retour && retour.length > 0) {
            resultat.innerHTML = ''; // Supprime le contenu précédent
            retour.forEach(function(item) {
                var row = document.createElement('tr');
                var keys = ["idvariete", "nom", "occupation", "rendement","vente"];
                keys.forEach(function(key) {
                    var cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });

                var actionCell = document.createElement('td');
                var insertButton = document.createElement('button');
                insertButton.type = 'button';
                insertButton.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-icon');
                insertButton.innerHTML = '<i class="mdi mdi-plus"></i>';
                insertButton.addEventListener("click", function() {
                    insert('variete');
                });

                var updateButton = document.createElement('button');
                updateButton.type = 'button';
                updateButton.classList.add('btn', 'btn-success', 'btn-rounded', 'btn-icon');
                updateButton.innerHTML = '<i class="mdi mdi-refresh"></i>';
                updateButton.addEventListener("click", function() {
                    update('variete', item["idvariete"]);
                });
                

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-rounded', 'btn-icon');
                deleteButton.innerHTML = '<i class="mdi mdi-delete-forever"></i>';
                deleteButton.id = 'variete_button';
                deleteButton.addEventListener("click", function() {
                    supprimer(item["idvariete"], this.id);
                });

                actionCell.appendChild(insertButton);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                resultat.appendChild(row);
            });
        } else {
            resultat.innerHTML = "Aucune donnée trouvée";
        }
    });

    xhrLoadAchats.addEventListener("error", function(event) {
       alert("Erreur de chargement des publications");
    });

    xhrLoadAchats.open("GET", "../functions/tout.php?page=the_Variete", true);
    xhrLoadAchats.send();
}

function liste_parcelle() {
    var xhrLoadAchats = new XMLHttpRequest();
    xhrLoadAchats.addEventListener("load", function(event) {
        var tableau = document.getElementById("resultat_parcelle");
        var resultat = tableau.querySelector('tbody');
        var retour = JSON.parse(xhrLoadAchats.responseText);
        if (retour && retour.length > 0) {
            resultat.innerHTML = ''; // Supprime le contenu précédent
            retour.forEach(function(item) {
                var row = document.createElement('tr');
                var keys = ["idparcelle", "idvariete", "surface"];
                keys.forEach(function(key) {
                    var cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });

                var actionCell = document.createElement('td');
                var insertButton = document.createElement('button');
                insertButton.type = 'button';
                insertButton.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-icon');
                insertButton.innerHTML = '<i class="mdi mdi-plus"></i>';
                insertButton.addEventListener("click", function() {
                    insert('parcelle');
                });

                var updateButton = document.createElement('button');
                updateButton.type = 'button';
                updateButton.classList.add('btn', 'btn-success', 'btn-rounded', 'btn-icon');
                updateButton.innerHTML = '<i class="mdi mdi-refresh"></i>';
                updateButton.addEventListener("click", function() {
                    update('parcelle', item["idparcelle"]);
                });

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-rounded', 'btn-icon');
                deleteButton.innerHTML = '<i class="mdi mdi-delete-forever"></i>';
                deleteButton.id = 'parcelle_button';
                deleteButton.addEventListener("click", function() {
                    supprimer(item["idparcelle"], this.id);
                });

                actionCell.appendChild(insertButton);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                resultat.appendChild(row);
            });
        } else {
            resultat.innerHTML = "Aucune donnée trouvée";
        }
    });

    xhrLoadAchats.addEventListener("error", function(event) {
       alert("Erreur de chargement des publications");
    });

    xhrLoadAchats.open("GET", "../functions/tout.php?page=the_Parcelle", true);
    xhrLoadAchats.send();
}

function liste_cueilleurs() {
    var xhrLoadAchats = new XMLHttpRequest();
    xhrLoadAchats.addEventListener("load", function(event) {
        var tableau = document.getElementById("resultat_cueilleurs");
        var resultat = tableau.querySelector('tbody');
        var retour = JSON.parse(xhrLoadAchats.responseText);
        if (retour && retour.length > 0) {
            resultat.innerHTML = ''; // Supprime le contenu précédent
            retour.forEach(function(item) {
                var row = document.createElement('tr');
                var keys = ["idcueilleur", "nom", "genre","naissance"];
                keys.forEach(function(key) {
                    var cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });

                var actionCell = document.createElement('td');
                var insertButton = document.createElement('button');
                insertButton.type = 'button';
                insertButton.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-icon');
                insertButton.innerHTML = '<i class="mdi mdi-plus"></i>';
                insertButton.addEventListener("click", function() {
                    insert('cueilleurs');
                });

                var updateButton = document.createElement('button');
                updateButton.type = 'button';
                updateButton.classList.add('btn', 'btn-success', 'btn-rounded', 'btn-icon');
                updateButton.innerHTML = '<i class="mdi mdi-refresh"></i>';
                updateButton.addEventListener("click", function() {
                    update('cueilleurs',item["idcueilleur"]);
                });

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-rounded', 'btn-icon');
                deleteButton.innerHTML = '<i class="mdi mdi-delete-forever"></i>';
                deleteButton.id = 'cueilleur_button';
                deleteButton.addEventListener("click", function() {
                    supprimer(item["idcueilleur"], this.id);
                });

                actionCell.appendChild(insertButton);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                resultat.appendChild(row);
            });
        } else {
            resultat.innerHTML = "Aucune donnée trouvée";
        }
    });

    xhrLoadAchats.addEventListener("error", function(event) {
       alert("Erreur de chargement des publications");
    });

    xhrLoadAchats.open("GET", "../functions/tout.php?page=the_Cueilleur", true);
    xhrLoadAchats.send();
}

function liste_depenses() {
    var xhrLoadAchats = new XMLHttpRequest();
    xhrLoadAchats.addEventListener("load", function(event) {
        var tableau = document.getElementById("resultat_categorie");
        var resultat = tableau.querySelector('tbody');
        var retour = JSON.parse(xhrLoadAchats.responseText);
        if (retour && retour.length > 0) {
            resultat.innerHTML = ''; // Supprime le contenu précédent
            retour.forEach(function(item) {
                var row = document.createElement('tr');
                var keys = ["iddepense", "nom"];
                keys.forEach(function(key) {
                    var cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });

                var actionCell = document.createElement('td');
                var insertButton = document.createElement('button');
                insertButton.type = 'button';
                insertButton.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-icon');
                insertButton.innerHTML = '<i class="mdi mdi-plus"></i>';
                insertButton.addEventListener("click", function() {
                    insert('categorie');
                });

                var updateButton = document.createElement('button');
                updateButton.type = 'button';
                updateButton.classList.add('btn', 'btn-success', 'btn-rounded', 'btn-icon');
                updateButton.innerHTML = '<i class="mdi mdi-refresh"></i>';
                updateButton.addEventListener("click", function() {
                    update('categorie',item["iddepense"]);
                });

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-rounded', 'btn-icon');
                deleteButton.innerHTML = '<i class="mdi mdi-delete-forever"></i>';
                deleteButton.id = 'depense_button';
                deleteButton.addEventListener("click", function() {
                    supprimer(item["iddepense"], this.id);
                });

                actionCell.appendChild(insertButton);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                resultat.appendChild(row);
            });
        } else {
            resultat.innerHTML = "Aucune donnée trouvée";
        }
    });

    xhrLoadAchats.addEventListener("error", function(event) {
       alert("Erreur de chargement des publications");
    });

    xhrLoadAchats.open("GET", "../functions/tout.php?page=the_Depense", true);
    xhrLoadAchats.send();
}

function liste_salaires() {
    var xhrLoadAchats = new XMLHttpRequest();
    xhrLoadAchats.addEventListener("load", function(event) {
        var tableau = document.getElementById("resultat_salaire");
        var resultat = tableau.querySelector('tbody');
        var retour = JSON.parse(xhrLoadAchats.responseText);
        if (retour && retour.length > 0) {
            resultat.innerHTML = ''; // Supprime le contenu précédent
            retour.forEach(function(item) {
                var row = document.createElement('tr');
                var keys = ["idsalaire", "salaire","datesalaire"];
                keys.forEach(function(key) {
                    var cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });

                var actionCell = document.createElement('td');
                var insertButton = document.createElement('button');
                insertButton.type = 'button';
                insertButton.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-icon');
                insertButton.innerHTML = '<i class="mdi mdi-plus"></i>';
                insertButton.addEventListener("click", function() {
                    insert('salaire');
                });

                var updateButton = document.createElement('button');
                updateButton.type = 'button';
                updateButton.classList.add('btn', 'btn-success', 'btn-rounded', 'btn-icon');
                updateButton.innerHTML = '<i class="mdi mdi-refresh"></i>';
                updateButton.addEventListener("click", function() {
                    update('salaire',item["idsalaire"]);
                });

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-rounded', 'btn-icon');
                deleteButton.innerHTML = '<i class="mdi mdi-delete-forever"></i>';
                deleteButton.id = 'salaire_button';
                deleteButton.addEventListener("click", function() {
                    supprimer(item["idsalaire"], this.id);
                });

                actionCell.appendChild(insertButton);
                actionCell.appendChild(updateButton);
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                resultat.appendChild(row);
            });
        } else {
            resultat.innerHTML = "Aucune donnée trouvée";
        }
    });

    xhrLoadAchats.addEventListener("error", function(event) {
       alert("Erreur de chargement des publications");
    });

    xhrLoadAchats.open("GET", "../functions/tout.php?page=the_Salaire", true);
    xhrLoadAchats.send();
}

function deconnection(){
    localStorage.removeItem('iduser');
    window.location.href = "login.html";
}
// document.addEventListener("DOMContentLoaded", function() {
//     var listevar = document.getElementById("varietethe");
//     var listecuei = document.getElementById("idcueilleur");
//     var dec = document.getElementById("deconnection");
//     var forms = document.querySelectorAll('form');

//     forms.forEach(function(form) {
//         form.addEventListener('submit', function(event) {
//             event.preventDefault();
//             inserer(form);
//         });
//     });
//     dec.addEventListener('click',function (event) {
//         deconnection();
//     });
//     varietes(listevar);
//     cueilleurs(listecuei);
// });