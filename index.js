const fs = require("fs");
const { esperar } = require("./api");
const { normalizarPersonajes } = require("./normalizacion");
const { obtenerTodosSecuencial, obtenerTodosConcurrente } = require("./estadisticas");

async function main() {
  const personajesSecuencial = await obtenerTodosSecuencial();
  await esperar(1000); //no forma parte del tiempo medido de las dos estrategias
  const personajesConcurrente = await obtenerTodosConcurrente();

  // Normalización con map
  const personajesNormalizados = normalizarPersonajes(personajesConcurrente);

  console.log("Ejemplo de personaje normalizado:", personajesNormalizados[0]);
  console.log(`Total de personajes: ${personajesNormalizados.length}`);
  
  fs.writeFileSync(
    "personajes.json",
    JSON.stringify(personajesNormalizados, null, 2)
  );
  console.log(`Se guardaron ${personajesNormalizados.length} personajes en personajes.json`);
}

main();
    
module.exports = { main };