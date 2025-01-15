let now = new Date();
let date = now.toLocaleDateString();
let newdatesplitted = date.split("/");                                
date = newdatesplitted[2] + "-" + newdatesplitted[0] + "-" + newdatesplitted[1]; // Me la dans le bon format pour l'utiliser dans notre api
let urlLigue1 = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=168&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlPremier = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=152&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlSerieA = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=207&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlBundesligua = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=175&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlLaliga = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=302&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlChampionsLeague = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=3&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlEuropa = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=4&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlPortugal = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=266&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let urlSaudi = `https://apiv3.apifootball.com/?action=get_events&from=${date}&to=2025-02-07&league_id=278&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f`;
let buttonEuropa = document.getElementById("Europa");
let buttonPortugal = document.getElementById("Portugal");
let buttonSaudi = document.getElementById("Saudi");
let buttonLigue1 = document.getElementById("ligue1");
let buttonPremier = document.getElementById("premier");
let buttonSeriA = document.getElementById("seriA");
let buttonBundesLiga = document.getElementById("bundesLiga");
let buttonLaliga = document.getElementById("laLiga");
let buttonChampions = document.getElementById("champions");
let imageLigue = document.getElementById("liguelogo");

buttonEuropa.addEventListener("click", () => {
  imageLigue.src = "europa.png";
  imageLigue.style.width = "100px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlEuropa);
});

buttonPortugal.addEventListener("click", () => {
  imageLigue.src = "ligaportugal.png";
  imageLigue.style.width = "130px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlPortugal);
});

imageLigue.style.width = "170px";
imageLigue.style.height = "100px";
buttonSaudi.addEventListener("click", () => {
  imageLigue.src = "Saudi.svg";
  imageLigue.style.width = "170px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlSaudi);
});
buttonLigue1.addEventListener("click", () => {
  imageLigue.src = "Ligue1logo.svg";
  container.innerHTML = "";
  getMatches(urlLigue1);
});

buttonPremier.addEventListener("click", () => {
  imageLigue.src = "Premier.png";
  imageLigue.style.width = "200px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlPremier);
});

buttonSeriA.addEventListener("click", () => {
  imageLigue.src = "SerieA.jpeg";
  imageLigue.style.width = "170px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlSerieA);
});

buttonBundesLiga.addEventListener("click", () => {
  imageLigue.src = "bundes.png";
  imageLigue.style.width = "120px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlBundesligua);
});

buttonLaliga.addEventListener("click", () => {
  imageLigue.src = "laliga.png";
  imageLigue.style.width = "120px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlLaliga);
});

buttonChampions.addEventListener("click", () => {
  imageLigue.src = "UEFA.png";
  imageLigue.style.width = "110px";
  imageLigue.style.height = "100px";
  container.innerHTML = "";
  getMatches(urlChampionsLeague);
});

// Declaration de la fonction get Matches qui va une fois appeller afficher tout les elements necessaire pour montrer les prochains match,logo,heure,stade et les equipes
async function getMatches(url) {
  const response = await fetch(url);      
  const offers = await response.json();
  let index = 0;
  for (index; index < 9; index++) {                          // On fait une boucle tant que l'index atteint 8 car on a une info precise seulement pour les 8 prochain matchs
    const data = offers;
    const hometeam = data[index].match_hometeam_name;        //Recupere l'equipe a domicile
    const awayteam = data[index].match_awayteam_name;        // Recupere l'equie a l'exterieur
    const date = data[index].match_date;
    const parts = date.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}` //Met la date dans le bon format
    const time = data[index].match_time;                     // On recupere l'heure du match
    const stadium = data[index].match_stadium;               // On recupere le nom du stade
    const matchround = data[index].match_round;              // On recupere la journee du match
    const hometeamlogo = data[index].team_home_badge;        // On recupere le logo de la team a domicile
    const awayteamlogo = data[index].team_away_badge;        // On recupere le logo de la team a l'exterieur
    MatchFixtures = `<p>Journee ${matchround}</p> <p>${hometeam} vs ${awayteam}</p> ${stadium} <br> <img id="logo" src="${hometeamlogo}"></img><img id="logo" src="${awayteamlogo}"></img> <br> Date: ${formattedDate} <br>${time}</p>
 <br> <br> <hr> `; // On Affiche toutes les donnees recuperer. 
    const container = document.getElementById("container");

    container.innerHTML += MatchFixtures; // ON affiche les Matches Sur notre pages 
  }

}

getMatches(urlLigue1);
