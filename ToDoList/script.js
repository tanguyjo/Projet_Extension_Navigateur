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
let apiImageLinks =
  "https://api.unsplash.com/photos/?client_id=xw0lAft6v21NTQwKbIgZ_PflmsoRRHdA0oBjmkQ8b38&query=yellow,white,grey,magenta,teal,orange,pink";

 

// Declaration d'une variable qui contient les meteo et leur traductions
const Meteo = {
 
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

function updateDateTime() {                        //  Declaration de la fonction pour mettre a jour la date et l'heure
  timer = setInterval(() => {
    now = new Date();
    date = now.toLocaleDateString("fr-FR");
    time = now.toLocaleTimeString("fr-FR");
    Datebox.innerHTML = `${date} ${time}`;

    if (list.children.length > 0) {                // Verifie si on a Des todo list et si Oui on affiche la dive de la liste 
      list.classList.add("show"); 
    } else {
      list.classList.remove("show");               // Sinon on la cache
    }
  }, 100);
}

updateDateTime();


// Fonction qui va Afficher les task dans notre page
function loadTasks() {
  let tasks = [];                                  // Declare un tableau ou on va mettre nos taches
  Object.keys(localStorage).forEach((key) => {     // On boucles sur toutes les cles du localstorage et on push la cles et la taches dans notre tableau
    tasks.push({
      key: key,
      value: localStorage.getItem(key),
    });
  });
  tasks.sort((a, b) => a.key - b.key);             // Trier les tâches par leur clé et donc par leur ordre d'insertion
  list.innerHTML = ""; 
  
  tasks.forEach((task) => {                        // Affichage des tâches dans un nouvel ordre
    let li = document.createElement("li");
    li.innerHTML += task.value;
    list.appendChild(li);

    let buttonDelete = document.createElement("buttonTask");
    li.appendChild(buttonDelete);
    buttonDelete.innerHTML = "\u00d7"; 
    buttonDelete.dataset.id = task.key;            //met un id au bouton de suppression qui sera la cles en fonction de sa task

    buttonDelete.addEventListener("click", () => {
      li.remove();                                 // Supprime de l'html
      localStorage.removeItem(task.key);           // Supprime sur le localstorage
    });
  });

  console.log(`finished`);
}

// Fonction pour ajouter une nouvelle tâche
const addTask = () => {
  const taskValue = input.value.trim();            // Recupere la valeur de la tache et la trim pour enlever les espaces inutiles

  if (taskValue === "") {                          // Verifie que la tâche n'est pas vide sinon on nous affiche une alert
    alert("Please enter a task");          
    return;
  }
  const taskId = new Date().getTime().toString();  // On utiliser un timestampt comme identifiant unique grace a getTime() qui va nouse donner des ms precise
  localStorage.setItem(taskId, taskValue);         // On ajoute dans le local storage La tache et son timestamp comme cles
  
  let li = document.createElement("li");           // On cree la liste et on affiche nos taches
  li.innerHTML = taskValue;
  list.appendChild(li);

 
  let buttonDelete = document.createElement("buttonTask"); // On va creer un bouton de delete pour chacune de nos taches
  buttonDelete.dataset.id = taskId; 
  li.appendChild(buttonDelete);
  buttonDelete.innerHTML = "\u00d7";

  // Ajouter l'événement de suppression
  buttonDelete.addEventListener("click", () => {   // quand on clique sur notre bouton on supprime la tache et le bouton et le supprime du localstorage
    li.remove(); 
    localStorage.removeItem(taskId); 
  });
  input.value = "";                                // On vide notre input

  console.log("Task added:", taskValue);
};


loadTasks();                                       // On appelle notre Fontion loadTasks pour charger nos taches 
button.addEventListener("click", addTask);         // On ajoute un event listener sur notre bouton add qui va lui appeller la fonction addTask

  // Fonction async pour reccuperer les donnes meteos de notre Ville
async function weather() {
  let location = "Lyon";
  let key = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RWQ5ZQX23WTSV4DU6GZ2BCA25&elements=conditions,temp,sunrise,sunset&contentType=json`;
  const response = await fetch(key);
  if (response.status == "400") {
    // condition que si la ville n'est pas trouver la fonction retourne False
    return false;
  }
  const forecast = await response.json();
  sessionStorage.setItem("forecasts", JSON.stringify(forecast));

  console.log(forecast.currentConditions.conditions);
  document.getElementById("Weather").innerHTML = `<hr> Lyon Meteo actuelle :
   ${
     forecast.currentConditions.conditions === undefined
       ? Meteo[forecast.currentConditions.conditions]
       : forecast.currentConditions.conditions
   }
   <br> Temp : ${forecast.currentConditions.temp} °C <br> Sunrise : ${
    forecast.currentConditions.sunrise
  } <br> Sunset : ${forecast.currentConditions.sunset}`;
  return forecast.currentConditions.conditions;
}

weather();
// Event listener pour la recherche google de notre search bar
document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();           // On recupere la valeur de notre input et on la trim
  if (query) {                                
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`; // Si on a bien entrer un input on le transforme en un url grace a encodeURIcomponent
    window.location.href = googleSearchUrl; // Redirige le window au lien google
  } else {
    alert("Veuillez entrer une recherche.");
  }
});
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {                           // quand on appuis sur enter ca simule le clic du bouton 
    document.getElementById("searchButton").click(); // Simule un clic sur le bouton
  }
});

document.getElementById("input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {                  // quand on appuis sur enter ca simule le clic du bouton 
    document.getElementById("add").click(); // Simule un clic sur le bouton
  }
});

let wallpapper = [              // declaration d'un tableau qui contient nos images pour le background
  "summer.jpg",
  "winter-optimized.jpg",
  "autumn-optimized.jpg",
  "spring-optimized.jpg",
];
function changeWeatherImages() {         // Fonction qui change le background aleatoirement chaque 10 seconde 
  let indice = 0;
  indice = Math.floor(Math.random() * 4);
  let intervalImage = setInterval(() => {
    indice = Math.floor(Math.random() * 4);
    document.body.style.backgroundImage = `url(${wallpapper[indice]})`;
    console.log(wallpapper[indice]);
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }, 5000);
}

changeWeatherImages();