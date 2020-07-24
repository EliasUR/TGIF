//.....main.js.....

function main(data){


const members = data.results[0].members
const tbody = document.querySelector("tbody")


var marcados = document.getElementsByTagName("input")
let states = []


members.forEach(members =>{
	if (states.indexOf(members.state) == -1){
		states.push(members.state)
	}
})
states.sort()
for (let i = 0; i<states.length; i++){
	var select = document.querySelector("select")
	select.innerHTML += `<option value="${states[i]}">${states[i]}</option>`
}


function filtro(){
	document.querySelector("tbody").innerHTML = ""
	var filtrados = members.filter(function(members){
		for (var i = 0; i< marcados.length; i ++){
			if ((members.state==select.value || select.value=="all") && marcados[i].checked==true && marcados[i].value==members.party) {
				let full_name = [members.first_name, members.middle_name, members.last_name].join (" ")
				let row = tbody.insertRow(-1)
				let name = `<a href="${members.url}">${full_name}</a>`
				if (members.url === "") {
				name = full_name
				}
				row.innerHTML = (`<td>${name}</td>
				<td>${members.party}</td>
				<td>${members.state}</td>
				<td>${members.seniority}</td>
				<td>${"%"} ${members.votes_with_party_pct}</td>`)
				return members

			}
		}
	})
}
filtro ()
select.addEventListener("change",filtro)
for (var i = 0; i<marcados.length; i++) {
	marcados[i].addEventListener("click", filtro)
}

}