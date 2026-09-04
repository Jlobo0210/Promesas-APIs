const fs = require("fs");
const { esperar, obtenerTodosSecuencial, obtenerTodosConcurrente } = require("./api");

async function main() {
  const personajesSecuencial = await obtenerTodosSecuencial();
  
  await esperar(1000); //no forma parte del tiempo medido de las estrategias

  const personajesConcurrente = await obtenerTodosConcurrente();

}

main();

module.exports = { main };