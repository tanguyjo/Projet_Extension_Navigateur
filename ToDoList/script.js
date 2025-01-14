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
// Cette fonction charge les tâches depuis le localStorage
function loadTasks() {
  console.log(`started`);
  console.log(localStorage);

  // Récupérer toutes les tâches depuis le localStorage
  let tasks = [];

  // Parcourir toutes les clés du localStorage et les stocker dans un tableau avec leurs valeurs
  Object.keys(localStorage).forEach((key) => {
    tasks.push({
      key: key,
      value: localStorage.getItem(key),
    });
  });

  // Trier les tâches par leur clé si les clés sont des identifiants uniques (ex: timestamps)
  tasks.sort((a, b) => a.key - b.key); // Ou ajustez en fonction du format de vos clés

  // Effacer la liste existante pour la remplir avec les tâches actualisées
  list.innerHTML = ''; // Cela garantit qu'on n'ajoute pas de doublons

  // Affichage des tâches dans l'ordre
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML += task.value;
    list.appendChild(li);

    let buttonDelete = document.createElement("button");
    li.appendChild(buttonDelete);
    buttonDelete.innerHTML = "\u00d7"; // Symbole de suppression (×)
    buttonDelete.dataset.id = task.key; // Utiliser la clé de la tâche pour le bouton de suppression

    buttonDelete.addEventListener("click", () => {
      li.remove(); // Supprime l'élément de la liste affichée
      localStorage.removeItem(task.key); // Supprime l'élément du localStorage
    });
  });

  console.log(`finished`);
}

// Fonction pour ajouter une nouvelle tâche
const addTask = () => {
  // Récupérer la valeur du champ d'entrée
  const taskValue = input.value.trim();

  if (taskValue === "") {
    alert("Please enter a task");
    return;
  }

  // Utiliser un identifiant unique (timestamp) pour chaque tâche
  const taskId = new Date().getTime().toString(); // Utilisation du timestamp pour un identifiant unique
  localStorage.setItem(taskId, taskValue); // Stocke la tâche avec l'identifiant unique

  // Créer un élément de liste pour afficher la tâche
  let li = document.createElement("li");
  li.innerHTML = taskValue;
  list.appendChild(li);

  // Créer un bouton de suppression pour chaque tâche
  let buttonDelete = document.createElement("button");
  buttonDelete.dataset.id = taskId; // Utiliser l'identifiant unique pour la suppression
  li.appendChild(buttonDelete);
  buttonDelete.innerHTML = "\u00d7";

  // Ajouter l'événement de suppression
  buttonDelete.addEventListener("click", () => {
    li.remove(); // Supprime l'élément de la liste affichée
    localStorage.removeItem(taskId); // Supprime l'élément du localStorage
  });

  // Effacer la valeur de l'input après l'ajout
  input.value = "";

  console.log("Task added:", taskValue);
};

// Charger les tâches dès que la page se charge
loadTasks();

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

