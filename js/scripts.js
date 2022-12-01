let pokemonRepository = (function () {
  let pokemonList = [];
  // load pokemon's list
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1154";

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
      "detailsUrl" in pokemon
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
    listPokemon.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");
    button.classList.add("col");

    listPokemon.classList.add("list-items");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    eventListener(button, pokemon);
  }

  function eventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    //creating element for name

    let nameElement = $(
      "<h1>" +
        pokemon.id +
        "# " +
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1) +
        "</h1>"
    );
    //creating element for img
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl);

    //creating element for height and weight
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    //creating element for types
    let typesElement = $("<p>" + "Type: " + pokemon.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
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
        pokemon.id = details.id;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map((type) => type.type.name).join(", ");
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
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
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
