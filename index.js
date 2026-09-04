const fs = require("fs");
const { obtenerTodosLosPersonajes } = require("./api");
const { normalizarPersonajes } = require("./normalizacion");

const CACHE_FILE = "cache.json";

async function main() {
  const personajesCrudos = await obtenerTodosLosPersonajes();

  const personajesConcurrente = await obtenerTodosConcurrente();

}

main();
    
module.exports = { main };