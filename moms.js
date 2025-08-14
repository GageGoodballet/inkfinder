"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("shops");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patbCX1P9y8lcLCyn.21fdeb86ff777ea7aa6539e51cbd21fd3ecdd82e22da668f43278039161cb122`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appYT2ZMsqk7JUGvF/MomsBodyShop`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array


      
      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let image = data.records[i].fields["Image"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        

        newHtml += `
        
         <div class="card" style="width: 18rem;">
  <a href="idlehand.html?id=${data.records[i].id}">${
          image
            ? `<img class="card-img-top rounded" alt="${name}" src="${image[0].url}">`
            : ``
        }
          </a>
  <div class="card-body">
    <p class="card-text">${name}</p>
  </div>
</div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}
// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("shops");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patbCX1P9y8lcLCyn.21fdeb86ff777ea7aa6539e51cbd21fd3ecdd82e22da668f43278039161cb122`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appYT2ZMsqk7JUGvF/IdleHand/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let image = data.fields["Image"];
      let name = data.fields["Name"];
      let style = data.fields["Style"];
      let instagram = data.fields["Instagram"];
      let email = data.fields["Email"];
      let website = data.fields["Website"];
      
      let newHtml = `
        <div class="card mb-3" style="max-width: 100rem;">
  <div class="row g-0">
    <div class="col-md-4">
     ${
          image
            ? `<img class="img-fluid rounded-start" alt="${name}" src="${image[0].url}">`
            : ``
        }
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title artist">${name}</h5>
        <p class="card-text">Style: ${style}</p>
        <a href="https://www.instagram.com/${instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
      </div>
    </div>
  </div>
</div>
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}


// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
 
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
 
  getAllRecords(); // no id given, fetch summaries
}