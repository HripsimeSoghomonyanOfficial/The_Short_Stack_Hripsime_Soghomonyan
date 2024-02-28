const pokemonList = document.getElementById('pokemonList');
    const detailView = document.getElementById('detailView');
    const pokemonName = document.getElementById('pokemonName');
    const pokemonAbilities = document.getElementById('pokemonAbilities');
    const pokemonTypes = document.getElementById('pokemonTypes');
    const pokemonSprite = document.getElementById('pokemonSprite');
    const addToCollectionBtn = document.getElementById('addToCollection');
    const removeFromCollectionBtn = document.getElementById('removeFromCollection');
    const collectionList = document.getElementById('collectionList');
    const collection = [];

    // Fetch Pokémon data from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
      .then(response => response.json())
      .then(data => {
        data.results.forEach(pokemon => {
          const listItem = document.createElement('div');
          listItem.textContent = pokemon.name;
          listItem.classList.add('pokemon-item');
          listItem.addEventListener('click', () => showPokemonDetails(pokemon.url));
          pokemonList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching Pokémon:', error));

    function showPokemonDetails(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          pokemonName.textContent = data.name;
          pokemonAbilities.textContent = data.abilities.map(ability => ability.ability.name).join(', ');
          pokemonTypes.textContent = data.types.map(type => type.type.name).join(', ');
          pokemonSprite.src = data.sprites.front_default;
          detailView.style.display = 'block';
          addToCollectionBtn.disabled = collection.some(p => p.name === data.name);
          removeFromCollectionBtn.disabled = !addToCollectionBtn.disabled;
          addToCollectionBtn.onclick = () => addToCollection(data);
          removeFromCollectionBtn.onclick = () => removeFromCollection(data);
        })
        .catch(error => console.error('Error fetching Pokémon details:', error));
    }

    function addToCollection(pokemon) {
      collection.push(pokemon);
      renderCollection();
    }

    function removeFromCollection(pokemon) {
      const index = collection.findIndex(p => p.name === pokemon.name);
      if (index !== -1) {
        collection.splice(index, 1);
        renderCollection();
      }
    }

    function renderCollection() {
      collectionList.innerHTML = '';
      collection.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        collectionList.appendChild(listItem);
      });
    }