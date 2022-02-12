// get some html elements 
const button = document.querySelectorAll("button")
const complaintsInput = document.querySelector("input")
const BASE_URL = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json'
let borough;
const agency = "NYPD"
const section = document.querySelector(".ComplaintList")
const ul = document.createElement("ul")
section.appendChild(ul)
console.log(button)


function showList(arr){
    //make ul where I can append items of the complaint list each loop in advance. 
    // it will add description as titles of the list and 
    for(let i =0; i<arr.length;i++){
        ul.innerHTML += `<li>${arr[i].descriptor}<button id ='${i}'class="police"> WHAT DID THE POLICE DO?</button></li>`
        //save all resolution_description but hidden.
        ul.innerHTML += `<div id ='info' class = 'hidden'>${arr[i].resolution_description}</div>`
    }

    // save info nodes in new variables 
    const info = document.querySelectorAll('#info')
    new_button = document.querySelectorAll('.police')
    new_button.forEach(i =>{
        i.addEventListener('click',()=>{
            //toggle classList "hidden"
            // i is whole html button, so i.id will give you the array index.     
            info[i.id].classList.toggle('hidden')
        })
    })
}

//every buttons are clickable 
button.forEach(i => {
    i.addEventListener('click',async () =>{
  
    valueInput = complaintsInput.value;
       borough = i.id 
       try{
        let response = await axios.get(
            `${BASE_URL}?borough=${borough}&agency=${agency}`
        )
        // save json array depending on valueInput, defaul value is 10.
        let boroughTem = response.data
        let boroughInfo = [];
        for(let i =0; i < valueInput ; i++){
            boroughInfo.push(boroughTem[i])
        }
        // call function which render the complaints list.
        showList(boroughInfo);
        console.log(boroughInfo)
        console.log(response)
    } catch (error){
        console.log(error)
    }
    })
})


