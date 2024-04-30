const loadhotels = (search) => {
    document.getElementById("hotels").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    console.log(search);
    fetch(
        `https://hotel-book-v78k.onrender.com/hotel/allhotels/?search=${search ? search : ""}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                document.getElementById("spinner").style.display = "none";
                document.getElementById("nodata").style.display = "none";
                displyhotels(data.results);
                console.log(data.results);
                
                console.log(data.total_pages);
            } else {
                document.getElementById("hotels").innerHTML = "";
                document.getElementById("spinner").style.display = "none";
                document.getElementById("nodata").style.display = "block";
            }
        });
};
const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadhotels(value);
};


const displyhotels = (hotels) => {
    hotels?.forEach((hotel) => {
        const parent = document.getElementById("hotels");
        const div = document.createElement("div");
        div.classList.add("hot-card");
        div.innerHTML = `
            <img class="hot-img" src=${hotel.image} alt="" />
            <h4>Hotel Name : ${hotel?.name}</h4>
            <h6>${hotel?.title}</h6>
            <p>
            Location:
              
              ${hotel?.address?.map((item) => {
                return `<button>${item}</button>`;
              })}
              </p>
              <p>
              ${hotel?.description.slice(0, 40) }
              </p>

            <p>Price : ${hotel?.price}</p>
            <button > <a target="_blank" href="hotel_details.html?hotelId=${hotel.id}">Details</a> </button>
        `;
        parent.appendChild(div);
    });
};

const loadDesignation = () => {
  fetch("https://hotel-book-v78k.onrender.com/hotel/category/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-deg");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadhotels('${item.address}')"> ${item.address}</li>
          `;
          parent.appendChild(li);
      });
    });
};


loadhotels();
loadDesignation();