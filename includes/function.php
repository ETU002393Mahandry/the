<?php
    header("Content-Type: application/json");
    function recupererDonnees($bdd, $table)
    {
        $sql="select*from %s;";
        $sql=sprintf($sql, $table);
        $result=mysqli_query($bdd,$sql);
        $donnees=array();
        while($data=mysqli_fetch_assoc($result))
        {
            $donnees[]=$data;
        }
        return $donnees;
    }

    function recupererUnDonnee($bdd, $table, $primarykey, $valueprimarykey)
    {
        $donnees = recupererDonnees($bdd, $table);
        foreach ($donnees as $donnee) {
            if ($donnee[$primarykey] == $valueprimarykey) {
                return $donnee;
            }
        }
        return null;
    }


    function insertion($base, $donnees, $nomtable){        
        $colonnes = implode(", ", array_keys($donnees));
        $valeurs = "'" . implode("', '", array_values($donnees)) . "'";

        $requete = "INSERT INTO $nomtable ($colonnes) VALUES ($valeurs)";
        $result = mysqli_query($base, $requete);
        echo "Insertion de $nomtable reussi.";
        
    }
    function supprimer($base, $donnees, $nomtable){
        $conditions = array();
        foreach ($donnees as $key => $value) {
            $conditions[] = "$key = '".$value."'";
        }
        $clauseWhere = implode(" AND ", $conditions);
        
        $requete = "DELETE FROM $nomtable";
        if (!empty($clauseWhere)) {
            $requete .= " WHERE $clauseWhere";
        }
        $result = mysqli_query($base, $requete);
        
        
    }
    

    function modification($base, $donnees, $nomtable, $condition) {
        $modification = "";
        foreach ($donnees as $colonne => $valeur) {
            $modification .= "$colonne='$valeur', ";
        }
        $modification = rtrim($modification, ", ");
        
        $condition_sql = "";
        foreach ($condition as $colonne => $valeur) {
            $condition_sql .= "$colonne = '$valeur' AND ";
        }
        $condition_sql = rtrim($condition_sql, " AND ");
        
        $requete = "UPDATE $nomtable SET $modification WHERE $condition_sql";
        $result = mysqli_query($base, $requete);
        
    }

    function login($bdd, $email, $mdp) {
        $user = recupererUnDonnee($bdd, "the_Utilisateur", "email", $email);
        if ($user == null) {
            throw new Exception("Email invalide ou inexistante.");
        }
        $mdpsha1 = sha1($mdp);
        if ($mdpsha1 != $user['mdp']) {
            throw new Exception("Mot de passe invalide.");
        }
        return $user;
    }

    function signup($bdd, $donnees) {
        if (!isset($donnees['nom']) || $donnees['nom'] == "") {
            throw new Exception("Nom invalide.");
        }
        if (!isset($donnees['email']) || $donnees['email'] == "") {
            throw new Exception("Email invalide.");
        }
        if (!isset($donnees['mdp']) || $donnees['mdp'] == "") {
            throw new Exception("Mot de passe invalide.");
        }
        
        $donneestable = recupererDonnees($bdd, "the_Utilisateur");
        for ($i=0; $i < count($donneestable); $i++) { 
            if($donneestable[$i]['email'] == $donnees['email']){
                throw new Exception("Email existant.");
            }
        }
        $donnees['mdp'] = sha1($donnees['mdp']);
        insertion($bdd, $donnees, "the_Utilisateur");
        $personne = recupererUnDonnee($bdd, "the_Utilisateur", "email", $donnees['email']);
        echo $personne['iduser'];
    }

    function decouperEnMois($dateDebut, $dateFin) {
        $tableau = array();
        $dateCourante = new DateTime($dateDebut);
        $temp = $dateFin;
        $dateFin = new DateTime($dateFin);
    
        // Ajoute la date de début au tableau
        $tableau[] = $dateDebut;
    
        while ($dateCourante <= $dateFin) {
            $mois = $dateCourante->format('m');
            $annee = $dateCourante->format('Y');
            $dernierJourDuMois = $dateCourante->format('t');
    
            // Crée la date de fin du mois
            $dateFinMois = $annee . '-' . $mois . '-' . $dernierJourDuMois;
    
            // Ajoute la date de fin du mois au tableau
            $tableau[] = $dateFinMois;
    
            // Passe au mois suivant
            $dateCourante->modify('+1 month');
    
            // Ajoute le début du mois suivant au tableau
            if ($dateCourante <= $dateFin) {
                $tableau[] = $dateCourante->format('Y-m-01');
            }
        }
    
        // Supprime la dernière valeur du tableau (date de fin)
        array_pop($tableau);
        $tableau[] = $temp;
    
        return $tableau;
    }
  
    function getPoidsTotalParMois($bdd, $dateDebut, $dateFin) {
        $requete = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE datecueillette BETWEEN '$dateDebut' AND '$dateFin'";
        $result = mysqli_query($bdd, $requete);
        $poidsTotal = 0;
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $poidsTotal = $row['poids_total'];
        } else {
            echo "Erreur lors de l'exécution de la requête : " . mysqli_error($bdd);
        }
        return $poidsTotal;
    }
   
    function getPoidsTotal($bdd, $dateDebut, $dateFin) {
        $dates = decouperEnMois($dateDebut, $dateFin);
        $total = 0;
        for ($i=0; $i < count($dates); $i+=2) { 
            $tempDebut = $dates[$i];
            $tempFin = $dates[$i + 1];
            $requete = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE datecueillette BETWEEN '$tempDebut' AND '$tempFin'";
            $result = mysqli_query($bdd, $requete);
            $poidsTotal = 0;
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                $poidsTotal = $row['poids_total'];
            } else {
                echo "Erreur lors de l'exécution de la requête : " . mysqli_error($bdd);
            }
            $total+= $poidsTotal;
        }
        return $total;
    }

    function getValide($mois, $resultat){
        for ($i=0; $i < count($resultat); $i++) { 
            if ($resultat[$i]['mois'] == $mois) {
                return $resultat[$i]['selectionner'];
            }
        }
    }

    function getMonthFromDate($dateString) {
        $dateParts = explode('-', $dateString);
        $month = (int)$dateParts[1];
        return $month;
    }

    function poidsRestantSurParcelle($bdd, $idParcelle, $datedebut, $dateFin) {
        $dates = decouperEnMois($datedebut, $dateFin);
        $poidsTotalCueilli = 0;
        $surface = 0;
        $rendement =0;
        $occupation =0;
        $requeteParcelle = "SELECT surface, v.occupation AS occupation, v.rendement AS rendement FROM the_Parcelle p INNER JOIN the_Variete v ON p.idvariete = v.idvariete WHERE idparcelle = $idParcelle";
        $resultatParcelle = mysqli_query($bdd, $requeteParcelle);
        if ($resultatParcelle) {
            $rowParcelle = mysqli_fetch_assoc($resultatParcelle);
            $surface = $rowParcelle["surface"];
            $rendement += $rowParcelle["rendement"];
            $occupation += $rowParcelle["occupation"];
        }
            
        $surface = hectaresEnMetresCarres($surface);

        for ($i=0; $i < count($dates); $i+=2) { 
           
            $tempDebut = $dates[$i];
            $tempFin = $dates[$i+1];
            $configuration = "SELECT * FROM the_Saison ORDER BY mois ASC limit 12";
            $resultatSaison = mysqli_query($bdd, $configuration);
            $donnees=array();
            while($data=mysqli_fetch_assoc($resultatSaison))
            {
                $donnees[]=$data;
            }
            $mois = getMonthFromDate($tempFin);
            $estSelectionne = getValide($mois, $donnees);
            if ($estSelectionne) {
                $poidsTotalCueilli = 0;
            }

            $requeteCueillette = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE idparcelle = $idParcelle AND datecueillette BETWEEN '$tempDebut' AND '$tempFin'";
            $resultatCueillette = mysqli_query($bdd, $requeteCueillette);

            if ($resultatCueillette) {
                $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
                $poidsTotalCueilli += $rowCueillette["poids_total"];
            }
        }
        
        $poidsEspere = ($surface * $rendement) / $occupation;
        $poidsRestant = $poidsEspere - $poidsTotalCueilli;
        return $poidsRestant;
    }

    
    function hectaresEnMetresCarres($valeur) {
        return $valeur * 10000; // 1 hectare = 10 000 mètres carrés
    }
    function metresCarresEnHectares($valeur) {
        return $valeur / 10000; // 1 mètre carre = 0,0001 hectare
    }
    
    function getPoidsRestant($bdd, $dateDebut, $dateFin) {
        $somme = 0;
        $parcelles = recupererDonnees($bdd, "the_Parcelle");
        for ($i=0; $i < count($parcelles); $i++) { 
            $somme = $somme + poidsRestantSurParcelle($bdd, $parcelles[$i]['idparcelle'], $dateDebut, $dateFin);
        }
        return $somme;
    }

    
    function getSalaireParCueilleur($bdd, $idcueilleur, $dateDebut, $dateFin) {
        
        $requeteCueillette = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE idcueilleur = $idcueilleur AND datecueillette BETWEEN '$dateDebut' AND '$dateFin'";
        $resultatCueillette = mysqli_query($bdd, $requeteCueillette);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $poidsTotalCueilli = $rowCueillette["poids_total"];
        } else {
            $poidsTotalCueilli = 0;
        }
        
        $requeteSalaire = "SELECT salaire FROM the_Salaire WHERE datesalaire <= '$dateFin' ORDER BY datesalaire DESC LIMIT 1";       
        $resultatParcelle = mysqli_query($bdd, $requeteSalaire);
        
        if (mysqli_num_rows($resultatParcelle) > 0) {
            $rowParcelle = mysqli_fetch_assoc($resultatParcelle);
            $salaire = $rowParcelle["salaire"];

        } else {
            $salaire = 0;
        }
        $salaire = $salaire + calculeBonus($bdd, $dateDebut, $dateFin, $idcueilleur);
        $salairetotale = $salaire * $poidsTotalCueilli;
        return $salairetotale;
    }


    function getDepenseTotale($bdd, $dateDebut, $dateFin) {

        $requeteCueillette = "SELECT SUM(prix) AS prix_total FROM the_CoutDepense  WHERE datecout BETWEEN '$dateDebut' AND '$dateFin'";
        $resultatCueillette = mysqli_query($bdd, $requeteCueillette);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $poidsTotalCueilli = $rowCueillette["prix_total"];
        } else {
            $poidsTotalCueilli = 0;
        }
        return $poidsTotalCueilli;
    }


    function getCoutRevient($bdd, $dateDebut, $dateFin) {
        $somme = 0;
        $cueilleurs = recupererDonnees($bdd, "the_Cueilleur");
        $dates = decouperEnMois($dateDebut, $dateFin);
        for ($j=0; $j < count($dates); $j+=2) { 
            $tempDebut = $dates[$j];
            $tempFin = $dates[$j+1];
            for ($i=0; $i < count($cueilleurs); $i++) { 
                $somme = $somme + getSalaireParCueilleur($bdd, $cueilleurs[$i]['idcueilleur'], $tempDebut, $tempFin);
            }        
        }
        
        $somme = $somme + getDepenseTotale($bdd, $dateDebut, $dateFin);

        $requeteCueillette = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE datecueillette BETWEEN '$dateDebut' AND '$dateFin'";
        $resultatCueillette = mysqli_query($bdd, $requeteCueillette);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $poidsTotalCueilli = $rowCueillette["poids_total"];
        } else {
            $poidsTotalCueilli = 1;
        }
        $parkilo = $somme / $poidsTotalCueilli;
        return $parkilo;
    }

    function getPourcents($bdd, $date){
        $configuration = "SELECT bonus, mallus FROM the_Infos WHERE dateinfo <= '$date' ORDER BY dateinfo DESC LIMIT 1";
        $resultatCueillette = mysqli_query($bdd, $configuration);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $bonus = $rowCueillette["bonus"];
            $mallus = $rowCueillette["mallus"];
        } else {
            $bonus = 0;
            $mallus = 0;
        }
        $data['bonus']=$bonus;
        $data['mallus']=$mallus;
        return $data;
    }
    function getMinimum($bdd, $date, $idcueilleur){
        $configuration = "SELECT minimal FROM the_Minimum WHERE idcueilleur=$idcueilleur AND dateminimum <= '$date' ORDER BY dateminimum DESC LIMIT 1";
        $resultatCueillette = mysqli_query($bdd, $configuration);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $bonus = $rowCueillette["minimal"];
        } else {
            $bonus = 0;
        }
        return $bonus;
    }

    function calculeBonus($bdd, $dateDebut, $dateFin, $idcueilleur){
        $data = getPourcents($bdd, $dateFin);
        $minimum = getMinimum($bdd, $dateFin, $idcueilleur);

        $requeteSalaire = "SELECT salaire FROM the_Salaire WHERE datesalaire <= '$dateFin' ORDER BY datesalaire DESC LIMIT 1";       
        $resultatParcelle = mysqli_query($bdd, $requeteSalaire);
        
        if (mysqli_num_rows($resultatParcelle) > 0) {
            $rowParcelle = mysqli_fetch_assoc($resultatParcelle);
            $salaire = $rowParcelle["salaire"];

        } else {
            $salaire = 0;
        }

        $requeteCueillette = "SELECT SUM(poids) AS poids_total FROM the_Cueillette WHERE idcueilleur = $idcueilleur AND datecueillette BETWEEN '$dateDebut' AND '$dateFin'";
        $resultatCueillette = mysqli_query($bdd, $requeteCueillette);
        
        if (mysqli_num_rows($resultatCueillette) > 0) {
            $rowCueillette = mysqli_fetch_assoc($resultatCueillette);
            $poidsTotalCueilli = $rowCueillette["poids_total"];
        } else {
            $poidsTotalCueilli = 0;
        }

        if($poidsTotalCueilli>$minimum){
            $valeurbonus = $salaire * $data['bonus']/100;
        }
        if($poidsTotalCueilli<$minimum){
            $valeurbonus = -1 * ($salaire * $data['mallus']/100);
        }
        else {
            $valeurbonus=0;
        }
        return $valeurbonus;
    }


    function getListePaiement($bdd, $dateDebut, $dateFin){
        $configuration = "SELECT * FROM the_Cueillette WHERE dateCueillette BETWEEN '$dateDebut' AND '$dateFin' ORDER BY dateCueillette ASC";
        $resultatSaison = mysqli_query($bdd, $configuration);
        $donnees=array();
        while($data=mysqli_fetch_assoc($resultatSaison))
        {
            $donnees[]=$data;
        }
        $resultat=array();
        for ($i=0; $i < count($donnees); $i++) { 
            $date = $donnees[$i]['datecueillette'];
            $idcueilleur = $donnees[$i]['idcueilleur'];
            $bonus = calculeBonus($bdd, $date, $date, $idcueilleur);
            if ($bonus>0) {
                $resultat[$i]['bonus']=$bonus;
                $resultat[$i]['mallus']=0;
            }
            else if ($bonus<0) {
                $resultat[$i]['bonus']=0;
                $resultat[$i]['mallus']=$bonus;
            }
            else{
                $resultat[$i]['bonus']=0;
                $resultat[$i]['mallus']=0;
            }
            $resultat[$i]['poids'] = $donnees[$i]['poids'];
            $resultat[$i]['date']=$date;
            $resultat[$i]['idcueilleur']=$idcueilleur;
            $resultat[$i]['salaire']=getSalaireParCueilleur($bdd, $idcueilleur, $date, $date);
        }
        return $resultat;
    }

    function getTotalPrixDeVenteParVariete($bdd, $idvariete, $dateDebut, $dateFin){
        $configuration = "SELECT vente FROM the_Variete WHERE idvariete=$idvariete";
        $configuration2 = "SELECT SUM(t.poids)  AS poids_total FROM the_Cueillette t JOIN the_Parcelle p ON t.idparcelle=p.idparcelle  WHERE p.idvariete=$idvariete AND t.dateCueillette BETWEEN '$dateDebut' AND '$dateFin'";
        $resultatParcelle = mysqli_query($bdd, $configuration);
        
        if (mysqli_num_rows($resultatParcelle) > 0) {
            $rowParcelle = mysqli_fetch_assoc($resultatParcelle);
            $vente = $rowParcelle["vente"];

        } else {
            $vente = 0;
        }
        $resultatParcelle2 = mysqli_query($bdd, $configuration2);
        
        if (mysqli_num_rows($resultatParcelle2) > 0) {
            $rowParcelle = mysqli_fetch_assoc($resultatParcelle2);
            $poids = $rowParcelle["poids_total"];

        } else {
            $poids = 0;
        }
        return $vente*$poids;
    }
    function getTotalPrixDeVente($bdd, $dateDebut, $dateFin){
        $configuration = "SELECT idvariete FROM the_Variete";
        $resultatParcelle = mysqli_query($bdd, $configuration);
        
        $resultatSaison = mysqli_query($bdd, $configuration);
        $donnees=array();
        while($data=mysqli_fetch_assoc($resultatSaison))
        {
            $donnees[]=$data;
        }
        $totale = 0;
        for ($i=0; $i < count($donnees); $i++) { 
            $totale+= getTotalPrixDeVenteParVariete($bdd, $donnees[$i]['idvariete'], $dateDebut, $dateFin);
        }
        return $totale;
    }

    function CalculBenefice($bdd, $dateDebut, $dateFin, $PrixDeVente, $depensetotale){
        $somme = 0;
        $cueilleurs = recupererDonnees($bdd, "the_Cueilleur");
        $dates = decouperEnMois($dateDebut, $dateFin);
        for ($j=0; $j < count($dates); $j+=2) { 
            $tempDebut = $dates[$j];
            $tempFin = $dates[$j+1];
            for ($i=0; $i < count($cueilleurs); $i++) { 
                $somme = $somme + getSalaireParCueilleur($bdd, $cueilleurs[$i]['idcueilleur'], $tempDebut, $tempFin);
            }        
        }
        
        $somme = $somme + $depensetotale;
        $benefice = $PrixDeVente - $somme;
        return $benefice;
    }

    function resultatGlobale($bdd, $dateDebut, $dateFin){
        $data = array();
        $data['poidsTotale']=getPoidsTotal($bdd, $dateDebut, $dateFin);
        $data['poidsRestant']=getPoidsRestant($bdd, $dateDebut, $dateFin);
        $data['totalVente']=getTotalPrixDeVente($bdd, $dateDebut, $dateFin);
        $data['totalDepense']=getDepenseTotale($bdd, $dateDebut, $dateFin);
        $data['benefice']=CalculBenefice($bdd, $dateDebut, $dateFin, $data['totalVente'], $data['totalDepense']);
        $data['coutRevientParKilo']= getCoutRevient($bdd, $dateDebut, $dateFin);
        return $data;
    }

    


    
?>