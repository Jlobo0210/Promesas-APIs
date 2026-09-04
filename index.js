const { esperar } = require("./api");
const { normalizarPersonajes } = require("./normalizacion");
const { obtenerTodosSecuencial, obtenerTodosConcurrente } = require("./estadisticas");
const {
  obtenerHumanosVivos,
  obtenerMuchosEpisodios,
  obtenerAlienFemale,
  existeConTipo,
  todosCumplenImagenEpisodios,
  agruparPorEspecie,
  clasificarPorRangoEpisodios,
} = require("./consultas");

async function main() {
  const personajesSecuencial = await obtenerTodosSecuencial();
  await esperar(1000); //no forma parte del tiempo medido de las dos estrategias
  const personajesConcurrente = await obtenerTodosConcurrente();

  // Normalización con map
  const personajesNormalizados = normalizarPersonajes(personajesConcurrente);

  console.log("Ejemplo de personaje normalizado:", personajesNormalizados[0]);
  console.log(`Total de personajes: ${personajesNormalizados.length}`);
  

  // ---------------------------------------------------------------
  // Parte B - Consultas
  // ---------------------------------------------------------------
  console.log("\n=== PARTE B: CONSULTAS ===\n");

  const humanosVivos = obtenerHumanosVivos(personajesNormalizados);
  console.log(`1. Humanos vivos: ${humanosVivos.length}`);

  const muchosEpisodios = obtenerMuchosEpisodios(personajesNormalizados);
  console.log(`2. Personajes con 20+ episodios: ${muchosEpisodios.length}`);

  const alienFemale = obtenerAlienFemale(personajesNormalizados);
  console.log("3. Primer Alien Female:", alienFemale ?? "No encontrado");

  const hayConTipo = existeConTipo(personajesNormalizados);
  console.log(`4. ¿Existe personaje con tipo definido?: ${hayConTipo}`);

  const cumplenTodos = todosCumplenImagenEpisodios(personajesNormalizados);
  console.log(`5. ¿Todos tienen imagen y >=1 episodio?: ${cumplenTodos}`);

  const porEspecie = agruparPorEspecie(personajesNormalizados);
  console.log("6. Agrupado por especie:", porEspecie);

  const porRango = clasificarPorRangoEpisodios(personajesNormalizados);
  console.log("7. Clasificación por rango de episodios:", porRango);

}

main();
    
module.exports = { main };