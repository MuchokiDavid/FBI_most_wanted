//array of items
let persons = [];

document.addEventListener("DOMContentLoaded", ()=>{
    // function to fetch data
async function fetchData(){
    fetch('https://api.fbi.gov/wanted/v1/list')
  .then(response => response.json())
   .then(data =>{
        console.log(data.items[0])
        const fugitiveList = document.querySelector("#items")
        for(let index=0; index<data.items.length; index++){
            fugitiveList.innerHTML += `
            <div class="ml-1 my-2 col-4">
                <div class="card" >
                    <img src="${data.items[index].images[0].original}" height="250px" class="card-img-top image" alt="...">
                    
                    <div class="card-body" style = "color: black">
                        <h5 class="card-title">${data.items[index].race}</h5>
                        <p>${data.items[index].description}</p>
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
