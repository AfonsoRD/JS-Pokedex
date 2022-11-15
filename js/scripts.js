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


let text = " ";
let i = 0
for (;pokemonList[i];){
  text = text + pokemonList[i].name + " (height: " + pokemonList[i].height +") ";
  i++;
}

document.write(text);