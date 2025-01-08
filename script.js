let url =
  "https://apiv3.apifootball.com/?action=get_events&from=2025-01-07&to=2025-02-07&league_id=168&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f";

async function getMatches(){

     const response = await fetch(url);
     const offers = await response.json();
     console.log(offers)

let index = 0
// const data = require("./test.json");
for (index; index < 30; index++) {
const data=offers;
const hometeam = data[index].match_hometeam_name;
const awayteam = data[index].match_awayteam_name;
const date = data[index].match_date;
const time = data[index].match_time;
const stadium = data[index].match_stadium;
const matchround = data[index].match_round;
const hometeamlogo = data[index].team_home_badge;
const awayteamlogo = data[index].team_away_badge;
console.log(hometeam);
console.log(awayteam);
console.log(date);
console.log(awayteamlogo);
MatchFixtures = `${hometeam} vs ${awayteam}<img src="${hometeamlogo}"></img><img src="${awayteamlogo}"></img> <br> Date: ${date}  heure: ${time}</p>
 <br> <br>  `
const container = document.getElementById('container');


container.innerHTML += MatchFixtures;
}
console.log(h1)
}


getMatches()