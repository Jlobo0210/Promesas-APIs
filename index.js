const fs = require("fs");
const { obtenerTodosLosPersonajes } = require("./src/api");
const { normalizarPersonajes } = require("./src/normalizacion");

const CACHE_FILE = "cache.json";

async function main() {
  let personajesCrudos;

  if (fs.existsSync(CACHE_FILE)) {
    console.log("Usando cache local, no se llama a la API.");
    personajesCrudos = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } else {
    personajesCrudos = await obtenerTodosLosPersonajes();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(personajesCrudos));
  }

  // Normalización con map.
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