// document listener to preload the DOM before loading the scripts
document.addEventListener("DOMContentLoaded", ()=>{
    //fetchURL 
    const fetchURL = "https://api.fbi.gov/wanted/v1/list"
    
    //search box variables
    const searchBox = document.querySelector("#search-input");
    const searchBtn = document.querySelector("#search-button");

    // function to add data to home page columns
    async function fetchData(){
        await fetch(fetchURL)
        .then(response => response.json())
        .then(data =>{
            const fugitiveList = document.querySelector("#items")
            for(let index=0; index<data.items.length; index++){
                fugitiveList.innerHTML += `
                <div class="ml-1 my-2 col-4">
                    <div class="card" >
                        <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="${data.items[index].title}">
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
            await fetch(fetchURL)
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
                    const detailsDiv= document.createElement("div")//create div to hold individuals data
                    detailsDiv.className = "detailsDiv"
                    detailsDiv.innerHTML+= `
                        <div class="card w-75">
                            <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                            <div class="card-body" style = "color: black; text-align: left;">
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
                                    <li>Eyes Color: ${data.items[index].eyes}</li><br></ul>
                                    <p>Description: ${data.items[index].description}</p>
                                    <p>Remarks: ${data.items[index].remarks}</p>
                                    <p>Reward: ${data.items[index].reward_text}</p>
                                                                        
                                <a href="index.html"><button class= "backHome" >Back</button></a>
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
            await fetch(fetchURL)
            .then(response => response.json())
            .then(data =>{
            const btnMoreDetails= document.querySelectorAll(".viewMore")//select all buttons in the card body
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
                        <div class="card">
                            <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                            <div id= "body-card" class="card-body" style = "color: black; text-align: left;">
                                <h5 class="card-title">NAME: ${data.items[index].title}</h5>
                                <p>Subject: ${data.items[index].subjects[0]}</p>
                                <p>Publication: ${data.items[index].publication}</p><br>

                                <h6>Personal Information</h6>
                                <ul style = "list-style: none; width: 300px ">
                                    <li>Date of birth: ${data.items[index].dates_of_birth_used}</li>
                                    <li>Place of birth: ${data.items[index].place_of_birth}</li>
                                    <li>Gender: ${data.items[index].sex}</li> 
                                    <li>Race: ${data.items[index].race}</li>
                                    <li>Hair Color: ${data.items[index].hair}</li>
                                    <li>Eyes Color: ${data.items[index].eyes}</li><br></ul>
                                    <p>Description:<br> ${data.items[index].description}</p>
                                    <p>Remarks:${data.items[index].remarks}</p>
                                    <p>Reward: ${data.items[index].reward_text}</p>
                                    
                                <a href="index.html"><button class= "backHome" >Back</button></a>
                            </div>
                        </div>
                    `
                    outerDiv.appendChild(detailsDiv)
                })
            }
        })
        
    }
    fetchCriminalsButtonClick();

    //function to implement search
    async function searchBar(){
        await fetch(fetchURL)
        .then(response => response.json())
        .then(data =>{
            searchBtn.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent the form from submitting
                const searchQuery = searchBox.value.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
                for (let index = 0; index < data.items.length; index++) {
                    const itemName = data.items[index].title.toLowerCase();
                        if(itemName.includes(searchQuery)){
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
                            <div class="card">
                                <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                                <div id= "body-card" class="card-body" style = "color: black; text-align: left;">
                                    <h5 class="card-title">NAME: ${data.items[index].title}</h5>
                                    <p>Subject: ${data.items[index].subjects[0]}</p>
                                    <p>Publication: ${data.items[index].publication}</p><br>

                                    <h6>Personal Information</h6>
                                    <ul style = "list-style: none; width: 300px ">
                                        <li>Date of birth: ${data.items[index].dates_of_birth_used}</li>
                                        <li>Place of birth: ${data.items[index].place_of_birth}</li>
                                        <li>Gender: ${data.items[index].sex}</li> 
                                        <li>Race: ${data.items[index].race}</li>
                                        <li>Hair Color: ${data.items[index].hair}</li>
                                        <li>Eyes Color: ${data.items[index].eyes}</li><br></ul>
                                        <p>Description:<br> ${data.items[index].description}</p>
                                        <p>Remarks:${data.items[index].remarks}</p>
                                        <p>Reward: ${data.items[index].reward_text}</p>
                                        
                                    <a href="index.html"><button class= "backHome" >Back</button></a>
                                </div>
                            </div>
                        `
                        outerDiv.appendChild(detailsDiv)
                    }
                }
            });
        })
    }
    searchBar()
})
