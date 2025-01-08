const h1Elements = document.querySelectorAll("h1");
const imageURL = "https://media.wired.com/photos/5cdefb92b86e041493d389df/1:1/w_988,h_988,c_limit/Culture-Grumpy-Cat-487386121.jpg";
const image = "https://www.gifcen.com/wp-content/uploads/2023/09/hacker-gif-4.gif"


h1Elements.forEach((h1) => {                  //Change la couleur de tout les h1
    h1.style.color = "black";
  })
  document.querySelectorAll("img").forEach(image => {
    removeImageEffect(image);
    // img.src = image;  
    });                             // Change la source de toute les images
    // document.body.style.filter = "grayscale(100%)";   // Met un filtre gris sur la page html



function removeImageEffect(img) {
    
// const img = document.querySelector('img');
// img.style.position = 'absolute';
// img.style.top = '0';
// img.style.bottom = '0';
// img.style.left = '0';
// img.style.right = '0';
// img.style.maxWidth = '120px';
// img.style.width = '90%';
// img.style.margin = 'auto';
img.style.backgroundColor = '#fff';
img.style.padding = '0px';
img.style.borderStyle = 'solid';
img.style.borderWidth = '0px';
img.style.borderTopColor = lightenColor('#000', 20);
img.style.borderRightColor = lightenColor('#000', 0);
img.style.borderBottomColor = lightenColor('#000', 20);
img.style.borderLeftColor = lightenColor('#000', 0);
img.style.boxShadow = '2px 2px 4px rgba(0,0,0,.6)';
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
