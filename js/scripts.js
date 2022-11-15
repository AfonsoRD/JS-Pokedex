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

/*
let pokemonList2 = [
    {
        name: 'Jigglypuff',
        height: 0.5,
        type: ['Fairy', 'Normal']
    },
    {
        name: 'Mankey',
        height: 0.5,
        type: ['Fighting']
    },
    {
        name: 'Onix',
        height: 8.8,
        type: ['Rock', 'Ground']
    },
    {
        name: 'Mewtwo',
        height: 2,
        type: ['Psychich']
    },
];

*/


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


document.write(printPokemonList(pokemonList));
document.write(printPokemonList(pokemonList2));




/*function printPokemonList(list) {
    for (let i = 0; i < list.length; i++) {
        document.write("<p>" + list[i].name + "</p>")
        console.log(list[i].name);

    }
}

printPokemonList(pokemonList);
printPokemonList(pokemonList2); */