function displayCart(){

  fetch("http://localhost:3000/cart")
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      if(data.result === true){
        document.querySelector("#content-empty").style.display = "none";
        document.querySelector("#content-full").style.display = "flex";
        document.querySelector("#cart-display").innerHTML = "";
        let totalCart =0;
        for(let i = 0; i < data.trips.length; i++){
          const trip = data.trips[i].trip
          totalCart += Number(trip.price);
          const minutes = new Date(trip.date).getMinutes()
          console.log(trip)
          document.querySelector("#cart-display").innerHTML+=`
            <div class="trip-in-cart" id="${data.trips[i]._id}">
              <p>${trip.departure} > ${trip.arrival}</p>
              <p> ${new Date(trip.date).getHours()}:${ minutes > 9 ? minutes : "0" + minutes} </p>
              <p>${trip.price}€</p>
              <button class="btn btn-remove">X</button>
            </div>
          `
        }
        document.querySelector("#price").textContent=`${totalCart}`;
        setDeleteTripFromCart();
      } else{
        document.querySelector("#content-empty").style.display = "flex";
        document.querySelector("#content-full").style.display = "none";
      }
    })


}  


//mécanique pour effacer un voyage

function setDeleteTripFromCart(){
  for (let i = 0; i < document.querySelectorAll('.btn-remove').length; i++) {
    document.querySelectorAll('.btn-remove')[i].addEventListener('click',
      function () {
        fetch(`http://localhost:3000/cart/${this.parentNode.id}`,{
          method:"DELETE",
          headers:{"Content-Type" : "application/json"}
        })
        .then(response => response.json())
        .then(data =>console.log(data))
        displayCart();
      }

    );
   }
}

displayCart();