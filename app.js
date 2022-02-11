// get some html elements 
const button = document.querySelectorAll("button")
const complaintsInput = document.querySelector("input")
const BASE_URL = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json'
let borough;
console.log(button);

button.forEach(i => {
    i.addEventListener('click',async () =>{
    valueInput = complaintsInput.value;
       borough = i.id 
       console.log(borough)
       try{
        let response = await axios.get(
            `${BASE_URL}?borough=${borough}`
        )
        // save json array depending on
        let boroughTem = response.data
        let boroughInfo = [];
        for(let i =0; i < valueInput ; i++){
            boroughInfo.push(boroughTem[i])
        }
        console.log(boroughInfo)
        console.log(response)
    } catch (error){
        console.log(error)
    }
    })
})

