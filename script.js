const button = document.querySelectorAll("button");
const complaintsInput = document.querySelector("input");
const BASE_URL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json";
const agency = "NYPD";
const section = document.querySelector(".ComplaintList");
const ul = document.createElement("ul");
ul.setAttribute("id", "list");
section.appendChild(ul);

// make local storage not to call api whenever click the buttons.
let manhattan = [];
let brooklyn = [];
let queens = [];
let bronx = [];
let statenIsland = [];

// when the browser is ready, get the data from the API. So, it will save up dataset when the browser load.
document.addEventListener("DOMContentLoaded", async function () {
  // Case sensitive. boroughs will set up inadvance. no need to get data from button id.
  let boroughs = ["MANHATTAN", "BROOKLYN", "QUEENS", "BRONX", "STATEN ISLAND"];

  for (let i = 0; i < boroughs.length; i++) {
    try {
      let response = await axios.get(
        `${BASE_URL}?borough=${boroughs[i]}&agency=${agency}`
      );
      //   console.log(boroughs[i]);
      console.log(response.data);

      // save a specific dataset for local data set.
      if (boroughs[i] === "MANHATTAN") manhattan.push(response.data);
      if (boroughs[i] === "BROOKLYN") brooklyn.push(response.data);
      if (boroughs[i] === "QUEENS") queens.push(response.data);
      if (boroughs[i] === "BRONX") bronx.push(response.data);
      if (boroughs[i] === "STATEN ISLAND") statenIsland.push(response.data);
    } catch (error) {
      console.log(error);
    }
  }
});

function showList(arr) {
  // IMPORTANT : it will reset every element inside ul, so won't keep adding at the one page.
  document.getElementById("list").innerHTML = "";
  console.log("arr", arr);
  //make ul where I can append items of the complaint list each loop in advance.
  // it will add description as titles of the list and
  for (let i = 0; i < arr.length; i++) {
    ul.innerHTML += `<li>${arr[i].descriptor}<button id ='${i}'class="police"> WHAT DID THE POLICE DO?</button></li>`;
    //save all resolution_description but hidden.
    ul.innerHTML += `<div id ='info' class = 'hidden'>${arr[i].resolution_description}</div>`;
  }

  // save info nodes in new variables
  const info = document.querySelectorAll("#info");
  new_button = document.querySelectorAll(".police");
  new_button.forEach((i) => {
    i.addEventListener("click", () => {
      //toggle classList "hidden"
      // i is whole html button, so i.id will give you the array index.
      info[i.id].classList.toggle("hidden");
    });
  });
}

//every buttons are clickable
button.forEach((i) => {
  i.addEventListener("click", async () => {
    let valueInput = complaintsInput.value;
    let borough = i.id;

    // depending on which button, it will declare the specific amount of dataset
    if (borough === "MANHATTAN") {
      let array = manhattan[0].slice(0, valueInput); // get the first 10 complaints 0~valueInput-1 range ** slice didn't take last index.
      console.log("manhattan slice: ", array);
      showList(array);
    }

    if (borough === "BROOKLYN") {
      let array = brooklyn[0].slice(0, valueInput);
      console.log("brooklyn slice: ", array);

      showList(array);
    }

    if (borough === "QUEENS") {
      let array = queens[0].slice(0, valueInput);
      console.log("queens slice: ", array);

      showList(array);
    }

    if (borough === "BRONX") {
      let array = bronx[0].slice(0, valueInput);
      console.log("bronx slice: ", array);
      console.log(array.length);
      showList(array);
    }

    if (borough === "STATEN ISLAND") {
      let array = statenIsland[0].slice(0, valueInput);
      console.log("staten island slice ", array);

      showList(array);
    }
  });
});

// IMPORTANT NOTE FOR IMPROVEMENT:
// Script.js is the different way to improve app.js way.
// it calls api whenever the browser loads.
