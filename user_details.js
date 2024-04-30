const loadAllAppointment = () => {
  const user_id_id = localStorage.getItem("user_id");
  fetch(
    `https://testing-8az5.onrender.com/appointment/?patient_id=${user_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.hotel}</td>
          
           
            <td>${item.check_in_time}</td>
            <td>${item.booked_status}</td>
           
           
            `;
        parent.appendChild(tr);
      });
    });
};

loadAllAppointment();