let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 0.6,
            type: ['fire']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            type: ['water']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            type: ['electricity']
        },
    
    ];

    // get All Pokemons
    function getAll() {
        return pokemonList;
    }


    // Add Pokemon function
    function add (pokemon) {
        if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.type && Object.keys(pokemon).length === 3) {
			pokemonList.push(pokemon);
		} else { 
            document.write("Pokemon is not valid")
        }
    } 

    
    //forEach loop for pokemon list
    

    function addPokemonList (pokemon) {

        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name

    
        eventListener(button, pokemon.name);
        button.classList.add('button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        // Event Listener
        /*button.addEventListener('click', function (Event) {
            showDetails(pokemon)
        });*/
        
    }

    function eventListener(button, pokemon) {
        button.addEventListener("click", function () {
          showDetails(pokemon);
        });
      }
        


    function showDetails(pokemon) { 
        console.log(pokemon);
    }
     

    return {
        getAll: getAll,
        add: add, 
        addPokemonList: addPokemonList,
        showDetails: showDetails
    }

})();


// add Pokemon with add fun
pokemonRepository.add({ name: 'Snorlak', height: 2.1, type: 'normal' })

// forEach loop     
   
pokemonRepository.getAll().forEach(function (pokemon) { 
    pokemonRepository.addPokemonList(pokemon);
})   



    





