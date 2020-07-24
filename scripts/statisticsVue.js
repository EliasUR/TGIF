var app = new Vue({
	el: '#app',
	data: {
	    url: undefined,
	  	init: {
			method: 'GET',
			headers: {
				"X-API-Key": "VH5Ah3AWIPG55lr4Zdm8EbSISDe0rJ1aKWCUGAqd"		
			},
		},
		members: [],
	    parties1: [
	    	democrat = {
	    		name: "Democrat",
	    		value: "D",
			},
			independent = {
				name: "Independent",
				value: "ID",			},
			republican = {
				name: "Republican",
				value: "R",
			},
	    ],
	    parties2: [
	    	democrat = {},
			independent = {},
			republican = {},
	    ],
	    missedVotesPct: [],
	    mostEngaged: [],
	    missedVotesPctBottom: [],
	    leastEngaged: [],
		votesPartyPct: [],
		leastLoyal: [],
		votesPartyPctTop: [],
		mostLoyal: [],
	},
	created (){
	document.getElementById("senate")?
	  	this.url = "https://api.propublica.org/congress/v1/113/senate/members.json"
	  	:this.url = "https://api.propublica.org/congress/v1/113/house/members.json"

	    fetch(this.url, this.init)
	    	.then(function(res){
	            if(res.ok){
	               	return res.json()
	            } else{
	                throw new Error(res.status)
	            }
	        })
            .then(function(json){
                app.members = json.results[0].members
                for (let i=0; i<app.parties1.length; i++){
                	app.parties2[i] = app.pMembers(app.parties1[i].name, app.parties1[i].value)
                }
               	
               	if (document.getElementById("table2") && document.getElementById("table3")) {
	                app.members.forEach(member =>{
						app.missedVotesPct.push(member.missed_votes_pct)
						app.missedVotesPct.sort (function(a, b){return a - b})
					})
					app.tenPct(app.missedVotesPct, app.mostEngaged)
					app.mostEngaged.sort (function(a, b){return a.missed_votes_pct - b.missed_votes_pct})


					app.missedVotesPctBottom = app.missedVotesPct.reverse()
					app.tenPct (app.missedVotesPctBottom, app.leastEngaged)
					app.leastEngaged.sort (function(a, b){return a.missed_votes_pct - b.missed_votes_pct}).reverse()
				}else if (document.getElementById("table4") && document.getElementById("table5")) {
	                app.members.forEach(member =>{
						app.votesPartyPct.push(member.votes_with_party_pct)
						app.votesPartyPct.sort (function(a, b){return a - b})
					})
					app.tenPct(app.votesPartyPct, app.leastLoyal)
					app.leastLoyal.sort (function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct})


					app.votesPartyPctTop = app.votesPartyPct.reverse()
					app.tenPct (app.votesPartyPctTop, app.mostLoyal)
					app.mostLoyal.sort (function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct}).reverse()

					for (var i = 0; i < app.leastLoyal.length; i++){
						app.leastLoyal[i].votes_with_party = (app.leastLoyal[i].total_votes * app.leastLoyal[i].votes_with_party_pct / 100).toFixed()
						app.leastLoyal[i].votes_with_party = + app.leastLoyal[i].votes_with_party
					}
					for (var i = 0; i < app.mostLoyal.length; i++){
						app.mostLoyal[i].votes_with_party = (app.mostLoyal[i].total_votes * app.mostLoyal[i].votes_with_party_pct / 100).toFixed()
						app.mostLoyal[i].votes_with_party = + app.mostLoyal[i].votes_with_party
					}
				}
            })
            .catch(function(error){
              	console.log(error)
            })
	},
	methods:{
		pMembers(party, letra){
			let aux ={
				name: party,
				value: letra,
				nMembers:0,
				percentage:0,
			}
			let aux2 = 0
			this.members.forEach (member => {
				if (member.party == letra) {
					aux.nMembers += 1
					aux2 += member.votes_with_party_pct
					aux.percentage = parseFloat(aux2/aux.nMembers).toFixed(2)
				} 
			})
			aux.percentage = (+ aux.percentage)
			return aux
		},
		tenPct (Pct, tenPctArray){
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
			var aux3 = app.members.filter (function (member) {
				for (var i = 0; i < aux2.length; i++) {
					if (member.missed_votes_pct == aux2[i] || member.votes_with_party_pct == aux2[i]) {
						tenPctArray.push(member)
						return member
					}
				}
			})	
		}
	}
})
	  		