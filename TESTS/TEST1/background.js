chrome.runtime.onInstalled.addListener(() => {
    // chrome.action.setBadgeText({
    //   text: "OFF",
    // });
  });
  function getTabID() {     // fonction qui va recuperer l'id de notre tab actif
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({     //Si on a chrome.tabs on récupère l'id du tab actif 
                active: true,
            }, function (tabs) {     
                resolve(tabs[0].id);       // et on renvoie l'id de notre tab
            })
        } catch (e) {               // sinon on reject avec notre message d'erreur
            reject(e);
        }
    })
}

let indice = 0;


chrome.action.onClicked.addListener((tab) => {

});


  chrome.action.onClicked.addListener(async (tab) => {   // Quand on clique sur l'extension
    // chrome.action.setBadgeText({       
    //     text: "ON",                                      // On voit le text ON sur notre boutton
    //   }); 
    // 
    chrome.action.setIcon({
    path: "news--paper.png", // Change icon on click
    tabId: tab.id
  });

 indice=1;
    if(indice==1){
      
    
      chrome.scripting.executeScript({
      target : {tabId : await getTabID()},               // on choisis ou target notre script et on lui donne l'id de notre tab
      files : [ "script.js" ],                          // injecte script.js
    })
    .then(() => console.log("script injected")); 
    indice++;       // on console.log "script injected" quand tout est finit
} else if(indice>2){
  chrome.scripting.executeScript({
  target : {tabId : await getTabID()},               // on choisis ou target notre script et on lui donne l'id de notre tab
  files : [ "scriptoff.js" ],                          // injecte script.js
})
.then(() => console.log("script dejected"));        // on console.log "script injected" quand tout est finit
} indice = 0;
  });

  
