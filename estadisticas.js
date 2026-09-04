const BASE_URL = "https://rickandmortyapi.com/api/character";

// validando status y content-type antes de intentar parsear JSON.
async function fetchJson(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) { // en vez de seguir intentando parsear el json
    const texto = await respuesta.text();
    throw new Error(
      `Error HTTP ${respuesta.status} en ${url}. Respuesta: ${texto.slice(0, 150)}`
    );
  }

  return respuesta.json();
}

async function obtenerInfoInicial() {
  const data = await fetchJson(BASE_URL);
  return data.info; 
}

// generando dinámicamente las URLs de las páginas.
function generarUrlsDePaginas(totalPaginas) {
  const urls = [];
  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    urls.push(`${BASE_URL}?page=${pagina}`);
  }
  return urls;
}


// Estrategia secuencial
async function obtenerTodosSecuencial() {
  const inicio = Date.now();

  const { pages: totalPaginas } = await obtenerInfoInicial(); //pages del objeto info
  const urls = generarUrlsDePaginas(totalPaginas);

  let personajes = [];
  for (const url of urls) {
    const data = await fetchJson(url);
    personajes = personajes.concat(data.results);
  }

  const fin = Date.now();
  console.log(`Estrategia SECUENCIAL: ${fin - inicio} ms, ${personajes.length} personajes`);
  return personajes;
}

// Estrategia concurrente con Promise.all()
async function obtenerTodosConcurrente() {
  const inicio = Date.now();

  const { pages: totalPaginas } = await obtenerInfoInicial();
  const urls = generarUrlsDePaginas(totalPaginas);

  const promesas = urls.map((url) => fetchJson(url));
  const resultados = await Promise.all(promesas);
  const personajes = resultados.flatMap((data) => data.results);

  const fin = Date.now();
  console.log(`Estrategia CONCURRENTE: ${fin - inicio} ms, ${personajes.length} personajes`);
  return personajes;
}

module.exports = {
  fetchJson,
  obtenerInfoInicial,
  generarUrlsDePaginas,
  obtenerTodosSecuencial,
  obtenerTodosConcurrente,
};