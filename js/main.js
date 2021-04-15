// Variables y Constantes
const input = document.getElementById('input')
const btnRandom = document.getElementById('btn-random')
const form = document.getElementById('form')
const pokeAPI = 'https://pokeapi.co/api/v2/'


// Funciones
const randomPoke = () => {
    let poke = Math.floor(Math.random() * (152 - 1)) + 1
    input.value = poke
}

const mostrarPokemon = (pokemon, desc) => {

    const main = document.getElementById('main')
    const card = document.getElementById('template__card').content
    const cardClone = card.cloneNode(true)
    const fragment = document.createDocumentFragment()

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


    cardClone.querySelector('.card__image').setAttribute('src', pokeInfo.foto)    

    cardClone.querySelector('.card__name').innerHTML = pokeInfo.nombre
    cardClone.querySelector('.card__id').innerHTML += pokeInfo.id
    cardClone.querySelector('.card__desc').innerHTML += pokeInfo.descripcion

    cardClone.querySelector('.card__item--ps').innerHTML += pokeInfo.stats.hp
    cardClone.querySelector('.card__item--att').innerHTML += pokeInfo.stats.att
    cardClone.querySelector('.card__item--def').innerHTML += pokeInfo.stats.def
    cardClone.querySelector('.card__item--attes').innerHTML += pokeInfo.stats.attEsp
    cardClone.querySelector('.card__item--defes').innerHTML += pokeInfo.stats.defEsp
    cardClone.querySelector('.card__item--vel').innerHTML += pokeInfo.stats.vel

    fragment.appendChild(cardClone)
    main.appendChild(fragment)
    



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
        if (input.value >= 1 && input.value < 152) {
            fetchData(input.value)
            form.reset()
            input.focus()
        } else {
            console.log('Pokemon no encontrado')
        }
    }
})
