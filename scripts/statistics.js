function statistics (data){

	const members = data.results[0].members


	//.....Table1.....
	var	democrat = {
		number:0,
		votes:0,
		percentage:0
	}
	var independent = {
		number:0,
		votes:0,
		percentage:0
	}
	var republican = {
		number:0,
		votes:0,
		percentage:0
	}

	members.forEach (members => {
		if (members.party == "R") {
			republican.number += 1
			republican.votes += members.votes_with_party_pct
			republican.percentage = parseFloat(republican.votes/republican.number).toFixed(2)
		} 
		else if (members.party == "D") {
			democrat.number += 1
			democrat.votes += members.votes_with_party_pct
			democrat.percentage = parseFloat(democrat.votes/democrat.number).toFixed(2)
		}
		else if (members.party == "I"){
			independent.number += 1
			independent.votes += members.votes_with_party_pct
			independent.percentage = parseFloat(independent.votes/independent.number).toFixed(2)
		}
	})

	var table1 = document.getElementById ("table1")
	table1.innerHTML = `<tr>
							<td>Republican</td>
							<td>${republican.number}</td>
							<td>% ${republican.percentage}</td>
						</tr>
						<tr>
							<td>Democrat</td>
							<td>${democrat.number}</td>
							<td>% ${democrat.percentage}</td>
						</tr>
						<tr>
							<td>Independent</td>
							<td>${independent.number}</td>
							<td>% ${independent.percentage}</td>
						</tr>
						<tr>
							<td>Total</td>
							<td>${republican.number += independent.number += democrat.number}</td>
							<td></td>
						</tr>`

	//.....Table2.....

	//array con todos los porcentajes de votos perdidos de members
	var missedVotesPct = []
	members.forEach(members =>{
		missedVotesPct.push(members.missed_votes_pct)
		missedVotesPct.sort (function(a, b){return a - b})
	})

	//funcion para el 10%
	function tenPct (Pct, tenPctArray){
		var aux = []//array para el 10% sin repetidos
		var aux2 = []//array para el 10% con repetidos
		for (let i=0; i<Pct.length; i++){
			if (Pct[i] !=0 && aux.length < Pct.length * 10 / 100){
				aux.push (Pct[i])//mete 10% en aux
			}
			if (Pct[i] !=0 && Pct[i] == aux[aux.length-1]){
				aux2.push (Pct[i])//suma repetidos al aux en aux2
			}
		}
	//funcion para obtener miembros correspondientes a array2
		var aux3 = members.filter (function (members) {
			for (var i = 0; i < aux2.length; i++) {
				if (members.missed_votes_pct == aux2[i] || members.votes_with_party_pct == aux2[i]) {
					tenPctArray.push(members)
					return members
				}
			}
		})	
	}

	//10% de asistencia superior
	var mostEngaged = []
	tenPct (missedVotesPct, mostEngaged)
	mostEngaged.sort (function(a, b){return a.missed_votes_pct - b.missed_votes_pct})//ordena por porsentaje de votos perdidos
	console.log(mostEngaged)


	//.....Table3.....
	var missedVotesPctBottom = missedVotesPct.reverse()

	//10% de asistencia inferior
	var leastEngaged = []
	tenPct (missedVotesPctBottom, leastEngaged)
	leastEngaged.sort (function(a, b){return a.missed_votes_pct - b.missed_votes_pct}).reverse()//ordena por porsentaje de votos perdidos
	console.log(leastEngaged)


	//.....Table4.....
	//array con todos los porcentajes de votos con partido de members
	var votesPartyPct = []
	members.forEach(members =>{
		votesPartyPct.push(members.votes_with_party_pct)
		votesPartyPct.sort (function(a, b){return a - b})
	})

	//10% menos leales
	var leastLoyal = []
	tenPct (votesPartyPct, leastLoyal)
	leastLoyal.sort (function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct})

	console.log (leastLoyal)


	//.....table5.....
	var votesPartyPctTop = votesPartyPct.reverse()

	//10% mas leales
	var mostLoyal = []
	tenPct (votesPartyPctTop, mostLoyal)
	mostLoyal.sort (function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct}).reverse()
	console.log (mostLoyal)

	//.....Pasaje a tablas.....

	if (document.getElementById ("table2") && document.getElementById ("table3")) {
		var table2 = document.getElementById ("table2")
		var table3 = document.getElementById ("table3")

		// funcion tablas 2 y 3
		function tablesEngaged (tnumber, valores){
			for (var i = 0; i < valores.length; i++){
				let name = [valores[i].first_name, valores[i].middle_name, valores[i].last_name].join (" ")
				let row = tnumber.insertRow(-1)
				row.innerHTML = `<td>${name}</td>
						<td>${valores[i].missed_votes}</td>
						<td>% ${valores[i].missed_votes_pct}</td>`
			}
		}
		tablesEngaged (table2, mostEngaged)
		tablesEngaged (table3, leastEngaged)
	}
	else if (document.getElementById ("table4") && document.getElementById ("table5")) {
		var table4 = document.getElementById ("table4")
		var table5 = document.getElementById ("table5")

		//funcion tablas 4 y 5
		function tablesLoyal (tnumber, valores){
			for (var i = 0; i < valores.length; i++){
				let name = [valores[i].first_name, valores[i].middle_name, valores[i].last_name].join (" ")
				let votes_with_party = (valores[i].total_votes * valores[i].votes_with_party_pct / 100).toFixed()
				let row = tnumber.insertRow(-1)
				row.innerHTML = `<td>${name}</td>
						<td>${votes_with_party}</td>
						<td>% ${valores[i].votes_with_party_pct}</td>`
			}
		}
		tablesLoyal (table4, leastLoyal)
		tablesLoyal (table5, mostLoyal)
	}

}