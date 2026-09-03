//Punto B consultas

// 1. filter -> vivos y de especie Human
function obtenerHumanosVivos(personajes) {
  return personajes.filter(
    p => p.estado === "Alive" && p.especie === "Human"
  );
}

// 2. filter -> personajes con 20 o más episodios
function obtenerMuchosEpisodios(personajes) {
  return personajes.filter(
    p => p.cantidadEpisodios >= 20
  );
}

// 3. find -> primer personaje de especie Alien y género Female
function obtenerAlienFemale(personajes) {
  return personajes.find(
    p => p.especie === "Alien" && p.genero === "Female"
  );
}

// 4. some -> al menos un personaje con tipo definido
function existeConTipo(personajes) {
  return personajes.some(
    p => p.tipo && p.tipo.trim() !== ""
  );
}

// 5. every -> todos los personajes tienen imagen y al menos un episodio
function todosCumplenImagenEpisodios(personajes) {
  return personajes.every(
    p => Boolean(p.imagen) && p.cantidadEpisodios >= 1
  );
}