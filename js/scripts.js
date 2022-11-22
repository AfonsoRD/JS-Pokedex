let pokemonRepository = (function () {
  let pokemonList = [];
  // load pokemon's list
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let loadingImage = document.querySelector(".loading");

  // display a loading message while data is being loaded.

  showLoadingMessage = () => {
    loadingImage.style.display = "block";
  };
  hideLoadingMessage = () => {
    loadingImage.style.display = "none";
  };

  // get All Pokemons
  function getAll() {
    return pokemonList;
  }

  // Add Pokemon function
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon &&
      Object.keys(pokemon).length === 2
    ) {
      pokemonList.push(pokemon);
    } else {
      document.write("Pokemon is not valid");
    }
  }

  //forEach loop for pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");

    let listPokemon = document.createElement("li");

    let button = document.createElement("button");
    button.innerText = pokemon.name;

    eventListener(button, pokemon);
    button.classList.add("button");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  function eventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// add Pokemon with add fun
//pokemonRepository.add({ name: "Snorlak", height: 2.1, type: "normal" });

// forEach loop

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
