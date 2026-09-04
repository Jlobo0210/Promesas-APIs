const { obtenerInfoInicial, generarUrlsDePaginas, fetchJson, esperar } = require("./api");

// Estrategia secuencial
async function obtenerTodosSecuencial() {
  const inicio = Date.now();

  const { pages: totalPaginas } = await obtenerInfoInicial(); //pages del objeto info
  const urls = generarUrlsDePaginas(totalPaginas);

  let personajes = [];
  for (const url of urls) {
    const data = await fetchJson(url);
    personajes = personajes.concat(data.results);
    await esperar(500);
  }

  const fin = Date.now();
  console.log(`Estrategia SECUENCIAL: ${fin - inicio} ms, ${personajes.length} personajes`);
  return personajes;
}

// Estrategia concurrente con Promise.all()
async function obtenerTodosConcurrente(tamanoLote = 3, pausaEntreLotesMs = 2000) {
  const inicio = Date.now();

  const { pages: totalPaginas } = await obtenerInfoInicial();
  const urls = generarUrlsDePaginas(totalPaginas);

  let personajes = [];
  for (let i = 0; i < urls.length; i += tamanoLote) {
    const lote = urls.slice(i, i + tamanoLote);
    const promesas = lote.map((url) => fetchJson(url));
    const resultados = await Promise.all(promesas); // concurrente DENTRO del lote
    personajes = personajes.concat(resultados.flatMap((data) => data.results));

    if (i + tamanoLote < urls.length) {
      await esperar(pausaEntreLotesMs);
    }
  }

  const fin = Date.now();
  console.log(`Estrategia CONCURRENTE: ${fin - inicio} ms, ${personajes.length} personajes`);
  return personajes;
}

module.exports = {
  esperar,
  fetchJson,
  obtenerInfoInicial,
  generarUrlsDePaginas,
  obtenerTodosSecuencial,
  obtenerTodosConcurrente,
};