function setEvent(){
  
  for (let i = 0; i < document.querySelectorAll('.btn-book').length; i++) {
    document.querySelectorAll('.btn-book')[i].addEventListener('click',
      function () {
        fetch(`http://localhost:3000/cart/${this.parentNode.id}`)
        .then(response => response.json())
        .then(data =>{
          console.log("success");
          console.log(data)
          window.location.assign("./cart.html")
        })
      }
    );
   }
}

document.querySelector("#submit").addEventListener("click", e=>{
  //je crée une variable contenant les informations sur le voyage que l’on recherche
  const lookedForTrip={
    departure : document.querySelector("#departure-city").value,
    arrival : document.querySelector("#arrival-city").value,
    date : new Date(document.querySelector("#date-of-trip").value)
  }

  //maintenant, je vais solliciter la route qui nous intéresse

  fetch("http://localhost:3000/trips",{
    method : "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(lookedForTrip)})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // document.querySelector("#default").style.display = "none";
      if(data.result === false){
        document.querySelector("#no-train").style.display = "flex"
        document.querySelector("#result-display-found").style.display = "none";

      } else{
        document.querySelector("#default").style.display = "none";
        document.querySelector("#no-train").style.display = "none";
        document.querySelector("#result-display-found").style.display = "flex";
        document.querySelector("#result-display-found").innerHTML = "";
        const trips = data.allTrips;
        for(let i = 0; i< trips.length; i++){
          console.log(trips[i])
          const minutes = new Date(trips[i].date).getMinutes();
          document.querySelector("#result-display-found").innerHTML +=`
            <div class="available-trip" id="${trips[i]._id}">
              <p>${trips[i].departure} > ${trips[i].arrival}</p>
              <p> ${new Date(trips[i].date).getHours()}:${ minutes > 9 ? minutes : "0" + minutes} </p>
              <p>${trips[i].price}€</p>
              <button class="btn btn-book">Book</button>
            </div>
          `
        }
          setEvent();
      }
      
    })
  

})

