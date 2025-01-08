const h1Elements = document.querySelectorAll("h1");
const imageURL = "https://media.wired.com/photos/5cdefb92b86e041493d389df/1:1/w_988,h_988,c_limit/Culture-Grumpy-Cat-487386121.jpg";
const image = "https://www.gifcen.com/wp-content/uploads/2023/09/hacker-gif-4.gif"

// Step 1: Dynamically add the Google Fonts link to the head
let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Pirata+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'; // Change font as needed
document.head.appendChild(link);

// Step 2: Apply the font to all text on the page
link.onload = function() {
    document.body.style.fontFamily = 'Roboto, sans-serif'; // Apply the font once the link is loaded
};

h1Elements.forEach((h1) => {                  //Change la couleur de tout les h1
    h1.style.color = "green";
  })
  document.querySelectorAll("img").forEach(image => {
    changeImage(image);

    // img.src = image;  
    });                             // Change la source de toute les images
     document.body.style.filter = "grayscale(100%)";   // Met un filtre gris sur la page html
     document.querySelectorAll('*').forEach(function(element) {
        element.style.fontFamily = 'Pirata One, cursive';
    });
    //  document.querySelector("body").style.fontFamily = "Copperplate, Papyrus, fantasy";

function changeImage(img) {
    
// const img = document.querySelector('img');
// img.style.position = 'absolute';
// img.style.top = '0';
// img.style.bottom = '0';
// img.style.left = '0';
// img.style.right = '0';
// img.style.maxWidth = '120px';
// img.style.width = '90%';
// img.style.margin = 'auto';
let sizewidth = img.width;
let sizeheight = img.height;
img.width = sizewidth* 0.7;
img.height = sizeheight* 0.7;
img.style.backgroundColor = '#fff';
img.style.padding = '7px';
img.style.borderStyle = 'solid';
img.style.borderWidth = '10px';
img.style.borderTopColor = lightenColor('#000', 20);
img.style.borderRightColor = lightenColor('#000', 0);
img.style.borderBottomColor = lightenColor('#000', 20);
img.style.borderLeftColor = lightenColor('#000', 0);
img.style.boxShadow = '8px 8px 16px rgba(0,0,0,.6)';
}
// Function to lighten a color (hex format)
function lightenColor(color, percent) {
    let colorValue = color.replace(/^#/, '');
    let r = parseInt(colorValue.substring(0, 2), 16);
    let g = parseInt(colorValue.substring(2, 4), 16);
    let b = parseInt(colorValue.substring(4, 6), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    return `rgb(${r},${g},${b})`;
}
