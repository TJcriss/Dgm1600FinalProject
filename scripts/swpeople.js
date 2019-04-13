import { people } from '../data/api.js'

const mainContainer = document.createElement('div')
mainContainer.className = 'container'

// Sets the number of stars we wish to display
const numStars = 100;
// Add Blank Card Button
let cardButtonElement = document.createElement('button');
cardButtonElement.onclick = createCard;
cardButtonElement.textContent = 'Add Card';
var counter = 89;

// For every star we want to display
for (let i = 0; i < numStars; i++) {
  let star = document.createElement("div");  
  star.className = "star";
  var xy = getRandomPosition();
  star.style.top = xy[0] + 'px';
  star.style.left = xy[1] + 'px';
  document.body.append(star);
}

// Gets random x, y values based on the size of the container
function getRandomPosition() {  
  var y = window.innerWidth;
  var x = window.innerHeight;
  var randomX = Math.floor(Math.random()*x);
  var randomY = Math.floor(Math.random()*y);
  return [randomX,randomY];
}

function createCard(){
  console.log("CREATE CARD FIRED");
  var person = {
    "id": counter,
    "name": "",
    "height": "0",
    "gender": "",
    "homeworld": "",
    "image": "https://cdn0.iconfinder.com/data/icons/famous-characters-add-on-vol-2-glyph/48/Sed-22-512.png",
    "hairColor": "",
    "species": "",
    "eyeColor": "",
    "skinColor": "",
  };
  console.log({people});
  displayPeople(person);
  var jumpToCard = document.getElementById(person.id);
  jumpToCard.scrollIntoView();
  counter ++;
}

people.forEach((person) => { displayPeople(person) });

function displayPeople(person) {
  console.log('hit',person);
    let cardElement = document.createElement('div')
    let innerElement = document.createElement('div')
    let frontElement = document.createElement('div')
    let backElement = document.createElement('div')
    let imageElement = document.createElement('img')
    let nameElement = document.createElement('h1')

    let planetElement = document.createElement('h2')
    let speciesElement = document.createElement('h2')
    let genderElement = document.createElement('h2')
    let heightElement = document.createElement('h2')
    let skinElement = document.createElement('h2')
    let eyeElement = document.createElement('h2')
    let hairElement = document.createElement('h2')

    cardElement.className = 'flip-card'
    innerElement.className = 'flip-card-inner'
    frontElement.className = 'flip-card-front'
    backElement.className = 'flip-card-back'
    cardElement.id = person.id;
    frontElement.box = person.name
    imageElement.src = person.image
    nameElement.textContent = person.name
    planetElement.textContent = `Homeworld: ${person.homeworld}`
    speciesElement.textContent = `Species: ${person.species}`
    genderElement.textContent = `Gender: ${person.gender}`
    heightElement.textContent = `Height: ${person.height}m`
    skinElement.textContent = `Skin Color: ${person.skinColor}`
    eyeElement.textContent = `Eye Color: ${person.eyeColor}`
    hairElement.textContent = `Hair Color: ${person.hairColor}`

    cardElement.appendChild(innerElement)
    innerElement.appendChild(frontElement)
    innerElement.appendChild(backElement)
    frontElement.appendChild(imageElement)
    frontElement.appendChild(nameElement)
    backElement.appendChild(planetElement)
    backElement.appendChild(speciesElement)
    backElement.appendChild(genderElement)
    backElement.appendChild(heightElement)
    backElement.appendChild(skinElement)
    backElement.appendChild(eyeElement)
    backElement.appendChild(hairElement)

    mainContainer.appendChild(cardElement)
}


mainContainer.appendChild(cardButtonElement)
document.body.appendChild(mainContainer)