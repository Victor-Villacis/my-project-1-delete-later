let allPokemon = [];

const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const promises = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );
        return Promise.all(promises);
    })
    .then(pokemonData => {
        allPokemon = pokemonData;
        displayPokemon(allPokemon);
    })
    .catch(error => console.error('Error fetching Pokemon:', error));

function displayPokemon(pokemonList) {
    const list = document.getElementById('pokemon-list');
    list.innerHTML = '';
    pokemonList.forEach(pokeData => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
            <h3>${pokeData.name}</h3>
            <p>Types: ${pokeData.types.map(t => t.type.name).join(', ')}</p>
        `;
        list.appendChild(card);
    });
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query)
    );
    displayPokemon(filtered);
});