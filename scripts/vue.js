var app = new Vue({
	el: '#app',  	
	data: {
	    members: [],
	    parties: [
	    	democrat = {
	    		name:"Democrat",
	    		value:"D",
	    	},
	    	independent = {
	    		name:"Independent",
	    		value:"ID",
	    	},
	    	republican = {
	    		name: "Republican",
	    		value: "R",
	    	},
	    ],
	    partiesValue:["D", "ID", "R",],
	    states: [],
	    url: undefined,
	  	init: {
			method: 'GET',
			headers: {
				"X-API-Key": "VH5Ah3AWIPG55lr4Zdm8EbSISDe0rJ1aKWCUGAqd"		
			},
		},
	},
	created(){
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
                console.log(app.members)
                app.states = app.membersStates(app.members)
				console.log(app.states)
            })
            .catch(function(error){
             console.log(error)
            })
        
    },
    methods:{
    	membersStates(array){
            let result = []
            array.forEach(member =>{
				if (result.indexOf(member.state) == -1){
					result.push(member.state)
				}
			})
            result.sort()
            
            return result
        }
    },
    computed:{
    	filterMembers(){
            return this.members.filter(
            	member => app.partiesValue.includes(member.party) && app.states.includes(member.state)
            )
        }
    }
});
