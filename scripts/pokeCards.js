import { pokemon } from '../data/pokemon.js'

class Pokemon {
    constructor(name) {
        this.id = id
    }
}

const mainContainer = document.querySelector('.container')

  function createPokeCard(pokeData) {
      let card = document.createElement('div')
      card.className = 'box'
      let figure = document.createElement('figure')
      let caption = document.createElement('figcaption')
      let image = document.createElement('img')

    //   let upperName = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)
    caption.textContent = pokeData.name 
      if(pokeData.id !== 0) {
          image.src = `../pokemon /images/${pokeData.imgaeID}${pokeData.name}.png`
      } else {
          image.src = `../pokemon/images/pokeball.png`
      }

      figure.appendChild(image)
      figure.appendChild(caption)
      card.appendChild(figure)
    mainContainer.appendChild(card)
  }

//   pokemon.forEach(singleMon => {
//     fetch(singleMon.url)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       createPokeCard(myJson)
//     })
//   })

function fetchSinglePokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(function(response) {
         return response.json()
     })
    .then(function(retrievedPokemon) {
        if(retrievedPokemon.id  < 10) {
            retrievedPokemon.imgaeID = "00" + retrievedPokemon.id 
        } 
        if(retrievedPokemon.id  > 9 && retrievedPokemon.id < 100) {
            retrievedPokemon.imgaeID = "0" + retrievedPokemon.id 
        }
        if(retrievedPokemon.id  > 99) {
            retrievedPokemon.imgaeID = retrievedPokemon.id 
        } 
        retrievedPokemon.name = retrievedPokemon.name.charAt(0).toUpperCase() + retrievedPokemon.name.slice(1)
       createPokeCard(retrievedPokemon)
    })
}


const newPokemonButton = document.querySelector('button')

newPokemonButton.addEventListener('click', function() {
    let pokemonID = prompt ('Enter an ID of an existing pokemon:')
    fetchSinglePokemon(pokemonID)
});

