// document listener to preload the DOM before loading the scripts
document.addEventListener("DOMContentLoaded", ()=>{
    // function to fetch data
async function fetchData(){
    fetch('https://api.fbi.gov/wanted/v1/list')
    .then(response => response.json())
    .then(data =>{
        console.log(data.items)
        const fugitiveList = document.querySelector("#items")
        for(let index=0; index<data.items.length; index++){
            fugitiveList.innerHTML += `
            <div class="ml-1 my-2 col-4">
                <div class="card" >
                    <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                    <div id= "card-body" class="card-body" style = "color: black; text-align: left;">
                        <h5 class="card-title">NAME: ${data.items[index].title}</h5>
                        <ul style = "list-style: none; text-align: left">
                            <li>Publication: ${data.items[index].publication}</li>
                        </ul>
                        <button id= "moreDetails" class= "viewMore">View details</button>
                    </div>
                </div>
            </div>
            `
        }
    })
    .catch(error =>error);
}
fetchData()

//function to fetch data and put name on a list menu
async function fetchCriminals(){
        fetch('https://api.fbi.gov/wanted/v1/list')
        .then(response => response.json())
        .then(data =>{
        const ul = document.querySelector("#menuUl")
        for (let index = 0; index < data.items.length; index++) {
            const listDiv = document.createElement("div")
            listDiv.className = "listDiv"
            ul.appendChild(listDiv)
            const list = document.createElement("li")
            list.textContent= data.items[index].title;
            list.className = "list"
            listDiv.addEventListener("click", ()=>{
                const outerCard= document.querySelector("#outerDiv")
                //create card to display criminals details(
                const outerDiv= document.querySelector("#outerouterdiv")
                //remove division holding all lists
                if (outerCard) {
                    outerCard.style.display = 'none'; // remove outer card to display individual card
                }
                //remove existing card of each item on the list
                const existingCard = outerDiv.querySelector(".detailsDiv")
                if(existingCard){
                    outerDiv.removeChild(existingCard)
                }
                const detailsDiv= document.createElement("div")
                detailsDiv.className = "detailsDiv"
                detailsDiv.innerHTML+= `
                    <div class="card" style= "width: 100%">
                        <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                        <div id= "card-body" class="card-body" style = "color: black; text-align: left;">
                            <h5 class="card-title">NAME: ${data.items[index].title}</h5>
                            <p>Subject: ${data.items[index].subjects[0]}</p>
                            <p>Publication: ${data.items[index].publication}</p><br>

                            <h6>Personal Information</h6>
                            <ul style = "list-style: none">
                                <li>Date of birth: ${data.items[index].dates_of_birth_used}</li>
                                <li>Place of birth: ${data.items[index].place_of_birth}</li>
                                <li>Gender: ${data.items[index].sex}</li> 
                                <li>Race: ${data.items[index].race}</li>
                                <li>Hair Color: ${data.items[index].hair}</li>
                                <li>Eyes Color: ${data.items[index].eyes}</li>
                                <li>Description: ${data.items[index].description}</li>
                                <li>Remarks: ${data.items[index].remarks}</li>
                                </ul>
                                
                            <a href="index.html"><button class= "backHome" >Home</button></a>
                        </div>
                    </div>
                `
                outerDiv.appendChild(detailsDiv)
                
                
            })
            listDiv.appendChild(list)
        }
    })
}
fetchCriminals()

//function to add event listener to view more buttons

async function fetchCriminalsButtonClick(){
        fetch('https://api.fbi.gov/wanted/v1/list')
        .then(response => response.json())
        .then(data =>{
        const btnMoreDetails= document.querySelectorAll(".viewMore")
        for (let index = 0; index < data.items.length; index++) {
            
            btnMoreDetails[index].addEventListener("click", ()=>{
                const outerCard= document.querySelector("#outerDiv")
                //create card to display criminals details(
                const outerDiv= document.querySelector("#outerouterdiv")
                //remove division holding all lists
                if (outerCard) {
                    outerCard.style.display = 'none'; // remove outer card to display individual card
                }
                //remove existing card of each item on the list
                const existingCard = outerDiv.querySelector(".detailsDiv")
                if(existingCard){
                    outerDiv.removeChild(existingCard)
                }
                const detailsDiv= document.createElement("div")
                detailsDiv.className = "detailsDiv"
                detailsDiv.innerHTML= `
                    <div class="card" style= "width: 100%">
                        <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                        <div id= "card-body" class="card-body" style = "color: black; text-align: left;">
                            <h5 class="card-title">NAME: ${data.items[index].title}</h5>
                            <p>Subject: ${data.items[index].subjects[0]}</p>
                            <p>Publication: ${data.items[index].publication}</p><br>

                            <h6>Personal Information</h6>
                            <ul style = "list-style: none">
                                <li>Date of birth: ${data.items[index].dates_of_birth_used}</li>
                                <li>Place of birth: ${data.items[index].place_of_birth}</li>
                                <li>Gender: ${data.items[index].sex}</li> 
                                <li>Race: ${data.items[index].race}</li>
                                <li>Hair Color: ${data.items[index].hair}</li>
                                <li>Eyes Color: ${data.items[index].eyes}</li>
                                <li>Description: ${data.items[index].description}</li>
                                <li>Remarks: ${data.items[index].remarks}</li>
                                </ul>
                                
                            <a href="index.html"><button class= "backHome" >Home</button></a>
                        </div>
                    </div>
                `
                outerDiv.appendChild(detailsDiv)
            })
        }
    })
}

fetchCriminalsButtonClick();


})
