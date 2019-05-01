import { pokemon } from '../data/pokemon.js';
// Calling pokemon class to display/create cards.
class Pokemon {
  // constuctor: setting up intial varriables.
  // params: name that the user will type in.
  constructor(name) {
    // id: For new card created with id of 0.
    this.id = 0,
    // name: The name the user types in for the new card.
    this.name = name
  }
}

// Set up conatiner to display cards in.
const mainContainer = document.querySelector('.container')

// Function that shows the front of the card.
// Params: Pokemon data
function cardFront(pokedata) {
  // Create card element.
  let cardFront = document.createElement('div');
  // Add a class to the card element.
  cardFront.className = 'cardFront';
  // Create figure(inside the card element) element for the card.
  let figure = document.createElement('figure');
  // Create name element for the card.
  let name = document.createElement('figcaption');
  // Create image element for the card.
  let image = document.createElement('img')
  // Grab name from pokemon data to use to grab image in future request.
  let upperName = pokedata.name.charAt(0).toUpperCase() + pokedata.name.slice(1);
  // Insert pokemon name into name element.
  name.textContent = pokedata.name
  // If statement on if pokemon id does not equals 0 than setup image for pokemon.
  // Else use default image for blank card.
  if (pokedata.id !== 0) {
    // setup image src for card.
    image.src = `pokemon/images/${pokedata.imageID}${upperName}.png`;
  } else {
    // setup image src for blank card.
    image.src = `vectorcon.svg`;
  };
  // Appending(inserting) name into figure element.
  figure.appendChild(name);
  // Appending(inserting) image into figure element.
  figure.appendChild(image);
  // Appending(inserting) figure into cardFront element.
  cardFront.appendChild(figure);
  // Returning Card to be displayed.
  return cardFront
}

// Function that shows the back of the card.
// Params: pokemon data
function cardBack(pokedata) {
  // Create card back element.
  let cardBack = document.createElement('div');
  // Add class to card back element.
  cardBack.classname = 'cardBack';
  // Return the back of the card.
  return cardBack;
}

// Function that creates the pokemon cards.
// Params: Pokemon data
function createPokeCard(pokedata) {
  // Create card element for cards info to display in.
  let card = document.createElement('div');
  // Add class to card element
  card.className = 'card';
  // Append cardFront to the card element.
  card.appendChild(cardFront(pokedata));
  // Append cardBack to card element.
  card.appendChild(cardBack(pokedata));
  // Append card to mainContainer Element.
  mainContainer.appendChild(card);
}

// Setup empty array for pokemon data to rest in. 
const pokemonArray = [];

// Loop through pokemon data to fetch url data to create cards to display.
pokemon.forEach(mon => {
  // Fetch individual pokemon data from their url.
  fetch(mon.url)
    .then(function(response) {
      // Once promise is fullfilled, return response in a json(object).
      return response.json();
    })
    .then(function(Picka) {
      // Once promis is fullfilled, push json of data to pokemon array.
      pokemonArray.push(Picka);
      // Call createPokeCard to create a card based on the data.
      createPokeCard(matchIdToImage(Picka));
    })
})

// Function that figures out what image goes with which card based on id and update name.
// Param: Single Pokemon data.
function matchIdToImage(aPokemon) {
  // If id is 0 then set image id to 0.
  if (aPokemon.id === 0) {
    aPokemon.imageID = 0;
  }
  // If id is less than 10 then add 00 in front of id for image id.
  if (aPokemon.id < 10) {
    aPokemon.imageID = '00' + aPokemon.id;
  }
  // If id is greater than 9 and less than 10 then add 0 in front of id for image id.
  if (aPokemon.id > 9 && aPokemon.id < 100) {
    aPokemon.imageID = '0' + aPokemon.id;
  }
  // If id is greater than 99, just add id to image id.
  if (aPokemon.id > 99) {
    aPokemon.imageID = aPokemon.id;
  }
  // If name equals mr-mime than change name to mr. Mime
  if (aPokemon.name === 'mr-mime') {
    aPokemon.name = 'Mr_Mime';
  }
  // Check if name has a dash.
  let dash = aPokemon.name.indexOf('-');
  // if name has a dash, then remove the dash through using slice.
  if (dash !== -1) {
    aPokemon.name = aPokemon.name.slice(0, dash);
  }
  // Update name to have the first letter uppercased.
  aPokemon.name = aPokemon.name.charAt(0).toUpperCase() + aPokemon.name.slice(1);
  // Return Updated pokemon data.
  return aPokemon
}

// Create blank card create button.
const newPokemonButton = document.querySelector('button');
// Add onclick listener for user to create new card with input of name.
newPokemonButton.addEventListener('click', function() {
  // grab name from the user.
  let newPokeName = prompt('enter new pokemon name');
  // Create card through pokemon class.
  createPokeCard(new Pokemon(newPokeName));
})
