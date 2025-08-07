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
    `https://api.airtable.com/v0/appYT2ZMsqk7JUGvF/IdleHand`,
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