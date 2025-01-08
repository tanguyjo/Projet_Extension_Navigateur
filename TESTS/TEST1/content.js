const h1Elements = document.querySelectorAll("h1");
const imageURL = "https://media.wired.com/photos/5cdefb92b86e041493d389df/1:1/w_988,h_988,c_limit/Culture-Grumpy-Cat-487386121.jpg";
const image = "https://www.gifcen.com/wp-content/uploads/2023/09/hacker-gif-4.gif"
const button = document.getElementById("change-color");

// Changer la couleur du titre

function launchExtension() {
  h1Elements.forEach((h1) => {
    h1.style.color = "green";
  })

 document.querySelectorAll("img").forEach(img => {
    img.src = image;
  });
}


// button.addEventListener("click", () => {
//   launchExtension()
//   console.log("hello the button works well");
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "launchExtension") {
    launchExtension();
  }
});