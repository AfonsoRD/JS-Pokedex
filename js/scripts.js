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
      /* Implement Modal*/
      showModal();
    });
  }

  function showModal(title, text) {
    /*Select container from HTML page*/
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerText = " ";

    /*Create DIV and add modal on DOM*/
    let modal = document.createElement("div");
    modal.classList.add("modal");

    /* create close button*/
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add(".modal-close");
    closeButtonElement.innerHTML = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    /* create fav button*/
    let favButtonElement = document.createElement("button");
    favButtonElement.classList.add(".modal-fav");
    favButtonElement.innerHTML = "❤️";
    favButtonElement.addEventListener("click", addFavourite);

    /*Title with Pokemon name*/
    let titleElement = document.createElement("h1");
    titleElement.innerHTML = title;

    /*Add img*/
    let imageContainer = document.createElement("div");
    imageContainer.classList.add(".pokemon-img");
    let imageElement = document.createElement("img");
    imageElement.src = " ";
    imageElement.alt = "Pokemon image";

    /* Element to display weight and height*/
    let contentElement = document.createElement("div");
    contentElement.classList.add("content-container");
    let measureElement = document.createElement("p");
    measureElement.innerHTML = "Weight: X and Height: Y";

    /* Element to display Type*/
    let contentTypeElement = document.createElement("div");
    contentTypeElement.classList.add(".type-container");
    let typeElement = document.createElement("p");
    typeElement.innerHTML = "Type: X";

    modal.appendChild(closeButtonElement);
    modal.appendChild(favButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modal.appendChild(measureElement);
    modal.appendChild(contentTypeElement);
    modal.appendChild(typeElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  /* hide the Modal*/
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  /* Add pokemon to Fav list */

  function addFavourite() {}

  /* Keydown event listener, 'When press ESC close the modal'*/
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  let modalContainer = document.querySelector("#modal-container");
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
