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

  let modalContainer = document.querySelector("#modal-container");

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      /* Implement Modal*/
      /*Select container from HTML page*/
      modalContainer.innerText = " ";

      /*Create DIV and add modal on DOM*/
      let modal = document.createElement("div");
      modal.classList.add("modal");

      /* create close button*/
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerHTML = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      /* create fav button*/
      let favButtonElement = document.createElement("button");
      favButtonElement.classList.add("modal-fav");
      favButtonElement.innerHTML = "❤️";
      favButtonElement.addEventListener("click", addFavourite);

      /*Title with Pokemon name*/
      let pokemonName = document.createElement("h1");
      pokemonName.classList.add("modal-title");
      pokemonName.innerHTML = pokemon.name;

      /*Add img*/

      let pokemonImage = document.createElement("img");
      pokemonImage.classList.add("pokemon-img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.alt = "Pokemon image";

      /* Element to display weight and height*/
      let contentElement = document.createElement("p");
      contentElement.classList.add("content-container");
      contentElement.innerHTML = `Weight: ${pokemon.weight} / Height: ${pokemon.height}`;

      /* Element to display Type*/
      let contentTypeElement = document.createElement("p");
      contentTypeElement.classList.add("type-container");
      contentTypeElement.innerHTML = "Type: X / Y";

      modal.appendChild(closeButtonElement);
      modal.appendChild(favButtonElement);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonImage);
      modal.appendChild(contentElement);
      modal.appendChild(contentTypeElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");
    });
  }

  /* hide the Modal*/
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  /* Add pokemon to Fav list */

  function addFavourite() {}

  /* Keydown event listener, 'When press ESC close the modal'*/
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
        pokemon.weight = details.weight;
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
