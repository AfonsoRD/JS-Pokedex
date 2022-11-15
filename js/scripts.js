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
    }

];

//for loop that iterates over each item in pokemonList and will highlight one pokemon with height superior than 0.6
/* add tag <br> for break and <strong> for bold text:
this inline css will be removed when start to structure the html
*/
for (let i = 0; i < pokemonList.length; i++) {
    
        if(pokemonList[i].height > 0.6) {
            document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') -' + ' <strong>Wow, that\’s big!</strong><br>');
        } else {
            document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<br>');
        }
    }