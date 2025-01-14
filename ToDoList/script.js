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
 
    if (list.children.length > 0) {
      list.classList.add('show');  // Show list if it has list items
    } else {
      list.classList.remove('show');  // Hide list if no items
    }
  
    
  }, 100);}


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

    let buttonDelete = document.createElement("buttonTask");
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
  let buttonDelete = document.createElement("buttonTask");
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
   <br> Temp : ${forecast.currentConditions.temp} °C <br> Sunrise : ${
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



let wallpapper = ["summer.jpg","winter-optimized.jpg","autumn-optimized.jpg","spring-optimized.jpg"]
 function changeWeatherImages(){
    let indice = 0;
     indice = Math.floor(Math.random() * 3)
    let intervalImage = setInterval(() => {
        indice = Math.floor(Math.random() * 3)
      document.body.style.backgroundImage = `url(${wallpapper[indice]})`;
      console.log(wallpapper[indice])
      document.body.style.backgroundRepeat = "no-repeat"
      document.body.style.backgroundSize = "cover";
      
        
    },1000)}


 changeWeatherImages()

