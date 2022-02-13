// get some html elements
const button = document.querySelectorAll("button");
const complaintsInput = document.querySelector("input");
const BASE_URL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json";
let borough;
const agency = "NYPD";

// set html element to show the list
const section = document.querySelector(".ComplaintList");
const ul = document.createElement("ul");
ul.setAttribute("id", "list");
section.appendChild(ul);

function showList(arr) {
  // IMPORTANT : it will reset every element inside ul, so won't keep adding at the one page.
  document.getElementById("list").innerHTML = "";
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
    // takes a input value
    valueInput = complaintsInput.value;
    // takes a specific borough user clicked.
    borough = i.id;
    console.log(borough);
    try {
      let response = await axios.get(
        `${BASE_URL}?borough=${borough}&agency=${agency}`
      );
      // save json array depending on valueInput, defaul value is 10.
      console.log(response);

      // save whole 1000 array lists
      let boroughTem = response.data;
      let boroughInfo = [];
      // depending on input, it will assign the list users want to see.
      for (let i = 0; i < valueInput; i++) {
        boroughInfo.push(boroughTem[i]);
      }

      console.log(boroughInfo);
      // call function which render the complaints list.
      console.log(section);
      showList(boroughInfo);
    } catch (error) {
      console.log(error);
    }
  });
});

// IMPORTANT NOTE FOR IMPROVEMENT:
// I need to care about the network. Right now, whenever I click the button
// it does api calls and get 1000 items (too much). It means depending on network condition, the information cannot show up well.
