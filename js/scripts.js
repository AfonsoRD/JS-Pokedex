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

    function getAll() {
        return pokemonList;
    }

    function add (pokemon) {
        if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.type && Object.keys(pokemon).length === 3) {
			pokemonList.push(pokemon);
		} else { 
            document.write("Pokemon is not valid")
        }
	} 

    return {
        getAll: getAll,
        add: add 
    }

})();



// forEach loop     
    
function printPokemonList(pokemon) {
    if (pokemon.height > 0.6) {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ') -' + ' <strong>Wow, that\’s big!</strong><br>');
    } else {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ')<br>');
    }
}

pokemonRepository.add({name:'Snorlak',height: 2.1, type: 'normal'})
pokemonRepository.getAll().forEach(printPokemonList)    



/* 'FOR' loop
for loop that iterates over each item in pokemonList and will highlight one pokemon with height superior than 0.6
     add tag <br> for break and <strong> for bold text:
    this inline css will be removed when start to structure the html
    

    
for (let i = 0; i < pokemonList.length; i++) {
    
        if(pokemonList[i].height > 0.6) {
            document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') -' + ' <strong>Wow, that\’s big!</strong><br>');
        } else {
            document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<br>');
        }
}

document.write(pokemonList[i].pokemon);

*/



    





