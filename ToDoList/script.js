const list = document.getElementById("list");
const body = document.getElementById("container");
const button = document.getElementById("add");
const input = document.getElementById("input");
const Datebox = document.getElementById("Datebox");
let index = localStorage.length;
let now = new Date();
let timer;
let date = now.toLocaleDateString("fr-FR");
let time = now.toLocaleTimeString("fr-FR"); 
let apiImageLinks = 'https://api.unsplash.com/photos/?client_id=xw0lAft6v21NTQwKbIgZ_PflmsoRRHdA0oBjmkQ8b38&query=yellow,white,grey,magenta,teal,orange,pink'
// console.log(date);

const Meteo = {
  // Declaration d'une variable qui contient les cles et valeurs des 3 quiz
  Overcast: "Couvert",
  Cloudy: "Nuageux",
  Sunny: "Ensoleille",
  Rain: "Pluie",
  Snow: "Neige",
  Fog: "Brouillard",
  Wind: "Vent",
  Storm: "Orage",
  Clear: "Clair",
};

function updateDateTime() {
  timer = setInterval(() => {
    now = new Date();
    date = now.toLocaleDateString("fr-FR");
    time = now.toLocaleTimeString("fr-FR");
    Datebox.innerHTML = `${date} ${time}`;
  }, 1000);
}


updateDateTime();
function loadtasks() {

  for (let i = 1; i <= localStorage.length; i++) {  
    console.log(localStorage.getItem(i))
    let li = document.createElement("li");
    li.innerHTML +=  localStorage.getItem(i)
   // console.log(`yes ${i}`)
    list.appendChild(li);
    let buttondelete = document.createElement("button");
    li.appendChild(buttondelete);
    buttondelete.innerHTML = "\u00d7";
    buttondelete.dataset.id = localStorage.key(i-1);
    //console.log(buttondelete.dataset.id)
    buttondelete.addEventListener("click", () => {
      //console.log(i)
    buttondelete.parentElement.remove();
    localStorage.removeItem(i);
  })
 
  } console.log(`finished`)
}

loadtasks();
// console.log(index);
const addTask = () => {
  index++;
  if (input.value === "") {
    alert("Please enter a task");
    return;
  }
  let li = document.createElement("li");
  li.innerHTML = input.value;
  let taskvalue = input.value;
  list.appendChild(li);

  let buttondelete = document.createElement("button");
  buttondelete.dataset.id = index
  li.appendChild(buttondelete);
  buttondelete.innerHTML = "\u00d7";
  buttondelete.addEventListener("click", () => {
  buttondelete.parentElement.remove();  
  console.log(buttondelete.dataset.id)
  localStorage.removeItem(buttondelete.dataset.id);
  })



  localStorage.setItem(index, input.value);
  input.value = "";
//   console.log(list);
};

button.addEventListener("click", addTask);
// console.log(list);

async function weather() {
  // Fonction qui va recuperer les donnes de la meteo de la ville
  let location = "Lyon";
  let key = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RWQ5ZQX23WTSV4DU6GZ2BCA25&elements=conditions,temp,sunrise,sunset&contentType=json`;
  const response = await fetch(key);
  if (response.status == "400") {
    // condition que si la ville n'est pas trouver la fonction retourne False
    return false;
  }
  const forecast = await response.json();
  sessionStorage.setItem("forecasts", JSON.stringify(forecast));

  console.log(forecast.currentConditions.conditions)
//   console.log(forecast.currentConditions.conditions);
  document.getElementById("Weather").innerHTML = `<hr> Lyon Meteo actuelle :
   ${forecast.currentConditions.conditions === undefined ? Meteo[forecast.currentConditions.conditions] : forecast.currentConditions.conditions}
   <br> Temp : ${forecast.currentConditions.temp} <br> Sunrise : ${
    forecast.currentConditions.sunrise
  } <br> Sunset : ${forecast.currentConditions.sunset}`;
  return forecast.currentConditions.conditions;
}

weather();

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.location.href = googleSearchUrl; // Redirige vers la recherche Google
    } else {
        alert('Veuillez entrer une recherche.');
    }
});
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click(); // Simule un clic sur le bouton
    }
});


document.getElementById('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add').click(); // Simule un clic sur le bouton
    }
});


async function fetchWallpapper() {

    // Fonction qui va recuperer les donnes de la meteo de la ville 
    const response = await fetch(apiImageLinks);
    if (response.status == "400") {
      // condition que si la ville n'est pas trouver la fonction retourne False
      return false;
    }
    const files = await response.json();
    sessionStorage.setItem("ImageDocs", JSON.stringify(files));
  //  let wallpapper = files[2].urls.regular;
  // document.body.style.backgroundImage = `url(${wallpapper})`;
  // document.body.style.backgroundRepeat = "no-repeat"
  // document.body.style.backgroundSize = "100%"

  }


  fetchWallpapper()

function changeImages(){
let indice = 0;
 indice = Math.floor(Math.random() * 9)
let intervalImage = setInterval(() => {
    indice = Math.floor(Math.random() * 9)
    console.log(indice)
let ImageJSON = sessionStorage.getItem("ImageDocs") 
backgroundImage = JSON.parse(ImageJSON)
let wallpapper = backgroundImage[indice].urls.regular;
    console.log(wallpapper);
  document.body.style.backgroundImage = `url(${wallpapper})`;
  document.body.style.backgroundRepeat = "no-repeat"
  document.body.style.backgroundSize = "100%";

    
},10000)}

//  changeImages()

