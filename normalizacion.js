// Transforma un personaje crudo de la API a la estructura establecida
function normalizarPersonaje(personaje) {
  return {
    id: personaje.id,
    nombre: personaje.name,
    estado: personaje.status,
    especie: personaje.species,
    tipo: personaje.type,
    genero: personaje.gender,
    origen: personaje.origin?.name ?? "Desconocido",
    ubicacionActual: personaje.location?.name ?? "Desconocido",
    cantidadEpisodios: personaje.episode.length,
    imagen: personaje.image,
  };
}

// Aplica map sobre todo el arreglo
function normalizarPersonajes(personajes) {
  return personajes.map(normalizarPersonaje);
}

module.exports = { normalizarPersonaje, normalizarPersonajes };