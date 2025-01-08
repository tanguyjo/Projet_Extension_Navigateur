let url =
  "https://apiv3.apifootball.com/?action=get_events&from=2025-01-07&to=2025-02-07&league_id=168&APIkey=d284d4d516f5a639a5ffac5ab172248fb77afbdadae1e0c737b65d76db36f07f";

// async function getMatches(){

//      const response = await fetch(url);
//      const offers = await response.json();
//      console.log(offers)
//      return offers
//  }

// getMatches()

let index = 1;
const data = require("./test.json");
const hometeam = data[index].match_hometeam_name;
const awayteam = data[index].match_awayteam_name;
const date = data[index].match_date;
const time = data[index].match_time;
console.log(hometeam);
console.log(awayteam);
console.log(date);
console.log(time);


