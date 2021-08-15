var tabNumeros = [
	"77 867 34 56",
	"78 567 45 89",
	"77 123 45 67",
	"33 895 57 65",
	"70 100 12 13"
]

var tabSoldes = [
	5000,
	12500.55,
	100000,
	24500,
	5690
]

var tabCodes = [
	"0101",
	"1278",
	"0009",
	"3456",
	"6798"
]
var nbreNum = 5;

var numCourant = "";

var messageCodeSecuriteIncorrect 
var message_au_revoir 
var message_retour_menu_principal 
var message_solde 
var message_entrer_code_securite
var message_montant_a_transferer
var message_solde_insuffisant 
var message_numero_qui_recoit_transfert 
var message_succes_transfert 
var message_ancien_code 
var message_nouveau_code 
var message_option_inconnu 
var message_option_changer_code_secret 
var message_confirmer_nouveau_code
var message_code_modifie_avec_succes 
var message_deux_codes_incorrects 

var message_option_solde = "1 Solde de mon compte"
var message_option_Transfert = "2 Transfert d'argent"
var message_option_paiement = "3 Paiement de facture"
var message_option_options = "4 Options"
var message_menu = "Tapez le numero du service choisi"
var message_transfert_numero_incorrect
	

function changerLangue(langue_choisie) {
	let url;
	if(langue_choisie == "En")
		url = "donnees_en.txt"
	else if (langue_choisie == "Wo")
		url = "donnees_wo.txt"
	else if(langue_choisie == "Fr")
		url = "donnees_fr.txt"
 
	$.ajax({
            url : url,
            dataType: "text",
            async:false,  
            success : function (data) {
                let tabMessages = data.split("\n")
                messageCodeSecuriteIncorrect = tabMessages[0] + " "
				message_au_revoir = tabMessages[1] + " "
				message_retour_menu_principal = tabMessages[2] + " "
				message_solde = tabMessages[3] + " "
				message_entrer_code_securite = tabMessages[4] + " "
				message_montant_a_transferer = tabMessages[5] + " "
				message_solde_insuffisant = tabMessages[6] + " "
				message_numero_qui_recoit_transfert = tabMessages[7] + " "
				message_succes_transfert = tabMessages[8] + " "
				message_ancien_code = tabMessages[9] + " "
				message_nouveau_code = tabMessages[10] + " "
				message_option_inconnu = tabMessages[11] + " "
				message_option_changer_code_secret = tabMessages[12] + " "
				message_confirmer_nouveau_code = tabMessages[13] + " "
				message_code_modifie_avec_succes = tabMessages[14] + " "
				message_deux_codes_incorrects = tabMessages[15] + " "
				message_option_solde = tabMessages[16] + " "
				message_option_Transfert = tabMessages[17] + " "
				message_option_paiement = tabMessages[18] + " "
				message_option_options = tabMessages[19] + " "
				message_menu = tabMessages[20] + " "
				message_transfert_numero_incorrect = tabMessages[21] + " "
            }
    });
}


function main() {
		let select_numero = document.getElementById('num')
		let indice_option_selectionne = select_numero.selectedIndex
		let option = select_numero.options[indice_option_selectionne]
		numCourant =  option.text

		let select_langue = document.getElementById('langue')
		let indice_option_langue = select_langue.selectedIndex
		let langue = select_langue.options[indice_option_langue].text
		changerLangue(langue)


		let num_service = menu()

		if(num_service == "1") {
			afficherSolde()	
		}
		else if(num_service == "2") {
			transfertArgent()
		}
		else if(num_service == "4") {
			options()
		}
	}

function etapeSuivant() {
	let reponse = confirm(message_retour_menu_principal) 
	if(reponse == true) {
		main()
	} else {
		alert(message_au_revoir)
		document.body.innerHTML = ""
	}
}



function getIndiceNumCourant(num) {
	for(var i = 0; i < tabNumeros.length; i++) {
		if(tabNumeros[i] == num) {
			return i;
		}
	}
}

function afficherSolde() {
	let indice = getIndiceNumCourant(numCourant)
	let message = message_solde + tabSoldes[indice]
	let count = 1
	var code
	do {
		code = prompt(message_entrer_code_securite)
		if(code === tabCodes[indice]) {
				alert(message)
				etapeSuivant()
				break	
		} else {
			count++
		}
	}while(count <= 3)

	if (count > 3) {
		alert(messageCodeSecuriteIncorrect)
		document.body.innerHTML = ""
	}

}

function transfertArgent() {
	let indice = getIndiceNumCourant(numCourant)
	let montant = parseFloat(prompt(message_montant_a_transferer))
	let frais = montant * 0.01
	if(tabSoldes[indice] - montant - frais < 0) {
		alert(message_solde_insuffisant)
		etapeSuivant()
	} else {
		let count0 = 1
		let numAEnvoyer 
		let numCorrect = false
		do {
			numAEnvoyer = prompt(message_numero_qui_recoit_transfert)
			for(var i = 0; i < nbreNum; i++) {
				if(tabNumeros[i] == numAEnvoyer && numAEnvoyer != numCourant) {
					numCorrect = true
					tabSoldes[i] += montant;
					break;
				}
			}
			if(numCorrect == true)
					break
			count0++
		}while(count0 <= 3)

		if(count0 > 3) {
			alert(message_transfert_numero_incorrect)
			etapeSuivant()
		}		
		let count = 1
		var code
		do {
			code = prompt(message_entrer_code_securite )
			if(code === tabCodes[indice]) {
					tabSoldes[indice] -=   montant + frais
					alert(message_succes_transfert)
					etapeSuivant()
					break	
			} else {
				count++
			}
		}while(count <= 3)

		if (count > 3) {
			alert(messageCodeSecuriteIncorrect)
			document.body.innerHTML = ""
		}	
	}
}

function options() {
	let indice = getIndiceNumCourant(numCourant)
	message = message_option_changer_code_secret
	let typeOption = prompt(message)
	if(typeOption != "1") {
		alert(message_option_inconnu)
		etapeSuivant()
	} else {
		let count = 0
		var ancienCode
		do {
			ancienCode = prompt(message_ancien_code)
			if(ancienCode === tabCodes[indice]) {
				break;

			} else {
				count++
			}
		}while(count <= 3)

		if (count > 3) {
			alert(messageCodeSecuriteIncorrect)
			document.body.innerHTML = ""
		} else {
			let count2 = 1
			var newCode1 = prompt(message_nouveau_code)
			do {
				var newCode2 = prompt(message_confirmer_nouveau_code)	
				if(newCode1 != newCode2) 
					count2++
			}while(newCode1 != newCode2 && count2 <= 3);
			if(newCode1 == newCode2) {
				tabCodes[indice] = newCode1
				alert(message_code_modifie_avec_succes)
				etapeSuivant()
			} else {
				alert(message_deux_codes_incorrects)
				document.body.innerHTML = ""
			}
		}
	}
}

function menu() {
	let messageMenu = ""
	messageMenu += message_menu + "\n"
	messageMenu +=  "---------" + numCourant + "-----------\n"
	messageMenu += message_option_solde + "\n"
	messageMenu += message_option_Transfert + "\n"
	messageMenu += message_option_paiement + "\n"
	messageMenu += message_option_options + "\n"
	var num_service = prompt(messageMenu);
	return num_service
}	



