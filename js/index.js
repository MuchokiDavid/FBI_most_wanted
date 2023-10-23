//array of items
let persons = [];

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
                        <h5 class="card-title">Name: ${data.items[index].title}</h5>
                        <ul style = "list-style: none">
                            <li>Place of birth: ${data.items[index].place_of_birth}</li>
                            <li>Publication: ${data.items[index].publication}</li>
                        </ul>
                        <button class="btn btn-sm btn-primary">View more</button>
                    </div>
                </div>
            </div>
            `
        }
   })
  .catch(error =>error);
}
fetchData()



})
