// Variables y Constantes
const input = document.getElementById('input')
const btnRandom = document.getElementById('btn-random')
const form = document.getElementById('form')
const pokeAPI = 'https://pokeapi.co/api/v2/'

const pokemonMin = 1
const pokemonMax = 151


// Funciones
const randomPoke = () => {
    let poke = Math.floor(Math.random() * (pokemonMax - pokemonMin)) + pokemonMin
    input.value = poke
}

const mostrarPokemon = (pokemon, desc) => {

    const main = document.getElementById('main')

    const pokeInfo = {
        id: desc.id,
        nombre: pokemon.name,
        foto: pokemon.sprites.other.dream_world.front_default,
        descripcion: desc.flavor_text_entries[59].flavor_text,
        stats: {
            hp: pokemon.stats[0].base_stat,
            att: pokemon.stats[1].base_stat,
            def: pokemon.stats[2].base_stat,
            attEsp: pokemon.stats[3].base_stat,
            defEsp: pokemon.stats[4].base_stat,
            vel: pokemon.stats[5].base_stat
        }
    }

    let card = `
    <div class="card">
        <div class="card__main-info">
            <img src="${pokeInfo.foto}" class="card__image"></img>
            <div class="card__name-id">
                <p class="card__name">${pokeInfo.nombre}</p>
                <p class="card__id">#${pokeInfo.id}</p>
            </div>
        </div>
        <p class="card__desc"><strong>Descripción: </strong>${pokeInfo.descripcion}</p>
        <div class="card__lists">
            <ul class="card__list card__list--a">
                <li class="card__item card__item--ps"><strong>PS: </strong>${pokeInfo.stats.hp}</li>
                <li class="card__item card__item--att"><strong>Ataque: </strong>${pokeInfo.stats.att}</li>
                <li class="card__item card__item--def"><strong>Defensa: </strong>${pokeInfo.stats.def}</li>
            </ul>
            <ul class="card__list card__list--b">
                <li class="card__item card__item--attes"><strong>Ataque Esp: </strong>${pokeInfo.stats.attEsp}</li>
                <li class="card__item card__item--defes"><strong>Defensa Esp: </strong>${pokeInfo.stats.defEsp}</li>
                <li class="card__item card__item--vel"><strong>Velocidad: </strong>${pokeInfo.stats.vel}</li>
            </ul>
        </div>
    </div>
    `

    main.innerHTML = card;

    

    console.log(`ID: ${pokeInfo.id}
    Nombre: ${pokeInfo.nombre}
    Foto: ${pokeInfo.foto}
    Descripción: ${pokeInfo.descripcion}
    Estadísticas:
    PS: ${pokeInfo.stats.hp}
    Ataque: ${pokeInfo.stats.att}
    Defensa: ${pokeInfo.stats.def}
    Ataque Especial: ${pokeInfo.stats.attEsp}
    Defensa Especial: ${pokeInfo.stats.defEsp}
    Velocidad: ${pokeInfo.stats.vel}`)

}

const fetchData = async (id) => {
    try {
        const pokemon = await fetch(`${pokeAPI}pokemon/${id}`)
        const pokeDesc = await fetch(`${pokeAPI}pokemon-species/${id}`)
        const data = await pokemon.json()
        const data2 = await pokeDesc.json()
        mostrarPokemon(data, data2)
    } catch (e) {
        console.log(e)
    }
}


// Eventos
btnRandom.addEventListener('click', randomPoke) 
form.addEventListener('submit', e => {
    e.preventDefault()
    if (input.value.trim() != '') {
        if (input.value >= pokemonMin && input.value < pokemonMax) {
            fetchData(input.value)
            form.reset()
            input.focus()
        } else {
            console.log('Pokemon no encontrado')
        }
    }
})
