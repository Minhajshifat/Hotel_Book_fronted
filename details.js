const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("hotelId");
  fetch(`https://hotel-book-v78k.onrender.com/hotel/allhotels/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
  fetch(`https://hotel-book-v78k.onrender.com/hotel/reviews/?search=${param}`)
    .then((res) => res.json())
    .then((data) => HotelReview(data));
  
  
  
};
const displayDetails = (hotel) => {
  console.log(hotel);
  const parent = document.getElementById("detail");
  const div = document.createElement("div");
  div.classList.add("details-container");
  div.innerHTML = `
    <div class="hotel-img">
    <img src=${hotel.image} alt="" />
  </div>
  <div class="doc-info">
    <h1>Hotel Name : ${hotel.name} </h1>
    <h3>Location : ${hotel.address}</h3>
     <h4>Title : ${hotel.title}</h4>
    <p class="w-50">
    Description :
      ${hotel.description}
    </p>
    <p>Rooms : ${hotel.rooms}</p>

    <h4>Price: ${hotel.price} BDT</h4>
    <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
   Make Reservevation
  </button>
  </div>
    `;
  parent.appendChild(div);
};
const HotelReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review");
    const div = document.createElement("div");
    div.classList.add("card-body");
    div.innerHTML = `
                    <h5 class="card-title">${review.reviewer}</h5>
                    <p class="card-text">${review.body}</p>
                    <p class="card-text">${review.rating}</p>
                    <p class="card-text"><small class="text-muted">${review.created}</small></p>
          `;
    parent.appendChild(div);
  });
};
const handleAppointment = () => {
  const param = new URLSearchParams(window.location.search).get("hotelId");
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const checkin = document.getElementById("checkintime").value;
  const buyer_id = localStorage.getItem("buyer_id");
  console.log(buyer_id)
  const info = {
    booked_status: selected.value,
    check_in_time: checkin,
    cancel: false,
    buyer:buyer_id,
    hotel: param,
  };

  console.log(info);
  fetch("https://hotel-book-v78k.onrender.com/booked/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      
      console.log(data)
       
    });
};
getparams();