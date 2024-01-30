document.querySelector("#submit").addEventListener("click", e=>{
  const lookedForTrip={
    Departure : document.querySelector("#departure-city").value,
    Arrival : document.querySelector("#arrival-city").value,
    Date : new Date(document.querySelector("#date-of-trip").value)
  }

  console.log(lookedForTrip);

  

console.log(typeof lookedForTrip.Date)
})