const fs = require("fs");
const { obtenerTodosLosPersonajes } = require("./api");
const { normalizarPersonajes } = require("./normalizacion");

const CACHE_FILE = "cache.json";

async function main() {
  const personajesCrudos = await obtenerTodosLosPersonajes();

  // Normalización con map
  const personajesNormalizados = normalizarPersonajes(personajesCrudos);

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